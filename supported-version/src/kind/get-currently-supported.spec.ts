import { getCurrentlySupportedVersions } from "./get-currently-supported";

describe('getCurrentlySupportedVersions', () => {
    it('should say that v2.4.0 is not supported in 2025', () => {
        const date: Date = new Date('2025-01-01T00:00:00Z');
        expect(getCurrentlySupportedVersions(date)).not.toContain('magento/project-community-edition:2.4.0');
    });

    test.each([
        //TODO: add a release-date so that past dates do not incur non-contemporaneous
        // versions.
        ['2023-01-01T00:00:00Z', 'First day of 2023', [
            'magento/project-community-edition:2.4.4-p2',
            'magento/project-community-edition:2.4.4-p3',
            'magento/project-community-edition:2.4.4-p4',
            'magento/project-community-edition:2.4.4-p5',
            'magento/project-community-edition:2.4.5-p1',
            'magento/project-community-edition:2.4.5-p2',
            'magento/project-community-edition:2.4.5-p3', 
            'magento/project-community-edition:2.4.5-p4', 
            'magento/project-community-edition:2.4.6',
            'magento/project-community-edition:2.4.6-p1',
            'magento/project-community-edition:2.4.6-p2',
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
                getCurrentlySupportedVersions(new Date(date))
            ).toEqual(result);
        }
    );
})