import { KNOWN_KINDS, Kind } from "../kinds";

export const isKnownKind = (kind: Kind): boolean => {
    if(!(kind in KNOWN_KINDS)) {
        throw new Error(
            `Invalid kind provided, supported kinds are: ${Object.keys(KNOWN_KINDS).join(', ')}`
        );
    }
    
    return true;
};
