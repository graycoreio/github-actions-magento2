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
    expect(Object.keys(STORE_JOBS).sort()).toEqual(['coding-standard', 'e2e-test', 'smoke-test', 'unit-test']);
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

  it('declares e2e-test required tiers (end-user cannot toggle)', () => {
    expect(STORE_JOBS['e2e-test'].services).toEqual([]);
    expect([...STORE_JOBS['e2e-test'].requiredServices!].sort()).toEqual([
      'cache',
      'db',
      'search',
      'web',
    ]);
  });

  it('exposes empty service defaults for unit-test and coding-standard', () => {
    expect(STORE_JOBS['unit-test'].services).toEqual([]);
    expect(STORE_JOBS['coding-standard'].services).toEqual([]);
  });

  it('keeps KNOWN_JOBS_STORE in sync with the map keys', () => {
    expect([...KNOWN_JOBS_STORE].sort()).toEqual(Object.keys(STORE_JOBS).sort());
  });
});

describe('resolveStoreConfig', () => {
  it('emits every known job with default tier expansion, always including mysql for smoke-test', () => {
    const resolved = resolveStoreConfig({}, MATRIX);
    expect(Object.keys(resolved).sort()).toEqual(['coding-standard', 'e2e-test', 'smoke-test', 'unit-test']);
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

  it('disables e2e-test by default (opt-in job)', () => {
    const resolved = resolveStoreConfig({}, MATRIX);
    expect(resolved['e2e-test'].enabled).toBe(false);
    expect(resolved['unit-test'].enabled).toBe(true);
    expect(resolved['smoke-test'].enabled).toBe(true);
  });

  it('enables e2e-test when the caller opts in', () => {
    const resolved = resolveStoreConfig(
      { jobs: { 'e2e-test': true } },
      MATRIX,
    );
    expect(resolved['e2e-test'].enabled).toBe(true);
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
