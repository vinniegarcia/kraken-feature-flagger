'use strict';

module.exports = function (grunt) {
	// load all grunt tasks matching the `grunt-*` pattern
	require('load-grunt-config')(grunt, {
		configPath: require('path').resolve('tasks')
	});

	// Test
	grunt.registerTask('test', ['babel', 'concurrent:test', 'eslint:dist']);

};