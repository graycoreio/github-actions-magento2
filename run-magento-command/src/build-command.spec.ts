import { buildMagentoArgs, resolveContainerPath } from './build-command';

describe('buildMagentoArgs', () => {
    it('prefixes the command with bin/magento and splits its arguments', () => {
        expect(buildMagentoArgs('  config:set general/locale/code   fr_FR ')).toEqual([
            'bin/magento', 'config:set', 'general/locale/code', 'fr_FR',
        ]);
    });

    it('throws on an empty command', () => {
        expect(() => buildMagentoArgs('   ')).toThrow('Magento command cannot be empty');
    });
});

describe('resolveContainerPath', () => {
    const workspace = '/home/runner/work/repo/repo';

    it('maps the workspace root to /var/www/html', () => {
        expect(resolveContainerPath('.', workspace)).toBe('/var/www/html');
    });

    it('maps a relative path under the workspace', () => {
        expect(resolveContainerPath('_ghamagento', workspace)).toBe('/var/www/html/_ghamagento');
    });

    it('maps an absolute path under the workspace', () => {
        expect(resolveContainerPath(`${workspace}/_ghamagento`, workspace)).toBe('/var/www/html/_ghamagento');
    });

    it('throws for a path outside the workspace', () => {
        expect(() => resolveContainerPath('/tmp/magento', workspace)).toThrow();
    });
});
