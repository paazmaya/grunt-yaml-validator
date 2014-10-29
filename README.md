# grunt-yaml-validator

> Validate Yaml files and enforce a given structure

[![Dependency Status](https://david-dm.org/paazmaya/grunt-yaml-validator.svg)](https://david-dm.org/paazmaya/grunt-yaml-validator)

[Yaml](http://yaml.org/) files are parsed via [`js-yaml`](https://github.com/nodeca/js-yaml)
and the structure defined via task configuration is enforced with
[`check-type`](https://github.com/alistairjcbrown/check-type).

## Getting Started

This plugin requires Grunt `~0.4` and Node.js `0.10.0`.

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

#### options.log

Type: `string|boolean`

Default value: `false`

In case the value is not `false`, the given string will be used as log file where all the
task output is written.

Please note that running Grunt with `-v` (verbose) mode does make a difference in the
resulting output.

#### options.keys

Type: `string|array`

Default value: `[]`

An array to list the property structure which the Yaml files should contain.

#### options.yaml

Type: `Object`

Default value: `null`

Options passed to [`safeload` method of `js-yaml`](https://github.com/nodeca/js-yaml#safeload-string---options-).

Please note that the `onWarning` callback is being used by this plugin and any method written for it,
will be run after the one implemented in this plugin.
The callback get called with two parameters, of which the first is the error in question,
while the second is the file path of the given Yaml file.

#### options.types

Type: `object`

Default: `'null'`

The given object, when not null, is passed directly to [the `matches()` method](https://github.com/alistairjcbrown/check-type#example-checking-object-properties-using-matches).


### Usage Examples

#### Default Options

By using the default option values, only the validity of the configured Yaml files are checked.

```js
grunt.initConfig({
  yaml_validator: {
    defaults: {
      options: {
        log: false,
        keys: [],
        yaml: null
      },
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

#### Key structure option

Required keys are defined as strings, either a single one, or an array of them.

In case the `key` is given as a string, it is considered to be a
property path defined in dot notation, and is passed directly to the
`has()` method of the
[`check-type`](https://github.com/alistairjcbrown/check-type) plugin.

```js
grunt.initConfig({
  yaml_validator: {
    custom: {
      options: {
        keys: 'school.language'
      },
      src: ['configuration/*.yml', 'other/important/*_stuff.yml']
    }
  }
});
```

When the given structure is defined as an array of strings,
it is validated through the `has()` method.

```js
grunt.initConfig({
  yaml_validator: {
    custom: {
      options: {
        keys: [
          'school',
          'school.description',
          'school.title',
          'school.language'
        ]
      },
      src: ['configuration/*.yml', 'other/important/*_stuff.yml']
    }
  }
});
```

#### Type definition option

When the `types` configuration options is used, each property key is checked
with the `has()` method as done in the earlier examples, and also the resulting value
is evaluated for the given type.

```js
grunt.initConfig({
  yaml_validator: {
    custom: {
      options: {
        types: {
          'school.description': 'string',
          'school.code': 'number',
          'school.principal': 'object',
          'school.principal.name': 'string'
        }
      },
      src: ['configuration/*.yml', 'other/important/*_stuff.yml']
    }
  }
});
```

#### Warning callback in Yaml parsing options

Using the `onWarning` callback, the possible parsing errors can be retrieved.

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

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.
Lint with [ESLint](http://eslint.org) and test your code using unit tests.

Please note that any features or changed will not be merged without working unit tests.

## Release History

* v0.1.0 (2014-10-27) Initial release to the World
* v0.1.1 (2014-10-27) Fix structure type and update documentation
* v0.2.0 (2014-10-27) Log file option
* v0.2.1 (2014-10-27) Remove unused dependency
* v0.2.2 (2014-10-28) Log total number as last in the output string
* v0.3.0 (2014-10-29) Extended `keys` configuration option which was renamed from `structure`
* v0.4.0 (2014-10-) Added type checking configuration option

## License

Copyright (c) Juga Paazmaya, licensed under [the MIT license](LICENSE-MIT)
