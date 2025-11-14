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
        const paginationInfo = response.data[0] as Record<string, unknown>;
        const derivedVariablesData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !derivedVariablesData) {
          throw new ParseFailure('Invalid response structure');
        }

        const derivedVariables = derivedVariablesData.map((item) => DerivedVariable.fromJson(item));
        return ListResult.fromJson(
          {
            data: derivedVariables,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: Number(paginationInfo.per_page || 10),
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: Number(paginationInfo.count || 0),
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
