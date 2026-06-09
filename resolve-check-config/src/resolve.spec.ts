import { resolveConfig } from './resolve';
import { Matrix } from './types';

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

describe('resolveConfig', () => {
  it('routes kind=store to the store resolver', () => {
    const resolved = resolveConfig({ jobs: { 'smoke-test': false } }, 'store', MATRIX);
    expect(resolved['smoke-test'].enabled).toBe(false);
    expect(resolved['unit-test'].enabled).toBe(true);
  });

  it('routes kind=extension to the extension resolver', () => {
    const resolved = resolveConfig({ jobs: { 'compile-extension': false } }, 'extension', MATRIX);
    expect(resolved['compile-extension'].enabled).toBe(false);
    expect(resolved['integration_test'].enabled).toBe(true);
  });

  it('rejects a job name from the other kind', () => {
    expect(() => resolveConfig({ jobs: { 'smoke-test': false } }, 'extension', MATRIX)).toThrow(
      /unknown job "smoke-test" for kind "extension"/
    );
    expect(() => resolveConfig({ jobs: { 'unit-test-extension': false } }, 'store', MATRIX)).toThrow(
      /unknown job "unit-test-extension" for kind "store"/
    );
  });
});
