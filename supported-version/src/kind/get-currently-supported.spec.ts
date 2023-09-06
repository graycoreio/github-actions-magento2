import { getCurrentlySupportedVersions } from "./get-currently-supported";
import { Project } from "../project/projects";

describe('getCurrentlySupportedVersions for magento-open-source', () => {
    const project: Project = "magento-open-source";
    
    it('should say that v2.4.0 is not supported in 2025', () => {
        const date: Date = new Date('2025-01-01T00:00:00Z');
        expect(getCurrentlySupportedVersions(project, date)).not.toContain('magento/project-community-edition:2.4.0');
    });

    test.each([
        ['2023-01-01T00:00:00Z', 'First day of 2023', [
            'magento/project-community-edition:2.4.4-p2',
            'magento/project-community-edition:2.4.5-p1', 
        ]],
        ['2024-01-01T00:00:00Z', 'First day of 2024', [
            'magento/project-community-edition:2.4.4-p5',
            'magento/project-community-edition:2.4.5-p4',
            'magento/project-community-edition:2.4.6-p2',
        ]],
        ['2024-12-31T00:00:00Z', 'End of 2024', [
            'magento/project-community-edition:2.4.4-p5',
            'magento/project-community-edition:2.4.5-p4',
            'magento/project-community-edition:2.4.6-p2',
        ]],
        ['2025-08-08T00:00:00Z', 'Day Before v2.4.5 EoL', [
            'magento/project-community-edition:2.4.5-p4',
            'magento/project-community-edition:2.4.6-p2',
        ]],
        ['2023-03-14T00:00:00Z', 'Day of v2.4.6 Release', [
            'magento/project-community-edition:2.4.4-p2',
            'magento/project-community-edition:2.4.5-p1'
        ]],
        ['2023-03-15T00:00:00Z', 'Day after v2.4.6 Release', [
            'magento/project-community-edition:2.4.4-p3',
            'magento/project-community-edition:2.4.5-p2',
            'magento/project-community-edition:2.4.6'
        ]],
        ['2025-08-09T00:00:00Z', 'Day of v2.4.5 EoL', [
            'magento/project-community-edition:2.4.5-p4',
            'magento/project-community-edition:2.4.6-p2',
        ]],
        ['2025-08-10T00:00:00Z', 'Day after v2.4.5 EoL', [
            'magento/project-community-edition:2.4.6-p2',
        ]],
        ['2026-03-15T00:00:00Z', 'Day after v2.4.6 EoL', [
        ]],
    ])(
        'supportedVersions for %s',
        (date, description ,result) => {
            expect(
                getCurrentlySupportedVersions(project, new Date(date))
            ).toEqual(result);
        }
    );
})

describe('getCurrentlySupportedVersions for mage-os', () => {
    const project: Project = "mage-os";

    it('should say that v1.0.0 is not supported in 2027', () => {
        const date: Date = new Date('2027-01-01T00:00:00Z');
        expect(getCurrentlySupportedVersions(project, date)).not.toContain('mage-os/project-community-edition:1.0.0');
    });

    test.each([
        ['2023-01-01T00:00:00Z', 'First day of 2023', [
        ]],
        ['2024-01-01T00:00:00Z', 'First day of 2024', [
            'mage-os/project-community-edition:1.0.0',
        ]],
        ])(
        'supportedVersions for %s',
        (date, description ,result) => {
            expect(
                getCurrentlySupportedVersions(project, new Date(date))
            ).toEqual(result);
        }
    );
})