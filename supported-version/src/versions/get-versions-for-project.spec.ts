import { getIndividualVersionsForProject, getCompositeVersionsForProject } from "./get-versions-for-project";
import {Project} from "../project/projects";

describe('getIndividialVersionsForProject', () => {
    it('returns individual versions matrix for magento-open-source', () => {
        expect(Object.keys(getIndividualVersionsForProject("magento-open-source")).length).toBeGreaterThan(0)
        expect(Object.keys(getIndividualVersionsForProject("mage-os")).length).toBeGreaterThan(0)
        expect(Object.keys(getIndividualVersionsForProject("mage-os-minimal")).length).toBeGreaterThan(0)
    })

    it('throws error if no individual versions are specified for given project', () => {
        expect(() => getIndividualVersionsForProject(<Project>"ahsoka")).toThrow()
    })
})

describe('getCompositeVersionsForProject', () => {
    it('returns composite versions matrix for magento-open-source', () => {
        expect(Object.keys(getCompositeVersionsForProject("magento-open-source")).length).toBeGreaterThan(0)
        expect(Object.keys(getCompositeVersionsForProject("mage-os")).length).toBeGreaterThan(0)
        expect(Object.keys(getCompositeVersionsForProject("mage-os-minimal")).length).toBeGreaterThan(0)
    })

    it('throws error if no composite versions are specified for given project', () => {
        expect(() => getCompositeVersionsForProject(<Project>"spock")).toThrow()
    })
})

describe('runner os for MariaDB 11+ versions', () => {
    // The mysqldump client on ubuntu-latest (MySQL 8.4) fails to dump MariaDB 11+ databases in the Magento
    // integration test setup, because the test framework only passes --column-statistics=0 to mysqldump 8.0
    // and MariaDB 11+ no longer reports a 5.5.5- version prefix.
    // See https://github.com/mage-os/github-actions/issues/399
    const projects: Project[] = ["mage-os", "mage-os-minimal", "magento-open-source"]
    const mariadb11Entries = projects.flatMap(project => Object.entries({
        ...getIndividualVersionsForProject(project),
        ...getCompositeVersionsForProject(project)
    })).filter(([, entry]) => /^mariadb:(1[1-9]|[2-9]\d)/.test(entry.mariadb ?? ''))

    it('has MariaDB 11+ versions', () => {
        expect(mariadb11Entries.length).toBeGreaterThan(0)
    })

    it.each(mariadb11Entries)('%s runs on ubuntu-24.04', (_, entry) => {
        expect(entry.os).toBe('ubuntu-24.04')
    })
})
