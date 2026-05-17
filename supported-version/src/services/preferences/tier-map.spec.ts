import { tierFor } from './tier-map';

describe('tierFor', () => {
  it.each([
    ['mysql', 'db'],
    ['elasticsearch', 'search'],
    ['opensearch', 'search'],
    ['rabbitmq', 'queue'],
    ['redis', 'cache'],
    ['valkey', 'cache'],
  ])('maps %s to %s', (name, tier) => {
    expect(tierFor(name)).toBe(tier);
  });

  it('returns undefined for unknown names', () => {
    expect(tierFor('foobar')).toBeUndefined();
  });
});
