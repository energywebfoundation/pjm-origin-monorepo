# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/energywebfoundation/origin/compare/@energyweb/market@1.3.3...@energyweb/market@2.0.0) (2019-11-26)


### Bug Fixes

* **market:** Updating off-chain properties - Handle cases where on-chain transactions fail ([#318](https://github.com/energywebfoundation/origin/issues/318)) ([324e1ee](https://github.com/energywebfoundation/origin/commit/324e1ee8605a122c54a41bec752333b0ac56b8dd))
* include contracts in the package ([#316](https://github.com/energywebfoundation/origin/issues/316)) ([9c9712b](https://github.com/energywebfoundation/origin/commit/9c9712ba3b2b4b82adb2c94a9fea1e72d0b076ec))
* **monorepo:** build order ([b582839](https://github.com/energywebfoundation/origin/commit/b58283958289e5525739a8918bd2db6739e88b39))
* **monorepo:** volta deployments ([#249](https://github.com/energywebfoundation/origin/issues/249)) ([432abae](https://github.com/energywebfoundation/origin/commit/432abae72a4a8bd39a7dd9a975585b22c36d9b47))
* **origin-ui:** PurchasableCertificate not fetching off-chain data ([#289](https://github.com/energywebfoundation/origin/issues/289)) ([594944d](https://github.com/energywebfoundation/origin/commit/594944d289d04c43e26d17561c3aa1685a42a423))
* **volta:** deploy ERC20 token ([5a85ebe](https://github.com/energywebfoundation/origin/commit/5a85ebe20b71a3ccf7f7396849a2fe08d3ec4be0))


### chore

* **market:** update README ([529c4b5](https://github.com/energywebfoundation/origin/commit/529c4b55f50ba46c7e1a7fb257e21ae5930b903c))


### Features

* Add support for toggling between manual/automatic matcher ([#293](https://github.com/energywebfoundation/origin/issues/293)) ([0adde5e](https://github.com/energywebfoundation/origin/commit/0adde5e256bf4d41c6991764bb366648adfe78ca))
* **origin-ui:** add loader to request irec modal ([#241](https://github.com/energywebfoundation/origin/issues/241)) ([fbcbb19](https://github.com/energywebfoundation/origin/commit/fbcbb19c1808db3026b777fe9fe4808cdaf38732))


### BREAKING CHANGES

* **market:** added MarketUser and moved price references from origin to market (PurchasableCertificate)





## [1.3.3](https://github.com/energywebfoundation/origin/compare/@energyweb/market@1.3.2...@energyweb/market@1.3.3) (2019-11-11)


### Bug Fixes

* fix running on Windows ([#222](https://github.com/energywebfoundation/origin/issues/222)) ([81f8c19](https://github.com/energywebfoundation/origin/commit/81f8c190c9841eaa7a0e5ed984cf0aa110f15e18))
* fix yarn clean command ([#224](https://github.com/energywebfoundation/origin/issues/224)) ([e07e9d8](https://github.com/energywebfoundation/origin/commit/e07e9d85de1b80c9f1a721398e41d82db580049c))





## [1.3.2](https://github.com/energywebfoundation/origin/compare/@energyweb/market@1.3.1...@energyweb/market@1.3.2) (2019-10-30)

**Note:** Version bump only for package @energyweb/market





## [1.3.1](https://github.com/energywebfoundation/origin/compare/@energyweb/market@1.3.0...@energyweb/market@1.3.1) (2019-10-30)

**Note:** Version bump only for package @energyweb/market





# [1.3.0](https://github.com/energywebfoundation/origin/compare/@energyweb/market@1.2.0...@energyweb/market@1.3.0) (2019-10-25)


### Bug Fixes

* use npm solc instead of downloading it every time ([#170](https://github.com/energywebfoundation/origin/issues/170)) ([e5ef574](https://github.com/energywebfoundation/origin/commit/e5ef574f6d297107606a1d035a56da01806a07d1))


### Features

* **backend:** Replace testbackend with the new origin-backend ([#137](https://github.com/energywebfoundation/origin/issues/137)) ([c428e7d](https://github.com/energywebfoundation/origin/commit/c428e7d44300ae306a9e759fc8897135e9d0e1be))





# 1.2.0 (2019-10-23)


### Bug Fixes

* **deps:** update dependency fs-extra to v8.1.0 ([#64](https://github.com/energywebfoundation/origin/issues/64)) ([ccd9ed5](https://github.com/energywebfoundation/origin/commit/ccd9ed5))
* align to resolution when check in range ([#92](https://github.com/energywebfoundation/origin/issues/92)) ([0ba8cdd](https://github.com/energywebfoundation/origin/commit/0ba8cdd))
* publish access configs ([bd4fa2b](https://github.com/energywebfoundation/origin/commit/bd4fa2b))
* publish access configs ([ecc00a2](https://github.com/energywebfoundation/origin/commit/ecc00a2))
* testbackend dependencies ([#6](https://github.com/energywebfoundation/origin/issues/6)) ([708cbd5](https://github.com/energywebfoundation/origin/commit/708cbd5))


### Features

* **origin-ui:** Duplicating and editing demands ([#32](https://github.com/energywebfoundation/origin/issues/32)) ([66cec2c](https://github.com/energywebfoundation/origin/commit/66cec2c))
* **origin-ui:** Filter all demands based on status ([#29](https://github.com/energywebfoundation/origin/issues/29)) ([b97c084](https://github.com/energywebfoundation/origin/commit/b97c084))
* **origin-ui:** filter, search claimed certificates, bulk claim in inbox ([#44](https://github.com/energywebfoundation/origin/issues/44)) ([c80145a](https://github.com/energywebfoundation/origin/commit/c80145a))
* **origin-ui:** overview of all demands ([#35](https://github.com/energywebfoundation/origin/issues/35)) ([fc24b0d](https://github.com/energywebfoundation/origin/commit/fc24b0d))
* **origin-ui:** using in-browser private key ([#136](https://github.com/energywebfoundation/origin/issues/136)) ([818d2f5](https://github.com/energywebfoundation/origin/commit/818d2f5))
* **user-registry:** User Off-Chain Properties ([#15](https://github.com/energywebfoundation/origin/issues/15)) ([b6c2a31](https://github.com/energywebfoundation/origin/commit/b6c2a31))
* asset/demand location based matching ([#46](https://github.com/energywebfoundation/origin/issues/46)) ([00255bd](https://github.com/energywebfoundation/origin/commit/00255bd))
* Automatic demand matching ([#41](https://github.com/energywebfoundation/origin/issues/41)) ([d706629](https://github.com/energywebfoundation/origin/commit/d706629))
* certificate buying flow for matcher ([#161](https://github.com/energywebfoundation/origin/issues/161)) ([bb662c3](https://github.com/energywebfoundation/origin/commit/bb662c3))
* demand fill tracking ([#82](https://github.com/energywebfoundation/origin/issues/82)) ([2948e17](https://github.com/energywebfoundation/origin/commit/2948e17))
* demands filtering ([#26](https://github.com/energywebfoundation/origin/issues/26)) ([337e584](https://github.com/energywebfoundation/origin/commit/337e584))
* new demand creation view and asset types integration ([#14](https://github.com/energywebfoundation/origin/issues/14)) ([229e68b](https://github.com/energywebfoundation/origin/commit/229e68b))
* setup prettier and lint config for Origin UI ([#20](https://github.com/energywebfoundation/origin/issues/20)) ([9cb4486](https://github.com/energywebfoundation/origin/commit/9cb4486))
