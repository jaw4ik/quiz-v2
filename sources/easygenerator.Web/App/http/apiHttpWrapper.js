﻿define(['notify', 'http/httpRequestSender', 'durandal/app'],
    function (notify, httpRequestSender, app) {
        "use strict";

        var
            post = function (url, data) {
                app.trigger('apiHttpWrapper:post-begin');

                var headers = {
                    "Authorization": "Bearer " + localStorage['token-api']
                };

                return httpRequestSender.post(url, data, headers)
                    .then(function (response) {
                        debugger;
                        if (!_.isObject(response)) {
                            throw 'Response data is not an object';
                        }

                        if (!response.success) {
                            notify.error(response.errorMessage);
                            throw response.errorMessage;
                        }

                        return response.data;
                    })
                    .fin(function () {
                        app.trigger('apiHttpWrapper:post-end');
                    });
            }
        ;

        return {
            post: post
        };
    });