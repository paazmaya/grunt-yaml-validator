# grunt-yaml-validator

> Validate Yaml files and enforce a given structure

[Yaml](http://yaml.org/) files are parsed via [`js-yaml`](https://github.com/nodeca/js-yaml) 
and the structure defined via task configuration is enforced with
[`check-type`](https://github.com/alistairjcbrown/check-type).

## Getting Started

This plugin requires Grunt `~0.4` and registers itself as a multi task plugin.

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
the above is not needed.

## The "yaml_validator" task

Please note that this project is a [multi task plugin](http://gruntjs.com/creating-tasks#multi-tasks),
so pay special attention for configuring it.

### Overview

In your project's Gruntfile, add a section named `yaml_validator` to the data object passed into `grunt.initConfig()`.

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
    },
  },
});
```

### Options

#### options.structure

Type: `Object`
Default value: `'{}'`

An object to define the structure which the Yaml files should contain.

#### options.yaml

Type: `Object`
Default value: `null`

Options passed to [`safeload` method of `js-yaml`](https://github.com/nodeca/js-yaml#safeload-string---options-).

### Usage Examples

#### Default Options

In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  yaml_validator: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options

In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  yaml_validator: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. 
Add unit tests for any new or changed functionality. 
Lint with [ESLint](http://eslint.org) and test your code using [Grunt](http://gruntjs.com/).

## Release History

_(Nothing yet)_

## License

Copyright (c) Juga Paazmaya, under [the MIT license](LICENSE-MIT)
