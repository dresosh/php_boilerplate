// Required Modules
var gulp        = require( 'gulp' )
   ,sass        = require( 'gulp-sass' )
   ,uglify      = require( 'gulp-uglify' )
   ,plumber     = require( 'gulp-plumber' )
   ,rename      = require( 'gulp-rename' )
   ,plumber     = require( 'gulp-plumber' )
   ,del         = require( 'del' )
   ,browserSync = require( 'browser-sync' )
   ,reload      = browserSync.reload

// Variables
var scss   = './scss/**/*.scss'
   ,css    = ''
   ,js     = './js/**/*.js'
   ,markup = ''



// Javascript tasks
gulp.task( 'scripts', function() {
  gulp.src( [ js, '!./js/**/*.min.js' ] )
      .pipe( plumber() )
      .pipe( rename( { suffix: '.min' } ) )
      .pipe( uglify() )
      .pipe( gulp.dest( './js') )
      .pipe( reload( { stream:true } ) )
})


// Sass compiler
gulp.task('sass', function () {
  return gulp.src( scss )
    .pipe(sass( { outputStyle: 'compressed' } ).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});


//Html Watch
gulp.task( 'html', function() {
  gulp.src( './*.html' )
      .pipe( reload( { stream:true } ) )
})


// Browser-Sync
gulp.task( 'browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  })
})


// Watch task
gulp.task( 'watch', function() {
  gulp.watch( './js/*', ['scripts'] )
  gulp.watch( './scss/*', ['sass'] )
  gulp.watch( './*', ['html'] )
})

// Gulp task
gulp.task( 'default', [ 'browser-sync', 'watch' ] )
