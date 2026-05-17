import { assertKind, isKind } from './kind';

describe('isKind / assertKind', () => {
  it('accepts "store"', () => {
    expect(isKind('store')).toBe(true);
    expect(assertKind('store')).toBe('store');
  });

  it('accepts "extension"', () => {
    expect(isKind('extension')).toBe(true);
    expect(assertKind('extension')).toBe('extension');
  });

  it('rejects other strings', () => {
    expect(isKind('taco')).toBe(false);
    expect(() => assertKind('taco')).toThrowError(/`kind` must be 'store' or 'extension'/);
  });

  it('rejects empty input', () => {
    expect(() => assertKind('')).toThrowError(/`kind` must be 'store' or 'extension'/);
  });

  it('rejects non-string input', () => {
    expect(() => assertKind(undefined)).toThrowError(/`kind` must be 'store' or 'extension'/);
  });
});
