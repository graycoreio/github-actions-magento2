import { getNextVersion } from "./get-next-version"

describe('getNextVersion', () => {

    it('should get the next nightly version for MageOS', () => {
        expect(getNextVersion('https://upstream-mirror.mage-os.org', new Date('2022-09-29T17:47:00')), ).toEqual('*');
    });

    it('should handle the first of the month correctly', () => {
        expect(getNextVersion('https://upstream-mirror.mage-os.org', new Date('2022-01-01T17:47:00')), ).toEqual('*');
    });
})