import gulp from 'gulp';
import sass from 'gulp-sass'
import browsersync from 'browser-sync';
import uglify from 'gulp-uglify';
import cssconcat from 'gulp-concat-css';
import cssclean from 'gulp-clean-css';
import jsconcat from 'gulp-concat';
import babel from 'gulp-babel';
import { concat } from 'rxjs/operator/concat';

export function browserSync(){
  browsersync.init({
    server: {
      baseDir: './dev/'
    },
    port: 8000
  });
}

const paths = {
  styles: {
    src: ['./node_modules/bootstrap/scss/bootstrap.scss'],
   // './src/scss/**/*.scss'],
    dest: './dev/asset/css/'
  },
  scripts: {
    src: ['./node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/popper.js/dist/popper.min.js',
    './node_modules/jquery/dist/jquery.min.js',
    ],
    //'./src/js/**/*.js'],
    dest: './dev/asset/js/'
  }
}

export function cssbundle() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error',sass.logError))
    .pipe(cssclean())
    .pipe(gulp.dest(paths.styles.dest))
}

export function css(){
  return gulp.src('./src/scss/style.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(cssconcat('style.css'))
    .pipe(cssclean())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browsersync.stream());
}

export function jslib() {
  return gulp.src(paths.scripts.src, {sourcemaps:true})
    .pipe(gulp.dest(paths.scripts.dest))
}

export function js(){
  return gulp.src('./src/js/**/*.js', {sourcemaps:true})
    .pipe(babel())
    .pipe(jsconcat('style.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browsersync.stream());
}

export function watchFile(){
  gulp.watch('./src/scss/**/*.scss', css);
  gulp.watch('./src/js/**/*.js', js);
  gulp.watch('./dev/**/*.html').on('change',browsersync.reload);
}

const build = gulp.parallel(browserSync, gulp.series(gulp.parallel(css,js), watchFile));

export default build;