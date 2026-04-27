<?php

namespace Graycore\DemoPackage\Test\Integration;

use Magento\Framework\View\Element\Template;
use Magento\TestFramework\Helper\Bootstrap;

/**
 * Fails when the extension is installed as a symlink (default Composer path repo behavior)
 * because Magento's template engine cannot resolve .phtml files through symlinks.
 * Requires COMPOSER_MIRROR_PATH_REPOS=1 during composer install.
 */
class TemplateRenderTest extends \PHPUnit\Framework\TestCase
{
    /**
     * @magentoAppArea frontend
     */
    public function testTemplateRendersWithoutSymlinkError()
    {
        $block = Bootstrap::getObjectManager()->create(Template::class);
        $block->setTemplate('Graycore_DemoPackage::demo.phtml');
        $this->assertNotEmpty($block->toHtml());
    }
}
