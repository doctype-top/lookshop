var gulp = require('gulp');
var less = require('gulp-less');
var spritesmith = require('gulp.spritesmith');
var rename = require('gulp-rename');
var includer = require('gulp-htmlincluder');

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
	gulp.src('dev/less/general.less').pipe(less()).pipe(gulp.dest('build/css'));
})
gulp.task('htmlCreator', function(){
	gulp.src('dev/**/*.html').pipe(includer()).pipe(gulp.dest('build/'));
});