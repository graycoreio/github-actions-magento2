import { EXTENSION_JOBS, KNOWN_JOBS_EXTENSION, resolveExtensionConfig } from './extension';
import { Matrix } from '../types';

const MATRIX: Matrix = {
  include: [{
    php: '8.3',
    services: {
      mysql: { image: 'mysql:8' },
      opensearch: { image: 'opensearchproject/opensearch:2' },
    },
  }],
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

  it('emits services={} for every job under the current defaults', () => {
    const resolved = resolveExtensionConfig({}, MATRIX);
    for (const name of Object.keys(resolved)) {
      expect(resolved[name].matrix.include[0].services).toEqual({});
    }
  });

  it('still accepts a caller-supplied services override', () => {
    const resolved = resolveExtensionConfig(
      { jobs: { integration_test: { services: ['search'] } } },
      MATRIX,
    );
    expect(Object.keys(resolved['integration_test'].matrix.include[0].services!)).toEqual(['opensearch']);
  });

  it('throws on a typo in the job name', () => {
    expect(() => resolveExtensionConfig({ jobs: { 'inteegration_test': false } }, MATRIX)).toThrowError(
      /unknown job "inteegration_test" for kind "extension"/
    );
  });

  it('throws when a store-only job name is used', () => {
    expect(() => resolveExtensionConfig({ jobs: { 'smoke-test': false } }, MATRIX)).toThrowError(
      /unknown job "smoke-test" for kind "extension"/
    );
  });
});
