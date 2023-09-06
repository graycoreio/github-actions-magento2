import { validateProject } from "./validate-projects";

describe('validateProject', () => {
    it('returns `true` if its a valid project', () => {
        expect(validateProject("magento-open-source")).toBe(true);
        expect(validateProject("mage-os")).toBe(true);
    });
    
    it('throws a helpful exception if it is an invalid project', () => {
        expect(() => validateProject(<any>"quark")).toThrowError();
    })
})