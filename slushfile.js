var gulp = require('gulp')

var conflict = require('gulp-conflict')
var inquirer = require('inquirer')
var install = require('gulp-install')
var template = require('gulp-template')

gulp.task('default', function (cb) {
	inquirer.prompt([{
		type: 'input', name: 'packageName', message: 'Package Name'
	}, {
		type: 'input', name: 'port', message: 'Port', default: '8888'
	}], function (answers) {
		gulp.src(__dirname + '/templates/app/**')
			.pipe(template(answers))
			.pipe(conflict('./'))
			.pipe(gulp.dest('./'))
			.pipe(install()).on('end', cb)
			.resume()
	})
})
