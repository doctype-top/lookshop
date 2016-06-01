var gulp = require('gulp');
var less = require('gulp-less');
var spritesmith = require('gulp.spritesmith');
var rename = require('gulp-rename');
var includer = require('gulp-htmlincluder');
var server = require('gulp-connect');
var livereload = require('gulp-livereload');

gulp.task('connect', function(){
    server.server({
        root: 'build/',
        livereload: true
    });
});

gulp.task('spriteCreator', function(){
	var sprite = gulp.src('dev/img/icons/*.png').pipe(spritesmith({
		imgName: '../img/sprite.png',
		cssName: 'sprite.less',
		cssFormat: 'less',
		algorithm: 'binary-tree',
		padding: 10
	}));
	sprite.img.pipe(rename('sprite.png')).pipe(gulp.dest('build/img/'));
	sprite.css.pipe(gulp.dest('dev/less/imports/'));
});

gulp.task('cssCreator', function(){
	gulp.src('dev/less/general.less').pipe(less()).pipe(gulp.dest('build/css')).pipe(server.reload());
})
gulp.task('htmlCreator', function(){
	gulp.src('dev/**/*.html').pipe(includer()).pipe(gulp.dest('build/')).pipe(server.reload());
});

gulp.task('default', function(){
    gulp.start('connect', 'htmlCreator', 'cssCreator');

    gulp.watch(['dev/**/*.html'], function() {
        gulp.start('htmlCreator');
    });
    gulp.watch(['dev/less/**/*.less'], function() {
        gulp.start('cssCreator');
    });
});