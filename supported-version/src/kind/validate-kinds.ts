import { customVersionsValidator } from "./validations/custom-versions-validator";
import { isKnownKind } from "./validations/is-known-kind";
import { KindValidator } from "./validator";

export const validateKind: KindValidator = (kind, custom_versions = null): boolean => {
    return validators.reduce((acc, el) => el(kind, custom_versions), true);
}

export const validators: KindValidator[] = [
    isKnownKind,
    customVersionsValidator,
];