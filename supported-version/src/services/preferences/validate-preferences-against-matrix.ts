import { PackageMatrixVersion } from '../../matrix/matrix-type';
import { ServicePreferences, Tier, TIER_IMPLEMENTATIONS } from './tier-map';

/**
 * Verifies that every preferenced implementation is supported by every
 * matrix entry. Collects all violations and throws a single
 * consolidated error.
 */
export const validatePreferencesAgainstMatrix = (
  preferences: ServicePreferences,
  entries: PackageMatrixVersion[]
): void => {
  const errors: string[] = [];

  for (const tierKey of Object.keys(preferences) as Tier[]) {
    const implementation = preferences[tierKey]!;
    const tierImplementations = TIER_IMPLEMENTATIONS[tierKey];

    const offenders: { version: string; supported: string[] }[] = [];
    for (const entry of entries) {
      const value = entry[implementation as keyof PackageMatrixVersion];
      const isSupported = typeof value === 'string' && value.trim() !== '';
      if (!isSupported) {
        const supported = tierImplementations.filter(name => {
          const v = entry[name as keyof PackageMatrixVersion];
          return typeof v === 'string' && v.trim() !== '';
        });
        offenders.push({ version: entry.version, supported });
      }
    }

    if (offenders.length > 0) {
      const list = offenders
        .map(o => `  - magento ${o.version} (supported: ${o.supported.length > 0 ? o.supported.join(', ') : '<none>'})`)
        .join('\n');
      errors.push(`service_preferences "${implementation}" is not satisfied for:\n${list}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.join('\n\n'));
  }
}
