import { getMatrixForKind } from "./get-matrix-for-kind";

describe('getMatrixForKind', () => {
    it('returns a matrix for `latest`', () => {
        const result = getMatrixForKind("latest");

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });

    it('returns a matrix for `currently-supported`', () => {
        const result = getMatrixForKind("currently-supported");

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });

    it('returns a matrix for `all`', () => {
        const result = getMatrixForKind("all");

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });

    it('returns a matrix for valid `custom`', () => {
        const result = getMatrixForKind("custom", "magento/project-community-edition:2.3.7-p3");

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });

    it('returns a matrix for the next release when using `nightly`', () => {
        const result = getMatrixForKind("nightly", "magento/project-community-edition:next");

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });

    it('returns a matrix for valid multiple `custom`', () => {
        const result = getMatrixForKind("custom", "magento/project-community-edition:2.3.7-p3,magento/project-community-edition:2.4.0");

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });

    it('errors for invalid `custom``', () => {
        expect(() => getMatrixForKind("custom")).toThrowError();
    });
})