'use strict';

module.exports = function concurrent(grunt) {

	// these need to happen in order for es6 code to be processed by require.js
	grunt.registerTask('require-bundle', ['babel', 'clean:babel']);
	grunt.loadNpmTasks('grunt-concurrent');
	return {
		build: {
			tasks: ['babel'],
			options: {
				logConcurrentOutput: true
			}
		},
		test: {
			tasks: ['mochacli:test'],
			options: {
				logConcurrentOutput: true
			}
		}
	};
};