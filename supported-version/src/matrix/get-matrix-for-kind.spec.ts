import { getMatrixForKind } from "./get-matrix-for-kind";


describe('getMatrixForKind for mage-os', () => {
    const project = "mage-os";
    
    it('returns a matrix for `latest`', () => {
        const result = getMatrixForKind("latest", project);

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });

    it('returns a matrix for `currently-supported`', () => {
        const result = getMatrixForKind("currently-supported", project);

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });

    it('returns a matrix for `all`', () => {
        const result = getMatrixForKind("all", project);

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });

    it('returns a matrix for valid `custom`', () => {
        const result = getMatrixForKind("custom", project, "mage-os/project-community-edition:1.0.0");

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
        expect(result.magento[0]).toBe('mage-os/project-community-edition:1.0.0');
    });

    it('returns a matrix nightly`', () => {
        const result = getMatrixForKind("nightly", project);
        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
        expect(result.magento[0]).toBe('mage-os/project-community-edition:@alpha');
    });

    it('returns a matrix for the next release when using `nightly`', () => {
        const result = getMatrixForKind("nightly", project, "mage-os/project-community-edition:next");

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });
    
    it('errors for invalid `custom``', () => {
        expect(() => getMatrixForKind("custom", project)).toThrowError();
    });
})


describe('getMatrixForKind for magento-open-source', () => {
    const project = "magento-open-source";

    it('returns a matrix nightly`', () => {
        const result = getMatrixForKind("nightly", project);
        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });

    it('returns a matrix for `latest`', () => {
        const result = getMatrixForKind("latest", project);

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });

    it('returns a matrix for `currently-supported`', () => {
        const result = getMatrixForKind("currently-supported", project);

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });

    it('returns a matrix for `all`', () => {
        const result = getMatrixForKind("all", project);

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });

    it('returns a matrix for valid `custom`', () => {
        const result = getMatrixForKind("custom", project, "magento/project-community-edition:2.3.7-p3");

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });

    it('returns a matrix for the next release when using `nightly`', () => {
        const result = getMatrixForKind("nightly", project, "magento/project-community-edition:next");

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });

    it('returns a matrix for valid multiple `custom`', () => {
        const result = getMatrixForKind("custom", project, "magento/project-community-edition:2.3.7-p3,magento/project-community-edition:2.4.0");

        expect(result.magento).toBeDefined();
        expect(result.include).toBeDefined();
    });

    it('errors for invalid `custom``', () => {
        expect(() => getMatrixForKind("custom", project)).toThrowError();
    });
})