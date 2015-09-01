/*******************************
            Set-up
*******************************/

var
  gulp         = require('gulp-help')(require('gulp')),

  // read user config to know what task to load
  config       = require('./static/semantic/tasks/config/user'),

  // watch changes
  watch        = require('./static/semantic/tasks/watch'),

  // build all files
  build        = require('./static/semantic/tasks/build'),
  buildJS      = require('./static/semantic/tasks/build/javascript'),
  buildCSS     = require('./static/semantic/tasks/build/css'),
  buildAssets  = require('./static/semantic/tasks/build/assets'),

  // utility
  clean        = require('./static/semantic/tasks/clean'),
  version      = require('./static/semantic/tasks/version'),

  // docs tasks
  serveDocs    = require('./static/semantic/tasks/docs/serve'),
  buildDocs    = require('./static/semantic/tasks/docs/build'),

  // rtl
  buildRTL     = require('./static/semantic/tasks/rtl/build'),
  watchRTL     = require('./static/semantic/tasks/rtl/watch')
;


/*******************************
             Tasks
*******************************/

gulp.task('default', false, [
  'watch'
]);

gulp.task('watch', 'Watch for site/theme changes', watch);

gulp.task('build', 'Builds all files from source', build);
gulp.task('build-javascript', 'Builds all javascript from source', buildJS);
gulp.task('build-css', 'Builds all css from source', buildCSS);
gulp.task('build-assets', 'Copies all assets from source', buildAssets);

gulp.task('clean', 'Clean dist folder', clean);
gulp.task('version', 'Displays current version of Semantic', version);

/*--------------
      Docs
---------------*/

/*
  Lets you serve files to a local documentation instance
  https://github.com/Semantic-Org/Semantic-UI-Docs/
*/

gulp.task('serve-docs', 'Serve file changes to SUI Docs', serveDocs);
gulp.task('build-docs', 'Build all files and add to SUI Docs', buildDocs);


/*--------------
      RTL
---------------*/

if(config.rtl) {
  gulp.task('watch-rtl', 'Build all files as RTL', watchRTL);
  gulp.task('build-rtl', 'Watch files as RTL ', buildRTL);
}