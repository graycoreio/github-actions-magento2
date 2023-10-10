import { validateKind } from "./validate-kinds";

describe('validateKind', () => {
    it('returns `true` if its a valid kind', () => {
        expect(validateKind("latest")).toBe(true);
    });

    it('throws a helpful exception if its an invalid kind', () => {
        expect(() => validateKind(<any>"taco")).toThrowError();
    })

    it('throws a helpful exception if custom versions are provided with the wrong kind', () => {
        expect(() => validateKind(<any>"latest", [])).toThrowError();
    })
    
    it('returns `true` for kind `custom` with a custom versions', () => {
        expect(validateKind("custom", "mage-os/project-community-edition:1.0.0".split(","))).toBe(true);
    })
})