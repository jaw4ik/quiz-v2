﻿define(['viewmodels/panels/tabs/reviewTab'],
    function (viewModel) {

        var router = require('plugins/router'),
            constants = require('constants'),
            repository = require('repositories/courseRepository'),
            commentRepository = require('repositories/commentRepository'),
            eventTracker = require('eventTracker'),
            app = require('durandal/app'),
            userContext = require('userContext');

        describe('viewModel [reviewTab]', function () {

            var course = {
                id: 'someId',
                reviewUrl: 'url',
                publishForReview: function () {
                }
            };

            beforeEach(function () {
                spyOn(router, 'openUrl');
                spyOn(eventTracker, 'publish');
            });

            it('should be object', function () {
                expect(viewModel).toBeObject();
            });

            describe('isDelivering:', function () {
                it('should be computed', function () {
                    expect(viewModel.isDelivering).toBeComputed();
                });

                describe('when state is \'building\'', function () {
                    beforeEach(function () {
                        viewModel.state(constants.deliveringStates.building);
                    });

                    it('should return true', function () {
                        expect(viewModel.isDelivering()).toBeTruthy();
                    });
                });

                describe('when state is not \'building\'', function () {

                    describe('when state is \'publishing\'', function () {
                        beforeEach(function () {
                            viewModel.state(constants.deliveringStates.publishing);
                        });

                        it('should return true', function () {
                            expect(viewModel.isDelivering()).toBeTruthy();
                        });
                    });

                    describe('when state is not \'publishing\'', function () {
                        beforeEach(function () {
                            viewModel.state('');
                        });

                        it('should return false', function () {
                            expect(viewModel.isDelivering()).toBeFalsy();
                        });
                    });

                });
            });

            describe('courseReviewUrl:', function () {
                it('should be observable', function () {
                    expect(viewModel.reviewUrl).toBeObservable();
                });
            });

            describe('openCourseReviewUrl:', function () {

                it('should be function', function () {
                    expect(viewModel.openCourseReviewUrl).toBeFunction();
                });

                describe('when reviewUrl exists', function () {

                    beforeEach(function () {
                        viewModel.reviewUrl('someUrl');
                    });

                    describe('when course is not delivering', function () {

                        beforeEach(function () {
                            viewModel.state(constants.deliveringStates.failed);
                        });

                        it('should open course review url', function () {
                            viewModel.openCourseReviewUrl();
                            expect(router.openUrl).toHaveBeenCalledWith(viewModel.reviewUrl());
                        });

                    });

                    describe('when course is delivering', function () {

                        beforeEach(function () {
                            viewModel.state(constants.deliveringStates.building);
                        });

                        it('should not open link', function () {
                            viewModel.openCourseReviewUrl();
                            expect(router.openUrl).not.toHaveBeenCalledWith(viewModel.reviewUrl());
                        });

                    });

                });

                describe('when reviewUrl does not exist', function () {

                    beforeEach(function () {
                        viewModel.reviewUrl('');
                    });

                    it('should not open link', function () {
                        viewModel.openCourseReviewUrl();
                        expect(router.openUrl).not.toHaveBeenCalledWith(viewModel.reviewUrl());
                    });

                });

            });

            describe('updateCourseForReview:', function () {

                var getByIdDefer;
                var getByIdPromise;
                var publishForReviewDefer;
                var pblishForReviewPromise;

                beforeEach(function () {
                    getByIdDefer = Q.defer();
                    publishForReviewDefer = Q.defer();
                    getByIdPromise = getByIdDefer.promise;
                    pblishForReviewPromise = publishForReviewDefer.promise;
                    spyOn(repository, 'getById').andReturn(getByIdPromise);
                    spyOn(course, 'publishForReview').andReturn(pblishForReviewPromise);
                });

                it('should be a function', function () {
                    expect(viewModel.updateCourseForReview).toBeFunction();
                });

                describe('when is not active', function () {

                    beforeEach(function () {
                        viewModel.isActive(false);
                    });

                    it('should send event \"Update course for review\"', function () {
                        viewModel.updateCourseForReview();
                        expect(eventTracker.publish).toHaveBeenCalledWith('Update course for review');
                    });

                    it('should set isActive to true', function () {
                        viewModel.updateCourseForReview();
                        expect(viewModel.isActive()).toBeTruthy();
                    });

                    it('should start publish for review of current course', function () {
                        getByIdDefer.resolve(course);
                        publishForReviewDefer.resolve();
                        var promise = viewModel.updateCourseForReview();

                        waitsFor(function () {
                            return !promise.isPending();
                        });

                        runs(function () {
                            expect(course.publishForReview).toHaveBeenCalled();
                        });
                    });

                    describe('when course publish finished successfully', function () {
                        beforeEach(function () {
                            getByIdDefer.resolve(course);
                            publishForReviewDefer.resolve();
                        });

                        it('should set isActive() to false', function () {
                            var promise = viewModel.updateCourseForReview();

                            waitsFor(function () {
                                return !promise.isPending();
                            });

                            runs(function () {
                                expect(viewModel.isActive()).toBeFalsy();
                            });
                        });
                    });

                    describe('when course publish failed', function () {
                        beforeEach(function () {
                            getByIdDefer.resolve(course);
                            publishForReviewDefer.reject();
                        });

                        it('should set isActive() to false', function () {
                            var promise = viewModel.updateCourseForReview();

                            waitsFor(function () {
                                return !promise.isPending();
                            });

                            runs(function () {
                                expect(viewModel.isActive()).toBeFalsy();
                            });
                        });
                    });
                });

                describe('when deliver process is running', function () {
                    beforeEach(function () {
                        viewModel.isActive(true);
                    });

                    it('should not send event \"Update course for review\"', function () {
                        viewModel.updateCourseForReview();
                        expect(eventTracker.publish).not.toHaveBeenCalledWith('Update course for review');
                    });
                });
            });

            describe('reviewUrlExists:', function () {

                it('should be computed', function () {
                    expect(viewModel.reviewUrlExists).toBeComputed();
                });

                describe('when reviewUrl is not defined', function () {

                    it('should be false', function () {
                        viewModel.reviewUrl(undefined);
                        expect(viewModel.reviewUrlExists()).toBeFalsy();
                    });

                });

                describe('when reviewUrl is empty', function () {

                    it('should be false', function () {
                        viewModel.reviewUrl('');
                        expect(viewModel.reviewUrlExists()).toBeFalsy();
                    });

                });

                describe('when reviewUrl is whitespace', function () {

                    it('should be false', function () {
                        viewModel.reviewUrl("    ");
                        expect(viewModel.reviewUrlExists()).toBeFalsy();
                    });

                });

                describe('when reviewUrl is a non-whitespace string', function () {

                    it('should be true', function () {
                        viewModel.reviewUrl("reviewUrl");
                        expect(viewModel.reviewUrlExists()).toBeTruthy();
                    });

                });

            });

            describe('state:', function () {
                it('should be observable', function () {
                    expect(viewModel.state).toBeObservable();
                });
            });

            describe('states:', function () {
                it('should be defined', function () {
                    expect(viewModel.states).toBeDefined();
                });
            });

            describe('activate:', function () {

                var dataDeferred, dataPromise;
                var getCommentsCollectionDefer,
                    userContextIdentityDefer;

                beforeEach(function () {
                    dataDeferred = Q.defer();
                    dataPromise = dataDeferred.promise;

                    getCommentsCollectionDefer = Q.defer();
                    userContextIdentityDefer = Q.defer();

                    spyOn(commentRepository, 'getCollection').andReturn(getCommentsCollectionDefer.promise);
                    spyOn(userContext, 'identify').andReturn(userContextIdentityDefer.promise);

                    userContextIdentityDefer.resolve();
                });

                it('should be function', function () {
                    expect(viewModel.activate).toBeFunction();
                });

                it('should return promise', function () {
                    expect(viewModel.activate(dataPromise)).toBePromise();
                });

                describe('when activation data is not an object', function () {
                    it('should reject promise with \'Activation data promise is not an object\'', function () {
                        var promise = viewModel.activate(null);

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(promise).toBeRejectedWith('Activation data promise is not an object');
                        });
                    });
                });

                describe('when activation data is an object', function () {

                    describe('and activation data courseId is not a string', function () {
                        it('should reject promise with \'Course id is not a string\'', function () {
                            var promise = viewModel.activate(dataPromise);
                            dataDeferred.resolve({ courseId: null });

                            waitsFor(function () {
                                return !promise.isPending();
                            });
                            runs(function () {
                                expect(promise).toBeRejectedWith('Course id is not a string');
                            });
                        });
                    });

                    describe('and activation data courseId is a string', function () {

                        var activationData = { courseId: 'id' };

                        beforeEach(function () {
                            dataDeferred.resolve(activationData);
                        });

                        it('should send event \'Open review tab\'', function () {
                            var promise = viewModel.activate(dataPromise);
                            getCommentsCollectionDefer.reject();

                            waitsFor(function () {
                                return !promise.isPending();
                            });
                            runs(function () {
                                expect(eventTracker.publish).toHaveBeenCalledWith('Open review tab');
                            });
                        });

                        it('should set courseId to corresponding value', function () {
                            var promise = viewModel.activate(dataPromise);
                            getCommentsCollectionDefer.reject();

                            waitsFor(function () {
                                return !promise.isPending();
                            });
                            runs(function () {
                                expect(viewModel.courseId).toBe(activationData.courseId);
                            });
                        });

                        it('should set reviewUrl to corresponding value', function () {
                            activationData.reviewUrl = 'url';
                            var promise = viewModel.activate(dataPromise);
                            getCommentsCollectionDefer.reject();

                            waitsFor(function () {
                                return !promise.isPending();
                            });
                            runs(function () {
                                expect(viewModel.reviewUrl()).toBe(activationData.reviewUrl);
                            });
                        });

                        it('should set isCommentsLoading to true', function () {
                            spyOn(userContext, 'hasStarterAccess').andReturn(true);
                            var promise = dataDeferred.promise.fin(function () { });
                            viewModel.activate(dataPromise);

                            waitsFor(function () {
                                return !promise.isPending();
                            });
                            runs(function () {
                                expect(viewModel.isCommentsLoading()).toBeTruthy();
                            });
                        });

                        it('should update user identity', function() {
                            var promise = dataDeferred.promise.fin(function () { });
                            viewModel.activate(dataPromise);

                            waitsFor(function () {
                                return !promise.isPending();
                            });
                            runs(function () {
                                expect(userContext.identify).toHaveBeenCalled();
                            });
                        });

                        describe('and activationData reviewUrl is string', function () {
                            beforeEach(function () {
                                activationData.reviewUrl = 'url';
                            });

                            it('should set state to succeed', function () {
                                var promise = viewModel.activate(dataPromise);
                                dataDeferred.resolve(activationData);
                                getCommentsCollectionDefer.reject();

                                waitsFor(function () {
                                    return !promise.isPending();
                                });
                                runs(function () {
                                    expect(viewModel.state()).toBe(constants.deliveringStates.succeed);
                                });
                            });
                        });

                        describe('and activationData reviewUrl is not a string', function () {
                            beforeEach(function () {
                                activationData.reviewUrl = null;
                            });

                            it('should set state to failed', function () {
                                var promise = viewModel.activate(dataPromise);
                                getCommentsCollectionDefer.reject();

                                waitsFor(function () {
                                    return !promise.isPending();
                                });
                                runs(function () {
                                    expect(viewModel.state()).toBe(constants.deliveringStates.failed);
                                });
                            });
                        });

                        describe('and user identity received', function() {
                            
                            describe('and user has starter access', function () {

                                beforeEach(function () {
                                    spyOn(userContext, 'hasStarterAccess').andReturn(true);
                                });

                                it('should get comments collection', function () {
                                    var promise = viewModel.activate(dataPromise);
                                    getCommentsCollectionDefer.reject();

                                    waitsFor(function () {
                                        return !promise.isPending();
                                    });
                                    runs(function () {
                                        expect(commentRepository.getCollection).toHaveBeenCalledWith(activationData.courseId);
                                    });
                                });

                                describe('and repository was rejected', function () {

                                    beforeEach(function () {
                                        getCommentsCollectionDefer.reject();
                                    });

                                    it('should set isCommentsLoading to false', function () {
                                        var promise = viewModel.activate(dataPromise);

                                        waitsFor(function () {
                                            return !promise.isPending();
                                        });
                                        runs(function () {
                                            expect(viewModel.isCommentsLoading()).toBeFalsy();
                                        });
                                    });

                                });

                                describe('and repository was resolved', function () {

                                    var comments = [{ id: '0' }, { id: '1' }];
                                    beforeEach(function () {
                                        getCommentsCollectionDefer.resolve(comments);
                                    });

                                    it('should set comments', function () {
                                        var promise = viewModel.activate(dataPromise);

                                        waitsFor(function () {
                                            return !promise.isPending();
                                        });
                                        runs(function () {
                                            expect(viewModel.comments()).toBe(comments);
                                        });
                                    });

                                    it('should set isCommentsLoading to false', function () {
                                        var promise = viewModel.activate(dataPromise);

                                        waitsFor(function () {
                                            return !promise.isPending();
                                        });
                                        runs(function () {
                                            expect(viewModel.isCommentsLoading()).toBeFalsy();
                                        });
                                    });

                                });

                            });

                            describe('and user has no starter access', function () {

                                beforeEach(function () {
                                    spyOn(userContext, 'hasStarterAccess').andReturn(false);
                                });

                                it('should not get comments collection', function () {
                                    var promise = viewModel.activate(dataPromise);
                                    getCommentsCollectionDefer.reject();

                                    waitsFor(function () {
                                        return !promise.isPending();
                                    });
                                    runs(function () {
                                        expect(commentRepository.getCollection).not.toHaveBeenCalled();
                                    });
                                });

                            });


                        });
                    });

                });

            });

            describe('isActive:', function () {
                it('should be observable', function () {
                    expect(viewModel.isActive).toBeObservable();
                });
            });

            describe('comments:', function () {

                it('should be observable array', function () {
                    expect(viewModel.comments).toBeObservableArray();
                });

            });

            describe('isCommentsLoading:', function () {

                it('should be observable', function () {
                    expect(viewModel.isCommentsLoading).toBeObservable();
                });

            });

            describe('hasAccessToComments:', function () {

                it('should be function', function () {
                    expect(viewModel.hasAccessToComments).toBeFunction();
                });

            });

            describe('when course build was started', function () {

                describe('and when course is current course', function () {

                    describe('and when  is not active', function () {

                        beforeEach(function () {
                            viewModel.isActive(false);
                        });

                        it('should not change  state', function () {
                            viewModel.courseId = course.id;
                            viewModel.state(constants.deliveringStates.notStarted);
                            app.trigger(constants.messages.course.build.started, course);

                            expect(viewModel.state()).toEqual(constants.deliveringStates.notStarted);
                        });
                    });

                    describe('and when  is active', function () {

                        beforeEach(function () {
                            viewModel.isActive(true);
                        });

                        it('should change  state to \'building\'', function () {
                            viewModel.courseId = course.id;
                            viewModel.state('');
                            app.trigger(constants.messages.course.build.started, course);

                            expect(viewModel.state()).toEqual(constants.deliveringStates.building);
                        });
                    });
                });

                describe('and when course is any other course', function () {
                    it('should not change  state', function () {
                        viewModel.courseId = course.id;
                        viewModel.state(constants.deliveringStates.notStarted);
                        app.trigger(constants.messages.course.build.started, { id: '100500' });

                        expect(viewModel.state()).toEqual(constants.deliveringStates.notStarted);
                    });
                });

            });

            describe('when course build was failed', function () {

                describe('and when course is current course', function () {

                    describe('and when is not active', function () {

                        beforeEach(function () {
                            viewModel.isActive(false);
                        });

                        it('should not change  state', function () {
                            viewModel.courseId = course.id;
                            viewModel.state(constants.deliveringStates.notStarted);
                            app.trigger(constants.messages.course.build.failed, course.id);

                            expect(viewModel.state()).toEqual(constants.deliveringStates.notStarted);
                        });
                    });

                    describe('and when is active', function () {

                        beforeEach(function () {
                            viewModel.isActive(true);
                        });

                        it('should change state to \'failed\'', function () {
                            viewModel.courseId = course.id;
                            viewModel.state('');
                            app.trigger(constants.messages.course.build.failed, course.id);

                            expect(viewModel.state()).toEqual(constants.deliveringStates.failed);
                        });
                    });
                });

                describe('and when course is any other course', function () {
                    it('should not change state', function () {
                        viewModel.courseId = course.id;
                        viewModel.state(constants.deliveringStates.notStarted);
                        app.trigger(constants.messages.course.build.failed, { id: '100500' });

                        expect(viewModel.state()).toEqual(constants.deliveringStates.notStarted);
                    });

                    it('should not clear courseReviewUrl', function () {
                        viewModel.courseId = course.id;
                        viewModel.reviewUrl('url');

                        app.trigger(constants.messages.course.build.failed, '100500');

                        expect(viewModel.reviewUrl()).toEqual('url');
                    });
                });

            });

            describe('when course publishForReview was started', function () {

                describe('and when course is current course', function () {
                    it('should change state to \'publishing\'', function () {
                        viewModel.courseId = course.id;
                        viewModel.state('');
                        app.trigger(constants.messages.course.publishForReview.started, course);

                        expect(viewModel.state()).toEqual(constants.deliveringStates.publishing);
                    });
                });

                describe('and when course is any other course', function () {
                    it('should not change state', function () {
                        viewModel.courseId = course.id;
                        viewModel.state(constants.deliveringStates.notStarted);
                        app.trigger(constants.messages.course.publishForReview.started, { id: '100500' });

                        expect(viewModel.state()).toEqual(constants.deliveringStates.notStarted);
                    });
                });

            });

            describe('when course publishForReview completed', function () {

                describe('and when course is current course', function () {
                    it('should update state to \'success\'', function () {
                        viewModel.courseId = course.id;
                        viewModel.state('');

                        course.buildingStatus = constants.deliveringStates.succeed;
                        app.trigger(constants.messages.course.publishForReview.completed, course);

                        expect(viewModel.state()).toEqual(constants.deliveringStates.succeed);
                    });

                    it('should update courseReviewUrl to the corresponding one', function () {
                        viewModel.courseId = course.id;
                        viewModel.reviewUrl('');
                        course.reviewUrl = 'someUrl';

                        course.publishedPackageUrl = 'url';
                        app.trigger(constants.messages.course.publishForReview.completed, course);

                        expect(viewModel.reviewUrl()).toEqual(course.reviewUrl);
                    });
                });

                describe('and when course is any other course', function () {

                    it('should not update state', function () {
                        viewModel.courseId = course.id;
                        viewModel.state(constants.deliveringStates.notStarted);
                        app.trigger(constants.messages.course.publishForReview.completed, { id: '100500' });

                        expect(viewModel.state()).toEqual(constants.deliveringStates.notStarted);
                    });

                    it('should not update current courseReviewUrl', function () {
                        viewModel.courseId = course.id;
                        viewModel.reviewUrl('url');
                        app.trigger(constants.messages.course.publishForReview.completed, { id: '100500' });

                        expect(viewModel.reviewUrl()).toEqual("url");
                    });
                });

            });

            describe('when course publishForReview failed', function () {

                describe('and when course is current course', function () {
                    var message = "message";

                    it('should update state to \'failed\'', function () {
                        viewModel.courseId = course.id;
                        viewModel.state('');

                        app.trigger(constants.messages.course.publishForReview.failed, course.id, message);

                        expect(viewModel.state()).toEqual(constants.deliveringStates.failed);
                    });
                });

                describe('and when course is any other course', function () {
                    it('should not update publish state to \'failed\'', function () {
                        viewModel.courseId = course.id;
                        viewModel.state('');

                        app.trigger(constants.messages.course.publishForReview.failed, '100500');

                        expect(viewModel.state()).toEqual('');
                    });
                });

            });

        });

    }
);