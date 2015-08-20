var gulp = require('gulp')

var conflict = require('gulp-conflict')
var inquirer = require('inquirer')
var template = require('gulp-template')

gulp.task('default', function (cb) {
	inquirer.prompt([{
		type: 'input', name: 'packageName', message: 'Package Name'
	}, {
		type: 'input', name: 'port', message: 'Port', default: '8888'
	}], function (answers) {
		console.log(answers)

		gulp.src(__dirname + '/templates/app/**')
			.pipe(template(answers))
			.pipe(conflict('./gen'))
			.pipe(gulp.dest('./gen'))
			.on('end', cb)
	})
})
