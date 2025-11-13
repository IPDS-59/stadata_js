import { BaseEntity } from '../../../../core/base';

/**
 * Domain entity representing a BPS domain/region
 */
export class Domain extends BaseEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly url: string
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      domain_id: this.id,
      domain_name: this.name,
      domain_url: this.url,
    };
  }

  static fromJson(json: Record<string, unknown>): Domain {
    return new Domain(
      (json['domain_id'] as string) || (json['id'] as string) || '',
      (json['domain_name'] as string) || (json['name'] as string) || '',
      (json['domain_url'] as string) || (json['url'] as string) || ''
    );
  }
}
