export interface MagentoMatrixVersion {
    magento: string,
    php: string | number,
    composer: string | number,
    mysql: string,
    elasticsearch: string,
    rabbitmq: string,
    redis: string,
    varnish: string,
    nginx: string,
    os: string,
    eol: string
}

export interface GithubActionsMatrix {
    magento: string[],
    include: MagentoMatrixVersion[]
} 