import { resolveJobs } from '../parse';
import { JobDefaults, Matrix, RawConfig, ResolvedConfig } from '../types';

/**
 * Per-job defaults for the `check-store.yaml` reusable workflow.
 * Edit this map when a job is added, removed, or renamed in that
 * workflow — keys are validated against caller config and the values
 * supply the default tier list used when the caller doesn't override
 * `services` themselves.
 */
export const STORE_JOBS: Record<string, JobDefaults> = {
  'unit-test': { services: [] },
  'coding-standard': { services: [] },
  'smoke-test': {
    services: [],
    requiredServices: ['db', 'search', 'queue', 'cache', 'web'],
    probes: ['page'],
  },
};

export const KNOWN_JOBS_STORE: readonly string[] = Object.keys(STORE_JOBS);

/**
 * Resolves a parsed config file + supported-version matrix against
 * the check-store job list. Thin wrapper that binds the kind and the
 * per-job defaults so callers don't repeat the wiring.
 */
export const resolveStoreConfig = (raw: RawConfig, matrix: Matrix): ResolvedConfig =>
  resolveJobs(raw, 'store', STORE_JOBS, matrix);
