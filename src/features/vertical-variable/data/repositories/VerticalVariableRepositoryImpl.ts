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
        const paginationInfo = response.data[0] as Record<string, unknown>;
        const verticalVariablesData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !verticalVariablesData) {
          throw new ParseFailure('Invalid response structure');
        }

        const verticalVariables = verticalVariablesData.map((item) => VerticalVariable.fromJson(item));
        return ListResult.fromJson(
          {
            data: verticalVariables,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: Number(paginationInfo.per_page || 10),
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: Number(paginationInfo.count || 0),
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
