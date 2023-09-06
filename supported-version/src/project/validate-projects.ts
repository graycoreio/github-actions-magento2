import { isKnownProject } from './validations/is-known-project';
import { ProjectValidator } from "./validator";

export const validateProject: ProjectValidator = (project): boolean => {
    return isKnownProject(project)
}