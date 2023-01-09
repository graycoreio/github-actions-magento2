import { getCurrentlySupportedVersions } from "./get-currently-supported";

describe('getCurrentlySupportedVersions', () => {
    it('should say that v2.4.0 is not supported in 2025', () => {
        const date: Date = new Date('2025-01-01T00:00:00Z');
        expect(getCurrentlySupportedVersions(date)).not.toContain('magento/project-community-edition:2.4.0');
    });

    it('should say that v2.4.5 is supported in 2023 and most of 2024.', () => {
        const firstDayOf2023: Date = new Date('2023-01-01T00:00:00Z');
        const firstDayOf2024: Date = new Date('2024-01-01T00:00:00Z');
        const lastDayOf2024: Date = new Date('2024-12-31T00:00:00Z');
        const dayBeforeEol: Date = new Date('2024-11-24T00:00:00Z');
        const dayOfEol: Date = new Date('2024-11-25T00:00:00Z');
        const dayAfterEol: Date = new Date('2024-11-26T00:00:00Z');

        expect(getCurrentlySupportedVersions(firstDayOf2023)).toContain('magento/project-community-edition:2.4.5-p1');
        expect(getCurrentlySupportedVersions(firstDayOf2024)).toContain('magento/project-community-edition:2.4.5-p1');
        expect(getCurrentlySupportedVersions(lastDayOf2024)).not.toContain('magento/project-community-edition:2.4.5-p1');
        expect(getCurrentlySupportedVersions(dayBeforeEol)).toContain('magento/project-community-edition:2.4.5-p1');
        expect(getCurrentlySupportedVersions(dayOfEol)).toContain('magento/project-community-edition:2.4.5-p1');
        expect(getCurrentlySupportedVersions(dayAfterEol)).not.toContain('magento/project-community-edition:2.4.5-p1');
    })
})