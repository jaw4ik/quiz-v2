var gulp = require('gulp'),
    Q = require('q'),
    fs = require('fs'),
    SystemJSBuilder = require('jspm').Builder,
    config = require('../../config');

gulp.task('build-system', function () {
    return new SystemJSBuilder(config.app.baseAppPath, config.app.systemConfigFilePath)
        .bundle('[**/*]', {
            config: {
                meta: {
                    '*.html': {
                        loader: 'text'
                    },
                    '*.json': {
                        build: false
                    },
                    '*.spec.js': {
                        build: false
                    },
                    'main-built.js': {
                        build: false
                    }
                }
            }
        })
        .then(function (bundle) {
            bundle.modules.forEach(function (moduleName) {
                if (getFileExtension(moduleName) === 'html') {
                    bundle.source = replaceModuleName(bundle.source, moduleName);
                }
            });

            fs.writeFile(config.app.outputMainBuiltFilePath, bundle.source);
        })
        .catch(function (err) {
            console.log('SystemJS build error');
            console.log(err);
        });
});

function getFileExtension(fileName) {
    return fileName.split('.').pop();
}

function replaceModuleName(source, moduleName) {
    return source.replace('define("' + moduleName, 'define("' + moduleName + '!text');
}