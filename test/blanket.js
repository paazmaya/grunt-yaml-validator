/**
 * grunt-yaml-validator
 * https://github.com/paazmaya/grunt-yaml-validator
 *
 * Copyright (c) Juga Paazmaya <olavic@gmail.com>
 * Licensed under the MIT license.
 */

'use strict';

// https://github.com/pghalliday/grunt-mocha-test#generating-coverage-reports

var path = require('path');
var srcDir = path.join(__dirname, '..', 'tasks');

require('blanket')({
  // Only files that match the pattern will be instrumented
  pattern: srcDir
});
