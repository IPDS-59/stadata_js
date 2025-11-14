import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { DerivedVariableListParams, ViewParams } from '../../../../types';
import { DerivedVariable } from '../../domain/entities';
import { DerivedVariableRepository } from '../../domain/repositories';
import { DerivedVariableRemoteDataSource } from '../datasources';

/**
 * Implementation of DerivedVariableRepository
 */
export class DerivedVariableRepositoryImpl implements DerivedVariableRepository {
  constructor(private readonly remoteDataSource: DerivedVariableRemoteDataSource) {}

  async getAll(
    params: DerivedVariableListParams
  ): Promise<Result<ListResult<DerivedVariable>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        // Validate that response.data exists and is an array with at least 2 elements
        if (!response.data || !Array.isArray(response.data) || response.data.length < 2) {
          throw new ParseFailure('Invalid response structure: missing or invalid data array');
        }

        const paginationInfo = response.data[0] as Record<string, unknown>;
        const derivedVariablesData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !derivedVariablesData) {
          throw new ParseFailure('Invalid response structure');
        }

        const derivedVariables = derivedVariablesData.map((item) => DerivedVariable.fromJson(item));

        // Calculate fallback values for missing pagination fields
        const count = Number(paginationInfo.count) || derivedVariablesData.length;
        const perPage = Number(paginationInfo.per_page) || count;

        return ListResult.fromJson(
          {
            data: derivedVariables,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: perPage,
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: count,
            },
          },
          (json: Record<string, unknown>) => DerivedVariable.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse derived variable: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<DerivedVariable, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('Derived variable not found');
        }
        const derivedVariableData = response.data[0];
        if (!derivedVariableData) {
          throw new ParseFailure('Derived variable data is empty');
        }
        return DerivedVariable.fromJson(derivedVariableData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse derived variable data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
