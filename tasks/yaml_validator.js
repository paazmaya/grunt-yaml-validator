/**
 * grunt-yaml-validator
 * https://github.com/paazmaya/grunt-yaml-validator
 *
 * Copyright (c) Juga Paazmaya <olavic@gmail.com>
 * Licensed under the MIT license.
 */

'use strict';

var yaml = require('js-yaml'),
  check = require('check-type').init(),
  colors = require('colors');


module.exports = function(grunt) {
  var options;

  /**
   * Check that the given object matches the given structure.
   * @param {Object} doc Object loaded from Yaml file
   * @param {Array} required List of required keys
   * @returns {Array} List of missing keys
   */
  var checkStructure = function checkStructure(doc, required) {
    var missing = [];
    required.forEach(function (key) {
      var has = check(doc).has(key);
      if (!has) {
        missing.push(key);
      }
    });
    return missing;
  };

  /**
   * Read the given Yaml file, load and check its structure.
   * @param {string} filepath Yaml file path
   * @returns {number} Total number of missing keys for the given file
   */
  var checkFile = function checkFile(filepath) {

    // Verbose output will tell which file is being read
    var data = grunt.file.read(filepath);

    var doc = yaml.safeLoad(data, {
      onWarning: function (error) {
        grunt.log.error(error);
        if (typeof options.yaml === 'object' && typeof options.yaml.onWarning === 'function') {
          options.yaml.onWarning.call(this, error, filepath);
        }
      }
    });

    var missing = checkStructure(doc, options.structure);
    var len = missing.length;

    if (len > 0) {
      grunt.log.error(filepath + ' is missing the following keys: ');
      grunt.log.error(grunt.log.wordlist(missing, {color: 'grey'}));
    }

    // Return the number of keys that were not according to the requirement
    return len;
  };

  grunt.registerMultiTask('yaml_validator', 'Validate Yaml files and enforce a given structure', function() {

    // Default options
    options = this.options({
      structure: [],
      yaml: null
    });

    var missing = this.filesSrc.filter(function(filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return false;
      }
      return true;

    }).map(checkFile);

    var total = missing.reduce(function (prev, curr) {
      return prev + curr;
    });

    if (total === 0) {
      grunt.verbose.writeln('All done. No missing keys found. Thank you.');
    }
    else {
      grunt.log.error('Found total of ' + total + ' missing keys');
    }
  });

};
