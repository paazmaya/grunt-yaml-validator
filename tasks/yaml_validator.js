/**
 * grunt-yaml-validator
 * https://github.com/paazmaya/grunt-yaml-validator
 *
 * Copyright (c) Juga Paazmaya <olavic@gmail.com>
 * Licensed under the MIT license.
 */

'use strict';

var yaml = require('js-yaml'),
  check = require('check-type').init();

module.exports = function(grunt) {
  var options,
    logs = [],
    mismatchedTypes = [], // list of filepaths
    missingKeys = 0;

  /**
   * Wrapper to call Grunt API and store message for
   * possible later use by writing a log file.
   * @param {string} msg Error message
   */
  var errored = function (msg) {
    logs.push(msg);
    grunt.log.error(msg);
  };

  /**
   * Check that the given object matches the given key structure.
   * @param {Object} doc Object loaded from Yaml file
   * @param {string|Array} keys List of required keys
   * @returns {Array} List of missing keys
   */
  var checkKeys = function checkKeys(doc, keys) {
    var missing = [];

    if (typeof keys === 'string') {
      keys = [keys];
    }
    keys.forEach(function (key) {
      var has = check(doc).has(key);
      if (!has) {
        missing.push(key);
      }
    });

    return missing;
  };

  /**
   *
   * @param {Object} doc Object loaded from Yaml file
   * @param types
   */
  var checkTypes = function checkTypes(doc, types) {
    return check(doc).matches(types);
  };

  /**
   * Read the given Yaml file, load and check its structure.
   * @param {string} filepath Yaml file path
   * @returns {void}
   */
  var checkFile = function checkFile(filepath) {

    // Verbose output will tell which file is being read
    var data = grunt.file.read(filepath);

    var doc = yaml.safeLoad(data, {
      onWarning: function (error) {
        errored(error);
        if (options.yaml !== null &&
          typeof options.yaml.onWarning === 'function') {
          options.yaml.onWarning.call(this, error, filepath);
        }
      }
    });

    if (options.keys !== null) {
      var missing = checkKeys(doc, options.keys);
      var len = missing.length;

      if (len > 0) {
        errored(filepath + ' is missing the following keys: ');
        errored(grunt.log.wordlist(missing, {color: 'grey'}));
      }

      // Increment the number of keys that were not according to the requirement
      missingKeys += len;
    }

    if (options.types !== null) {
      var mismatching = checkTypes(doc, options.types);
      if (!mismatching) {
        errored(filepath + ' is not matching the type requirements');
        mismatchedTypes.push(filepath);
      }
    }
  };

  grunt.registerMultiTask('yaml_validator', 'Validate Yaml files and enforce a given structure', function() {
    var msg;

    // Default options
    options = this.options({
      log: false,
      keys: [],
      types: null,
      yaml: null
    });

    var files = this.filesSrc.filter(function(filepath) {
      if (!grunt.file.exists(filepath)) {
        var msg = 'Source file "' + filepath + '" not found.';
        logs.push(msg);
        grunt.log.warn(msg);
        return false;
      }
      return true;
    });

    files.map(checkFile);

    if (mismatchedTypes.length > 0) {
      errored('Type mismatching found in total of ' + mismatchedTypes.length + ' files');
    }
    else {
      msg = 'No mismatching type requirements found.';
      logs.push(msg);
      grunt.verbose.writeln(msg);
    }

    if (missingKeys === 0) {
      msg = 'All done. No missing keys found. Thank you.';
      logs.push(msg);
      grunt.verbose.writeln(msg);
    }
    else {
      errored('Found missing keys, total of: ' + missingKeys);
    }

    if (typeof options.log === 'string') {
      grunt.file.write(options.log, grunt.log.uncolor(logs.join('\n')));
    }
  });

};
