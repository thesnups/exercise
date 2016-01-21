var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var filter = require('gulp-filter');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');

// Minify HTML
gulp.task('htmlmin', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build'));
});

// Compile SASS, concatenate all styles, and rename
gulp.task('css', function() {
    var sassFilter = filter('*.scss', { restore: true });

    return gulp.src('src/styles/*.+(css|scss)')
        .pipe(sassFilter)
        .pipe(sass())
        .pipe(sassFilter.restore)
        .pipe(concat('style.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('build/styles'));
});

// Watch files for changes and update build
gulp.task('watch', function() {
    gulp.watch('src/*.html', ['htmlmin']);
    gulp.watch('src/styles/*.+(css|scss)', ['css']);
});

gulp.task('default', ['htmlmin', 'css']);
