/**
 * Acceptable arguments for version `kind`
 */
export const KNOWN_KINDS = {
    'currently-supported': true,
    'latest': true,
    'custom': true,
    'usable': true,
    'nightly': true,
    'recent': true,
    'all': true,
}

export type Kind = keyof typeof KNOWN_KINDS;