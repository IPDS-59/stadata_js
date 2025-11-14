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
        // Validate that response.data exists and is an array with at least 2 elements
        if (!response.data || !Array.isArray(response.data) || response.data.length < 2) {
          throw new ParseFailure('Invalid response structure: missing or invalid data array');
        }

        const paginationInfo = response.data[0] as Record<string, unknown>;
        const unitsData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !unitsData) {
          throw new ParseFailure('Invalid response structure');
        }

        const units = unitsData.map((item) => Unit.fromJson(item));

        // Calculate fallback values for missing pagination fields
        const count = Number(paginationInfo.count) || unitsData.length;
        const perPage = Number(paginationInfo.per_page) || count;

        return ListResult.fromJson(
          {
            data: units,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: perPage,
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: count,
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
