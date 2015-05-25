﻿define(['durandal/app', 'constants', 'videoUpload/uploadDataContext'], function (app, constants,  uploadDataContext) {

    var videoConstants = constants.storage.video;

    return {

        initialize: function () {
            startTrackUploadProgress();
            startTrackUploadChanges();
        }
    };

    function startTrackUploadChanges() {
        setTimeout(function () {

            if (uploadDataContext.uploadChanged()) {
                uploadDataContext.uploadChanged(false);
                app.trigger(videoConstants.changesInUpload);
            }

            startTrackUploadChanges();

        }, videoConstants.trackChangesInUploadTimeout);
    }

    function startTrackUploadProgress() {
        setTimeout(function () {

            if (uploadDataContext.queueUploads.length) {
                var arrayPromises = [];

                _.each(uploadDataContext.queueUploads, function (item) {
                    arrayPromises.push(item.handler().then(function () {
                        uploadDataContext.uploadChanged(true);
                    }));
                });

                $.when.apply($, arrayPromises).then(function () {
                    startTrackUploadProgress();
                });

            } else {
                startTrackUploadProgress();
            }

        }, videoConstants.trackChangesInUploadTimeout);
    }
})