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
  grunt = require('grunt');

var YamlValidatore = function(options) {
  this.options = options;
  this.logs = [];
  this.nonValidPaths = [];
  this.inValidFiles = []; // list of filepaths
};


/**
 * Wrapper to call Grunt API and store message for
 * possible later use by writing a log file.
 * @param {string} msg Error message
 */
YamlValidatore.prototype.errored = function errored(msg) {
  this.logs.push(msg);
  grunt.log.error(msg);
};


/**
 * Check that the given structure is available.
 * @param {Object} doc Object loaded from Yaml file
 * @param {Object} structure Structure requirements
 * @param {string} parent Address in a dot notation
 * @returns {Array} List of not found structure paths
 */
YamlValidatore.prototype.validateStructure = function validateStructure(doc, structure, parent) {
  var notFound = [],
    current = '',
    notValid; // false or path

  parent = parent || '';

  for (var key in structure) {
    if (!structure.hasOwnProperty(key)) {
      continue;
    }

    current = parent;
    if (!check(structure).is('Array')) {
      current += (parent.length > 0 ? '.' : '') + key;
    }

    var item = structure[key];

    if (item instanceof Array) {
      if (check(doc[key]).is('Array')) {
        doc[key].forEach(function (child, index) {
          notValid = validateStructure([child], item, current + '[' + index + ']');
          notFound = notFound.concat(notValid);
        });
      }
      else {
        notFound.push(current);
      }
    }
    else if (typeof item === 'string') {
      notValid = !((check(structure).is('Array') || check(doc).has(key)) && check(doc[key]).is(item));

      // Key can be a index number when the structure is an array, but passed as a string
      notFound.push(notValid ? current : false);
    }
    else if (typeof item == 'object' && item !== null) {
      notValid = validateStructure(doc[key], item, current);
      notFound = notFound.concat(notValid);
    }
  }

  return notFound.filter(function (item) {
    return item !== false;
  });
};

/**
 * Read the given Yaml file, load and check its structure.
 * @param {string} filepath Yaml file path
 * @returns {number} 0 when no errors, 1 when errors.
 */
YamlValidatore.prototype.checkFile = function checkFile(filepath) {

  // Verbose output will tell which file is being read
  var data = grunt.file.read(filepath),
    hadError = 0,
    _self = this;

  var doc = yaml.safeLoad(data, {
    onWarning: function (error) {
      hadError = 1;
      _self.errored(error);
      if (_self.options.yaml &&
        typeof _self.options.yaml.onWarning === 'function') {
        _self.options.yaml.onWarning.call(this, error, filepath);
      }
    }
  });

  if (this.options.writeJson) {
    var json = JSON.stringify(doc, null, '  ');
    grunt.file.write(filepath.replace(/yml$/, 'json'), json);
  }

  if (this.options.structure) {
    var nonValidPaths = this.validateStructure(doc, this.options.structure);

    if (nonValidPaths.length > 0) {
      hadError = 1;
      this.errored(filepath + ' is not following the correct structure, missing:');
      this.errored(grunt.log.wordlist(nonValidPaths, {color: 'grey'}));
      this.nonValidPaths = this.nonValidPaths.concat(nonValidPaths);
    }
  }

  return hadError;
};

/**
 * Create a report out of this, but in reality also run.
 */
YamlValidatore.prototype.validate = function validate(files) {
  var _self = this;
  this.inValidFiles = files.map(function (filepath) {
    return _self.checkFile(filepath);
  }).reduce(function (prev, curr) {
    return prev + curr;
  });
};

/**
 * Create a report out of this, but in reality also run.
 */
YamlValidatore.prototype.report = function report() {

  if (this.inValidFiles.length > 0) {
    this.errored('Structure mismatching found in total of ' + this.inValidFiles.length + ' files');
  }

  var len = this.nonValidPaths.length;
  grunt.log.writeln('Total of ' + len + ' validation error' + grunt.util.pluralize(len, '/s'));

  if (typeof this.options.log === 'string') {
    grunt.file.write(this.options.log, grunt.log.uncolor(this.logs.join('\n')));
  }
};

module.exports = function yamlValidator(grunt) {

  grunt.registerMultiTask('yaml_validator', 'Validate Yaml files and enforce a given structure', function() {

    // Default options
    var options = this.options({
      log: false,
      structure: false,
      yaml: false,
      writeJson: false
    });

    var files = this.filesSrc.filter(function(filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return false;
      }
      return true;
    });

    var validator = new YamlValidatore(options);
    validator.validate(files);
    validator.report();
  });

};
