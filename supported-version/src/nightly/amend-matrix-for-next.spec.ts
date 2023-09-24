import { amendMatrixForNext } from "./amend-matrix-for-next";

describe('amendMatrixForNext', () => {
    it('should amend the "next" versions listed in the matrix output for the given repo', () => {
        expect(
            amendMatrixForNext(
                { 
                    include: [
                        {
                            "magento": "magento/project-community-edition:next",
                            "php": 8.2,
                            "composer": "2",
                            "mysql": "mysql:8.0",
                            "elasticsearch": "elasticsearch:8.5.3",
                            "rabbitmq": "rabbitmq:3.11-management",
                            "redis": "redis:7.0",
                            "varnish": "varnish:7.3",
                            "nginx": "nginx:1.22",
                            "os": "ubuntu-latest",
                            "release": "2023-09-15T00:00:00+0000",
                            "eol": "2026-09-15T00:00:00+0000"
                        }
                    ],
                    magento: ["magento/project-community-edition:next"]
                }, 
                "https://upstream-nightly.mage-os.org", 
                new Date()
                )
        ).toEqual(
            { 
                include: [
                    {
                        "magento": "magento/project-community-edition:@alpha",
                        "php": 8.2,
                        "composer": "2",
                        "mysql": "mysql:8.0",
                        "elasticsearch": "elasticsearch:8.5.3",
                        "rabbitmq": "rabbitmq:3.11-management",
                        "redis": "redis:7.0",
                        "varnish": "varnish:7.3",
                        "nginx": "nginx:1.22",
                        "os": "ubuntu-latest",
                        "release": "2023-09-15T00:00:00+0000",
                        "eol": "2026-09-15T00:00:00+0000"
                    }
                ],
                magento: ["magento/project-community-edition:@alpha"]
            }
        )
    });

    it('should should do nothing to matrixes that contain no next versions', () => {
        expect(
            amendMatrixForNext(
                { 
                    include: [
                        {
                            "magento": "magento/project-community-edition:v2.4.6-p2",
                            "php": 8.2,
                            "composer": "2",
                            "mysql": "mysql:8.0",
                            "elasticsearch": "elasticsearch:8.5.3",
                            "rabbitmq": "rabbitmq:3.11-management",
                            "redis": "redis:7.0",
                            "varnish": "varnish:7.3",
                            "nginx": "nginx:1.22",
                            "os": "ubuntu-latest",
                            "release": "2023-09-15T00:00:00+0000",
                            "eol": "2026-09-15T00:00:00+0000"
                        }
                    ],
                    magento: ["magento/project-community-edition:v2.4.6-p2"]
                }, 
                "https://upstream-nightly.mage-os.org", 
                new Date()
                )
        ).toEqual(
            { 
                include: [
                    {
                        "magento": "magento/project-community-edition:v2.4.6-p2",
                        "php": 8.2,
                        "composer": "2",
                        "mysql": "mysql:8.0",
                        "elasticsearch": "elasticsearch:8.5.3",
                        "rabbitmq": "rabbitmq:3.11-management",
                        "redis": "redis:7.0",
                        "varnish": "varnish:7.3",
                        "nginx": "nginx:1.22",
                        "os": "ubuntu-latest",
                        "release": "2023-09-15T00:00:00+0000",
                        "eol": "2026-09-15T00:00:00+0000"
                    }
                ],
                magento: ["magento/project-community-edition:v2.4.6-p2"]
            }
        )
    });

    it('should only modify next versions', () => {
        expect(
            amendMatrixForNext(
                { 
                    include: [
                        {
                            "magento": "magento/project-community-edition:v2.4.6-p2",
                            "php": 8.2,
                            "composer": "2",
                            "mysql": "mysql:8.0",
                            "elasticsearch": "elasticsearch:8.5.3",
                            "rabbitmq": "rabbitmq:3.11-management",
                            "redis": "redis:7.0",
                            "varnish": "varnish:7.3",
                            "nginx": "nginx:1.22",
                            "os": "ubuntu-latest",
                            "release": "2023-09-15T00:00:00+0000",
                            "eol": "2026-09-15T00:00:00+0000"
                        },
                        {
                            "magento": "magento/project-community-edition:next",
                            "php": 8.2,
                            "composer": "2",
                            "mysql": "mysql:8.0",
                            "elasticsearch": "elasticsearch:8.5.3",
                            "rabbitmq": "rabbitmq:3.11-management",
                            "redis": "redis:7.0",
                            "varnish": "varnish:7.3",
                            "nginx": "nginx:1.22",
                            "os": "ubuntu-latest",
                            "release": "2023-09-15T00:00:00+0000",
                            "eol": "2026-09-15T00:00:00+0000"
                        }
                    ],
                    magento: ["magento/project-community-edition:v2.4.6-p2", "magento/project-community-edition:next"]
                }, 
                "https://upstream-nightly.mage-os.org", 
                new Date()
                )
        ).toEqual(
            { 
                include: [
                    {
                        "magento": "magento/project-community-edition:v2.4.6-p2",
                        "php": 8.2,
                        "composer": "2",
                        "mysql": "mysql:8.0",
                        "elasticsearch": "elasticsearch:8.5.3",
                        "rabbitmq": "rabbitmq:3.11-management",
                        "redis": "redis:7.0",
                        "varnish": "varnish:7.3",
                        "nginx": "nginx:1.22",
                        "os": "ubuntu-latest",
                        "release": "2023-09-15T00:00:00+0000",
                        "eol": "2026-09-15T00:00:00+0000"
                    },
                    {
                        "magento": "magento/project-community-edition:@alpha",
                        "php": 8.2,
                        "composer": "2",
                        "mysql": "mysql:8.0",
                        "elasticsearch": "elasticsearch:8.5.3",
                        "rabbitmq": "rabbitmq:3.11-management",
                        "redis": "redis:7.0",
                        "varnish": "varnish:7.3",
                        "nginx": "nginx:1.22",
                        "os": "ubuntu-latest",
                        "release": "2023-09-15T00:00:00+0000",
                        "eol": "2026-09-15T00:00:00+0000"
                    }
                ],
                magento: ["magento/project-community-edition:v2.4.6-p2", "magento/project-community-edition:@alpha"]
            }
        )
    });

    it('should amend the "next" versions listed in the matrix output for the given repo, for a different project', () => {
        expect(
            amendMatrixForNext(
                { 
                    include: [
                        {
                            "magento": "mage-os/project-community-edition:next",
                            "php": 8.2,
                            "composer": "2",
                            "mysql": "mysql:8.0",
                            "elasticsearch": "elasticsearch:8.5.3",
                            "rabbitmq": "rabbitmq:3.11-management",
                            "redis": "redis:7.0",
                            "varnish": "varnish:7.3",
                            "nginx": "nginx:1.22",
                            "os": "ubuntu-latest",
                            "release": "2023-09-15T00:00:00+0000",
                            "eol": "2026-09-15T00:00:00+0000"
                        }
                    ],
                    magento: ["mage-os/project-community-edition:next"]
                }, 
                "https://upstream-nightly.mage-os.org", 
                new Date()
                )
        ).toEqual(
            { 
                include: [
                    {
                        "magento": "mage-os/project-community-edition:@alpha",
                        "php": 8.2,
                        "composer": "2",
                        "mysql": "mysql:8.0",
                        "elasticsearch": "elasticsearch:8.5.3",
                        "rabbitmq": "rabbitmq:3.11-management",
                        "redis": "redis:7.0",
                        "varnish": "varnish:7.3",
                        "nginx": "nginx:1.22",
                        "os": "ubuntu-latest",
                        "release": "2023-09-15T00:00:00+0000",
                        "eol": "2026-09-15T00:00:00+0000"
                    }
                ],
                magento: ["mage-os/project-community-edition:@alpha"]
            }
        )
    });
})