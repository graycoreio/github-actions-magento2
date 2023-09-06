import {isKnownProject} from "./is-known-project";
import {Project} from "../projects";

describe('isKnownProject', () => {
  it('returns `true` for known projects', () => {
      expect(isKnownProject("mage-os")).toBe(true)
      expect(isKnownProject("magento-open-source")).toBe(true)
  });

  it('throws a message if for unknown projects', () => {
      expect(() => isKnownProject(<Project>"bingo")).toThrowError()
  });
})