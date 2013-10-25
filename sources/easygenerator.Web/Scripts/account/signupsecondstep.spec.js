﻿define([], function () {
    "use strinct";

    var viewModel;

    describe('viewModel [signupsecondstep]', function () {
        beforeEach(function () {
            viewModel = signUpSecondStepModel();
        });

        it('should be object', function () {
            expect(viewModel).toBeObject();
        });

        describe('peopleBusyWithCourseDevelopmentAmount:', function () {

            it('should be defined', function () {
                expect(viewModel.peopleBusyWithCourseDevelopmentAmount).toBeDefined();
            });

            it('should be observable', function () {
                expect(viewModel.peopleBusyWithCourseDevelopmentAmount).toBeObservable();
            });

        });

        describe('needAuthoringTool', function () {

            it('should be defined', function () {
                expect(viewModel.needAuthoringTool).toBeDefined();
            });

            it('should be observable', function () {
                expect(viewModel.needAuthoringTool).toBeObservable();
            });

        });

        describe('usedAuthoringTool', function () {

            it('should be defined', function () {
                expect(viewModel.usedAuthoringTool).toBeDefined();
            });

            it('should be observable', function () {
                expect(viewModel.usedAuthoringTool).toBeObservable();
            });

        });

        describe('isSignupRequestPending:', function () {

            it('should be observable', function () {
                expect(viewModel.isSignupRequestPending).toBeObservable();
            });

        });

        describe('signup', function () {

            it('should be function', function () {
                expect(viewModel.signUp).toBeFunction();
            });

            var ajax;
            beforeEach(function () {
                ajax = $.Deferred();
                spyOn($, 'ajax').andReturn(ajax.promise());
            });

            describe('when signup request already pending', function () {

                it('should not call \"/api/user/signup"', function () {
                    viewModel.isSignupRequestPending(true);
                    viewModel.peopleBusyWithCourseDevelopmentAmount('2');
                    viewModel.needAuthoringTool('now');
                    viewModel.usedAuthoringTool('PowerPoint');
                    viewModel.signUp();

                    expect($.ajax).not.toHaveBeenCalled();
                });

            });

            describe('when signup request is not pending', function () {

                it('should call \"/api/user/signup"', function () {
                    viewModel.peopleBusyWithCourseDevelopmentAmount('2');
                    viewModel.needAuthoringTool('now');
                    viewModel.usedAuthoringTool('PowerPoint');
                    viewModel.signUp();

                    expect($.ajax).toHaveBeenCalledWith({
                        url: '/api/user/signup',
                        data: { PeopleBusyWithCourseDevelopmentAmount: '2', NeedAuthoringTool: 'now', UsedAuthoringTool: 'PowerPoint' },
                        type: 'POST'
                    });
                });

                it('should set isSignupRequestPending', function () {
                    viewModel.isSignupRequestPending(false);
                    viewModel.peopleBusyWithCourseDevelopmentAmount('2');
                    viewModel.needAuthoringTool('now');
                    viewModel.usedAuthoringTool('PowerPoint');
                    viewModel.signUp();

                    expect(viewModel.isSignupRequestPending()).toBeTruthy();
                });

                describe('and request succeded', function () {
                    var trackEvent;
                    var username;

                    beforeEach(function () {
                        trackEvent = $.Deferred();
                        spyOn(app, 'trackEvent').andReturn(trackEvent.promise());
                        username = 'username@easygenerator.com';
                        ajax.resolve({ data: 'username@easygenerator.com' });
                    });

                    it('should track event \'Sign up\'', function () {
                        viewModel.signUp();

                        waitsFor(function () {
                            return ajax.state() === "resolved";
                        });
                        runs(function () {
                            expect(app.trackEvent).toHaveBeenCalledWith('Sign up', { username: username });
                        });
                    });

                    describe('and event is tracked', function () {

                        beforeEach(function () {
                            trackEvent.resolve();
                        });

                        it('should redirect to home page', function () {
                            spyOn(app, 'openHomePage');

                            viewModel.signUp();

                            waitsFor(function () {
                                return ajax.state() !== "pending";
                            });
                            runs(function () {
                                expect(app.openHomePage).toHaveBeenCalled();
                            });
                        });

                    });

                });

                describe('and request fails', function () {

                    beforeEach(function () {
                        ajax.reject();
                    });
                    
                    it('should reset isSignupRequestPending to false', function () {
                        viewModel.signUp();

                        waitsFor(function () {
                            return ajax.state() !== "pending";
                        });
                        runs(function () {
                            expect(viewModel.isSignupRequestPending()).toBeFalsy();
                        });
                    });

                });

            });

        });

    });
})