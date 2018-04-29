'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var compile = require('gulp-sass');
var cssbeautify = require('gulp-cssbeautify');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

// Compile scss into css
// Add vendor prefixing
gulp.task("sass", function() {
	console.log("Compiling style.scss --> style.css")
	return gulp.src("app/css/sass/style.scss")
	.pipe(compile())
	.pipe(autoprefixer({
		browsers: ['last 3 versions'],
		cascade: false
	}))
	.pipe(cssbeautify())
	.pipe(gulp.dest("app/css/"))
	.pipe(browserSync.reload({
      stream: true
    }))
});

// Refresh the browser after compiling is finished
gulp.task('browserSync', function() {
	console.log("Refreshing the browser, wait a moment...");
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
});

gulp.task('default', ['sass', 'browserSync'], function (){
	gulp.watch('app/css/sass/*.scss', ['sass']); 
	// Reloads the browser whenever HTML or JS files change
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/scripts/*.js', browserSync.reload);
});