const KNOWN_REPOSITORIES = {
    "https://repo.mage-os.org": true,
    "https://nightly.mage-os.org": true,
    "https://upstream-mirror.mage-os.org": true,
    "https://upstream-nightly.mage-os.org": true,
    "https://repo.magento.com": true,
}

export type Repository = keyof typeof KNOWN_REPOSITORIES;