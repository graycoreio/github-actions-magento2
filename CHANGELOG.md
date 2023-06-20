# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.4.0](https://github.com/mage-os/github-actions/compare/v1.3.0...v1.4.0) (2023-06-20)


### Features

* make phpcs severity level configurable ([#130](https://github.com/mage-os/github-actions/issues/130)) ([81a1eb2](https://github.com/mage-os/github-actions/commit/81a1eb2273864842286a4427519c9d29146c5ac8))
* **supported-version:** validate custom_versions ([5c19804](https://github.com/mage-os/github-actions/commit/5c198049f7002fff785d07f344f3773ce92e2c0f))


### Bug Fixes

* **supported-version:** falsiness of custom_versions ([c9b7f41](https://github.com/mage-os/github-actions/commit/c9b7f41525923edd1fc40b635d776ad5c2ebf6ec))

## [1.3.0](https://github.com/graycoreio/github-actions-magento2/compare/v1.2.0...v1.3.0) (2023-03-15)


### Features

* add `cache-magento` action ([#87](https://github.com/graycoreio/github-actions-magento2/issues/87)) ([f5d43a5](https://github.com/graycoreio/github-actions-magento2/commit/f5d43a5184d20dc60b5e45d47b9d14300eb14754))
* add `fix-magento` action ([#86](https://github.com/graycoreio/github-actions-magento2/issues/86)) ([856d2df](https://github.com/graycoreio/github-actions-magento2/commit/856d2df4819a5d0cdff6087a005ca966c7d409c0))
* add rabbitmq images with management plugin ([#125](https://github.com/graycoreio/github-actions-magento2/issues/125)) ([0f31e40](https://github.com/graycoreio/github-actions-magento2/commit/0f31e401b775c085720176a4ac7626c45d2b07d0))
* **get-magento-version:** add get-magento-version action ([#72](https://github.com/graycoreio/github-actions-magento2/issues/72)) ([fd858c3](https://github.com/graycoreio/github-actions-magento2/commit/fd858c30633e97bdc93cc8c2fe7adaef99a6bf7c))
* **setup-magento:** add a new action to setup Magento ([#76](https://github.com/graycoreio/github-actions-magento2/issues/76)) ([7b74ff7](https://github.com/graycoreio/github-actions-magento2/commit/7b74ff738699d86aafed7690464302b1f07e59d0))
* **supported-version:** dynamically compute ([#120](https://github.com/graycoreio/github-actions-magento2/issues/120)) ([dbc889f](https://github.com/graycoreio/github-actions-magento2/commit/dbc889f7cea548d319a5cd206269b007319d53ec))
* **supported-version:** Magento v2.4.6 ([d3b1ab6](https://github.com/graycoreio/github-actions-magento2/commit/d3b1ab6b344b6a1ff705d2e57ad400ab506456be))


### Bug Fixes

* **installation-test:** handle non-range composer versions ([c136c11](https://github.com/graycoreio/github-actions-magento2/commit/c136c111d923fa3c9d4f3fbeb38cd81d593168da))
* **supported-versions:** GA Ubuntu-22.04 release ([#110](https://github.com/graycoreio/github-actions-magento2/issues/110)) ([b0e1a0a](https://github.com/graycoreio/github-actions-magento2/commit/b0e1a0a9439be892062a6f05161d83e7ae2c7cbf))

## [1.2.0](https://github.com/graycoreio/github-actions-magento2/compare/v1.1.0...v1.2.0) (2022-10-11)


### Features

* add coding standard action ([#51](https://github.com/graycoreio/github-actions-magento2/issues/51)) ([2a102c2](https://github.com/graycoreio/github-actions-magento2/commit/2a102c253d319fc463b1006ea7cc020b2ffdcb6c))
* add support for v2.4.4-p2 and v2.4.5-p1 ([#69](https://github.com/graycoreio/github-actions-magento2/issues/69)) ([3e4d3c1](https://github.com/graycoreio/github-actions-magento2/commit/3e4d3c1645ad3ed8b2b0134f4c012335421c5fcb))
* allow using "next" version on supported version ([#58](https://github.com/graycoreio/github-actions-magento2/issues/58)) ([7431dcb](https://github.com/graycoreio/github-actions-magento2/commit/7431dcb7af723a6be20ef30db0f6978afacc572c))
* **integration:** fix integration tests for v2.4.0 ([#46](https://github.com/graycoreio/github-actions-magento2/issues/46)) ([b4e7831](https://github.com/graycoreio/github-actions-magento2/commit/b4e7831c93ad82caa0abe3bdce52e4af2eda333b))
* **supported-version:** package @actions/core:1.10.0 ([e4f0f85](https://github.com/graycoreio/github-actions-magento2/commit/e4f0f85e38ac6e342780d2bdaac28a19c1cab49d))


### Bug Fixes

* **supported-version:** pin-back MySQL to breaking change for tests ([#46](https://github.com/graycoreio/github-actions-magento2/issues/46)) ([4b9366f](https://github.com/graycoreio/github-actions-magento2/commit/4b9366fdf2ec72215c0e76dcabfe5e5bfee689de))

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
