import { validatePreferencesAgainstMatrix } from './validate-preferences-against-matrix';
import { PackageMatrixVersion } from '../../matrix/matrix-type';

const baseEntry = (overrides: Partial<PackageMatrixVersion> = {}): PackageMatrixVersion => ({
  magento: 'magento/project-community-edition:2.4.7',
  version: '2.4.7',
  php: '8.3',
  composer: '2.7.4',
  mysql: 'mysql:8.4',
  elasticsearch: 'elasticsearch:8.11.4',
  opensearch: 'opensearchproject/opensearch:2.19.1',
  rabbitmq: 'rabbitmq:4.0-management',
  redis: 'redis:7.2',
  varnish: 'varnish:7.5',
  valkey: 'valkey:8.0',
  nginx: 'nginx:1.26',
  os: 'ubuntu-latest',
  release: '2024-04-09T00:00:00+0000',
  eol: '2027-04-09T00:00:00+0000',
  ...overrides,
});

describe('validatePreferencesAgainstMatrix', () => {
  it('does not throw when all entries support the preference', () => {
    const entries = [baseEntry({ version: '2.4.7' }), baseEntry({ version: '2.4.6' })];
    expect(() => validatePreferencesAgainstMatrix({ search: 'opensearch' }, entries)).not.toThrow();
  });

  it('throws when an entry lacks the preferenced implementation, listing the offender', () => {
    const entries = [
      baseEntry({ version: '2.4.7' }),
      baseEntry({ version: '2.4.5', opensearch: '' }),
    ];
    expect(() => validatePreferencesAgainstMatrix({ search: 'opensearch' }, entries)).toThrowError(
      /not satisfied for:\n\s+- magento 2\.4\.5 \(supported: elasticsearch\)/
    );
  });

  it('lists all offenders, not just the first', () => {
    const entries = [
      baseEntry({ version: '2.4.5', opensearch: '' }),
      baseEntry({ version: '2.4.4', opensearch: '' }),
    ];
    expect(() => validatePreferencesAgainstMatrix({ search: 'opensearch' }, entries)).toThrowError(
      /magento 2\.4\.5[\s\S]*magento 2\.4\.4/
    );
  });

  it('reports "<none>" when the entry supports nothing in the tier', () => {
    const entries = [baseEntry({ version: '2.4.0', opensearch: '', elasticsearch: '' })];
    expect(() => validatePreferencesAgainstMatrix({ search: 'opensearch' }, entries)).toThrowError(
      /magento 2\.4\.0 \(supported: <none>\)/
    );
  });

  it('reports violations across multiple tiers', () => {
    const entries = [baseEntry({ version: '2.4.5', opensearch: '', valkey: '' })];
    let captured: Error | null = null;
    try {
      validatePreferencesAgainstMatrix({ search: 'opensearch', cache: 'valkey' }, entries);
    } catch (e) {
      captured = e as Error;
    }
    expect(captured).not.toBeNull();
    expect(captured!.message).toMatch(/opensearch/);
    expect(captured!.message).toMatch(/valkey/);
  });
});
