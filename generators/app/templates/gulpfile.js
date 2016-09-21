/* eslint-env node */
(function () {
	'use strict';

	/**
	 *  Welcome to your gulpfile!
	 *  The gulp tasks are split in several files in the gulp directory
	 *  because putting all here was really too long
	 */

	var gulp = require('gulp'),
		wrench = require('wrench');

	/**
	 *  This will load all js or coffee files in the gulp directory
	 *  in order to load all gulp tasks
	 */
	wrench.readdirSyncRecursive('./gulp').filter(function (file) {
		return (/\.(js|coffee)$/i).test(file);
	}).map(function (file) {
		require('./gulp/' + file);
	});

})();