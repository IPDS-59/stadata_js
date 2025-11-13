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
        const variables = response.data.map((item) => Variable.fromJson(item));
        return ListResult.fromJson(
          {
            data: variables,
            pagination: response.pagination,
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
