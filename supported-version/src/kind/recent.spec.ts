import { Project } from "../project/projects";
import { getRecentVersions } from "./recent";

describe('recent for magento-open-source', () => {
    const project: Project = "magento-open-source";

    test.each([
        ['2024-12-31T00:00:00Z', 'End of 2024', [
            "magento/project-community-edition:2.4.4-p7",
            "magento/project-community-edition:2.4.4-p8",
            "magento/project-community-edition:2.4.4-p9",
            "magento/project-community-edition:2.4.4-p10",
            "magento/project-community-edition:2.4.4-p11",
            "magento/project-community-edition:2.4.5-p6",
            "magento/project-community-edition:2.4.5-p7",
            "magento/project-community-edition:2.4.5-p8",
            "magento/project-community-edition:2.4.5-p9",
            "magento/project-community-edition:2.4.5-p10",
            "magento/project-community-edition:2.4.6-p4",
            "magento/project-community-edition:2.4.6-p5",
            "magento/project-community-edition:2.4.6-p6",
            "magento/project-community-edition:2.4.6-p7",
            "magento/project-community-edition:2.4.6-p8",
            "magento/project-community-edition:2.4.7",
            "magento/project-community-edition:2.4.7-p1",
            "magento/project-community-edition:2.4.7-p2",
            "magento/project-community-edition:2.4.7-p3",
        ]],
        ['2025-04-08T00:00:00Z', 'The day Damien wrote a test.', [
            "magento/project-community-edition:2.4.4-p9",
            "magento/project-community-edition:2.4.4-p10",
            "magento/project-community-edition:2.4.4-p11",
            "magento/project-community-edition:2.4.4-p12",
            "magento/project-community-edition:2.4.5-p8",
            "magento/project-community-edition:2.4.5-p9",
            "magento/project-community-edition:2.4.5-p10",
            "magento/project-community-edition:2.4.5-p11",
            "magento/project-community-edition:2.4.6-p6",
            "magento/project-community-edition:2.4.6-p7",
            "magento/project-community-edition:2.4.6-p8",
            "magento/project-community-edition:2.4.6-p9",
            "magento/project-community-edition:2.4.7-p1",
            "magento/project-community-edition:2.4.7-p2",
            "magento/project-community-edition:2.4.7-p3",
            "magento/project-community-edition:2.4.7-p4",
        ]],
        ['2025-08-08T00:00:00Z', 'Day Before v2.4.5 EoL', [
            "magento/project-community-edition:2.4.4-p10",
            "magento/project-community-edition:2.4.4-p11",
            "magento/project-community-edition:2.4.4-p12",
            "magento/project-community-edition:2.4.4-p13",
            "magento/project-community-edition:2.4.5-p9",
            "magento/project-community-edition:2.4.5-p10",
            "magento/project-community-edition:2.4.5-p11",
            "magento/project-community-edition:2.4.5-p12",
            "magento/project-community-edition:2.4.6-p7",
            "magento/project-community-edition:2.4.6-p8",
            "magento/project-community-edition:2.4.6-p9",
            "magento/project-community-edition:2.4.6-p10",
            "magento/project-community-edition:2.4.7-p2",
            "magento/project-community-edition:2.4.7-p3",
            "magento/project-community-edition:2.4.7-p4",
            "magento/project-community-edition:2.4.7-p5",
            "magento/project-community-edition:2.4.8",
        ]],
    ])(
        'recent for %s',
        (date, description ,result) => {
            expect(
                getRecentVersions(project, new Date(date), '360d')
            ).toEqual(result);
        }
    );
})

