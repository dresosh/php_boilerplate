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

// Variables
var scss        = './prod/scss/**/*.scss'
   ,css         = './css'
   ,js          = './prod/js/**/*.js'
   ,jsmin       = './prod/js/**/*.min.js'
   ,markup      = './prod/*.html'





// Image resize
gulp.task( 'resize', function() {
  gulp.src( './prod/images/*')
      .pipe( imageResize({
        width:320,
        height:180,
        crop: true,
        upscalse:false
      }))
      .pipe( gulp.dest( './prod/images/thumb' ) )
})


// Javascript tasks
gulp.task( 'scripts', function() {
  gulp.src( [ js, '!' + jsmin ] )
      .pipe( plumber() )
      .pipe( rename( { suffix: '.min' } ) )
      .pipe( uglify() )
      .pipe( gulp.dest( './prod/js') )
      .pipe( reload( { stream:true } ) )
})


// Sass compiler
gulp.task('sass', function () {
  return gulp.src( scss )
    .pipe( sass( { outputStyle: 'compressed' } ).on('error', sass.logError))
    .pipe( gulp.dest( css ))
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
gulp.task( 'nuke', function() {
  del([
    'dist/**'
  ])
})


gulp.task( 'deploy:copy', function() {
  return gulp.src( 'prod/**/*' )
             .pipe( gulp.dest( 'dist/' ) )
})


gulp.task( 'deploy:create', ['deploy:copy'], function() {
  del([
    'dist/scss/',
    'dist/js/!(*.min.js)'
  ])
})

gulp.task( 'deploy', [ 'deploy:create'] )


// Watch task
gulp.task( 'watch', function() {
  gulp.watch( './prod/js/**/*', ['scripts'] )
  gulp.watch( './prod/scss/**/*', ['sass'] )
  gulp.watch( './prod/**/*', ['markup'] )
})

// Gulp task
gulp.task( 'default', [ 'browser-sync', 'watch' ] )
