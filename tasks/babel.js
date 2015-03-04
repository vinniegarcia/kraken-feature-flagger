'use strict';

module.exports = function babel(grunt) {
	return {
		options: {
			blacklist: [],
			modules: 'common'
		},
		dist: {
			files: [{
				expand: true,
				cwd: 'src/',
				src: '**/*.js',
				dest: 'dist/',
				ext: '.js'
			}]
		}
	};
};