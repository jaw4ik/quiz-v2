var gulp = require('gulp'),
    del = require('del'),
    args = require('yargs').argv,
    runSequence = require('run-sequence'),
    xmlpoke = require('xmlpoke'),
    buildUtils = require('../build-utils')();

var outputDirectory = args.output || 'D:/Applications/easygenerator',
    instance = args.instance || 'Release',
    version = typeof args.version === 'string' && args.version !== '' ? args.version : '1.0.0',
    createTags = Boolean(args.createTags);

gulp.task('build-main-project', function () {
    return buildUtils.buildProjects(['./sources/easygenerator.Web/easygenerator.Web.csproj'], outputDirectory + '/bin', outputDirectory);
});

gulp.task('build-web-config', function () {
    return buildUtils.transformWebConfig('./tools/WebConfigTransform/Transform.proj', './tools/WebConfigTransform', instance);
});

gulp.task('build-unit-tests', function () {
    return buildUtils.buildProjects([
        './sources/easygenerator.DomainModel.Tests/easygenerator.DomainModel.Tests.csproj',
        './sources/easygenerator.DataAccess.Tests/easygenerator.DataAccess.Tests.csproj',
        './sources/easygenerator.Infrastructure.Tests/easygenerator.Infrastructure.Tests.csproj',
        './sources/easygenerator.Web.Tests/easygenerator.Web.Tests.csproj'
    ]);
});

gulp.task('build', function (cb) {
    runSequence('clean', 'build-main-project', 'build-unit-tests', 'build-web-config', 'styles', cb)
});

gulp.task('deploy-download-folder', function (cb) {
    buildUtils.createDirectory(cb, outputDirectory + '/Download');
});

gulp.task('deploy-css', function () {
    return gulp.src('./sources/easygenerator.Web/Content/*.css')
        .pipe(gulp.dest(outputDirectory + '/Content'));
});

gulp.task('deploy-main-built-js', function () {
    return gulp.src('./sources/easygenerator.Web/App/main-built.js')
        .pipe(gulp.dest(outputDirectory + '/App'));
});

gulp.task('deploy-web-config', function () {
    return buildUtils.moveWebConfig('./tools/WebConfigTransform/' + instance + '.config', outputDirectory);
});

gulp.task('remove-extra-files', function (cb) {
    del([outputDirectory + '/*debug.config',
        outputDirectory + '/*release.config',
        outputDirectory + '/packages.config',
        outputDirectory + '/bin/*.config',
        outputDirectory + '/bin/*.xml',
        outputDirectory + '/**/*.pdb',
        outputDirectory + '/**/*spec.js',
        outputDirectory + '/apple-touch-icon*',
        outputDirectory + '/Scripts/*.map',
        outputDirectory + '/humans.txt',
        outputDirectory + '/Content/*.less',
        outputDirectory + '/Scripts/jasmine',
        'tools/WebConfigTransform/' + instance + '.config'], { force: true }, cb);
});

gulp.task('add-version', function (cb) {
    xmlpoke(outputDirectory + '/Web.config', function (webConfig) {
        webConfig.withBasePath('configuration')
            .setOrAdd("appSettings/add[@key='version']/@value", version);
    });
    cb();
});

gulp.task('clean', function (callback) {
    del([outputDirectory], { force: true }, callback);
});

gulp.task('deploy', function (cb) {
    runSequence('build', 'deploy-download-folder', 'deploy-css', 'deploy-main-built-js', 'deploy-web-config', 'remove-extra-files', 'add-version', 'run-unit-tests', function () {
        if (createTags) {
            runSequence('create-tags', cb);
        } else {
            cb();
        }
    });
});