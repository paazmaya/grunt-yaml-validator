# Version history for grunt-yaml-validator

This changelog covers the version history and possible upcoming changes.
It follows the guidance from https://keepachangelog.com/en/1.0.0/.

## Unreleased

- Minimum supported Node.js version lifted from `14.15.0` to `22.11.0`

## `v3.0.0` (2023-06-06)

- Migrated to version 2 of Semaphore CI
- Minimum supported Node.js version lifted from `10.13.0` to `14.15.0`

## `v2.0.0` (2020-05-29)

- Minimum Node.js version lifted from `8.11.1` to `10.13.0`
- Updated `yaml-validator` to `v2.2.0`

## `v1.0.0` (2019-01-22)
- Minimum Node.js version lifted from `4.2.0` to `8.11.1`
- Updated `yaml-validator` to `v2.0.0`

## `v0.10.0` (2016-08-10)

- Dependencies are sure :tophat: up to date, among `yaml-validator` version `0.2.0`
- Moved testing from Drone.io to [Semaphore](https://paazmaya.semaphoreci.com/projects/grunt-yaml-validator)
- Grunt `v1.0.0` is now the minimum
- Use shared ESLint configuration and ESLint directly without the Grunt.js plugin

## `v0.9.0` (2016-02-22)

- Start using [`yaml-validator`](https://www.npmjs.com/package/yaml-validator) separately

## `v0.8.0` (2016-02-22)

- Minimum Node.js version required/supported is now `4.2.0` (LTS)
- Update dependencies

## `v0.7.3` (2014-12-17)

- Try/catch around Yaml parsing to avoid breaking in between files

## `v0.7.2` (2014-11-03)

- Undefined key crashes if used

## `v0.7.1` (2014-11-03)

- Object properties in array are correctly matched

## `v0.7.0` (2014-11-03)

- Removed deprecated options `types` and `keys` and report rewording

## `v0.6.0` (2014-11-03)

- New option `structure` to replace `types` and `keys`

## `v0.5.2` (2014-11-03)

- Tag mismatch in earlier version

## `v0.5.1` (2014-11-03)

- New option to save Yaml files as pretty printed JSON files

## `v0.5.0` (2014-10-31)

- Default option values unified to be false. Multitasking fixed.

## `v0.4.0` (2014-10-30)

- Added type checking configuration option

## `v0.3.0` (2014-10-29)

- Extended `keys` configuration option which was renamed from `structure`

## `v0.2.2` (2014-10-28)

- Log total number as last in the output string

## `v0.2.1` (2014-10-27)

- Remove unused dependency

## `v0.2.0` (2014-10-27)

- Log file option

## `v0.1.1` (2014-10-27)

- Fix structure type and update documentation

## `v0.1.0` (2014-10-27)

- Initial release to the World
