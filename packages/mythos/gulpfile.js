var gulp = require("gulp");
var gulpRoot = require('../gulp.root')
var gulpHelper = gulpRoot(gulp, {
    packageName: 'mythos',
    packageName: 'Mythos',
    require: require
});

gulpHelper.allTargets();
