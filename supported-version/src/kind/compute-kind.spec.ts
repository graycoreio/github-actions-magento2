import { isValidKind } from "./compute-kind";

describe('isValidKind', () => {
    it('returns `true` if its a valid kind', () => {
        expect(isValidKind("latest")).toBe(true);
    });

    it('returns `false` if it is not a valid kind', () => {
        expect(isValidKind("taco")).toBe(false);
    })
})