'use strict';
var ES6JS = ['src/**/*.js'];
var testJS = ['src/test/**/*.js'];
module.exports = function eslint(grunt) {
	grunt.loadNpmTasks('grunt-eslint');
    return {
        options: {
            config: 'src/.eslintes6rc'
        },
        dist: {
        	options: {
        		config: 'src/.eslintrc'
        	},
        	src: ['dist/**/*.js']
        },
        es6: {
            src: ES6JS
        },
        test: {
            src: testJS
        }
    };
};