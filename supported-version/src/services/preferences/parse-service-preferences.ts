import { ServicePreferences, SERVICE_TIER_MAP, KNOWN_SERVICE_NAMES } from './tier-map';

/**
 * Parses the comma-separated `service_preferences` input into a
 * tier-to-implementation map. Throws on unknown service names or when
 * two names collide in the same tier.
 */
export const parseServicePreferences = (raw: string): ServicePreferences => {
  const trimmed = (raw || '').trim();
  if (trimmed === '') return {};

  const names = trimmed.split(',').map(s => s.trim()).filter(s => s !== '');
  const preferences: ServicePreferences = {};

  for (const name of names) {
    const tier = SERVICE_TIER_MAP[name];
    if (!tier) {
      throw new Error(
        `service_preferences: unknown service "${name}". Known services: ${KNOWN_SERVICE_NAMES.join(', ')}`
      );
    }
    const existing = preferences[tier];
    if (existing) {
      throw new Error(
        `service_preferences: collision in tier "${tier}" — both "${existing}" and "${name}" specified`
      );
    }
    preferences[tier] = name;
  }

  return preferences;
}
