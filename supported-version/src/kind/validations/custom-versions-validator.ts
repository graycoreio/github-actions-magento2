import { KindValidator } from "../validator";

export const customVersionsValidator: KindValidator = (kind, customVersions) => {
    if(customVersions && kind !== 'custom') {
        throw new Error('`custom_versions` can only be used with kind `custom`'); 
    }
    return true;
}
