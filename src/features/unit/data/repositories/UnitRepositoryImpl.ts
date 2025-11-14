import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { UnitListParams, ViewParams } from '../../../../types';
import { Unit } from '../../domain/entities';
import { UnitRepository } from '../../domain/repositories';
import { UnitRemoteDataSource } from '../datasources';

/**
 * Implementation of UnitRepository
 */
export class UnitRepositoryImpl implements UnitRepository {
  constructor(private readonly remoteDataSource: UnitRemoteDataSource) {}

  async getAll(params?: UnitListParams): Promise<Result<ListResult<Unit>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        const paginationInfo = response.data[0] as Record<string, unknown>;
        const unitsData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !unitsData) {
          throw new ParseFailure('Invalid response structure');
        }

        const units = unitsData.map((item) => Unit.fromJson(item));
        return ListResult.fromJson(
          {
            data: units,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: Number(paginationInfo.per_page || 10),
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: Number(paginationInfo.count || 0),
            },
          },
          (json: Record<string, unknown>) => Unit.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse unit: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<Unit, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('Unit not found');
        }
        const unitData = response.data[0];
        if (!unitData) {
          throw new ParseFailure('Unit data is empty');
        }
        return Unit.fromJson(unitData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse unit data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
