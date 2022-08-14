# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/graycoreio/github-actions-magento2/compare/v1.0.0...v1.1.0) (2022-08-14)


### Features

* make cache key consistent (and configurable) ([#38](https://github.com/graycoreio/github-actions-magento2/issues/38)) ([cbbba62](https://github.com/graycoreio/github-actions-magento2/commit/cbbba628dd290c81ed4708d3d3bb87abadb0c7ce))
* **supported-version:** add all kind ([#36](https://github.com/graycoreio/github-actions-magento2/issues/36)) ([26c354d](https://github.com/graycoreio/github-actions-magento2/commit/26c354d8d4d1f7ce689f37236b7b0ee27b11221f))
* **supported-version:** add support for v2.4.5 ([#35](https://github.com/graycoreio/github-actions-magento2/issues/35)) ([affb1ce](https://github.com/graycoreio/github-actions-magento2/commit/affb1ce1f942799647f57eb6b1096bf0e4afd560))


### Bug Fixes

* **integration:** only run monolog fixup on v2.4.4 ([#37](https://github.com/graycoreio/github-actions-magento2/issues/37)) ([841670a](https://github.com/graycoreio/github-actions-magento2/commit/841670a97fccd29d52b760bf0989ac5bb224ba3d))

## 1.0.0 (2022-08-06)


### Features

* add Installation Test Action ([#1](https://github.com/graycoreio/github-actions-magento2/issues/1)) ([4bc0854](https://github.com/graycoreio/github-actions-magento2/commit/4bc0854cfcc6f527c678f8e712f79500524efde6))
* add integration test workflow ([#3](https://github.com/graycoreio/github-actions-magento2/issues/3)) ([d638c02](https://github.com/graycoreio/github-actions-magento2/commit/d638c02ecab005d2541d0480522d4c5e823156f2))
* add matrix to integration-test workflow ([#7](https://github.com/graycoreio/github-actions-magento2/issues/7)) ([fb1ac5f](https://github.com/graycoreio/github-actions-magento2/commit/fb1ac5f41aa183408aa32ec944536cf225831191))
* add runner version to supported version ([#7](https://github.com/graycoreio/github-actions-magento2/issues/7)) ([dd1a36b](https://github.com/graycoreio/github-actions-magento2/commit/dd1a36b2345cd9596b5d2688d5c6e1bc8725ffbd))
* add supported version matrix action ([#6](https://github.com/graycoreio/github-actions-magento2/issues/6)) ([6e81ef9](https://github.com/graycoreio/github-actions-magento2/commit/6e81ef96c7a0c8a1aa59554bf20ab202d7da4140))
* add unit test action ([#2](https://github.com/graycoreio/github-actions-magento2/issues/2)) ([72b1f25](https://github.com/graycoreio/github-actions-magento2/commit/72b1f25310b4918b4702526e2b45d5e99f063ebb))
* allow fail-fast as an input argument ([#25](https://github.com/graycoreio/github-actions-magento2/issues/25)) ([2405cd1](https://github.com/graycoreio/github-actions-magento2/commit/2405cd1db7ff70a00c2e1ce58a20d0834bb39f33))
* automatically allow the default Magento composer plugins ([#12](https://github.com/graycoreio/github-actions-magento2/issues/12)) ([d6e6688](https://github.com/graycoreio/github-actions-magento2/commit/d6e6688ead710b705198e7a7d1eda7004dc86070))
* install composer via shivammathur/setup-php github action ([#23](https://github.com/graycoreio/github-actions-magento2/issues/23)) ([49bbcc8](https://github.com/graycoreio/github-actions-magento2/commit/49bbcc89a7d7103fda34820ab165ec2cd1366123))
* **integration:** Install composer plugin for parallel downloads ([#24](https://github.com/graycoreio/github-actions-magento2/issues/24)) ([97b4223](https://github.com/graycoreio/github-actions-magento2/commit/97b4223c0c1f441b5567ca606bff84181218d03a))
* remove COMPOSER_AUTH requirement ([#18](https://github.com/graycoreio/github-actions-magento2/issues/18)) ([e92a242](https://github.com/graycoreio/github-actions-magento2/commit/e92a242f0af477623421949ade130ab316281142))
* **supported-version:** add user-defined kind ([#28](https://github.com/graycoreio/github-actions-magento2/issues/28)) ([664360e](https://github.com/graycoreio/github-actions-magento2/commit/664360ede2ef775a6e0c7876dd103e66a977c4eb))
* update actions/checkout to v3 ([#23](https://github.com/graycoreio/github-actions-magento2/issues/23)) ([8a209b9](https://github.com/graycoreio/github-actions-magento2/commit/8a209b982b5dbf22b6f620d9c6061577e29d0dcb))
* use Mage-OS by default ([#17](https://github.com/graycoreio/github-actions-magento2/issues/17)) ([d1cced8](https://github.com/graycoreio/github-actions-magento2/commit/d1cced897a3008e53b4e3b9827d9c9853d70cfa4))


### Bug Fixes

* **installation:** allow plugins in installation tests ([#14](https://github.com/graycoreio/github-actions-magento2/issues/14)) ([fcc0b85](https://github.com/graycoreio/github-actions-magento2/commit/fcc0b854448b5ca7de72000fce3f1f3a4266cd33))
* **integration:** force to explicitly older monolog versions ([#12](https://github.com/graycoreio/github-actions-magento2/issues/12)) ([#16](https://github.com/graycoreio/github-actions-magento2/issues/16)) ([e9ea198](https://github.com/graycoreio/github-actions-magento2/commit/e9ea198bbe945bac89f80b600804b0d481c88917))
* **supported-version:** matrix innaccessible outside of repo ([#8](https://github.com/graycoreio/github-actions-magento2/issues/8)) ([56cff9d](https://github.com/graycoreio/github-actions-magento2/commit/56cff9de0b3bb16e4d921bca6a69ea28eae237e2))
