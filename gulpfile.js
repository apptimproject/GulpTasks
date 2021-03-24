const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const htmlmin = require('gulp-htmlmin');
const browsersync = require('browser-sync').create();

const sourcePath = "./src";
const destPath = "./dist";

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: destPath
        },
        port: 3000
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

//minify and combine all css files into one bundle file
function buildCss() {
    return gulp.src('src/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.css'))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
}

function buildJs() {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
}


//minify html files
function buildHtml() {
    return gulp
        .src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: false }))
        .pipe(gulp.dest('dist/'));
}

const watch = gulp.parallel(watchFiles, browserSync);
const build = gulp.parallel(buildHtml, buildCss, buildJs);
const rebuildAndReload = gulp.series(build, browserSyncReload);

// Watch files
//any file change -> build -> reload browser
function watchFiles() {
    gulp.watch(
        [
            "./src/*",
            "./src/**/*"
        ],
        rebuildAndReload
    );
}

// export tasks
exports.html = buildHtml;
exports.css = buildCss;
exports.js = buildJs;

exports.watch = watch;
exports.build = build;
exports.default = gulp.series(build, watch);