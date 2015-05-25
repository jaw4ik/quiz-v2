﻿define(['constants', 'http/storageHttpWrapper'], function (constants, storageHttpWrapper) {
    var storageConstants = constants.storage;

    return {
        getTicket: getTicket,
        finishUpload: finishUpload,
        updateUploadTimeout: updateUploadTimeout,
        cancelUpload: cancelUpload
    }

    function getTicket(size, title) {
        return storageHttpWrapper.get(storageConstants.host + storageConstants.video.ticketUrl, { size: size, title: title }).then(function (data) {
            return {
                videoId: data.VideoId,
                uploadUrl: data.UploadUrl
            }
        });
    }

    function finishUpload(videoId) {
        return storageHttpWrapper.post(storageConstants.host + storageConstants.video.finishUrl, { videoId: videoId });
    }

    function updateUploadTimeout(videoId) {
        return storageHttpWrapper.post(storageConstants.host + storageConstants.video.progressUrl, { videoId: videoId });
    }

    function cancelUpload(videoId) {
        return storageHttpWrapper.post(storageConstants.host + storageConstants.video.cancelUrl, { videoId: videoId });
    }
});