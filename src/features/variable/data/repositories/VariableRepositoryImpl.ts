import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { VariableListParams, ViewParams } from '../../../../types';
import { Variable } from '../../domain/entities';
import { VariableRepository } from '../../domain/repositories';
import { VariableRemoteDataSource } from '../datasources';

/**
 * Implementation of VariableRepository
 */
export class VariableRepositoryImpl implements VariableRepository {
  constructor(private readonly remoteDataSource: VariableRemoteDataSource) {}

  async getAll(params?: VariableListParams): Promise<Result<ListResult<Variable>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        const paginationInfo = response.data[0] as Record<string, unknown>;
        const variablesData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !variablesData) {
          throw new ParseFailure('Invalid response structure');
        }

        const variables = variablesData.map((item) => Variable.fromJson(item));
        return ListResult.fromJson(
          {
            data: variables,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: Number(paginationInfo.per_page || 10),
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: Number(paginationInfo.count || 0),
            },
          },
          (json: Record<string, unknown>) => Variable.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse variable: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<Variable, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('Variable not found');
        }
        const variableData = response.data[0];
        if (!variableData) {
          throw new ParseFailure('Variable data is empty');
        }
        return Variable.fromJson(variableData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse variable data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
