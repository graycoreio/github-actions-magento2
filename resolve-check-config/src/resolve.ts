import { Kind, Matrix, RawConfig, ResolvedConfig } from './types';
import { resolveStoreConfig } from './kinds/store';
import { resolveExtensionConfig } from './kinds/extension';

/**
 * Dispatches to the per-kind resolver. Each kind owns its own list
 * of jobs and per-job defaults; this function just routes the call
 * and forwards the supported-version matrix.
 */
export const resolveConfig = (raw: RawConfig, kind: Kind, matrix: Matrix): ResolvedConfig => {
  if (kind === 'store') return resolveStoreConfig(raw, matrix);
  return resolveExtensionConfig(raw, matrix);
}
