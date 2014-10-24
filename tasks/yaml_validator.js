/**
 * grunt-yaml-validator
 * https://github.com/paazmaya/grunt-yaml-validator
 *
 * Copyright (c) Juga Paazmaya
 * Licensed under the MIT license.
 */

'use strict';

var checkStructure = function () {};


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
        // Return the number of keys that were not according to the requirement
        return 0;
      });


      grunt.log.writeln('Done. Thank you. Found ' + missing);
    });
  });

};
