var gulp = require("gulp");
var gulpRoot = require('../gulp.root')
var gulpHelper = gulpRoot(gulp, {
    packageName: 'mythos-api',
    packageName: 'Mythos RI',
    require: require
});

gulpHelper.allTargets();
