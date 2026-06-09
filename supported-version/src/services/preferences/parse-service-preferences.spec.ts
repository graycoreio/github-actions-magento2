import { parseServicePreferences } from './parse-service-preferences';

describe('parseServicePreferences', () => {
  it('returns an empty map when input is empty', () => {
    expect(parseServicePreferences('')).toEqual({});
  });

  it('returns an empty map for whitespace-only input', () => {
    expect(parseServicePreferences('   ')).toEqual({});
  });

  it('maps a single name to its tier', () => {
    expect(parseServicePreferences('opensearch')).toEqual({ search: 'opensearch' });
  });

  it('maps two names in different tiers', () => {
    expect(parseServicePreferences('elasticsearch,valkey')).toEqual({
      search: 'elasticsearch',
      cache: 'valkey',
    });
  });

  it('accepts single-implementation-tier names as no-op-like preferences', () => {
    expect(parseServicePreferences('mysql,rabbitmq')).toEqual({
      db: 'mysql',
      queue: 'rabbitmq',
    });
  });

  it('tolerates whitespace around names', () => {
    expect(parseServicePreferences(' opensearch , valkey ')).toEqual({
      search: 'opensearch',
      cache: 'valkey',
    });
  });

  it('throws on unknown service name', () => {
    expect(() => parseServicePreferences('foobar')).toThrow(/unknown service "foobar"/);
  });

  it('throws on a collision in the search tier', () => {
    expect(() => parseServicePreferences('elasticsearch,opensearch')).toThrow(
      /collision in tier "search"/
    );
  });

  it('throws on a collision in the cache tier', () => {
    expect(() => parseServicePreferences('redis,valkey')).toThrow(/collision in tier "cache"/);
  });
});
