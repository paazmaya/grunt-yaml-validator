/**
 * grunt-yaml-validator
 * https://github.com/paazmaya/grunt-yaml-validator
 *
 * Copyright (c) Juga Paazmaya <olavic@gmail.com>
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  require('time-grunt')(grunt); // Must be first item

  grunt.initConfig({
    eslint: {
      options: {
        config: '.eslintrc',
        format: 'stylish'
      },
      target: [
        'Gruntfile.js',
        'tasks/*.js'
      ]
    },

    yaml_validator: {
      defaults: {
        src: ['fixtures/defaults.yml']
      },

      logged: {
        options: {
          log: 'yaml-validator.log'
        },
        src: ['fixtures/logged.yml']
      }

    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  grunt.loadTasks('tasks');

  require('jit-grunt')(grunt);

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['yaml_validator', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['eslint', 'test']);

};
