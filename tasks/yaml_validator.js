/**
 * grunt-yaml-validator
 * https://github.com/paazmaya/grunt-yaml-validator
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license.
 */


const YamlValidatore = require('yaml-validator');

module.exports = function yamlValidator(grunt) {

  grunt.registerMultiTask('yaml_validator', 'Validate Yaml files and enforce a given structure', function registerMulti() {

    // Default options
    const options = this.options({
      log: false,
      structure: false,
      yaml: false,
      writeJson: false
    });

    const files = this.filesSrc.filter(function filterFiles(filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');

        return false;
      }

      return true;
    });

    const validator = new YamlValidatore(options);
    validator.validate(files);
    validator.report();

    if (validator.inValidFilesCount) {
      grunt.fail.warn('YAML validation errors found.');
    }
    else {
      grunt.log.ok(files.length + ' ' + grunt.util.pluralize(files.length, 'file/files') + ' lint free.');
    }
  });

};
