import {
  filterEntryServices,
  filterMatrixForJob,
  mergeRequiredTiers,
  normalizeJobEntry,
  normalizeProbes,
  parseMatrixInput,
  parseRawConfig,
  resolveJobs,
} from './parse';
import { JobDefaults, Matrix } from './types';

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

const noDefaults: JobDefaults = { services: [] };
const smokeDefaults: JobDefaults = { services: ['search', 'queue', 'cache', 'web'] };
const probeDefaults: JobDefaults = { services: [], probes: ['page'] };

describe('normalizeJobEntry', () => {
  it('defaults enabled=true and uses the default tiers when entry is undefined', () => {
    expect(normalizeJobEntry('smoke-test', undefined, smokeDefaults)).toEqual({
      enabled: true,
      tiers: smokeDefaults.services,
    });
  });

  it('treats true shorthand as enabled with defaults', () => {
    expect(normalizeJobEntry('smoke-test', true, smokeDefaults)).toEqual({
      enabled: true,
      tiers: smokeDefaults.services,
    });
  });

  it('treats false shorthand as disabled with defaults', () => {
    expect(normalizeJobEntry('smoke-test', false, smokeDefaults)).toEqual({
      enabled: false,
      tiers: smokeDefaults.services,
    });
  });

  it('empty object is enabled with defaults', () => {
    expect(normalizeJobEntry('smoke-test', {}, smokeDefaults)).toEqual({
      enabled: true,
      tiers: smokeDefaults.services,
    });
  });

  it('preserves enabled when explicitly set', () => {
    expect(normalizeJobEntry('smoke-test', { enabled: false }, smokeDefaults)).toEqual({
      enabled: false,
      tiers: smokeDefaults.services,
    });
  });

  it('overrides the default tiers when services is set', () => {
    expect(normalizeJobEntry('smoke-test', { services: ['cache', 'web'] }, smokeDefaults)).toEqual({
      enabled: true,
      tiers: ['cache', 'web'],
    });
  });

  it('accepts an empty services array as "no services"', () => {
    expect(normalizeJobEntry('smoke-test', { services: [] }, smokeDefaults)).toEqual({
      enabled: true,
      tiers: [],
    });
  });

  it('throws when entry is a non-array primitive other than boolean', () => {
    expect(() => normalizeJobEntry('unit-test', 'true' as never, noDefaults)).toThrowError(
      /must be a boolean or an object/
    );
  });

  it('throws when entry is an array', () => {
    expect(() => normalizeJobEntry('unit-test', [] as never, noDefaults)).toThrowError(/got array/);
  });

  it('throws when services is not an array', () => {
    expect(() => normalizeJobEntry('smoke-test', { services: 'search' } as never, smokeDefaults)).toThrowError(
      /services must be an array of tier names/
    );
  });

  it('throws when services contains an unknown tier', () => {
    expect(() => normalizeJobEntry('smoke-test', { services: ['llm'] } as never, smokeDefaults)).toThrowError(
      /services contains unknown tier "llm"/
    );
  });

  it('carries the default probes when the entry omits them', () => {
    expect(normalizeJobEntry('smoke-test', { services: [] }, probeDefaults)).toEqual({
      enabled: true,
      tiers: [],
      probes: ['page'],
    });
  });

  it('carries the default probes for the boolean shorthand', () => {
    expect(normalizeJobEntry('smoke-test', true, probeDefaults)).toEqual({
      enabled: true,
      tiers: [],
      probes: ['page'],
    });
  });

  it('overrides the default probes when probes is set', () => {
    expect(normalizeJobEntry('smoke-test', { probes: ['page', 'graphql'] }, probeDefaults)).toEqual({
      enabled: true,
      tiers: [],
      probes: ['page', 'graphql'],
    });
  });

  it('omits probes for a job that declares no probe defaults', () => {
    expect(normalizeJobEntry('unit-test', { services: [] }, noDefaults).probes).toBeUndefined();
  });
});

describe('normalizeProbes', () => {
  it('returns the defaults when probes is omitted', () => {
    expect(normalizeProbes('smoke-test', undefined, ['page'])).toEqual(['page']);
  });

  it('returns undefined for a job with no probe defaults when omitted', () => {
    expect(normalizeProbes('unit-test', undefined, undefined)).toBeUndefined();
  });

  it('throws when probes is set on a job that does not support it', () => {
    expect(() => normalizeProbes('unit-test', ['page'], undefined)).toThrowError(
      /job "unit-test" does not support "probes"/
    );
  });

  it('throws when probes is not an array', () => {
    expect(() => normalizeProbes('smoke-test', 'page', ['page'])).toThrowError(
      /probes must be an array of probe names/
    );
  });

  it('throws when probes contains an unknown probe', () => {
    expect(() => normalizeProbes('smoke-test', ['rest'], ['page'])).toThrowError(
      /probes contains unknown probe "rest"/
    );
  });

  it('accepts an empty probes array', () => {
    expect(normalizeProbes('smoke-test', [], ['page'])).toEqual([]);
  });
});

describe('mergeRequiredTiers', () => {
  it('returns the input list when required is undefined', () => {
    expect(mergeRequiredTiers(['cache'], undefined)).toEqual(['cache']);
  });

  it('returns the input list when required is empty', () => {
    expect(mergeRequiredTiers(['cache'], [])).toEqual(['cache']);
  });

  it('prepends required tiers ahead of the input tiers', () => {
    expect(mergeRequiredTiers(['cache', 'web'], ['db'])).toEqual(['db', 'cache', 'web']);
  });

  it('deduplicates when a required tier already appears in the input', () => {
    expect(mergeRequiredTiers(['db', 'cache'], ['db'])).toEqual(['db', 'cache']);
  });

  it('deduplicates within required itself', () => {
    expect(mergeRequiredTiers(['cache'], ['db', 'db'])).toEqual(['db', 'cache']);
  });
});

describe('filterEntryServices', () => {
  it('returns services={} for an empty tier list', () => {
    const out = filterEntryServices({ php: '8.3', services: FULL_SERVICES }, []);
    expect(out.services).toEqual({});
    expect(out.php).toBe('8.3');
  });

  it('keeps only services in the requested tiers', () => {
    const out = filterEntryServices({ php: '8.3', services: FULL_SERVICES }, ['cache', 'web']);
    expect(Object.keys(out.services!).sort()).toEqual(['nginx', 'php-fpm', 'valkey']);
  });

  it('drops services that the matrix doesn\'t carry (elasticsearch absent)', () => {
    const out = filterEntryServices({ services: { opensearch: FULL_SERVICES.opensearch } }, ['search']);
    expect(Object.keys(out.services!)).toEqual(['opensearch']);
  });

  it('emits services={} when the entry has no services map', () => {
    const out = filterEntryServices({ php: '8.3' }, ['cache']);
    expect(out.services).toEqual({});
  });
});

describe('filterMatrixForJob', () => {
  it('preserves matrix shape, mapping every entry through filterEntryServices', () => {
    const out = filterMatrixForJob(MATRIX, ['queue']);
    expect(out.include).toHaveLength(1);
    expect(Object.keys(out.include[0].services!)).toEqual(['rabbitmq']);
  });

  it('passes through unrelated top-level matrix keys', () => {
    const out = filterMatrixForJob({ ...MATRIX, magento: ['2.4.7'] } as Matrix, []);
    expect((out as Matrix).magento).toEqual(['2.4.7']);
  });
});

describe('resolveJobs', () => {
  const jobs: Record<string, JobDefaults> = {
    'unit-test': noDefaults,
    'smoke-test': smokeDefaults,
  };

  it('emits every known job, defaulted-enabled, when raw is empty', () => {
    const out = resolveJobs({}, 'store', jobs, MATRIX);
    expect(Object.keys(out).sort()).toEqual(['smoke-test', 'unit-test']);
    expect(out['unit-test'].enabled).toBe(true);
    expect(out['smoke-test'].enabled).toBe(true);
  });

  it('emits services={} on entries for a no-default job', () => {
    const out = resolveJobs({}, 'store', jobs, MATRIX);
    expect(out['unit-test'].matrix.include[0].services).toEqual({});
  });

  it('expands the smoke-test default tiers across the matrix entry', () => {
    const out = resolveJobs({}, 'store', jobs, MATRIX);
    expect(Object.keys(out['smoke-test'].matrix.include[0].services!).sort()).toEqual([
      'nginx',
      'opensearch',
      'php-fpm',
      'rabbitmq',
      'valkey',
    ]);
  });

  it('applies a caller-supplied services override', () => {
    const out = resolveJobs(
      { jobs: { 'smoke-test': { services: ['cache'] } } },
      'store',
      jobs,
      MATRIX,
    );
    expect(Object.keys(out['smoke-test'].matrix.include[0].services!)).toEqual(['valkey']);
  });

  it('always merges requiredServices into the matrix even when caller overrides services', () => {
    const withRequired: Record<string, JobDefaults> = {
      'smoke-test': { ...smokeDefaults, requiredServices: ['db'] },
    };
    const out = resolveJobs(
      { jobs: { 'smoke-test': { services: ['cache'] } } },
      'store',
      withRequired,
      MATRIX,
    );
    expect(Object.keys(out['smoke-test'].matrix.include[0].services!).sort()).toEqual(['mysql', 'valkey']);
  });

  it('keeps requiredServices even when caller overrides services to []', () => {
    const withRequired: Record<string, JobDefaults> = {
      'smoke-test': { ...smokeDefaults, requiredServices: ['db'] },
    };
    const out = resolveJobs(
      { jobs: { 'smoke-test': { services: [] } } },
      'store',
      withRequired,
      MATRIX,
    );
    expect(Object.keys(out['smoke-test'].matrix.include[0].services!)).toEqual(['mysql']);
  });

  it('honors caller enabled=false but still emits a filtered matrix', () => {
    const out = resolveJobs(
      { jobs: { 'smoke-test': false } },
      'store',
      jobs,
      MATRIX,
    );
    expect(out['smoke-test'].enabled).toBe(false);
    expect(out['smoke-test'].matrix.include[0].services).toBeDefined();
  });

  it('throws on unknown job names with the kind in the message', () => {
    expect(() => resolveJobs({ jobs: { taco: false } }, 'store', jobs, MATRIX)).toThrowError(
      /unknown job "taco" for kind "store"/
    );
  });

  it('throws when `jobs` is not an object', () => {
    expect(() => resolveJobs({ jobs: 'oops' } as never, 'store', jobs, MATRIX)).toThrowError(
      /`jobs` must be an object/
    );
  });
});

describe('parseRawConfig', () => {
  it('returns an empty object for empty input', () => {
    expect(parseRawConfig('')).toEqual({});
  });

  it('returns an empty object for whitespace input', () => {
    expect(parseRawConfig('   \n  ')).toEqual({});
  });

  it('parses a valid object', () => {
    expect(parseRawConfig('{"jobs": {"unit-test": true}}')).toEqual({
      jobs: { 'unit-test': true },
    });
  });

  it('throws on syntactically invalid JSON', () => {
    expect(() => parseRawConfig('{not json}')).toThrowError(/failed to parse JSON/);
  });

  it('throws when top level is an array', () => {
    expect(() => parseRawConfig('[]')).toThrowError(/top-level value must be an object/);
  });

  it('throws when top level is a primitive', () => {
    expect(() => parseRawConfig('"hello"')).toThrowError(/top-level value must be an object/);
  });

  it('throws when top level is null', () => {
    expect(() => parseRawConfig('null')).toThrowError(/top-level value must be an object/);
  });
});

describe('parseMatrixInput', () => {
  it('parses a valid matrix', () => {
    const out = parseMatrixInput('{"include": [{"php": "8.3"}]}');
    expect(out.include).toEqual([{ php: '8.3' }]);
  });

  it('throws on empty input', () => {
    expect(() => parseMatrixInput('')).toThrowError(/`matrix` input is required/);
  });

  it('throws on invalid JSON', () => {
    expect(() => parseMatrixInput('{nope}')).toThrowError(/failed to parse `matrix` input/);
  });

  it('throws when top level is an array', () => {
    expect(() => parseMatrixInput('[]')).toThrowError(/`matrix` must be a JSON object/);
  });

  it('throws when include is missing', () => {
    expect(() => parseMatrixInput('{}')).toThrowError(/`matrix.include` must be an array/);
  });

  it('throws when include is not an array', () => {
    expect(() => parseMatrixInput('{"include": "nope"}')).toThrowError(/`matrix.include` must be an array/);
  });
});
