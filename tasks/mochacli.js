'use strict';

module.exports = function mochatest(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-mocha-cli');
	return {
		options: {
			globals: [],
			timeout: 10000,
			ignoreLeaks: true,
			ui: 'bdd',
			reporter: 'spec',
			grep: grunt.option('grep')
		},
		test: ['dist/test/**/*.js']
	};
};