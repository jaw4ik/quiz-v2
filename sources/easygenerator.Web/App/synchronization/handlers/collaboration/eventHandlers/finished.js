﻿define(['guard', 'durandal/app', 'constants', 'dataContext'],
    function (guard, app, constants, dataContext) {
        "use strict";

        return function (courseId) {
            guard.throwIfNotString(courseId, 'CourseId is not a string');

            dataContext.courses = _.reject(dataContext.courses, function (item) {
                return item.id == courseId;
            });

            app.trigger(constants.messages.course.collaboration.finished, courseId);
        }

    });