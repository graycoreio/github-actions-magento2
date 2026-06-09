import { EXTENSION_JOBS, KNOWN_JOBS_EXTENSION, resolveExtensionConfig } from './extension';
import { Matrix } from '../types';

const FULL_SERVICES = {
  mysql: { image: 'mysql:8' },
  opensearch: { image: 'opensearchproject/opensearch:2' },
  rabbitmq: { image: 'rabbitmq:3' },
  valkey: { image: 'valkey:8' },
  nginx: { image: 'nginx:1.27' },
  'php-fpm': { image: 'php:8.3-fpm' },
};

const MATRIX: Matrix = {
  include: [{ php: '8.3', services: { ...FULL_SERVICES } }],
};

describe('EXTENSION_JOBS', () => {
  it('declares the check-extension jobs', () => {
    expect(Object.keys(EXTENSION_JOBS).sort()).toEqual([
      'coding-standard',
      'compile-extension',
      'integration_test',
      'unit-test-extension',
    ]);
  });

  it('keeps KNOWN_JOBS_EXTENSION in sync with the map keys', () => {
    expect([...KNOWN_JOBS_EXTENSION].sort()).toEqual(Object.keys(EXTENSION_JOBS).sort());
  });

  it('declares integration_test required tiers (no web)', () => {
    expect(EXTENSION_JOBS['integration_test'].services).toEqual([]);
    expect([...EXTENSION_JOBS['integration_test'].requiredServices!].sort()).toEqual([
      'cache',
      'db',
      'queue',
      'search',
    ]);
  });

  it('leaves the non-service jobs with empty defaults', () => {
    for (const name of ['unit-test-extension', 'compile-extension', 'coding-standard']) {
      expect(EXTENSION_JOBS[name].services).toEqual([]);
      expect(EXTENSION_JOBS[name].requiredServices).toBeUndefined();
    }
  });
});

describe('resolveExtensionConfig', () => {
  it('emits every known job', () => {
    const resolved = resolveExtensionConfig({}, MATRIX);
    expect(Object.keys(resolved).sort()).toEqual([
      'coding-standard',
      'compile-extension',
      'integration_test',
      'unit-test-extension',
    ]);
  });

  it('emits services={} for the non-service jobs', () => {
    const resolved = resolveExtensionConfig({}, MATRIX);
    for (const name of ['unit-test-extension', 'compile-extension', 'coding-standard']) {
      expect(resolved[name].matrix.include[0].services).toEqual({});
    }
  });

  it('integration_test includes mysql/search/queue/cache but NOT nginx/php-fpm', () => {
    const resolved = resolveExtensionConfig({}, MATRIX);
    expect(Object.keys(resolved['integration_test'].matrix.include[0].services!).sort()).toEqual([
      'mysql',
      'opensearch',
      'rabbitmq',
      'valkey',
    ]);
  });

  it('keeps integration_test required tiers even when caller overrides services to []', () => {
    const resolved = resolveExtensionConfig(
      { jobs: { integration_test: { services: [] } } },
      MATRIX,
    );
    expect(Object.keys(resolved['integration_test'].matrix.include[0].services!).sort()).toEqual([
      'mysql',
      'opensearch',
      'rabbitmq',
      'valkey',
    ]);
  });

  it('throws on a typo in the job name', () => {
    expect(() => resolveExtensionConfig({ jobs: { 'inteegration_test': false } }, MATRIX)).toThrow(
      /unknown job "inteegration_test" for kind "extension"/
    );
  });

  it('throws when a store-only job name is used', () => {
    expect(() => resolveExtensionConfig({ jobs: { 'smoke-test': false } }, MATRIX)).toThrow(
      /unknown job "smoke-test" for kind "extension"/
    );
  });
});
