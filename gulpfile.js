const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    autoprefixer = require('gulp-autoprefixer')
order = require("gulp-order");

const path = {
    prod: {
        root: 'prod/',
        img: 'prod/img/',
        css: 'prod/css',
        lib: 'prod/lib',
        js: 'prod/js'
    },
    dev: {
        root: 'dev/**/*',
        html: 'dev/**/*.html',
        img: 'dev/img/*',
        scss: 'dev/scss/*.scss',
        lib: 'dev/lib/*.js',
        jquery: "dev/lib/jquery.min.js",
        js: 'dev/js/*.js'
    }
}

gulp.task('html', () =>
    gulp.src(path.dev.html)
    .pipe(connect.reload())
);

gulp.task('sass', () =>
    gulp.src(path.dev.scss)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(path.prod.css))
    .pipe(connect.reload())
);

gulp.task('image', () =>
    gulp.src(path.dev.img)
    .pipe(imagemin())
    .pipe(gulp.dest(path.prod.img))
    .pipe(connect.reload())
);

gulp.task('concat-lib', function() {
    gulp.src(path.dev.lib)
        .pipe(order([
            'jquery.min.js',
            'jquery.migrate.min.js',
            'scrollOverflow.min.js',
            'jquery.fullPage.min.js',
            '*.js'
        ]))
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest(path.prod.lib))
        .pipe(connect.reload())
});

gulp.task('concat-js', () =>
    gulp.src(path.dev.js)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(path.prod.js))
    .pipe(connect.reload())
);

gulp.task('watch', () => {
    connect.server({
        root: 'prod',
        livereload: true
    });
    gulp.watch(path.dev.html, ['html']);
    gulp.watch(path.dev.scss, ['sass']);
    gulp.watch(path.dev.js, ['concat-js']);
    gulp.watch(path.dev.lib, ['concat-lib']);
    gulp.watch(path.dev.img, ['image']);
});

gulp.task('default', ['watch']);
