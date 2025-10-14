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
        ['2023-03-14T00:00:00Z', 'Day of v2.4.6 Release', [
            'magento/project-community-edition:2.4.4-p2',
            'magento/project-community-edition:2.4.5-p1'
        ]],
        ['2023-03-15T00:00:00Z', 'Day after v2.4.6 Release', [
            'magento/project-community-edition:2.4.4-p3',
            'magento/project-community-edition:2.4.5-p2',
            'magento/project-community-edition:2.4.6'
        ]],
        ['2023-10-09T00:00:00Z', 'Day before v2.4.6-p3 Release', [
            'magento/project-community-edition:2.4.4-p5',
            'magento/project-community-edition:2.4.5-p4',
            'magento/project-community-edition:2.4.6-p2'
        ]],
        ['2023-10-11T00:00:00Z', 'Day od v2.4.6-p3 Release', [
            'magento/project-community-edition:2.4.4-p6',
            'magento/project-community-edition:2.4.5-p5',
            'magento/project-community-edition:2.4.6-p3'
        ]],
        ['2024-01-01T00:00:00Z', 'First day of 2024', [
            'magento/project-community-edition:2.4.4-p6',
            'magento/project-community-edition:2.4.5-p5',
            'magento/project-community-edition:2.4.6-p3',
        ]],
        ['2024-12-31T00:00:00Z', 'End of 2024', [
            'magento/project-community-edition:2.4.4-p11',
            'magento/project-community-edition:2.4.5-p10',
            'magento/project-community-edition:2.4.6-p8',
            'magento/project-community-edition:2.4.7-p3',
        ]],
        ['2025-06-09T00:00:00Z', 'Day before new patch releases', [
            'magento/project-community-edition:2.4.5-p12',
            'magento/project-community-edition:2.4.6-p10',
            'magento/project-community-edition:2.4.7-p5',
            'magento/project-community-edition:2.4.8',
        ]],
        ['2025-06-10T00:00:01Z', 'Day of new patch releases', [
            'magento/project-community-edition:2.4.5-p13',
            'magento/project-community-edition:2.4.6-p11',
            'magento/project-community-edition:2.4.7-p6',
            'magento/project-community-edition:2.4.8-p1',
        ]],
        ['2025-08-11T00:00:00Z', 'Day Before v2.4.5 EoL', [
            'magento/project-community-edition:2.4.5-p13',
            'magento/project-community-edition:2.4.6-p11',
            'magento/project-community-edition:2.4.7-p6',
            'magento/project-community-edition:2.4.8-p1',
        ]],
        ['2025-08-12T00:00:00Z', 'Day of v2.4.5 EoL', [
            'magento/project-community-edition:2.4.5-p13',
            'magento/project-community-edition:2.4.6-p11',
            'magento/project-community-edition:2.4.7-p6',
            'magento/project-community-edition:2.4.8-p1',
        ]],
        ['2025-08-14T00:00:00Z', 'Day after August 2025 patch release', [
            'magento/project-community-edition:2.4.6-p12',
            'magento/project-community-edition:2.4.7-p7',
            'magento/project-community-edition:2.4.8-p2',
        ]],
        ['2025-12-31T00:00:00Z', 'End of 2025', [
            'magento/project-community-edition:2.4.6-p13',
            'magento/project-community-edition:2.4.7-p8',
            'magento/project-community-edition:2.4.8-p3',
        ]],
        ['2026-03-15T00:00:00Z', 'Day after v2.4.6 EoL', [
            'magento/project-community-edition:2.4.7-p8',
            'magento/project-community-edition:2.4.8-p3',
        ]],
        ['2027-04-09T00:00:00Z', 'Day of v2.4.7 EoL', [
            'magento/project-community-edition:2.4.7-p8',
            'magento/project-community-edition:2.4.8-p3',
        ]],
        ['2027-04-10T00:00:00Z', 'Day after v2.4.7 EoL', [
            'magento/project-community-edition:2.4.8-p3',
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
        ['2023-10-10T15:00:00Z', 'Release of 1.0.0', [
            'mage-os/project-community-edition:1.0.0',
        ]],
        ['2024-01-01T00:00:00Z', 'First day of 2024', [
            'mage-os/project-community-edition:1.0.1',
        ]],
        ['2024-07-17T00:00:00Z', 'Day before release of 1.0.2', [
            'mage-os/project-community-edition:1.0.1',
        ]],
        ['2024-07-18T00:00:01Z', 'Release of 1.0.2', [
            'mage-os/project-community-edition:1.0.2',
        ]],
        ['2025-04-22T00:00:01Z', 'Release of 1.1.1', [
            'mage-os/project-community-edition:1.1.1',
        ]],
        ['2025-08-13T00:00:01Z', 'Release of 1.3.0', [
            'mage-os/project-community-edition:1.3.0',
        ]],
        ['2025-09-09T00:00:01Z', 'Release of 1.3.1', [
            'mage-os/project-community-edition:1.3.1',
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
