import { isTier, servicesForTiers, TIER_TO_SERVICES } from './tier-map';

describe('isTier', () => {
  it('accepts every key in TIER_TO_SERVICES', () => {
    for (const tier of Object.keys(TIER_TO_SERVICES)) {
      expect(isTier(tier)).toBe(true);
    }
  });

  it('rejects unknown strings', () => {
    expect(isTier('llm')).toBe(false);
    expect(isTier('')).toBe(false);
  });

  it('rejects non-strings', () => {
    expect(isTier(42)).toBe(false);
    expect(isTier(null)).toBe(false);
    expect(isTier(undefined)).toBe(false);
  });
});

describe('servicesForTiers', () => {
  it('returns an empty set for an empty tier list', () => {
    expect([...servicesForTiers([])]).toEqual([]);
  });

  it('expands a single tier to its concrete service names', () => {
    expect([...servicesForTiers(['queue'])]).toEqual(['rabbitmq']);
  });

  it('expands the search tier to both implementations', () => {
    expect([...servicesForTiers(['search'])].sort()).toEqual(['elasticsearch', 'opensearch']);
  });

  it('expands the web tier to nginx + php-fpm', () => {
    expect([...servicesForTiers(['web'])].sort()).toEqual(['nginx', 'php-fpm']);
  });

  it('unions across multiple tiers', () => {
    expect([...servicesForTiers(['cache', 'queue'])].sort()).toEqual(['rabbitmq', 'redis', 'valkey']);
  });

  it('deduplicates if the same tier appears twice', () => {
    expect([...servicesForTiers(['queue', 'queue'])]).toEqual(['rabbitmq']);
  });
});
