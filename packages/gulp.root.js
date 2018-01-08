
function gulpPrepare(gulp, options) {

    options = options || {};

    var packageName = options.packageName || "mythos";
    var projectName = options.projectName || packageName;
    var require = options.require || module.require;

    var gulpsync = require('gulp-sync')(gulp);
    var ts = require("gulp-typescript");
    var typedoc = require("gulp-typedoc");
    var debug = require('gulp-debug');

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
                // "externalPattern": "\"**/node_modules/@types/**/*.ts\"",
                "includeDeclarations": true,
                "ignoreCompilerErrors": true,
                "excludePrivate": true,
                "excludeExternals": false,
                "excludeNotExported": true
            };
            this.tsProject = tsProject;
        }

        allTargets(options) {
            options = options || {};
            options.except = options.except || [];
            if (typeof options.except === 'string') options.except = [options.except];

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
                    .pipe(debug())
                    .pipe(tsProject(ts.reporter.longReporter()))
                    .pipe(gulp.dest("."));
            });
        }

        buildDocsTarget() {

            gulp.task("build:docs", () => {
                return tsProject.src()
                    .pipe(typedoc(this.typedocConfig));
            });
        }
    }

    return new GulpHelper();
}

module.exports = gulpPrepare;
