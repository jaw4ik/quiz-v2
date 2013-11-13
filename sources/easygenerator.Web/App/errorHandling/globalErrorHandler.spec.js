﻿define(['errorHandling/globalErrorHandler', 'errorHandling/httpErrorHandlerRegistrator', 'errorHandling/httpErrorHandlers/defaultHttpErrorHandler'],
    function (errorHandler, errorHandlerRegistrator, defaultHttpErrorHandler) {

        describe('[globalErrorHandler]', function () {

            describe('subscribeOnAjaxErrorEvents:', function () {

                var ajaxErrorHandler;
                beforeEach(function () {
                    spyOn($.fn, 'ajaxError').andCallFake(function (arg) {
                        ajaxErrorHandler = arg;
                    });
                });

                it('should be function', function () {
                    expect(errorHandler.subscribeOnAjaxErrorEvents).toBeFunction();
                });

                describe('and when document ajax error triggered', function () {

                    beforeEach(function () {
                        errorHandler.subscribeOnAjaxErrorEvents();

                        spyOn(defaultHttpErrorHandler, 'handleError');
                    });

                    describe('and when response is defined', function () {
                        describe('and when response status is defined', function () {
                            var status = 503;
                            describe('and when error handler is registered for this status', function () {

                                var registeredErrorHandler = { handleError: function () { } };
                                beforeEach(function () {
                                    errorHandlerRegistrator.registeredHandlers[status] = registeredErrorHandler;
                                    spyOn(registeredErrorHandler, 'handleError');
                                });

                                it('should call handleError() method for registered error handler', function () {
                                    var response = { status: 503 };
                                    ajaxErrorHandler({}, response);
                                    expect(registeredErrorHandler.handleError).toHaveBeenCalledWith(response);
                                });
                            });

                            describe('and when error handler is not registered for this status', function () {

                                beforeEach(function () {
                                    errorHandlerRegistrator.registeredHandlers[status] = undefined;
                                });

                                it('should call handleError() method for default error handler', function () {
                                    var response = { status: 503 };
                                    ajaxErrorHandler({}, response);
                                    expect(defaultHttpErrorHandler.handleError).toHaveBeenCalledWith(response);
                                });

                            });
                        });

                        describe('and when response status is not defined', function () {
                            it('should call handleError() method for default error handler', function () {
                                var response = { value: 'message' };
                                ajaxErrorHandler({}, response);
                                expect(defaultHttpErrorHandler.handleError).toHaveBeenCalledWith(response);
                            });
                        });
                    });

                    describe('and when response is not defined', function () {
                        it('should call handleError() method for default error handler', function () {
                            ajaxErrorHandler({});
                            expect(defaultHttpErrorHandler.handleError).toHaveBeenCalledWith(undefined);
                        });
                    });

                });

            });

        });
    });