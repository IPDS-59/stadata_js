import { StadataClient } from '../client';
import { getGlobalClient } from '../global';
import { DomainRemoteDataSource } from '../features/domain/data/datasources';
import { DomainRepositoryImpl } from '../features/domain/data/repositories';
import { Domain } from '../features/domain/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { DomainListParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export interface UseDomains {
  fetchDomainList: (params: DomainListParams) => Promise<Result<ListResult<Domain>, ApiFailure>>;
}

/**
 * Composable for BPS Domain (wilayah/region) API
 *
 * @example
 * ```typescript
 * const client = createStadataClient({ apiKey: 'key' })
 * const { fetchDomainList } = useDomains(client)
 *
 * const result = await fetchDomainList({ type: DomainType.ALL, lang: DataLanguage.ID })
 * result.match(
 *   ({ data }) => console.log(data),
 *   (err) => console.error(err.message)
 * )
 * ```
 */
export function useDomains(client?: StadataClient): UseDomains {
  const _client = client ?? getGlobalClient();
  const dataSource = new DomainRemoteDataSource(_client.networkClient);
  const repository = new DomainRepositoryImpl(dataSource);

  return {
    fetchDomainList: (params) => repository.getAll(params),
  };
}
