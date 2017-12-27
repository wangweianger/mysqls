const gulp = require('gulp')
const babel = require('gulp-babel');
const uglify = require('gulp-uglify')
const clean = require('gulp-clean')
const rename = require('gulp-rename')

gulp.task('build', () =>
    gulp.src('./src/*.js')
    .pipe(babel({
        presets: ['env'],
        plugins: ["syntax-dynamic-import","transform-object-rest-spread",["transform-es2015-modules-commonjs", {
      "allowTopLevelThis": true
    }]]
    }))
    .pipe(uglify())
    //.pipe(rename('zane-calendar.min.js'))
    .pipe(gulp.dest('./build'))
); 
gulp.task('default', ['build']);




