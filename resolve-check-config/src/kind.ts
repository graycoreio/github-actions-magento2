import { Kind } from './types';

/**
 * Type guard for the `kind` input. Use this when you have an
 * `unknown` value (e.g. from `core.getInput`) and want to narrow it
 * without throwing.
 */
export const isKind = (value: unknown): value is Kind =>
  value === 'store' || value === 'extension';

/**
 * Narrows an `unknown` (typically the raw action input) to `Kind` or
 * throws a user-facing error naming the accepted values. Prefer this
 * at the action boundary so a bad `kind` fails fast with a clear
 * message rather than later as an obscure dispatch miss.
 */
export const assertKind = (value: unknown): Kind => {
  if (!isKind(value)) {
    throw new Error(`check-config: \`kind\` must be 'store' or 'extension' (got ${JSON.stringify(value)})`);
  }
  return value;
}
