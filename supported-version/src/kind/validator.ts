import { Kind } from "./kinds";

export type KindValidator = (kind: Kind, custom_versions?: string[]) => boolean;
