import { JobDefaults, Kind, Matrix, MatrixEntry, RawConfig, RawJobConfig, ResolvedConfig, ResolvedJobConfig, Services } from './types';
import { isTier, servicesForTiers, Tier } from './tier-map';
import { isProbe, Probe } from './probe';

/**
 * Normalizes the `probes` value from a job entry. Returns the
 * caller's list when present (validated), the job's default probe
 * list when omitted, or `undefined` for jobs that have no probe
 * concept. Throws if a job without probe defaults is given `probes`.
 */
export const normalizeProbes = (
  jobName: string,
  raw: unknown,
  defaults: readonly Probe[] | undefined,
): readonly Probe[] | undefined => {
  if (raw === undefined) {
    return defaults;
  }
  if (defaults === undefined) {
    throw new Error(`check-config: job "${jobName}" does not support "probes"`);
  }
  if (!Array.isArray(raw)) {
    throw new Error(`check-config: job "${jobName}".probes must be an array of probe names`);
  }
  const probes: Probe[] = [];
  for (const value of raw) {
    if (!isProbe(value)) {
      throw new Error(`check-config: job "${jobName}".probes contains unknown probe "${String(value)}"`);
    }
    probes.push(value);
  }
  return probes;
}

/**
 * Normalizes a single raw job entry to (enabled, tiers, probes).
 * Accepts the boolean shorthand and the object form. Validates the
 * shape, the `services` tier list, and the `probes` list; throws on
 * unexpected input. The caller supplies the per-job defaults, used
 * when `services`/`probes` are omitted from the entry. `probes` is
 * `undefined` for jobs that declare no probe defaults.
 */
export const normalizeJobEntry = (
  jobName: string,
  raw: RawJobConfig | undefined,
  defaults: JobDefaults,
): { enabled: boolean; tiers: readonly Tier[]; probes?: readonly Probe[] } => {
  if (raw === undefined) {
    return { enabled: true, tiers: defaults.services, probes: defaults.probes };
  }
  if (typeof raw === 'boolean') {
    return { enabled: raw, tiers: defaults.services, probes: defaults.probes };
  }
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new Error(
      `check-config: job "${jobName}" must be a boolean or an object (got ${Array.isArray(raw) ? 'array' : typeof raw})`
    );
  }
  const { enabled, services, probes } = raw as { enabled?: unknown; services?: unknown; probes?: unknown };
  const enabledValue = enabled === undefined ? true : Boolean(enabled);
  const resolvedProbes = normalizeProbes(jobName, probes, defaults.probes);

  if (services === undefined) {
    return { enabled: enabledValue, tiers: defaults.services, probes: resolvedProbes };
  }
  if (!Array.isArray(services)) {
    throw new Error(`check-config: job "${jobName}".services must be an array of tier names`);
  }
  const tiers: Tier[] = [];
  for (const value of services) {
    if (!isTier(value)) {
      throw new Error(`check-config: job "${jobName}".services contains unknown tier "${String(value)}"`);
    }
    tiers.push(value);
  }
  return { enabled: enabledValue, tiers, probes: resolvedProbes };
}

/**
 * Merges a job's `requiredServices` into the resolved tier list,
 * deduplicating while preserving order (required tiers first, then
 * the caller/default tiers in their original order).
 */
export const mergeRequiredTiers = (
  tiers: readonly Tier[],
  required: readonly Tier[] | undefined,
): readonly Tier[] => {
  if (!required || required.length === 0) return tiers;
  const seen = new Set<Tier>();
  const merged: Tier[] = [];
  for (const tier of required) {
    if (!seen.has(tier)) { seen.add(tier); merged.push(tier); }
  }
  for (const tier of tiers) {
    if (!seen.has(tier)) { seen.add(tier); merged.push(tier); }
  }
  return merged;
}

/**
 * Returns a copy of `entry` with `services` filtered to the concrete
 * names produced by expanding `tiers` through the tier-map. An empty
 * tier list yields `services: {}`.
 */
export const filterEntryServices = (entry: MatrixEntry, tiers: readonly Tier[]): MatrixEntry => {
  const keep = servicesForTiers(tiers);
  const original = entry.services ?? {};
  const filtered: Services = {};
  for (const [name, config] of Object.entries(original)) {
    if (keep.has(name)) filtered[name] = config;
  }
  return { ...entry, services: filtered };
}

/**
 * Per-job filter applied to the supported-version matrix: returns a
 * shallow clone with every entry's `services` narrowed to the tiers
 * the job needs.
 */
export const filterMatrixForJob = (matrix: Matrix, tiers: readonly Tier[]): Matrix => ({
  ...matrix,
  include: matrix.include.map(entry => filterEntryServices(entry, tiers)),
});

/**
 * Shared per-kind resolver: walks the per-kind job map and emits one
 * `ResolvedJobConfig` per known job. Caller-supplied jobs override
 * the defaults; jobs the caller omitted still appear, carrying the
 * default `enabled: true` and the default tier list. Rejects unknown
 * job names from the config so typos surface in CI.
 */
export const resolveJobs = (
  raw: RawConfig,
  kind: Kind,
  jobs: Record<string, JobDefaults>,
  matrix: Matrix,
): ResolvedConfig => {
  const rawJobs = raw.jobs ?? {};
  if (rawJobs === null || typeof rawJobs !== 'object' || Array.isArray(rawJobs)) {
    throw new Error(`check-config: \`jobs\` must be an object`);
  }
  for (const name of Object.keys(rawJobs)) {
    if (!(name in jobs)) {
      throw new Error(
        `check-config: unknown job "${name}" for kind "${kind}". Known jobs: ${Object.keys(jobs).join(', ')}`
      );
    }
  }

  const resolved: ResolvedConfig = {};
  for (const [name, defaults] of Object.entries(jobs)) {
    const entry = (rawJobs as Record<string, RawJobConfig>)[name];
    const { enabled, tiers, probes } = normalizeJobEntry(name, entry, defaults);
    const finalTiers = mergeRequiredTiers(tiers, defaults.requiredServices);
    const resolvedEntry: ResolvedJobConfig = {
      enabled,
      matrix: filterMatrixForJob(matrix, finalTiers),
    };
    if (probes !== undefined) {
      resolvedEntry.probes = [...probes];
    }
    resolved[name] = resolvedEntry;
  }
  return resolved;
}

/**
 * Parses a JSON string into a RawConfig with shape validation
 * (must be an object, not an array or primitive). Empty/whitespace
 * input yields an empty config.
 */
export const parseRawConfig = (jsonText: string): RawConfig => {
  const trimmed = jsonText.trim();
  if (trimmed === '') return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch (e) {
    throw new Error(`check-config: failed to parse JSON: ${(e as Error).message}`);
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`check-config: top-level value must be an object`);
  }
  return parsed as RawConfig;
}

/**
 * Parses the `matrix` action input. Validates the top-level shape
 * (must be an object with an `include` array) so a malformed input
 * fails with a clear message at the boundary.
 */
export const parseMatrixInput = (jsonText: string): Matrix => {
  const trimmed = jsonText.trim();
  if (trimmed === '') {
    throw new Error('check-config: `matrix` input is required');
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch (e) {
    throw new Error(`check-config: failed to parse \`matrix\` input as JSON: ${(e as Error).message}`);
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('check-config: `matrix` must be a JSON object');
  }
  const include = (parsed as Record<string, unknown>).include;
  if (!Array.isArray(include)) {
    throw new Error('check-config: `matrix.include` must be an array');
  }
  return parsed as Matrix;
}
