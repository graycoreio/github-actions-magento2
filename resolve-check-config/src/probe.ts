/**
 * A smoke-test probe the check-store workflow can run against a
 * running store. `page` does a GET / and asserts a non-empty title;
 * `graphql` POSTs a storeConfig query to /graphql. Probes are opt-in
 * per job because not every edition exposes every surface (e.g. the
 * mage-os minimal edition ships no GraphQL modules, so /graphql 404s).
 */
export const PROBES = ['page', 'graphql'] as const;

export type Probe = (typeof PROBES)[number];

export const isProbe = (value: unknown): value is Probe =>
  typeof value === 'string' && (PROBES as readonly string[]).includes(value);
