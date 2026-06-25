import { Tier } from './tier-map';
import { Probe } from './probe';

/**
 * Which reusable workflow a config belongs to. Selects the known-job
 * list used for validation and the default config path.
 */
export type Kind = 'store' | 'extension';

/**
 * A single service container definition from supported-version's
 * matrix output. We don't model the inner shape here — we just
 * preserve unknown keys when filtering.
 */
export interface ServiceConfig {
  image: string;
  env?: Record<string, string>;
  ports?: string[];
  options?: string;
  volumes?: string[];
}

export interface Services {
  [serviceName: string]: ServiceConfig;
}

/**
 * One row of supported-version's matrix. Carries the PHP/Composer/etc
 * coordinates plus the concrete `services` map this job should bring
 * up. We type the known fields supported-version emits and allow
 * extras to pass through untouched.
 */
export interface MatrixEntry {
  services?: Services;
  [key: string]: unknown;
}

/**
 * The matrix shape emitted by supported-version, suitable for
 * `strategy.matrix` in GitHub Actions.
 */
export interface Matrix {
  include: MatrixEntry[];
  [key: string]: unknown;
}

/**
 * Per-job static defaults declared by each kind module.
 *
 * `services` is the tier list used when the caller's config does not
 * override it — these tiers are user-toggleable through the schema.
 *
 * `requiredServices` is always merged in on top of the resolved list,
 * regardless of caller overrides. Use it for tiers a job structurally
 * cannot run without (e.g. mysql for a running store smoke-test) and
 * which therefore should not appear in the user-facing schema enum.
 *
 * `probes` is the default smoke-test probe list used when the caller
 * does not override it. Only jobs that declare it support the
 * `probes` config key; omit it for jobs that have no probe concept.
 * `enabledByDefault` controls the `enabled` value emitted when the
 * caller's config omits the job entirely. Defaults to `true`; set
 * `false` for opt-in jobs.
 */
export interface JobDefaults {
  services: readonly Tier[];
  requiredServices?: readonly Tier[];
  probes?: readonly Probe[];
  enabledByDefault?: boolean;
}

/**
 * Resolved per-job output. `enabled` mirrors the input boolean (or
 * `enabled` key); `matrix` is supported-version's matrix with each
 * entry's `services` filtered to the tiers this job needs.
 */
export interface ResolvedJobConfig {
  enabled: boolean;
  matrix: Matrix;
  probes?: Probe[];
  [key: string]: unknown;
}

/**
 * Map of job-name -> resolved config. Keys are exactly the job names
 * declared by the kind module (omitted-by-caller jobs still appear,
 * carrying defaults so the consumer's `if:` guard works uniformly).
 */
export interface ResolvedConfig {
  [jobName: string]: ResolvedJobConfig;
}

/**
 * Shape of a single per-job entry in the user's JSON config file.
 * - `true` / `false`: shorthand for `{ enabled: true|false }`
 * - object: explicit enabled flag plus an optional tier list under
 *   `services` and an optional probe list under `probes` (both
 *   validated against the per-kind schema).
 */
export type RawJobConfig =
  | boolean
  | { enabled?: boolean; services?: string[]; probes?: string[]; [key: string]: unknown };

/**
 * Top-level shape of the user's JSON config file. Job toggles live
 * under `jobs`; the rest of the top level is reserved for future
 * global keys.
 */
export interface RawConfig {
  jobs?: { [jobName: string]: RawJobConfig };
  [key: string]: unknown;
}
