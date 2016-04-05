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
   ,imageResize = require( 'gulp-image-resize' )
   ,strip       = require( 'gulp-strip-comments' )

// Variables
var scss        = './prod/scss/**/*.scss'
   ,css         = ''
   ,js          = './prod/js/**/*.js'
   ,jsmin       = './prod/js/**/*.min.js'
   ,markup      = './prod/*.html'



// Javascript tasks
gulp.task( 'scripts', function() {
  gulp.src( [ js, '!' + jsmin ] )
      .pipe( plumber() )
      .pipe( rename( { suffix: '.min' } ) )
      .pipe( uglify() )
      .pipe( gulp.dest( './js') )
      .pipe( reload( { stream:true } ) )
})


// Sass compiler
gulp.task('sass', function () {
  return gulp.src( scss )
    .pipe( sass( { outputStyle: 'compressed' } ).on('error', sass.logError))
    .pipe( gulp.dest('./css'))
    .pipe( reload( { stream:true } ) )
});


//Html Watch
gulp.task( 'markup', function() {
  gulp.src( markup )
      .pipe( reload( { stream:true } ) )
})


// Browser-Sync
gulp.task( 'browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./prod"
    }
  })
})


// Deploy for web



// Watch task
gulp.task( 'watch', function() {
  gulp.watch( './js/**/*', ['scripts'] )
  gulp.watch( './scss/**/*', ['sass'] )
  gulp.watch( './**/*', ['markup'] )
})

// Gulp task
gulp.task( 'default', [ 'browser-sync', 'watch' ] )
