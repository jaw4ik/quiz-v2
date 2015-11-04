var gulp = require('gulp'),
    buildUtils = require('../build-utils')();

gulp.task('web-build', ['styles'], function () {
    return buildProjects.buildProjects(['./sources/easygenerator.Web/easygenerator.Web.csproj']);
});

gulp.task('web-iis-express', ['web-build'], $.shell.task([
    '"%ProgramFiles%\\IIS Express\\iisexpress" /path:"' + (args.path || 'D:\\Development\\easygenerator\\sources\\easygenerator.Web') + '" /port:666 /systray:true'
]));