var gulp       = require('gulp');
var concat     = require('gulp-concat');
var libsass    = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var uglify     = require('gulp-uglify');
var notify     = require('gulp-notify');
var changed    = require('gulp-changed');

// Compile top-level sass and autoprefix that jounce
gulp.task('sass', function () {
	return gulp.src('assets/src/sass/*.scss')
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
	return gulp.src('assets/src/sass/*.scss')
	.pipe(libsass({
		outputStyle: 'compressed', // only supports nested or compressed
	}))
	// Prevent sass from stopping on errors
	.on('error', handleErrors)
	// Autoprefixer defaults to > 1%, last 2 versions, Firefox ESR, Opera 12.1 browser support
	.pipe(autoprefix())
	.pipe(gulp.dest('assets/build/css'));
});

// Concatenates all js
gulp.task('concat', function(){
	gulp.src([
		// Load bootstrap js in order
		'./assets/src/js/plugins/bootstrap/transition.js',
		'./assets/src/js/plugins/bootstrap/alert.js',
		'./assets/src/js/plugins/bootstrap/button.js',
		'./assets/src/js/plugins/bootstrap/carousel.js',
		'./assets/src/js/plugins/bootstrap/collapse.js',
		'./assets/src/js/plugins/bootstrap/dropdown.js',
		'./assets/src/js/plugins/bootstrap/modal.js',
		'./assets/src/js/plugins/bootstrap/tooltip.js',
		'./assets/src/js/plugins/bootstrap/popover.js',
		'./assets/src/js/plugins/bootstrap/scrollspy.js',
		'./assets/src/js/plugins/bootstrap/tab.js',
		'./assets/src/js/plugins/bootstrap/affix.js',
		// Any other plugins?
		'./assets/src/js/plugins/*.js',
		// Load custom js
		'./assets/src/js/main.js'
	])
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./assets/build/js/'));
});

// Compiles sass and js, then minifies all js
gulp.task('build', ['concat','sass-build'], function(){
	gulp.src('assets/build/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('assets/build/js'));
});

// Watch for changes, recompile sass and js
gulp.task('watch', function(){
	gulp.watch('assets/src/sass/**/*.scss', ['sass']);
	gulp.watch('assets/src/js/**/*.js', ['concat']);
});

// Build everything and kick off the watch
gulp.task('default', ['concat', 'sass', 'watch']);

// Error function
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
