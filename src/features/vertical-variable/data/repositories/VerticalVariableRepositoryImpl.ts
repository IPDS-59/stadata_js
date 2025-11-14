import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { VerticalVariableListParams, ViewParams } from '../../../../types';
import { VerticalVariable } from '../../domain/entities';
import { VerticalVariableRepository } from '../../domain/repositories';
import { VerticalVariableRemoteDataSource } from '../datasources';

/**
 * Implementation of VerticalVariableRepository
 */
export class VerticalVariableRepositoryImpl implements VerticalVariableRepository {
  constructor(private readonly remoteDataSource: VerticalVariableRemoteDataSource) {}

  async getAll(
    params: VerticalVariableListParams
  ): Promise<Result<ListResult<VerticalVariable>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        // Validate that response.data exists and is an array with at least 2 elements
        if (!response.data || !Array.isArray(response.data) || response.data.length < 2) {
          throw new ParseFailure('Invalid response structure: missing or invalid data array');
        }

        const paginationInfo = response.data[0];
        const verticalVariablesData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !verticalVariablesData) {
          throw new ParseFailure('Invalid response structure');
        }

        const verticalVariables = verticalVariablesData.map((item) =>
          VerticalVariable.fromJson(item)
        );

        // Calculate fallback values for missing pagination fields
        const count = Number(paginationInfo.count) || verticalVariablesData.length;
        const perPage = Number(paginationInfo.per_page) || count;

        return ListResult.fromJson(
          {
            data: verticalVariables,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: perPage,
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: count,
            },
          },
          (json: Record<string, unknown>) => VerticalVariable.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse vertical variable: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<VerticalVariable, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('Vertical variable not found');
        }
        const verticalVariableData = response.data[0];
        if (!verticalVariableData) {
          throw new ParseFailure('Vertical variable data is empty');
        }
        return VerticalVariable.fromJson(verticalVariableData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse vertical variable data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
