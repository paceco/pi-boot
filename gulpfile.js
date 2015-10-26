var gulp       = require('gulp');
var concat     = require('gulp-concat');
var libsass    = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var uglify     = require('gulp-uglify');
var notify     = require('gulp-notify');
var changed    = require('gulp-changed');

// Asset Handling - SCSS and JS
// ---------------------------------------------------------------------------

// Compile top-level sass and autoprefix that jounce
gulp.task('sass', function () {
	return gulp.src('assets/source/sass/*.scss')
	.pipe(libsass({
		outputStyle: 'nested', // only supports nested or compressed
		sourceComments: 'normal'
	}))
	// Prevent sass from stopping on errors
	.on('error', handleErrors)
	// Autoprefixer defaults to > 1%, last 2 versions, Firefox ESR, Opera 12.1 browser support
	.pipe(autoprefix())
	.pipe(gulp.dest('assets/build/css'));
});

// Compile top-level sass and compress it like whoa
gulp.task('sass-build', function () {
	return gulp.src('assets/source/sass/*.scss')
	.pipe(libsass({
		outputStyle: 'compressed', // only supports nested or compressed
	}))
	// Prevent sass from stopping on errors
	.on('error', handleErrors)
	// Autoprefixer defaults to > 1%, last 2 versions, Firefox ESR, Opera 12.1 browser support
	.pipe(autoprefix())
	.pipe(gulp.dest('assets/build/css'));
});

// Top level task to compile both third-party and custom JS
gulp.task('concat', ['vendor-concat', 'js-concat']);

// Concatenates third-party js
gulp.task('vendor-concat', function(){
	return gulp.src([
		// Load bootstrap js in order
		'./assets/source/js/vendor/bootstrap/transition.js',
		'./assets/source/js/vendor/bootstrap/alert.js',
		'./assets/source/js/vendor/bootstrap/button.js',
		'./assets/source/js/vendor/bootstrap/carousel.js',
		'./assets/source/js/vendor/bootstrap/collapse.js',
		'./assets/source/js/vendor/bootstrap/dropdown.js',
		'./assets/source/js/vendor/bootstrap/modal.js',
		'./assets/source/js/vendor/bootstrap/tooltip.js',
		'./assets/source/js/vendor/bootstrap/popover.js',
		'./assets/source/js/vendor/bootstrap/scrollspy.js',
		'./assets/source/js/vendor/bootstrap/tab.js',
		'./assets/source/js/vendor/bootstrap/affix.js',
		// Any other plugins? Load here as necessary
		'./assets/source/js/vendor/*.js',
	])
	.pipe(concat('vendor.js'))
	.pipe(gulp.dest('./assets/build/js/'));
});

// Concatenates all custom js
gulp.task('js-concat', function(){
    return gulp.src([
        './assets/source/js/main.js',
		// Any others? Load here as necessary
        // './assets/source/js/*.js',
    ])
    .pipe(concat('custom.js'))
    .pipe(gulp.dest('./assets/build/js'));    
});

// Move static files only if there are changes
gulp.task('static', function(){
	return gulp.src('assets/static/**/*')
	.pipe(changed('assets/build'))
	// extra pipes can go here if needed, ie image compression
	.pipe(gulp.dest('assets/build'));
});


// Watch and Build Functions
// ---------------------------------------------------------------------------

// Compiles compressed version of sass, then builds and minifies all js
gulp.task('build', ['concat','sass-build', 'static'], function(){
	return gulp.src('assets/build/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('assets/build/js'));
});

// Watch for changes, recompile sass and js
gulp.task('watch', function(){
	gulp.watch('assets/src/sass/**/*.scss', ['sass']);
	gulp.watch('assets/src/js/**/*.js', ['concat']);
	gulp.watch('assets/static/**/*', ['static']);
});

// Default Task
// Build everything and kick off the watch
// ---------------------------------------------------------------------------

// Build everything and kick off the watch
gulp.task('default', ['concat', 'sass', 'static', 'watch']);

// Error Handling
// ---------------------------------------------------------------------------

function handleErrors(){
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
}
