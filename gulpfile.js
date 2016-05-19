// Required Modules
var gulp          = require( 'gulp' )
   ,sass          = require( 'gulp-sass' )
   ,uglify        = require( 'gulp-uglify' )
   ,plumber       = require( 'gulp-plumber' )
   ,rename        = require( 'gulp-rename' )
   ,plumber       = require( 'gulp-plumber' )
   ,del           = require( 'del' )
   ,browserSync   = require( 'browser-sync' )
   ,reload        = browserSync.reload
   ,imageResize   = require( 'gulp-image-resize' )
   ,sourcemaps    = require( 'gulp-sourcemaps' )
   ,autoprefixer  = require( 'gulp-autoprefixer' )
   ,strip         = require( 'gulp-strip-comments' )

// Variables
var scss          = './prod/scss/**/*.scss'
   ,css           = './prod/css'
   ,dcss          = './dist/css'
   ,js            = './prod/js/**/*.js'
   ,jsmin         = './prod/js/**/*.min.js'
   ,markup        = './prod/**/*.+(html|php)'



// Image resize
gulp.task( 'resize', function() {
  gulp.src( './prod/images/*' )
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
      .pipe( sourcemaps.init() )
      .pipe( sass( { outputStyle: 'compressed' } ).on('error', sass.logError) )
      .pipe( sourcemaps.write() )
      .pipe( autoprefixer([
        'last 2 versions',
        '> 5%',
        'Firefox ESR',
        'ie 9',
        'opera 12'
      ]) )
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
  browserSync.init({
		proxy: 'localhost/php_boilerplate/prod'
	})
})


// Deploy for web
// Delete /dist files
gulp.task( 'nuke', function() {
  del([
    'dist/**'
  ])
})


//Delete sourcemaps and comments in main.css
gulp.task( 'deploy:clean', ['deploy:copy'], function() {
  return gulp.src( dcss + '/main.css' )
      .pipe( strip() )
      .pipe( gulp.dest( dcss ) )
})

// Make a copy of /prod named /dist
gulp.task( 'deploy:copy', function() {
  return gulp.src( 'prod/**/*' )
      .pipe( gulp.dest( 'dist/' ) )
})

// Delete scss files and unminified js files
gulp.task( 'deploy:create', ['deploy:clean'], function() {
  del([
    'dist/scss/',
    'dist/js/!(*.min.js)'
  ])
})

gulp.task( 'deploy', ['deploy:create'] )


// Watch task
gulp.task( 'watch', function() {
  gulp.watch( './prod/js/**/*', ['scripts'] )
  gulp.watch( './prod/scss/**/*', ['sass'] )
  gulp.watch( './prod/**/*', ['markup'] )
})

// Gulp task
gulp.task( 'default', [ 'browser-sync', 'scripts', 'sass', 'watch' ] )
