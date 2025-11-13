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
        const verticalVariables = response.data.map((item) => VerticalVariable.fromJson(item));
        return ListResult.fromJson(
          {
            data: verticalVariables,
            pagination: response.pagination,
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
