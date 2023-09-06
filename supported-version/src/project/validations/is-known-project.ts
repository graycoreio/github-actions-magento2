import { KNOWN_PROJECTS, Project } from '../projects';

export const isKnownProject = (project: Project): boolean => {
    if (!(project in KNOWN_PROJECTS)) {
        throw new Error(
            `Invalid project provided, supported projects are: ${Object.keys(KNOWN_PROJECTS).join(', ')}`
        )
    }
    
    return true;
}