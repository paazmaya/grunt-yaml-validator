# grunt-yaml-validator

> Validate Yaml files and enforce a given structure

[![Dependency Status](https://david-dm.org/paazmaya/grunt-yaml-validator/status.svg)](https://david-dm.org/paazmaya/grunt-yaml-validator)
[![Ubuntu Build Status](https://paazmaya.semaphoreci.com/badges/grunt-yaml-validator.svg)](https://paazmaya.semaphoreci.com/projects/grunt-yaml-validator)

[![Built with Grunt](http://img.shields.io/badge/Grunt-1.0-blue.svg?style=flat-square)](http://gruntjs.com/)

[Yaml](http://yaml.org/) files are parsed via [`js-yaml`](https://github.com/nodeca/js-yaml)
and the structure defined via task configuration is enforced with
[`check-type`](https://github.com/alistairjcbrown/check-type), that are both used via
[`yaml-validator`](https://www.npmjs.com/package/yaml-validator).

## Getting Started

This plugin requires [Grunt](http://gruntjs.com/) `~1.1` and [Node.js](https://nodejs.org/en/) minimum of `10.13.0`, which is [the active Long Term Support (LTS) version](https://github.com/nodejs/Release#release-schedule).

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the
[Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to
create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and
use Grunt plugins. Once you're familiar with that process, you may install this
plugin with this command:

```sh
npm install grunt-yaml-validator --save-dev
```

Once the plugin has been installed, it may be enabled inside your
`Gruntfile.js` with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-yaml-validator');
```

In case you are using an automated loader, such as [`jit-grunt`](https://github.com/shootaroo/jit-grunt),
the above line is not needed.

## The "yaml_validator" task

Please note that this project is a [multi task plugin](http://gruntjs.com/creating-tasks#multi-tasks),
so pay special attention for configuring it.

Files to be checked with this plugin, should be defined
[via `src` property](http://gruntjs.com/api/inside-tasks#this.filessrc).

### Overview

In your project's Gruntfile, add a section named `yaml_validator` to the data object passed
into `grunt.initConfig()`.

```js
grunt.initConfig({
  yaml_validator: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      options: {
        // Multi task specific options go here.
      }
      // Target-specific file lists and/or options go here.
      src: []
    },
  },
});
```

### Options

All options are `false` by default which disables their use.

#### options.log

Type: `string`

Default value: `false`

In case the value is not `false`, the given string will be used as log file where all the
task output is written.


#### options.structure

Type: `object`

Default value: `false`

The most complex style of checking validity.


#### options.yaml

Type: `object`

Default value: `false`

Options passed to [`safeload` method of `js-yaml`](https://github.com/nodeca/js-yaml#safeload-string---options-).

Please note that the `onWarning` callback is being used by this plugin and any method written for it,
will be run after the one implemented in this plugin.
The callback get called with two parameters, of which the first is the error in question,
while the second is the file path of the given Yaml file.


#### options.writeJson

Type: `boolean`

Default: `false`

Write the given Yaml file as pretty printed JSON in the same path, just by changing the file extension to `json`.

Please note that any existing JSON files will be cruelly overwritten.


### Usage Examples

#### Default Options

By using the default option values, only the validity of the configured Yaml files are checked.

```js
grunt.initConfig({
  yaml_validator: {
    defaults: {
      src: ['configuration/*.yml', 'other/important/*_stuff.yml']
    }
  }
});
```

#### Logging options

All output is written in the log file as well as to the standard output.

```js
grunt.initConfig({
  yaml_validator: {
    logged: {
      options: {
        log: 'yaml-validator.log'
      },
      src: ['configuration/*.yml', 'other/important/*_stuff.yml']
    }
  }
});
```

#### Structure validation options

In case an array is found, all its members are assumed to have the given structure.
This can be seen in the `classRooms` property, which according to the configuration below,
should be an array, for which all items are objects, which all should have a `name` and `id`
properties, with the given types.

The `teachers` array is made of strings, thus all items in that array must be a string.

```js
grunt.initConfig({
  yaml_validator: {
    custom: {
      options: {
        structure: {
          school: {
            description: 'string',
            code: 'number',
            principal: {
              name: 'string'
            },
            classRooms: [
              {
                name: 'string',
                id: 'number'
              }
            ],
            teachers: [
              'string'
            ]
          }
        }
      },
      src: ['configuration/*.yml', 'other/important/*_stuff.yml']
    }
  }
});
```

#### Warning callback in Yaml parsing options

Using the `options.yaml.onWarning` callback, the possible parsing errors can be retrieved.

```js
grunt.initConfig({
  yaml_validator: {
    custom: {
      options: {
        yaml: {
          onWarning: function (error, filepath) {
            console.log(filepath + ' has error: ' + error);
          }
        }
      },
      src: ['configuration/*.yml', 'other/important/*_stuff.yml']
    }
  }
});
```

#### Write a JSON file option

It is possible to use the `options.writeJson` to have all the files processed,
to be saved in JSON format, in the same file path as the original Yaml files.

```js
grunt.initConfig({
  yaml_validator: {
    custom: {
      options: {
        writeJson: true
      },
      src: ['configuration/*.yml', 'other/important/*_stuff.yml']
    }
  }
});
```

## Contributing

["A Beginner's Guide to Open Source: The Best Advice for Making your First Contribution"](http://www.erikaheidi.com/blog/a-beginners-guide-to-open-source-the-best-advice-for-making-your-first-contribution/).

[Also there is a blog post about "45 Github Issues Dos and Don’ts"](https://davidwalsh.name/45-github-issues-dos-donts).

Linting is done with [ESLint](http://eslint.org) and can be executed with `npm run lint`.
There should be no errors appearing after any JavaScript file changes.

Please note that any features or changes will not be merged without working unit tests.

## Release History

* `vx.0.0` (2020-x)
  - Migrated to version 2 of Semaphore CI
* `v2.0.0` (2020-05-29)
  - Minimum Node.js version lifted from `8.11.1` to `10.13.0`
  - Updated `yaml-validator` to `v2.2.0`
* `v1.0.0` (2019-01-22)
  - Minimum Node.js version lifted from `4.2.0` to `8.11.1`
  - Updated `yaml-validator` to `v2.0.0`
* `v0.10.0` (2016-08-10)
  - Dependencies are sure :tophat: up to date, among `yaml-validator` version `0.2.0`
  - Moved testing from Drone.io to [Semaphore](https://paazmaya.semaphoreci.com/projects/grunt-yaml-validator)
  - Grunt `v1.0.0` is now the minimum
  - Use shared ESLint configuration and ESLint directly without the Grunt.js plugin
* `v0.9.0` (2016-02-22)
  - Start using [`yaml-validator`](https://www.npmjs.com/package/yaml-validator) separately
* `v0.8.0` (2016-02-22)
  - Minimum Node.js version required/supported is now `4.2.0` (LTS)
  - Update dependencies
* `v0.7.3` (2014-12-17)
  - Try/catch around Yaml parsing to avoid breaking in between files
* `v0.7.2` (2014-11-03)
  - Undefined key crashes if used
* `v0.7.1` (2014-11-03)
  - Object properties in array are correctly matched
* `v0.7.0` (2014-11-03)
  - Removed deprecated options `types` and `keys` and report rewording
* `v0.6.0` (2014-11-03)
  - New option `structure` to replace `types` and `keys`
* `v0.5.2` (2014-11-03)
  - Tag mismatch in earlier version
* `v0.5.1` (2014-11-03)
  - New option to save Yaml files as pretty printed JSON files
* `v0.5.0` (2014-10-31)
  - Default option values unified to be false. Multitasking fixed.
* `v0.4.0` (2014-10-30)
  - Added type checking configuration option
* `v0.3.0` (2014-10-29)
  - Extended `keys` configuration option which was renamed from `structure`
* `v0.2.2` (2014-10-28)
  - Log total number as last in the output string
* `v0.2.1` (2014-10-27)
  - Remove unused dependency
* `v0.2.0` (2014-10-27)
  - Log file option
* `v0.1.1` (2014-10-27)
  - Fix structure type and update documentation
* `v0.1.0` (2014-10-27)
  - Initial release to the World

## License

Copyright (c) [Juga Paazmaya](https://paazmaya.fi) <paazmaya@yahoo.com>

Licensed under [the MIT license](LICENSE).
