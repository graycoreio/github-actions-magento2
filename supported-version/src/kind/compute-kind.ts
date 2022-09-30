/**
 * Acceptable arguments for version `kind`
 */
export const KNOWN_KINDS = {
    'currently-supported': true,
    'latest': true,
    'custom': true,
    'nightly': true,
    'nightly-now': true,
    'all': true,
}

export const isValidKind = (kind: string): boolean => {
    return kind in KNOWN_KINDS;
};

export const validateOrError = (kind: string): true =>  {
    if(isValidKind(kind)){
        return true;   
    }
    else {
        throw new Error(`Invalid kind provided, supported kinds are: ${Object.keys(KNOWN_KINDS).join(', ')}`);
    }
}