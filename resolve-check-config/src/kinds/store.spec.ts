import { KNOWN_JOBS_STORE, resolveStoreConfig, STORE_JOBS } from './store';
import { Matrix } from '../types';

const MATRIX: Matrix = {
  include: [{
    php: '8.3',
    services: {
      mysql: { image: 'mysql:8' },
      opensearch: { image: 'opensearchproject/opensearch:2' },
      rabbitmq: { image: 'rabbitmq:3' },
      valkey: { image: 'valkey:8' },
      nginx: { image: 'nginx:1.27' },
      'php-fpm': { image: 'php:8.3-fpm' },
    },
  }],
};

describe('STORE_JOBS', () => {
  it('declares the check-store jobs', () => {
    expect(Object.keys(STORE_JOBS).sort()).toEqual([
      'coding-standard',
      'phpstan',
      'smoke-test',
      'unit-test',
    ]);
  });

  it('declares phpstan as the only opt-in job', () => {
    expect(STORE_JOBS['phpstan'].enabledByDefault).toBe(false);
    for (const name of ['unit-test', 'coding-standard', 'smoke-test']) {
      expect(STORE_JOBS[name].enabledByDefault).toBeUndefined();
    }
  });

  it('declares smoke-test required tiers (end-user cannot toggle)', () => {
    expect(STORE_JOBS['smoke-test'].services).toEqual([]);
    expect([...STORE_JOBS['smoke-test'].requiredServices!].sort()).toEqual([
      'cache',
      'db',
      'queue',
      'search',
      'web',
    ]);
  });

  it('defaults smoke-test to the page probe only (graphql is opt-in)', () => {
    expect(STORE_JOBS['smoke-test'].probes).toEqual(['page']);
  });

  it('exposes empty service defaults for unit-test, coding-standard and phpstan', () => {
    expect(STORE_JOBS['unit-test'].services).toEqual([]);
    expect(STORE_JOBS['coding-standard'].services).toEqual([]);
    expect(STORE_JOBS['phpstan'].services).toEqual([]);
  });

  it('keeps KNOWN_JOBS_STORE in sync with the map keys', () => {
    expect([...KNOWN_JOBS_STORE].sort()).toEqual(Object.keys(STORE_JOBS).sort());
  });
});

describe('resolveStoreConfig', () => {
  it('emits every known job with default tier expansion, always including mysql for smoke-test', () => {
    const resolved = resolveStoreConfig({}, MATRIX);
    expect(Object.keys(resolved).sort()).toEqual([
      'coding-standard',
      'phpstan',
      'smoke-test',
      'unit-test',
    ]);
    expect(resolved['unit-test'].matrix.include[0].services).toEqual({});
    expect(Object.keys(resolved['smoke-test'].matrix.include[0].services!).sort()).toEqual([
      'mysql',
      'nginx',
      'opensearch',
      'php-fpm',
      'rabbitmq',
      'valkey',
    ]);
  });

  it('keeps every required service even when caller overrides smoke-test services to []', () => {
    const resolved = resolveStoreConfig(
      { jobs: { 'smoke-test': { services: [] } } },
      MATRIX,
    );
    expect(Object.keys(resolved['smoke-test'].matrix.include[0].services!).sort()).toEqual([
      'mysql',
      'nginx',
      'opensearch',
      'php-fpm',
      'rabbitmq',
      'valkey',
    ]);
  });

  it('leaves phpstan disabled when the caller says nothing', () => {
    const resolved = resolveStoreConfig({}, MATRIX);
    expect(resolved['phpstan'].enabled).toBe(false);
    expect(resolved['unit-test'].enabled).toBe(true);
  });

  it('enables phpstan when the caller opts in', () => {
    expect(resolveStoreConfig({ jobs: { phpstan: true } }, MATRIX)['phpstan'].enabled).toBe(true);
    expect(resolveStoreConfig({ jobs: { phpstan: {} } }, MATRIX)['phpstan'].enabled).toBe(true);
  });

  it('honors enabled=false for a job', () => {
    const resolved = resolveStoreConfig(
      { jobs: { 'smoke-test': false } },
      MATRIX,
    );
    expect(resolved['smoke-test'].enabled).toBe(false);
  });

  it('emits the default page-only probe list for smoke-test', () => {
    const resolved = resolveStoreConfig({}, MATRIX);
    expect(resolved['smoke-test'].probes).toEqual(['page']);
  });

  it('honors a smoke-test probes override', () => {
    const resolved = resolveStoreConfig(
      { jobs: { 'smoke-test': { probes: ['page', 'graphql'] } } },
      MATRIX,
    );
    expect(resolved['smoke-test'].probes).toEqual(['page', 'graphql']);
  });

  it('does not emit probes on jobs without a probe concept', () => {
    const resolved = resolveStoreConfig({}, MATRIX);
    expect(resolved['unit-test'].probes).toBeUndefined();
    expect(resolved['coding-standard'].probes).toBeUndefined();
  });

  it('rejects probes on a job that does not support it', () => {
    expect(() => resolveStoreConfig({ jobs: { 'unit-test': { probes: ['page'] } } }, MATRIX)).toThrow(
      /job "unit-test" does not support "probes"/
    );
  });

  it('throws on a typo in the job name', () => {
    expect(() => resolveStoreConfig({ jobs: { 'smkoe-test': false } }, MATRIX)).toThrow(
      /unknown job "smkoe-test" for kind "store"/
    );
  });

  it('throws when an extension-only job name is used', () => {
    expect(() => resolveStoreConfig({ jobs: { 'unit-test-extension': false } }, MATRIX)).toThrow(
      /unknown job "unit-test-extension" for kind "store"/
    );
  });
});
