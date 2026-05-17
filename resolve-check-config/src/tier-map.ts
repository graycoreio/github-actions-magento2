/**
 * A category of services that can be selected for a job. Mirrors the
 * `Tier` concept in `supported-version` but adds the `web` tier so the
 * smoke-test and integration jobs can opt the nginx + php-fpm pair in
 * or out as a unit. Intentionally narrower than supported-version's
 * tier set: this file only names tiers that the resolve-check-config
 * schema lets callers toggle.
 */
export type Tier = 'db' | 'search' | 'queue' | 'cache' | 'web';

/**
 * Expansion of each tier to the concrete service names that may
 * appear in a supported-version matrix entry's `services` map.
 * Filtering a matrix entry's services for a tier list means keeping
 * the keys that union to the values of the selected tiers here.
 */
export const TIER_TO_SERVICES: Record<Tier, readonly string[]> = {
  db: ['mysql'],
  search: ['opensearch', 'elasticsearch'],
  queue: ['rabbitmq'],
  cache: ['valkey', 'redis'],
  web: ['nginx', 'php-fpm'],
};

export const isTier = (value: unknown): value is Tier =>
  typeof value === 'string' && value in TIER_TO_SERVICES;

/**
 * Returns the flat set of concrete service names for a list of tiers.
 * Used to filter a matrix entry's `services` map down to only the
 * containers a particular job actually needs.
 */
export const servicesForTiers = (tiers: readonly Tier[]): Set<string> => {
  const result = new Set<string>();
  for (const tier of tiers) {
    for (const name of TIER_TO_SERVICES[tier]) result.add(name);
  }
  return result;
}
