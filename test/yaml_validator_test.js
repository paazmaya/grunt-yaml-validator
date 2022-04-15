/**
 * grunt-yaml-validator
 * https://github.com/paazmaya/grunt-yaml-validator
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license.
 */


const grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.yaml_validator = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  defaults_options: function(test) {
    test.expect(1);

    const actual = grunt.file.read('tmp/defaults.yml');
    const expected = grunt.file.read('test/expected/defaults.yml');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },

  logged_options: function(test) {
    test.expect(1);

    const actual = grunt.file.read('tmp/custom_options');
    const expected = grunt.file.read('test/expected/custom_options');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  }

};
