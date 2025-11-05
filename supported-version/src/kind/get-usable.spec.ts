import { getUsableVersions } from "./get-usable";
import { Project } from "../project/projects";
import { getIndividualVersionsForProject } from "../versions/get-versions-for-project";

// Mock the dependencies
jest.mock('../versions/get-versions-for-project');
const mockGetVersions = getIndividualVersionsForProject as jest.Mock;

describe('getUsableVersions for magento-open-source', () => {
    const project: Project = "magento-open-source";

    beforeEach(() => {
        mockGetVersions.mockReset();
    });

    it('should return an array of versions', () => {
        mockGetVersions.mockReturnValue({
            'magento/project-community-edition:2.4.6': { composer: '2.2.0' }
        });
        expect(Array.isArray(getUsableVersions(project))).toBe(true);
    });

    it('should filter out versions with composer < 2.0.0', () => {
        mockGetVersions.mockReturnValue({
            'magento/project-community-edition:2.4.5': { composer: '1.9.0' },
            'magento/project-community-edition:2.4.6': { composer: '2.2.0' }
        });
        
        const versions = getUsableVersions(project);
        expect(versions).not.toContain('magento/project-community-edition:2.4.5');
        expect(versions).toContain('magento/project-community-edition:2.4.6');
    });

    it('should handle composer version equal to 2.0.0', () => {
        mockGetVersions.mockReturnValue({
            'magento/project-community-edition:2.4.6': { composer: '2.0.0' }
        });
        
        const versions = getUsableVersions(project);
        expect(versions).toContain('magento/project-community-edition:2.4.6');
    });
});
