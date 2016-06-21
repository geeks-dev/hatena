var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    fs = require('fs'),
    rename = require('gulp-rename'),
    browserify = require('gulp-browserify');

gulp.task('header:js', function() {
    return gulp.src(['src/js/header/**/*.js'])
        .pipe(concat('header.min.js'))
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('jquery:js', function() {
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js'
            // 'node_modules/jquery.transit/jquery.transit.js'
        ])
        .pipe(concat('jqandpl.min.js'))
        .pipe(uglify({
            mangle: false,
            preserveComments: 'license'
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('footer:js', function() {
    return gulp.src(['src/js/footer/app.js'])
        .pipe(browserify({
            insertGlobals: true,
            jquery: 'jquery-browserify'
        }))
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('license', function(done) {
    var license = fs.readFileSync('src/sass/comment.txt', 'utf-8');
    var css = fs.readFileSync('dist/css/style.min.css', 'utf-8');
    var result = license + css;
    fs.writeFileSync("dist/css/style.min.css", result);
    done();
})

gulp.task('default', function() {
    gulp.watch('dist/css/style.min.css', ['license']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/js/header/*.js', ['header:js']);
    gulp.watch('src/js/footer/*.js', ['footer:js']);
});