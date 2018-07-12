'use strict';
// -----------------------------------------------------------------------------
// Gulpfile.js
// Configuración para tests de Gulp con diferentes componentes npm.
// GULP 4
// https://github.com/gulpjs/gulp/blob/4.0/README.md#use-last-javascript-version-in-your-gulpfile
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Dependencias para el desarrollo (npm install xxx@yyy --dev)
// -----------------------------------------------------------------------------
const gulp = require('gulp');
// var data = require('gulp-data');
var markdown = require('gulp-markdown');
const render = require('gulp-nunjucks-render');
const sass = require('gulp-sass');
const sync = require('browser-sync').create();


// // -----------------------------------------------------------------------------
// // Markdown
// // Trabajar con gulp-rename, si no, la extensión del resultado
// // sigue siendo "md".
// // Ver: https://github.com/sindresorhus/gulp-markdown/issues/1
// // -----------------------------------------------------------------------------
// gulp.task('markdown', function(done){
// 	return gulp.src('src/md/*.md')
// 		.pipe(markdown())
// 		.pipe(gulp.dest('src/nunjucks/templates/md2html'));
// 		done();
// });

gulp.task('markdown', () =>
    gulp.src('src/md/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('src/nunjucks/templates/md2html'))
);

// -----------------------------------------------------------------------------
// Templating
// -----------------------------------------------------------------------------
gulp.task('nunjucks', function(done) {
    return gulp.src('src/nunjucks/pages/*.njk')
        .pipe(render({
            path: ['src/nunjucks/pages/', 'src/nunjucks/templates/', 'src/nunjucks/templates/partials/', 'src/nunjucks/macros/']
        }))
			.pipe(gulp.dest('dist/'));
	done();
});

// -----------------------------------------------------------------------------
// Sass
// -----------------------------------------------------------------------------
gulp.task('sass', function(done) {
	return gulp.src('src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest('dist/css'));
	done();
});


// -----------------------------------------------------------------------------
// Static server
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/minimal-browsersync-setup-with-gulp4.md
// -----------------------------------------------------------------------------
function reload(done) {
	sync.reload();
	done();
}
function serve(done) {
	sync.init({
		server: {
			baseDir: 'dist'
		}
	});
	done();
}

// -----------------------------------------------------------------------------
// Watchers
// https://stackoverflow.com/questions/39665773/gulp-error-watch-task-has-to-be-a-function
// -----------------------------------------------------------------------------
gulp.task('watch', function(done) {
    gulp.watch(['src/md/**/*.md', 'src/sass/**/*.scss', 'src/nunjucks/**/*.njk'],
    gulp.series('markdown', 'sass', 'nunjucks', reload));
	done();
});

// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------
gulp.task('default', gulp.series('markdown', 'sass', 'nunjucks', serve, 'watch'));

// gulp.task('default', ['sass', 'markdown', 'nunjucks', 'watch', 'browser-sync']);
// gulp.task('default', ['sass', 'nunjucks', 'watch', 'browser-sync']);
// gulp.task('default', ['sass', 'nunjucks', 'watch', 'browse']);
// gulp.task('default', gulp.series('nunjucks', 'sass', gulp.parallel(serve,'watch')));
