// npm i --save-dev gulp gulp-print gulp-util rimraf

// CSS
// npm i --save-dev gulp-autoprefixer gulp-less

// Server JS
// npm i --save-dev gulp-babel

// Client JS
// npm i --save-dev webpack babel-loader babel-runtime

var gulp = require('gulp')
var gutil = require('gulp-util')

// CSS
var autoprefixer = require('gulp-autoprefixer')
var less = require('gulp-less')

// Server JS
var babel = require('gulp-babel')

// Client JS
var webpack = require('webpack')

// Other
var print = require('gulp-print')
var rimraf = require('rimraf')

function tellerror(err) {
	console.error('ERROR', err.message)
	this.emit('end')
}

gulp.task('default', [ 'js', 'css' ])

gulp.task('js', [ 'server-js', 'client-js' ])

gulp.task('server-js', function() {
	return gulp.src('src/server/**/*.js')
		.pipe(print())
		.pipe(babel({ stage: 1 }))
		.on('error', tellerror)
		.pipe(gulp.dest('build'))
})

var clientJsCompiler = webpack(require('./webpack.config.js'))
gulp.task('client-js', function(cb) {
	clientJsCompiler.run(function(err, stats) {
		if (err) throw new gutil.PluginError('client-js', err);
		gutil.log('client-js', stats.toString({
			colors: true,
			chunks: false,
			version: false,
			timings: false
		}))
		cb()	
	})
})

gulp.task('css', function(cb) {
	return gulp.src('src/client/css/**/*.less')
		.pipe(print())
		.pipe(less({ compress: true }))
		.on('error', tellerror)
		.pipe(autoprefixer())
		.pipe(gulp.dest('public/build/css'))
})

gulp.task('watch', [ 'default' ], function() {
	gulp.watch('src/**/*.js', [ 'js' ])
	gulp.watch('src/**/*.less', [ 'css' ])
})

gulp.task('clean', function() {
	rimraf.sync('build')
	rimraf.sync('public/build')
})
