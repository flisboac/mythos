
function gulpPrepare(gulp, options) {

    options = options || {};

    var packageName = options.packageName || "mythos";
    var projectName = options.projectName || packageName;
    var require = options.require || module.require;

    var gulpsync = require('gulp-sync')(gulp);
    var ts = require("gulp-typescript");
    var typedoc = require("gulp-typedoc");
    var gulpDebug = require('gulp-debug');

    var tsProject = ts.createProject("tsconfig.json", {traceResolution: true});

    class GulpHelper {

        constructor() {

            this.typedocConfig = {
                "version": true,

                "name": projectName,
                "entryPoint": packageName,
                "target": "ES6",
                "module": "amd",

                "mode": "modules",
                "out": "dist/docs",
                "json": "./dist/docs.json",
                "readme": "README.md",
                "exclude": "\"**/{dist,node_modules/@types}/**/*\"",
                "externalPattern": "\"**/node_modules/@types/**/*.ts\"",
                "includeDeclarations": true,
                "ignoreCompilerErrors": true,
                "excludePrivate": true,
                "excludeExternals": false,
                "excludeNotExported": true
            }
        }

        allTargets(options) {
            options = options || {};
            options.except = options.except || [];

            if (!options.except.includes('default')) this.defaultTargets();
            if (!options.except.includes('build:src')) this.buildSrcTarget();
            if (!options.except.includes('build:docs')) this.buildDocsTarget();
        }

        defaultTargets() {

            gulp.task("default", ["build"]);
            gulp.task("build", gulpsync.sync(["build:src", "build:docs"]));
        }

        buildSrcTarget() {

            gulp.task("build:src", function () {
                return tsProject.src()
                    .pipe(gulpDebug())
                    .pipe(tsProject(ts.reporter.longReporter()))
                    .pipe(gulpDebug())
                    .pipe(gulp.dest("."));
            });
        }

        buildDocsTarget() {

            gulp.task("build:docs", () => {
                return gulp.src("src/index.ts")
                    .pipe(typedoc(this.typedocConfig));
            });
        }
    }

    return new GulpHelper();
}

module.exports = gulpPrepare;
