/**
 * A category of services that Magento can choose between. Each tier
 * has one or more concrete implementations (e.g. the `search` tier
 * resolves to either `opensearch` or `elasticsearch`).
 */
export type Tier = 'db' | 'search' | 'queue' | 'cache';

/**
 * Caller-expressed preference of "which implementation to use for which tier."
 * Produced by `parseServicePreferences` from the `service_preferences`
 * action input, then threaded into `buildServicesForEntry` to override
 * the per-tier default pick. Partial because callers only need to name
 * the tiers they care about; unset tiers fall back to the version's
 * default implementation.
 */
export type ServicePreferences = Partial<Record<Tier, string>>;

/**
 * Reverse lookup: which tier does each known service implementation
 * belong to. The keys of this map define the closed set of legal
 * service names in `service_preferences`; anything not listed here is
 * rejected as an unknown service. nginx and php-fpm are intentionally
 * absent — they're complementary (the `web` tier emits both together),
 * not alternatives, so picking one via preferences would be meaningless.
 */
export const SERVICE_TIER_MAP: Record<string, Tier> = {
  mysql: 'db',
  elasticsearch: 'search',
  opensearch: 'search',
  rabbitmq: 'queue',
  redis: 'cache',
  valkey: 'cache',
};

/**
 * Forward lookup: the implementations available within each tier,
 * ordered by default preference (first entry wins when no caller
 * preference is supplied). Used by the validator to render
 * "supported: a, b" lists in compatibility errors and by
 * `buildServicesForEntry` to know what to fall back to.
 */
export const TIER_IMPLEMENTATIONS: Record<Tier, string[]> = {
  db: ['mysql'],
  search: ['opensearch', 'elasticsearch'],
  queue: ['rabbitmq'],
  cache: ['valkey', 'redis'],
};

/**
 * Flat list of every legal service name in `service_preferences`.
 * Surfaced in unknown-service error messages so the caller sees
 * exactly what's accepted without having to read source.
 */
export const KNOWN_SERVICE_NAMES = Object.keys(SERVICE_TIER_MAP);

/**
 * Returns the tier a service name belongs to, or `undefined` if the
 * name isn't recognized. Callers use the undefined return as the
 * signal to reject the input as unknown.
 */
export const tierFor = (serviceName: string): Tier | undefined => {
  return SERVICE_TIER_MAP[serviceName];
}
