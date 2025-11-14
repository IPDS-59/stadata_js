import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ResponseData, TradeParams } from '../../../../types';
import { TradeRepository } from '../../domain/repositories/TradeRepository';
import { TradeRemoteDataSource } from '../datasources/TradeRemoteDataSource';

/**
 * Implementation of TradeRepository
 */
export class TradeRepositoryImpl implements TradeRepository {
  constructor(private remoteDataSource: TradeRemoteDataSource) {}

  get(params: TradeParams): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>> {
    return this.remoteDataSource.get(params);
  }
}
