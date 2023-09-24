import { getNextVersion } from "./get-next-version"

describe('getNextVersion', () => {
    it('should get the next nightly version for Magento Open Source', () => {
        expect(getNextVersion('https://upstream-nightly.mage-os.org', new Date('2022-09-29T17:47:00')), ).toEqual('@alpha');
    });

    it('should get the next nightly version for Mage-OS', () => {
        expect(getNextVersion('https://nightly.mage-os.org', new Date('2024-09-29T17:47:00')), ).toEqual('@alpha');
    });

    it('should handle the first of the month correctly', () => {
        expect(getNextVersion('https://upstream-nightly.mage-os.org', new Date('2022-01-01T17:47:00')), ).toEqual('@alpha');
    });
})