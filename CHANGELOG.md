# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0](https://github.com/graycoreio/github-actions-magento2/compare/v2.0.0...v3.0.0) (2025-04-09)


### ⚠ BREAKING CHANGES

* **coding-standard:** use magento/php-compatibility-fork ([#190](https://github.com/graycoreio/github-actions-magento2/issues/190))

### Features

* **setup-magento:** add support for composer auth ([#193](https://github.com/graycoreio/github-actions-magento2/issues/193)) ([01cbea1](https://github.com/graycoreio/github-actions-magento2/commit/01cbea18c9649984893afd432a1cdfa4568a5273))
* **supported-version:** add recent kind ([#188](https://github.com/graycoreio/github-actions-magento2/issues/188)) ([2f1b2ea](https://github.com/graycoreio/github-actions-magento2/commit/2f1b2eaa5da485a687ecda0fdbf38055e13c5a86))
* **supported-version:** add v2.4.4-p13, v2.4.5-p12, v2.4.6-p10, v2.4.7-p5 and v2.4.8 ([#187](https://github.com/graycoreio/github-actions-magento2/issues/187)) ([21c3bb3](https://github.com/graycoreio/github-actions-magento2/commit/21c3bb34363c94003bf031f837c1599b8e08f25b))


### Bug Fixes

* **coding-standard:** use magento/php-compatibility-fork ([#190](https://github.com/graycoreio/github-actions-magento2/issues/190)) ([0008e86](https://github.com/graycoreio/github-actions-magento2/commit/0008e8642db9b997005c3848cf532f4b1cf0a17d))
* **supported-version:** adjust failing tests ([#195](https://github.com/graycoreio/github-actions-magento2/issues/195)) ([f48c544](https://github.com/graycoreio/github-actions-magento2/commit/f48c544053e49d76c4ac5aac6743ee6521a700aa))

## [2.0.0](https://github.com/graycoreio/github-actions-magento2/compare/v1.6.0...v2.0.0) (2025-03-25)


### ⚠ BREAKING CHANGES

* replace mage-os/github-actions with graycoreio/github-actions-magento2
* remove unmaintained workflows

### Features

* add `cache-magento` action ([#87](https://github.com/graycoreio/github-actions-magento2/issues/87)) ([f5d43a5](https://github.com/graycoreio/github-actions-magento2/commit/f5d43a5184d20dc60b5e45d47b9d14300eb14754))
* add `fix-magento` action ([#86](https://github.com/graycoreio/github-actions-magento2/issues/86)) ([856d2df](https://github.com/graycoreio/github-actions-magento2/commit/856d2df4819a5d0cdff6087a005ca966c7d409c0))
* add coding standard action ([#51](https://github.com/graycoreio/github-actions-magento2/issues/51)) ([2a102c2](https://github.com/graycoreio/github-actions-magento2/commit/2a102c253d319fc463b1006ea7cc020b2ffdcb6c))
* add Installation Test Action ([#1](https://github.com/graycoreio/github-actions-magento2/issues/1)) ([4bc0854](https://github.com/graycoreio/github-actions-magento2/commit/4bc0854cfcc6f527c678f8e712f79500524efde6))
* add integration test workflow ([#3](https://github.com/graycoreio/github-actions-magento2/issues/3)) ([d638c02](https://github.com/graycoreio/github-actions-magento2/commit/d638c02ecab005d2541d0480522d4c5e823156f2))
* add magento releases 2.4.4-p9, 2.4.5-p8, 2.4.6-p6, and 2.4.7-p1 ([#226](https://github.com/graycoreio/github-actions-magento2/issues/226)) ([a326271](https://github.com/graycoreio/github-actions-magento2/commit/a3262710f1f605bf468b6fe70d5f1a5bd47b6bb4))
* add matrix to integration-test workflow ([#7](https://github.com/graycoreio/github-actions-magento2/issues/7)) ([fb1ac5f](https://github.com/graycoreio/github-actions-magento2/commit/fb1ac5f41aa183408aa32ec944536cf225831191))
* add new releases to the version matrix ([#232](https://github.com/graycoreio/github-actions-magento2/issues/232)) ([b633b21](https://github.com/graycoreio/github-actions-magento2/commit/b633b2120a2157aa13c3e7dd71b1cdbc0045e5d9))
* add project versions ([#110](https://github.com/graycoreio/github-actions-magento2/issues/110)) ([f7f0504](https://github.com/graycoreio/github-actions-magento2/commit/f7f0504691b19689227b4db17d333bca62f80cc0))
* add rabbitmq images with management plugin ([#125](https://github.com/graycoreio/github-actions-magento2/issues/125)) ([0f31e40](https://github.com/graycoreio/github-actions-magento2/commit/0f31e401b775c085720176a4ac7626c45d2b07d0))
* add releases 2.4.4-p6, 2.4.5-p5 and 2.4.6-p3 ([#169](https://github.com/graycoreio/github-actions-magento2/issues/169)) ([2086708](https://github.com/graycoreio/github-actions-magento2/commit/2086708ffc708b7685b579027163340a4ddfa44f))
* add runner version to supported version ([#7](https://github.com/graycoreio/github-actions-magento2/issues/7)) ([dd1a36b](https://github.com/graycoreio/github-actions-magento2/commit/dd1a36b2345cd9596b5d2688d5c6e1bc8725ffbd))
* add support for v2.3.7 on new vms ([#67](https://github.com/graycoreio/github-actions-magento2/issues/67)) ([2824849](https://github.com/graycoreio/github-actions-magento2/commit/28248496e0979dff3cb255abbfff84cdebd5697b))
* add support for v2.4.4-p2 and v2.4.5-p1 ([#69](https://github.com/graycoreio/github-actions-magento2/issues/69)) ([3e4d3c1](https://github.com/graycoreio/github-actions-magento2/commit/3e4d3c1645ad3ed8b2b0134f4c012335421c5fcb))
* add supported version matrix action ([#6](https://github.com/graycoreio/github-actions-magento2/issues/6)) ([6e81ef9](https://github.com/graycoreio/github-actions-magento2/commit/6e81ef96c7a0c8a1aa59554bf20ab202d7da4140))
* add unit test action ([#2](https://github.com/graycoreio/github-actions-magento2/issues/2)) ([72b1f25](https://github.com/graycoreio/github-actions-magento2/commit/72b1f25310b4918b4702526e2b45d5e99f063ebb))
* add upcoming release for mage-os 1.0.2 ([#223](https://github.com/graycoreio/github-actions-magento2/issues/223)) ([f1b13e8](https://github.com/graycoreio/github-actions-magento2/commit/f1b13e8984ec13e1a154e737c8494470f88b9a21))
* add upcoming release Mage-OS 1.0.3 to supported-version matrix ([#229](https://github.com/graycoreio/github-actions-magento2/issues/229)) ([6e50d0d](https://github.com/graycoreio/github-actions-magento2/commit/6e50d0d8de09da49ce12473b2577a2277e4d701e))
* allow fail-fast as an input argument ([#25](https://github.com/graycoreio/github-actions-magento2/issues/25)) ([2405cd1](https://github.com/graycoreio/github-actions-magento2/commit/2405cd1db7ff70a00c2e1ce58a20d0834bb39f33))
* allow using "next" version on supported version ([#58](https://github.com/graycoreio/github-actions-magento2/issues/58)) ([7431dcb](https://github.com/graycoreio/github-actions-magento2/commit/7431dcb7af723a6be20ef30db0f6978afacc572c))
* automatically allow the default Magento composer plugins ([#12](https://github.com/graycoreio/github-actions-magento2/issues/12)) ([d6e6688](https://github.com/graycoreio/github-actions-magento2/commit/d6e6688ead710b705198e7a7d1eda7004dc86070))
* **coding-standard:** add `ignore_warnings` flag ([#147](https://github.com/graycoreio/github-actions-magento2/issues/147)) ([4e21b18](https://github.com/graycoreio/github-actions-magento2/commit/4e21b18ee9187253fc5d172d0ad1439bf304872e))
* **get-composer-version:** create new action ([#145](https://github.com/graycoreio/github-actions-magento2/issues/145)) ([bc840e1](https://github.com/graycoreio/github-actions-magento2/commit/bc840e13727b4273aa9c22e4116a05cde58b046d))
* **get-magento-version:** add get-magento-version action ([#72](https://github.com/graycoreio/github-actions-magento2/issues/72)) ([fd858c3](https://github.com/graycoreio/github-actions-magento2/commit/fd858c30633e97bdc93cc8c2fe7adaef99a6bf7c))
* install composer via shivammathur/setup-php github action ([#23](https://github.com/graycoreio/github-actions-magento2/issues/23)) ([49bbcc8](https://github.com/graycoreio/github-actions-magento2/commit/49bbcc89a7d7103fda34820ab165ec2cd1366123))
* **integration:** fix integration tests for v2.4.0 ([#46](https://github.com/graycoreio/github-actions-magento2/issues/46)) ([b4e7831](https://github.com/graycoreio/github-actions-magento2/commit/b4e7831c93ad82caa0abe3bdce52e4af2eda333b))
* **integration:** Install composer plugin for parallel downloads ([#24](https://github.com/graycoreio/github-actions-magento2/issues/24)) ([97b4223](https://github.com/graycoreio/github-actions-magento2/commit/97b4223c0c1f441b5567ca606bff84181218d03a))
* make cache key consistent (and configurable) ([#38](https://github.com/graycoreio/github-actions-magento2/issues/38)) ([cbbba62](https://github.com/graycoreio/github-actions-magento2/commit/cbbba628dd290c81ed4708d3d3bb87abadb0c7ce))
* make phpcs severity level configurable ([#130](https://github.com/graycoreio/github-actions-magento2/issues/130)) ([81a1eb2](https://github.com/graycoreio/github-actions-magento2/commit/81a1eb2273864842286a4427519c9d29146c5ac8))
* remove COMPOSER_AUTH requirement ([#18](https://github.com/graycoreio/github-actions-magento2/issues/18)) ([e92a242](https://github.com/graycoreio/github-actions-magento2/commit/e92a242f0af477623421949ade130ab316281142))
* remove unmaintained workflows ([4c536e3](https://github.com/graycoreio/github-actions-magento2/commit/4c536e3d96f78355ed7b37388564f3468040172b))
* replace mage-os/github-actions with graycoreio/github-actions-magento2 ([9c06178](https://github.com/graycoreio/github-actions-magento2/commit/9c06178b30d156338b5ced8bd8bdbaec79982291))
* run setup:di:compile on push ([#116](https://github.com/graycoreio/github-actions-magento2/issues/116)) ([22aca78](https://github.com/graycoreio/github-actions-magento2/commit/22aca78cc8c648549b7a139fd2739ac9e8db916d))
* **semver-compare:** add new Github action ([#146](https://github.com/graycoreio/github-actions-magento2/issues/146)) ([01e4ccb](https://github.com/graycoreio/github-actions-magento2/commit/01e4ccbc54ebe8996c3f25d777a0b4fdc1288e13))
* **setup-magento:** add a new action to setup Magento ([#76](https://github.com/graycoreio/github-actions-magento2/issues/76)) ([7b74ff7](https://github.com/graycoreio/github-actions-magento2/commit/7b74ff738699d86aafed7690464302b1f07e59d0))
* **supported-version:** add all kind ([#36](https://github.com/graycoreio/github-actions-magento2/issues/36)) ([26c354d](https://github.com/graycoreio/github-actions-magento2/commit/26c354d8d4d1f7ce689f37236b7b0ee27b11221f))
* **supported-version:** add support for v2.4.5 ([#35](https://github.com/graycoreio/github-actions-magento2/issues/35)) ([affb1ce](https://github.com/graycoreio/github-actions-magento2/commit/affb1ce1f942799647f57eb6b1096bf0e4afd560))
* **supported-version:** add user-defined kind ([#28](https://github.com/graycoreio/github-actions-magento2/issues/28)) ([664360e](https://github.com/graycoreio/github-actions-magento2/commit/664360ede2ef775a6e0c7876dd103e66a977c4eb))
* **supported-version:** dynamically compute ([#120](https://github.com/graycoreio/github-actions-magento2/issues/120)) ([dbc889f](https://github.com/graycoreio/github-actions-magento2/commit/dbc889f7cea548d319a5cd206269b007319d53ec))
* **supported-version:** Magento v2.4.6 ([d3b1ab6](https://github.com/graycoreio/github-actions-magento2/commit/d3b1ab6b344b6a1ff705d2e57ad400ab506456be))
* **supported-version:** package @actions/core:1.10.0 ([e4f0f85](https://github.com/graycoreio/github-actions-magento2/commit/e4f0f85e38ac6e342780d2bdaac28a19c1cab49d))
* **supported-versions:** add release date ([#100](https://github.com/graycoreio/github-actions-magento2/issues/100)) ([5599a0d](https://github.com/graycoreio/github-actions-magento2/commit/5599a0d2e790952fbdfbbc23b9a1c92aa26eed35))
* **supported-version:** validate custom_versions ([5c19804](https://github.com/graycoreio/github-actions-magento2/commit/5c198049f7002fff785d07f344f3773ce92e2c0f))
* update actions/checkout to v3 ([#23](https://github.com/graycoreio/github-actions-magento2/issues/23)) ([8a209b9](https://github.com/graycoreio/github-actions-magento2/commit/8a209b982b5dbf22b6f620d9c6061577e29d0dcb))
* use Mage-OS by default ([#17](https://github.com/graycoreio/github-actions-magento2/issues/17)) ([d1cced8](https://github.com/graycoreio/github-actions-magento2/commit/d1cced897a3008e53b4e3b9827d9c9853d70cfa4))


### Bug Fixes

* add missing build for 1.4.0 of supported versions ([#64](https://github.com/graycoreio/github-actions-magento2/issues/64)) ([e48a346](https://github.com/graycoreio/github-actions-magento2/commit/e48a3463c5054012f748bb64eca2bab51220cdc0))
* coding-standard-baseline: Run baseline test on modified files only (fixes [#227](https://github.com/graycoreio/github-actions-magento2/issues/227)) ([#228](https://github.com/graycoreio/github-actions-magento2/issues/228)) ([e29ea44](https://github.com/graycoreio/github-actions-magento2/commit/e29ea44597d69cf743bc172fd84b8f9f238ff3b6))
* continue to use elasticsearch instead of opensearch for now ([#224](https://github.com/graycoreio/github-actions-magento2/issues/224)) ([dd47d22](https://github.com/graycoreio/github-actions-magento2/commit/dd47d22478c7fae917f48261d9a32b0ca04aec3c))
* **installation-test:** handle non-range composer versions ([c136c11](https://github.com/graycoreio/github-actions-magento2/commit/c136c111d923fa3c9d4f3fbeb38cd81d593168da))
* **installation:** allow plugins in installation tests ([#14](https://github.com/graycoreio/github-actions-magento2/issues/14)) ([fcc0b85](https://github.com/graycoreio/github-actions-magento2/commit/fcc0b854448b5ca7de72000fce3f1f3a4266cd33))
* **integration:** force to explicitly older monolog versions ([#12](https://github.com/graycoreio/github-actions-magento2/issues/12)) ([#16](https://github.com/graycoreio/github-actions-magento2/issues/16)) ([e9ea198](https://github.com/graycoreio/github-actions-magento2/commit/e9ea198bbe945bac89f80b600804b0d481c88917))
* **integration:** only run monolog fixup on v2.4.4 ([#37](https://github.com/graycoreio/github-actions-magento2/issues/37)) ([841670a](https://github.com/graycoreio/github-actions-magento2/commit/841670a97fccd29d52b760bf0989ac5bb224ba3d))
* make es8 run correctly in integration tests ([#66](https://github.com/graycoreio/github-actions-magento2/issues/66)) ([85d11af](https://github.com/graycoreio/github-actions-magento2/commit/85d11af76e15b6728c3cd1e4d8fb45289b2b1c8c))
* pass correct repo url for nightly ([#158](https://github.com/graycoreio/github-actions-magento2/issues/158)) ([b645c23](https://github.com/graycoreio/github-actions-magento2/commit/b645c2327debb49615e1110064c35732aa1b59f4))
* PHPcs baseline composer conflicts ([bf34ec4](https://github.com/graycoreio/github-actions-magento2/commit/bf34ec4964e683e47b442f82d1cdb0d74b01de69))
* **supported-version:** falsiness of custom_versions ([c9b7f41](https://github.com/graycoreio/github-actions-magento2/commit/c9b7f41525923edd1fc40b635d776ad5c2ebf6ec))
* **supported-version:** matrix innaccessible outside of repo ([#8](https://github.com/graycoreio/github-actions-magento2/issues/8)) ([56cff9d](https://github.com/graycoreio/github-actions-magento2/commit/56cff9de0b3bb16e4d921bca6a69ea28eae237e2))
* **supported-version:** pin-back MySQL to breaking change for tests ([#46](https://github.com/graycoreio/github-actions-magento2/issues/46)) ([4b9366f](https://github.com/graycoreio/github-actions-magento2/commit/4b9366fdf2ec72215c0e76dcabfe5e5bfee689de))
* **supported-versions:** GA Ubuntu-22.04 release ([#110](https://github.com/graycoreio/github-actions-magento2/issues/110)) ([b0e1a0a](https://github.com/graycoreio/github-actions-magento2/commit/b0e1a0a9439be892062a6f05161d83e7ae2c7cbf))
* **supported-versions:** nightly build matrix tag ([#152](https://github.com/graycoreio/github-actions-magento2/issues/152)) ([7f1821f](https://github.com/graycoreio/github-actions-magento2/commit/7f1821f6ac3faff2e2384212f33fcfdcc8cf4573))
* switch from tj-actions/changed-files to dorny/paths-filter ([87fe77f](https://github.com/graycoreio/github-actions-magento2/commit/87fe77f8a8dcf6828317894c4b849c4be041853f))
* use exact version of elasticsearch since there is no 8.11 tag ([#225](https://github.com/graycoreio/github-actions-magento2/issues/225)) ([b4f27f1](https://github.com/graycoreio/github-actions-magento2/commit/b4f27f19e5196ba6be3b6007cd3e71a40471aa4f))

## [1.6.0](https://github.com/mage-os/github-actions/compare/v1.5.0...v1.6.0) (2025-03-07)


### Features

* run setup:di:compile on push ([#116](https://github.com/mage-os/github-actions/issues/116)) ([22aca78](https://github.com/mage-os/github-actions/commit/22aca78cc8c648549b7a139fd2739ac9e8db916d))

## [1.5.0](https://github.com/mage-os/github-actions/compare/v1.4.0...v1.5.0) (2024-12-30)


### Features

* add magento releases 2.4.4-p9, 2.4.5-p8, 2.4.6-p6, and 2.4.7-p1 ([#226](https://github.com/mage-os/github-actions/issues/226)) ([a326271](https://github.com/mage-os/github-actions/commit/a3262710f1f605bf468b6fe70d5f1a5bd47b6bb4))
* add new releases to the version matrix ([#232](https://github.com/mage-os/github-actions/issues/232)) ([b633b21](https://github.com/mage-os/github-actions/commit/b633b2120a2157aa13c3e7dd71b1cdbc0045e5d9))
* add project versions ([#110](https://github.com/mage-os/github-actions/issues/110)) ([f7f0504](https://github.com/mage-os/github-actions/commit/f7f0504691b19689227b4db17d333bca62f80cc0))
* add releases 2.4.4-p6, 2.4.5-p5 and 2.4.6-p3 ([#169](https://github.com/mage-os/github-actions/issues/169)) ([2086708](https://github.com/mage-os/github-actions/commit/2086708ffc708b7685b579027163340a4ddfa44f))
* add support for v2.3.7 on new vms ([#67](https://github.com/mage-os/github-actions/issues/67)) ([2824849](https://github.com/mage-os/github-actions/commit/28248496e0979dff3cb255abbfff84cdebd5697b))
* add upcoming release for mage-os 1.0.2 ([#223](https://github.com/mage-os/github-actions/issues/223)) ([f1b13e8](https://github.com/mage-os/github-actions/commit/f1b13e8984ec13e1a154e737c8494470f88b9a21))
* add upcoming release Mage-OS 1.0.3 to supported-version matrix ([#229](https://github.com/mage-os/github-actions/issues/229)) ([6e50d0d](https://github.com/mage-os/github-actions/commit/6e50d0d8de09da49ce12473b2577a2277e4d701e))
* **coding-standard:** add `ignore_warnings` flag ([#147](https://github.com/mage-os/github-actions/issues/147)) ([4e21b18](https://github.com/mage-os/github-actions/commit/4e21b18ee9187253fc5d172d0ad1439bf304872e))
* **get-composer-version:** create new action ([#145](https://github.com/mage-os/github-actions/issues/145)) ([bc840e1](https://github.com/mage-os/github-actions/commit/bc840e13727b4273aa9c22e4116a05cde58b046d))
* **semver-compare:** add new Github action ([#146](https://github.com/mage-os/github-actions/issues/146)) ([01e4ccb](https://github.com/mage-os/github-actions/commit/01e4ccbc54ebe8996c3f25d777a0b4fdc1288e13))
* **supported-versions:** add release date ([#100](https://github.com/mage-os/github-actions/issues/100)) ([5599a0d](https://github.com/mage-os/github-actions/commit/5599a0d2e790952fbdfbbc23b9a1c92aa26eed35))


### Bug Fixes

* add missing build for 1.4.0 of supported versions ([#64](https://github.com/mage-os/github-actions/issues/64)) ([e48a346](https://github.com/mage-os/github-actions/commit/e48a3463c5054012f748bb64eca2bab51220cdc0))
* coding-standard-baseline: Run baseline test on modified files only (fixes [#227](https://github.com/mage-os/github-actions/issues/227)) ([#228](https://github.com/mage-os/github-actions/issues/228)) ([e29ea44](https://github.com/mage-os/github-actions/commit/e29ea44597d69cf743bc172fd84b8f9f238ff3b6))
* continue to use elasticsearch instead of opensearch for now ([#224](https://github.com/mage-os/github-actions/issues/224)) ([dd47d22](https://github.com/mage-os/github-actions/commit/dd47d22478c7fae917f48261d9a32b0ca04aec3c))
* make es8 run correctly in integration tests ([#66](https://github.com/mage-os/github-actions/issues/66)) ([85d11af](https://github.com/mage-os/github-actions/commit/85d11af76e15b6728c3cd1e4d8fb45289b2b1c8c))
* pass correct repo url for nightly ([#158](https://github.com/mage-os/github-actions/issues/158)) ([b645c23](https://github.com/mage-os/github-actions/commit/b645c2327debb49615e1110064c35732aa1b59f4))
* PHPcs baseline composer conflicts ([bf34ec4](https://github.com/mage-os/github-actions/commit/bf34ec4964e683e47b442f82d1cdb0d74b01de69))
* **supported-versions:** nightly build matrix tag ([#152](https://github.com/mage-os/github-actions/issues/152)) ([7f1821f](https://github.com/mage-os/github-actions/commit/7f1821f6ac3faff2e2384212f33fcfdcc8cf4573))
* switch from tj-actions/changed-files to dorny/paths-filter ([87fe77f](https://github.com/mage-os/github-actions/commit/87fe77f8a8dcf6828317894c4b849c4be041853f))
* use exact version of elasticsearch since there is no 8.11 tag ([#225](https://github.com/mage-os/github-actions/issues/225)) ([b4f27f1](https://github.com/mage-os/github-actions/commit/b4f27f19e5196ba6be3b6007cd3e71a40471aa4f))

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
