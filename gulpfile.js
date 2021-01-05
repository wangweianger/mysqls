const gulp = require('gulp')
const babel = require('gulp-babel');
const uglify = require('gulp-uglify')
const clean = require('gulp-clean')
const rename = require('gulp-rename')

gulp.task('build', () =>
    gulp.src('./src/*.js')
    .pipe(babel({
        presets: ['env','es2015'],
        plugins: ["transform-runtime"]
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./build'))
); 
gulp.task('default', gulp.series(['build']));




