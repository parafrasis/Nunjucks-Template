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
const data = require('gulp-data');
const exec = require('gulp-exec');
const spawn = require("gulp-spawn");
const markdown = require('gulp-markdown');
const render = require('gulp-nunjucks-render');
const sass = require('gulp-sass');
const sync = require('browser-sync').create();

//
// Hay que crear antes un fichero para el src (somefile.txt).
//
gulp.task('test', function(){
    var options = {
        continueOnError: false, // default = false, true means don't emit error event
        pipeStdout: true, // default = false, true means stdout is written to file.contents
        customTemplatingThing: 'test' // content passed to gutil.template()
    };
    var reportOptions = {
        err: false, // default = true, false means don't write err
        stderr: true, // default = true, false means don't write stderr
        stdout: false // default = true, false means don't write stdout
    };
    return gulp.src('somefile.txt')
        .pipe(exec('ls -alR src/* | grep njk', options))
        .pipe(exec.reporter(reportOptions))
        .pipe(gulp.dest('build/'));
});

// -----------------------------------------------------------------------------
// Graphviz w/ Spawn
// -----------------------------------------------------------------------------
gulp.task('gv', () =>
    gulp.src('src/dot/*.gv')
    .pipe(spawn({
        cmd: 'dot',
        args: ['-Tsvg'],
        filename: (base, ext) => {
            return base + '.gv.svg';
        }
    }))
    .pipe(gulp.dest('dist/img/'))
);

// // -----------------------------------------------------------------------------
// // Markdown
// // -----------------------------------------------------------------------------
gulp.task('markdown', () =>
    gulp.src('src/md/*.md')
    .pipe(markdown())
    .pipe(gulp.dest('src/nunjucks/templates/partials/md2html'))
);

// // -----------------------------------------------------------------------------
// // Templating
// // -----------------------------------------------------------------------------
gulp.task('nunjucks', () => {
    return gulp.src('src/nunjucks/pages/*.njk')
        .pipe(render({
            path: ['src/nunjucks/pages/', 'src/nunjucks/templates/', 'src/nunjucks/templates/partials/', 'src/nunjucks/macros/']
        }))
        .pipe(gulp.dest('dist/'));
});

// // -----------------------------------------------------------------------------
// // Sass
// // -----------------------------------------------------------------------------
gulp.task('sass', () => {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});


// // -----------------------------------------------------------------------------
// // Static server
// // https://github.com/gulpjs/gulp/blob/master/docs/recipes/minimal-browsersync-setup-with-gulp4.md
// // -----------------------------------------------------------------------------
const reload = (done) => {
    sync.reload();
    done();
}

const serve = (done) => {
    sync.init({
        server: {
            baseDir: 'dist'
        }
    });
    done();
}

// // // -----------------------------------------------------------------------------
// // // Watchers
// // // https://stackoverflow.com/questions/39665773/gulp-error-watch-task-has-to-be-a-function
// // // https://publishing-project.rivendellweb.net/migrating-projects-to-gulp-4-0-and-es6/
// // // -----------------------------------------------------------------------------
gulp.task('watch', () => {
    gulp.watch(['src/md/**/*.md', 'src/sass/**/*.scss', 'src/nunjucks/**/*.njk'],
        gulp.series('markdown', 'sass', 'nunjucks', reload));
});

// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------
gulp.task('default', gulp.series('markdown', 'sass', 'nunjucks', serve, 'watch'));
