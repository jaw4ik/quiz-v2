﻿define(['errorHandling/httpErrorHandlers/forbiddenHttpErrorHandler'], function (errorHandler) {
    "use strict";

    describe('[forbiddenHttpErrorHandler]', function () {

        var
            notify = require('notify'),
            localizationManager = require('localization/localizationManager')
        ;

        describe('handleError:', function () {

            var response = {
                getResponseHeader: function () { }
            };

            beforeEach(function () {
                spyOn(notify, 'error');
                spyOn(localizationManager, 'localize');
            });

            it('should be function', function () {
                expect(errorHandler.handleError).toBeFunction();
            });

            it('should show notification', function () {
                errorHandler.handleError(response);
                expect(notify.error).toHaveBeenCalled();
            });

        });

    });
});