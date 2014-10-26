/**
 * grunt-yaml-validator
 * https://github.com/paazmaya/grunt-yaml-validator
 *
 * Copyright (c) Juga Paazmaya <olavic@gmail.com>
 * Licensed under the MIT license.
 */

'use strict';

var yaml = require('js-yaml'),
  check = require("check-type").init(),
  colors = require('colors');

/**
 * Check that the given object matches the given structure.
 * @param {object} doc Object loaded from Yaml file
 * @param {array} required List of required keys
 * @returns {number} Total number of keys missing
 */
var checkStructure = function (doc, required) {
  var missing = 0;
  required.forEach(function (key) {
    var has = check(doc).has(key);
    util.puts(colors[has ? 'green' : 'red'](key + ': ' + has));
    missing += has ? 0 : 1;
  });
  return missing;
};


module.exports = function(grunt) {

  grunt.registerMultiTask('yaml_validator', 'Validate Yaml files and enforce a given structure', function() {

    // Default options
    var options = this.options({
      structure: {},
      yaml: null
    });

    // Iterate over all specified file groups.
    this.filesSrc.forEach(function(f) {
      // Concat specified files.
      var missing = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        return true;
      }).map(function(filepath) {

        var data = grunt.file.read(filepath);

        var doc = yaml.safeLoad(data, {
          onWarning: function (error) {
            grunt.log.error(error);
          }
        });

        // Return the number of keys that were not according to the requirement
        return checkStructure(doc, this.options.structure);
      });

      grunt.log.writeln('Done. Thank you. Found ' + missing);
    });
  });

};
