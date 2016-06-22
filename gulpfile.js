var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var rename = require("gulp-rename");

gulp.task('connect', function () {
	connect.server({
		root: 'public',
		port: 4000
	})
});

gulp.task('def', function () {
  return gulp.src('./css/*.css')
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest('public/css/'));
});

gulp.task('css', function () {
  return gulp.src('css/*.css')
        .pipe(concatCss('bundle.css'))
        // .pipe(minifyCss())
        // .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('public/css'));
        // .pipe(connect.reload());
      });

gulp.task('html', function () {
  return gulp.src('app/**/*.html')
        .pipe(gulp.dest('public'))
        .pipe(connect.reload());
      });

gulp.task('browserify', function() {
	// Grabs the app.js file
    return browserify('./app/app.js')
    	// bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('sass', function() {
	return sass('sass/style.sass')
		.pipe(gulp.dest('public/css'))
});

gulp.task('watch', function() {
	gulp.watch('app/**/*.js', ['browserify'])
	gulp.watch('sass/style.sass', ['sass'])

});

gulp.task('default', ['connect', 'watch'])