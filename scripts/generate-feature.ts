#!/usr/bin/env ts-node

/**
 * Feature Generator Script
 *
 * This script generates a complete feature module following Clean Architecture.
 * Usage: ts-node scripts/generate-feature.ts <feature-name>
 *
 * Example: ts-node scripts/generate-feature.ts publication
 *
 * This will create:
 * - Domain layer (entities, repositories, use cases)
 * - Data layer (data sources, repository implementation)
 * - Dependency injection setup
 */

import * as fs from 'fs';
import * as path from 'path';

interface FeatureConfig {
  name: string;                    // publication
  pascalCase: string;              // Publication
  endpoint: string;                // /list/publication
  viewEndpoint: string;            // /view/publication
  hasKeywordSearch?: boolean;      // true
  hasMonthYearFilter?: boolean;    // true
  hasSubjectFilter?: boolean;      // false
  hasVariableFilter?: boolean;     // false
  additionalParams?: string[];     // ['newsCategoryId']
}

const toPascalCase = (str: string): string => {
  return str
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

const generateEntity = (config: FeatureConfig): string => {
  return `import { BaseEntity } from '../../../../core/base';

/**
 * ${config.pascalCase} entity
 */
export class ${config.pascalCase} extends BaseEntity {
  constructor(
    public readonly id: string | number,
    public readonly title: string
    // TODO: Add more fields based on API response
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      title: this.title,
      // TODO: Map all fields
    };
  }

  static fromJson(json: Record<string, unknown>): ${config.pascalCase} {
    return new ${config.pascalCase}(
      (json['id'] as string | number) || '',
      (json['title'] as string) || ''
      // TODO: Map all fields from API
    );
  }
}
`;
};

const generateRepository = (config: FeatureConfig): string => {
  return `import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ${config.pascalCase} } from '../entities';
import { ListResult } from '../../../../shared/domain/entities';
import { ${config.pascalCase}ListParams, ViewParams } from '../../../../types';

/**
 * ${config.pascalCase} repository interface
 */
export interface ${config.pascalCase}Repository {
  getAll(params?: ${config.pascalCase}ListParams): Promise<Result<ListResult<${config.pascalCase}>, ApiFailure>>;
  getById(params: ViewParams): Promise<Result<${config.pascalCase}, ApiFailure>>;
}
`;
};

const generateGetAllUseCase = (config: FeatureConfig): string => {
  return `import { Result } from 'neverthrow';
import { UseCase } from '../../../../core/base';
import { ApiFailure } from '../../../../core/failures';
import { ${config.pascalCase}Repository } from '../repositories';
import { ${config.pascalCase} } from '../entities';
import { ListResult } from '../../../../shared/domain/entities';
import { ${config.pascalCase}ListParams } from '../../../../types';

/**
 * Use case for getting all ${config.name}s
 */
export class GetAll${config.pascalCase}s extends UseCase<${config.pascalCase}ListParams | undefined, ListResult<${config.pascalCase}>> {
  constructor(private repository: ${config.pascalCase}Repository) {
    super();
  }

  async execute(params?: ${config.pascalCase}ListParams): Promise<Result<ListResult<${config.pascalCase}>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
`;
};

const generateGetByIdUseCase = (config: FeatureConfig): string => {
  return `import { Result } from 'neverthrow';
import { UseCase } from '../../../../core/base';
import { ApiFailure } from '../../../../core/failures';
import { ${config.pascalCase}Repository } from '../repositories';
import { ${config.pascalCase} } from '../entities';
import { ViewParams } from '../../../../types';

/**
 * Use case for getting a ${config.name} by ID
 */
export class Get${config.pascalCase}ById extends UseCase<ViewParams, ${config.pascalCase}> {
  constructor(private repository: ${config.pascalCase}Repository) {
    super();
  }

  async execute(params: ViewParams): Promise<Result<${config.pascalCase}, ApiFailure>> {
    return this.repository.getById(params);
  }
}
`;
};

const generateRemoteDataSource = (config: FeatureConfig): string => {
  return `import { Result } from 'neverthrow';
import { NetworkClient } from '../../../../core/network';
import { ApiEndpoint } from '../../../../core/constants';
import { ApiFailure } from '../../../../core/failures';
import { ${config.pascalCase}ListParams, ViewParams, ResponseData } from '../../../../types';

/**
 * Remote data source for ${config.name}s
 */
export class ${config.pascalCase}RemoteDataSource {
  constructor(private client: NetworkClient) {}

  async getAll(params?: ${config.pascalCase}ListParams): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>> {
    const queryParams: Record<string, string> = {};

    if (params?.domain) queryParams['domain'] = params.domain;
    if (params?.lang) queryParams['lang'] = params.lang;
    if (params?.page) queryParams['page'] = params.page.toString();
    if (params?.perPage) queryParams['per_page'] = params.perPage.toString();
    ${config.hasKeywordSearch ? "if (params?.keyword) queryParams['keyword'] = params.keyword;" : ''}
    ${config.hasMonthYearFilter ? "if (params?.month) queryParams['month'] = params.month.toString();" : ''}
    ${config.hasMonthYearFilter ? "if (params?.year) queryParams['year'] = params.year.toString();" : ''}

    const queryString = new URLSearchParams(queryParams).toString();
    const url = \`\${ApiEndpoint.${config.name.toUpperCase()}_LIST}\${queryString ? \`?\${queryString}\` : ''}\`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params?.cancelToken,
    });
  }

  async getById(params: ViewParams): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>> {
    const queryParams: Record<string, string> = {
      domain: params.domain,
    };

    if (params.lang) queryParams['lang'] = params.lang;
    if (params.id) queryParams['id'] = params.id.toString();

    const queryString = new URLSearchParams(queryParams).toString();
    const url = \`\${ApiEndpoint.${config.name.toUpperCase()}_VIEW}?\${queryString}\`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
`;
};

const generateRepositoryImpl = (config: FeatureConfig): string => {
  return `import { Result } from 'neverthrow';
import { ${config.pascalCase}Repository } from '../../domain/repositories';
import { ${config.pascalCase} } from '../../domain/entities';
import { ${config.pascalCase}RemoteDataSource } from '../datasources';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { ListResult, Pagination } from '../../../../shared/domain/entities';
import { ${config.pascalCase}ListParams, ViewParams } from '../../../../types';

/**
 * Implementation of ${config.pascalCase}Repository
 */
export class ${config.pascalCase}RepositoryImpl implements ${config.pascalCase}Repository {
  constructor(private remoteDataSource: ${config.pascalCase}RemoteDataSource) {}

  async getAll(params?: ${config.pascalCase}ListParams): Promise<Result<ListResult<${config.pascalCase}>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        const items = response.data.map((item) => ${config.pascalCase}.fromJson(item));
        const pagination = response.pagination
          ? Pagination.fromJson(response.pagination)
          : new Pagination(1, items.length, items.length, 1, items.length);

        return new ListResult(items, pagination);
      } catch (error) {
        throw new ParseFailure(
          \`Failed to parse ${config.name} data: \${error instanceof Error ? error.message : 'Unknown error'}\`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<${config.pascalCase}, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('${config.pascalCase} not found');
        }
        return ${config.pascalCase}.fromJson(response.data[0]!);
      } catch (error) {
        throw new ParseFailure(
          \`Failed to parse ${config.name} data: \${error instanceof Error ? error.message : 'Unknown error'}\`
        );
      }
    });
  }
}
`;
};

const generateInjector = (config: FeatureConfig): string => {
  return `import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { ${config.pascalCase}RemoteDataSource } from '../data/datasources';
import { ${config.pascalCase}RepositoryImpl } from '../data/repositories';
import { ${config.pascalCase}Repository } from '../domain/repositories';
import { GetAll${config.pascalCase}s, Get${config.pascalCase}ById } from '../domain/usecases';

/**
 * Dependency injection setup for ${config.pascalCase} feature
 */
export class ${config.pascalCase}Injector {
  private static readonly REMOTE_DATA_SOURCE = '${config.pascalCase}RemoteDataSource';
  private static readonly REPOSITORY = '${config.pascalCase}Repository';
  private static readonly GET_ALL_USE_CASE = 'GetAll${config.pascalCase}s';
  private static readonly GET_BY_ID_USE_CASE = 'Get${config.pascalCase}ById';

  static register(injector: Injector, networkClient: NetworkClient): void {
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new ${config.pascalCase}RemoteDataSource(networkClient)
    );

    injector.registerFactory(this.REPOSITORY, () => {
      const dataSource = injector.resolve<${config.pascalCase}RemoteDataSource>(this.REMOTE_DATA_SOURCE);
      return new ${config.pascalCase}RepositoryImpl(dataSource);
    });

    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<${config.pascalCase}Repository>(this.REPOSITORY);
      return new GetAll${config.pascalCase}s(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<${config.pascalCase}Repository>(this.REPOSITORY);
      return new Get${config.pascalCase}ById(repository);
    });
  }

  static getAll${config.pascalCase}sUseCase(injector: Injector): GetAll${config.pascalCase}s {
    return injector.resolve<GetAll${config.pascalCase}s>(this.GET_ALL_USE_CASE);
  }

  static get${config.pascalCase}ByIdUseCase(injector: Injector): Get${config.pascalCase}ById {
    return injector.resolve<Get${config.pascalCase}ById>(this.GET_BY_ID_USE_CASE);
  }
}
`;
};

const createDirectory = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const writeFile = (filePath: string, content: string): void => {
  createDirectory(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✓ Created ${filePath}`);
};

const generateFeature = (config: FeatureConfig): void => {
  const baseDir = path.join(__dirname, '..', 'src', 'features', config.name);

  console.log(`\nGenerating feature: ${config.name}\n`);

  // Domain layer
  writeFile(
    path.join(baseDir, 'domain', 'entities', `${config.pascalCase}.ts`),
    generateEntity(config)
  );
  writeFile(
    path.join(baseDir, 'domain', 'entities', 'index.ts'),
    `export * from './${config.pascalCase}';\n`
  );
  writeFile(
    path.join(baseDir, 'domain', 'repositories', `${config.pascalCase}Repository.ts`),
    generateRepository(config)
  );
  writeFile(
    path.join(baseDir, 'domain', 'repositories', 'index.ts'),
    `export * from './${config.pascalCase}Repository';\n`
  );
  writeFile(
    path.join(baseDir, 'domain', 'usecases', `GetAll${config.pascalCase}s.ts`),
    generateGetAllUseCase(config)
  );
  writeFile(
    path.join(baseDir, 'domain', 'usecases', `Get${config.pascalCase}ById.ts`),
    generateGetByIdUseCase(config)
  );
  writeFile(
    path.join(baseDir, 'domain', 'usecases', 'index.ts'),
    `export * from './GetAll${config.pascalCase}s';\nexport * from './Get${config.pascalCase}ById';\n`
  );

  // Data layer
  writeFile(
    path.join(baseDir, 'data', 'datasources', `${config.pascalCase}RemoteDataSource.ts`),
    generateRemoteDataSource(config)
  );
  writeFile(
    path.join(baseDir, 'data', 'datasources', 'index.ts'),
    `export * from './${config.pascalCase}RemoteDataSource';\n`
  );
  writeFile(
    path.join(baseDir, 'data', 'repositories', `${config.pascalCase}RepositoryImpl.ts`),
    generateRepositoryImpl(config)
  );
  writeFile(
    path.join(baseDir, 'data', 'repositories', 'index.ts'),
    `export * from './${config.pascalCase}RepositoryImpl';\n`
  );

  // Injector
  writeFile(
    path.join(baseDir, 'injector', `${config.pascalCase}Injector.ts`),
    generateInjector(config)
  );
  writeFile(
    path.join(baseDir, 'injector', 'index.ts'),
    `export * from './${config.pascalCase}Injector';\n`
  );

  // Feature index
  writeFile(
    path.join(baseDir, 'index.ts'),
    `export * from './domain/entities';\nexport * from './domain/repositories';\nexport * from './domain/usecases';\nexport * from './injector';\n`
  );

  console.log(`\n✅ Feature '${config.name}' generated successfully!\n`);
  console.log('Next steps:');
  console.log(`1. Update the entity fields in ${baseDir}/domain/entities/${config.pascalCase}.ts`);
  console.log(`2. Add ${config.pascalCase}ListParams type to src/types/index.ts if needed`);
  console.log(`3. Register the feature in src/StadataJS.ts setupDependencies()`);
  console.log(`4. Add methods to src/api/StadataListImpl.ts and StadataViewImpl.ts`);
  console.log(`5. Export the feature in src/index.ts\n`);
};

// Main execution
const featureName = process.argv[2];

if (!featureName) {
  console.error('Usage: ts-node scripts/generate-feature.ts <feature-name>');
  console.error('Example: ts-node scripts/generate-feature.ts publication');
  process.exit(1);
}

const config: FeatureConfig = {
  name: featureName.toLowerCase(),
  pascalCase: toPascalCase(featureName),
  endpoint: `/list/${featureName.toLowerCase()}`,
  viewEndpoint: `/view/${featureName.toLowerCase()}`,
  hasKeywordSearch: true,
  hasMonthYearFilter: false,
};

generateFeature(config);
