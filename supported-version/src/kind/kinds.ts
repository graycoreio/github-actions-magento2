/**
 * Acceptable arguments for version `kind`
 */
export const KNOWN_KINDS = {
    'currently-supported': true,
    'latest': true,
    'custom': true,
    'nightly': true,
    'all': true,
}

export type Kind = keyof typeof KNOWN_KINDS;