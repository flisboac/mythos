var gulp = require("gulp");
var gulpRoot = require('../gulp.root');
var typedoc = require("gulp-typedoc");
var gulpHelper = gulpRoot(gulp, {
    packageName: 'mythos-api',
    packageName: 'Mythos API',
    require: require
});

gulpHelper.allTargets({except: ['build:docs']});

gulp.task("build:docs", () => {
    return gulp.src("src/index.ts")
        .pipe(typedoc(gulpHelper.typedocConfig));
});
