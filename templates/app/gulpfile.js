// npm i --save-dev gulp gulp-print rimraf

// CSS
// npm i --save-dev gulp-autoprefixer gulp-less

// Server JS
// npm i --save-dev gulp-babel

// Client JS
// npm i --save-dev babelify browserify buffer globby source through2 vinyl-source-stream

var gulp = require('gulp')
var path = require('path')

// CSS
var autoprefixer = require('gulp-autoprefixer')
var less = require('gulp-less')

// Server JS
var babel = require('gulp-babel')

// Client JS
var babelify = require('babelify')
var browserify = require('browserify')

// Other
var globby = require('globby')
var print = require('gulp-print')
var rimraf = require('rimraf')
var source = require('vinyl-source-stream')
var through = require('through2')

function tellerror(err) {
	console.error('ERROR', err.message)
	// this.emit('end')
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

gulp.task('client-js', function() {
	var stream = through()
		.pipe(print())
		.pipe(gulp.dest('public/build'))

	globby([ 'src/client/js/**/*.* ' ], function(err, paths) {
		if (err) {
			console.error(err)
			return stream.emit('error', err)
		}

		if (paths.length == 0)
			stream.emit('end')

		paths.forEach(function (fname) {
			var b = browserify(fname, {
				debug: true,
				transform: [ babelify.configure({
					stage: 1,
					optional: [ 'runtime' ]
				}) ]
			})

			console.log(path.relative('src/client', fname))
			b.bundle()
				.pipe(source(path.relative('src/client', fname)))
				.pipe(stream)
		})
	})

	return stream
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
