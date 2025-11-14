/**
 * Domain type for filtering domains
 */
export enum DomainType {
  /** Get all domains */
  ALL = 'all',
  /** Get all province domains */
  PROVINCE = 'prov',
  /** Get all regency domains */
  REGENCY = 'kab',
  /** Get all regency domains by province code */
  REGENCY_BY_PROVINCE = 'kabbyprov',
}
