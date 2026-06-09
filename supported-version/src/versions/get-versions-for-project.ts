import { validateProject } from "../project/validate-projects";
import { PackageMatrixVersion } from "../matrix/matrix-type";
import mageOsIndividual from './mage-os/individual.json';
import mageOsMinimalIndividual from './mage-os-minimal/individual.json';
import magentoOpenSourceIndividual from './magento-open-source/individual.json';
import mageOsComposite from './mage-os/composite.json';
import mageOsMinimalComposite from './mage-os-minimal/composite.json';
import magentoOpenSourceComposite from './magento-open-source/composite.json';

const individual = <Record<string, Record<string, PackageMatrixVersion>>><unknown>{
    'mage-os': mageOsIndividual,
    'mage-os-minimal': mageOsMinimalIndividual,
    'magento-open-source': magentoOpenSourceIndividual
}

const composite = <Record<string, Record<string, PackageMatrixVersion>>><unknown>{
    'mage-os': mageOsComposite,
    'mage-os-minimal': mageOsMinimalComposite,
    'magento-open-source': magentoOpenSourceComposite
}

export const getIndividualVersionsForProject = (project: string): Record<string, PackageMatrixVersion> => {
    validateProject(<any>project)
    if (individual[project] === undefined) {
        throw new Error(
            `Project "${project}" has no individual version specifications`
        )
    }

    return individual[project]
}

export const getCompositeVersionsForProject = (project: string): Record<string, PackageMatrixVersion> => {
    validateProject(<any>project)
    if (composite[project] === undefined) {
        throw new Error(
            `Project "${project}" has no composite version specifications`
        )
    }

    return composite[project]
}
