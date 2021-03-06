// 获取依赖
var gulp = require('gulp'), childProcess = require('child_process'),
  electron = require('electron'),
  electron_packger = require('electron-packager');

var packger_options = {
  dir: '.',
  icon: 'doc/logo.ico',
  ignore: [
    'node_modules/.bin',
    'node_modules/electron',
    'node_modules/electron-prebuilt',
    'node_modules/electron-prebuilt-compile',
    'node_modules/electron-packager',
    '.git',
    '.gitignore',
    '.vscode'
  ],
  out: 'out',
  platform: 'all',
  arch: 'all',
  overwrite: true,
  prune: true,
  asar: true
};

function extend_options(ret) {
  for (var src_i = 1; src_i < arguments.length; ++src_i) {
    var src = arguments[src_i] || {};
    ret = ret || {};
    for (var i in src) {
      if ('object' == typeof (src[i]) && 'object' == typeof (ret[i])) {
        ret[i] = extend_options(ret[i], src[i]);
      } else {
        ret[i] = src[i];
      }
    }
  }

  return ret;
}

// 创建 gulp 任务
gulp.task('copy-libs', function () {
  // gulp.src('./node_modules/bootstrap/**')
  //   .pipe(gulp.dest('./src/node_modules/bootstrap'))
  //   ;
  // gulp.src('./node_modules/jquery/**')
  //   .pipe(gulp.dest('./src/node_modules/jquery'))
  //   ;
  // gulp.src('./node_modules/jquery.fancytree/**')
  //   .pipe(gulp.dest('./src/node_modules/jquery.fancytree'))
  //   ;
  // gulp.src('./node_modules/popper.js/**')
  //   .pipe(gulp.dest('./src/node_modules/popper.js'))
  //   ;
});

gulp.task('run', ['copy-libs'], function () {
  childProcess.spawn(electron, ['.'], { stdio: 'inherit' });
});

gulp.task('debug', ['copy-libs'], function () {
  childProcess.spawn(electron, ['--inspect-brk=5858', '.'], { stdio: 'inherit' });
});

gulp.task('package', ['copy-libs'], function () {
  var opts = extend_options({}, packger_options, {
    platform: 'all',
    arch: 'x64',
  });
  electron_packger(opts, function (err, appPaths) {
    if (err) {
      console.log(`${appPaths}: ${err}`);
    }
  });
});

gulp.task('package-all', ['copy-libs'], function () {
  var opts = extend_options({}, packger_options, {
    platform: 'all',
    arch: 'all',
  });
  electron_packger(opts, function (err, appPaths) {
    if (err) {
      console.log(`${appPaths}: ${err}`);
    }
  });
});

gulp.task('package-test', ['copy-libs'], function () {
  var opts = extend_options({}, packger_options, {
    platform: 'win32',
    arch: 'x64',
  });

  electron_packger(opts, function (err, appPaths) {
    if (err) {
      console.log(`${appPaths}: ${err}`);
    }
  });
});