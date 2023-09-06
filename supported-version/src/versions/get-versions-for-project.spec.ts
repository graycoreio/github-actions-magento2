import { getIndividualVersionsForProject, getCompositeVersionsForProject } from "./get-versions-for-project";
import {Project} from "../project/projects";

describe('getIndividialVersionsForProject', () => {
    it('returns individual versions matrix for magento-open-source', () => {
        expect(Object.keys(getIndividualVersionsForProject("magento-open-source")).length).toBeGreaterThan(0)
        expect(Object.keys(getIndividualVersionsForProject("mage-os")).length).toBeGreaterThan(0)
    })
    
    it('throws error if no individual versions are specified for given project', () => {
        expect(() => getIndividualVersionsForProject(<Project>"ahsoka")).toThrowError()
    })
})

describe('getCompositeVersionsForProject', () => {
    it('returns composite versions matrix for magento-open-source', () => {
        expect(Object.keys(getCompositeVersionsForProject("magento-open-source")).length).toBeGreaterThan(0)
        expect(Object.keys(getCompositeVersionsForProject("mage-os")).length).toBeGreaterThan(0)
    })

    it('throws error if no composite versions are specified for given project', () => {
        expect(() => getCompositeVersionsForProject(<Project>"spock")).toThrowError()
    })
})