import { unifyNextPackageName } from "./unify-next-package-name";

describe('unifyNextPackageName', () => {
    it('should do nothing to an unknown package', () => {
        expect(unifyNextPackageName('test', 'https://repo.mage-os.org', new Date())).toEqual('test');
    });

    it('should do nothing to a next-available package at a non-next version', () => {
        expect(
            unifyNextPackageName('magento/product-community-edition:v2.4.5-p1', 'https://repo.mage-os.org', new Date())
        )
        .toEqual('magento/product-community-edition:v2.4.5-p1');
    });

    it('should do nothing to a next package at a next version on a repo that doesnt support that version', () => {
        expect(
            unifyNextPackageName('magento/product-community-edition:next', 'https://repo.mage-os.org', new Date())
        ).toEqual('magento/product-community-edition:next');
    });

    it('should convert the next version to the specific format of the repo that supports the next version', () => {
        expect(
            unifyNextPackageName('magento/product-community-edition:next', 'https://upstream-nightly.mage-os.org', new Date())
        ).toEqual('magento/product-community-edition:@alpha');
    });

    it('should convert the next version to the specific format of the repo that supports the next version', () => {
        expect(
            unifyNextPackageName('mage-os/product-community-edition:next', 'https://nightly.mage-os.org', new Date())
        ).toEqual('mage-os/product-community-edition:@alpha');
    });
});