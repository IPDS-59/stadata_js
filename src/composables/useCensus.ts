import { StadataClient } from '../client';
import { CensusRemoteDataSource } from '../features/census/data/datasources';
import { CensusRepositoryImpl } from '../features/census/data/repositories';
import { CensusEvent, CensusTopic, CensusArea, CensusDataset, CensusData } from '../features/census/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { CensusListParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export interface UseCensus {
  fetchCensusList: (params: CensusListParams) => Promise<Result<ListResult<CensusEvent | CensusTopic | CensusArea | CensusDataset | CensusData>, ApiFailure>>;
}

/**
 * Composable for BPS Census API
 */
export function useCensus(client: StadataClient): UseCensus {
  const dataSource = new CensusRemoteDataSource(client.networkClient);
  const repository = new CensusRepositoryImpl(dataSource);

  return {
    fetchCensusList: (params) => repository.getAll(params),
  };
}
