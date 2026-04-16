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

    it('should handle numeric composer versions', () => {
        mockGetVersions.mockReturnValue({
            'magento/project-community-edition:2.3.7-p3': { composer: 1 },
            'magento/project-community-edition:2.4.6': { composer: 2 }
        });

        const versions = getUsableVersions(project);
        expect(versions).not.toContain('magento/project-community-edition:2.3.7-p3');
        expect(versions).toContain('magento/project-community-edition:2.4.6');
    });

    it('should filter out uninstallable Magento 2.4.2.x and 2.4.3.x versions', () => {
        mockGetVersions.mockReturnValue({
            'magento/project-community-edition:2.4.2': { composer: '2.2.21' },
            'magento/project-community-edition:2.4.2-p1': { composer: '2.2.21' },
            'magento/project-community-edition:2.4.2-p2': { composer: '2.2.21' },
            'magento/project-community-edition:2.4.3': { composer: '2.2.21' },
            'magento/project-community-edition:2.4.3-p1': { composer: '2.2.21' },
            'magento/project-community-edition:2.4.3-p2': { composer: '2.2.21' },
            'magento/project-community-edition:2.4.3-p3': { composer: '2.2.21' },
            'magento/project-community-edition:2.4.4': { composer: '2.2.21' }
        });

        const versions = getUsableVersions(project);
        expect(versions).not.toContain('magento/project-community-edition:2.4.2');
        expect(versions).not.toContain('magento/project-community-edition:2.4.2-p1');
        expect(versions).not.toContain('magento/project-community-edition:2.4.2-p2');
        expect(versions).not.toContain('magento/project-community-edition:2.4.3');
        expect(versions).not.toContain('magento/project-community-edition:2.4.3-p1');
        expect(versions).not.toContain('magento/project-community-edition:2.4.3-p2');
        expect(versions).not.toContain('magento/project-community-edition:2.4.3-p3');
        expect(versions).toContain('magento/project-community-edition:2.4.4');
    });
});

describe('getUsableVersions for mage-os', () => {
    const project: Project = "mage-os";

    beforeEach(() => {
        mockGetVersions.mockReset();
    });

    it('should filter out mage-os 2.2.1 due to security advisory', () => {
        mockGetVersions.mockReturnValue({
            'mage-os/project-community-edition:2.2.0': { composer: '2.9.3' },
            'mage-os/project-community-edition:2.2.1': { composer: '2.9.3' }
        });

        const versions = getUsableVersions(project);
        expect(versions).not.toContain('mage-os/project-community-edition:2.2.1');
        expect(versions).toContain('mage-os/project-community-edition:2.2.0');
    });
});
