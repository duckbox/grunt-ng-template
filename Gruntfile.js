/*
 * grunt-ng-template
 * https://github.com/chris/grunt-ng-template.git
 *
 * Copyright (c) 2013 Chris Grant
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    ng_template: {
      // default_options: {
      //   options: {
      //   },
      //   files: {
      //     'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123'],
      //   },
      // },
      // custom_options: {
      //   options: {
      //     separator: ': ',
      //     punctuation: ' !!!',
      //   },
        files: ['_views'],

        options : {
          base : 'index.html'
        },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'ng_template', 'nodeunit']);

  grunt.registerTask('demo', ['ng_template']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
