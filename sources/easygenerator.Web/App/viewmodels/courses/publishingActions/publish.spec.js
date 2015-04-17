﻿define(['viewmodels/courses/publishingActions/publish'], function (publish) {

    var app = require('durandal/app'),
        constants = require('constants'),
        notify = require('notify'),
        eventTracker = require('eventTracker'),
        router = require('plugins/router'),
        clientContext = require('clientContext'),
        repository = require('repositories/courseRepository')
    ;

    describe('course delivering action [publish]', function () {

        var
            viewModel,
            getByIdDefer,
            eventCategory = 'some/event/category',
            action = function () { };

        action.state = 'someState';
        action.packageUrl = 'some/package/url';
        var course = { id: 'someId', isDelivering: true, publish: action, hasUnpublishedChanges: true };

        beforeEach(function () {
            course.publish.packageUrl = 'packageUrl';
            viewModel = publish(eventCategory);
            spyOn(eventTracker, 'publish');
            spyOn(notify, 'hide');
            spyOn(router, 'openUrl');
            spyOn(clientContext, 'set');
            spyOn(app, 'on').and.returnValue(Q.defer().promise);
            spyOn(app, 'off');
            getByIdDefer = Q.defer();
            spyOn(repository, 'getById').and.returnValue(getByIdDefer.promise);
        });

        it('should be object', function () {
            expect(viewModel).toBeObject();
        });

        //#region Inherited functionality 

        describe('state:', function () {

            it('should be observable', function () {
                expect(viewModel.state).toBeObservable();
            });
        });

        describe('states:', function () {

            it('should be equal to allowed publish states', function () {
                expect(viewModel.states).toEqual(constants.publishingStates);
            });

        });

        describe('isCourseDelivering:', function () {
            it('should be observable', function () {
                expect(viewModel.isCourseDelivering).toBeObservable();
            });
        });

        describe('packageUrl:', function () {
            it('should be observable', function () {
                expect(viewModel.packageUrl).toBeObservable();
            });
        });

        describe('courseId:', function () {
            it('should be defined', function () {
                expect(viewModel.courseId).toBeDefined();
            });
        });

        describe('packageExists:', function () {

            it('should be computed', function () {
                expect(viewModel.packageExists).toBeComputed();
            });

            describe('when packageUrl is not defined', function () {

                it('should be false', function () {
                    viewModel.packageUrl(undefined);
                    expect(viewModel.packageExists()).toBeFalsy();
                });

            });

            describe('when packageUrl is empty', function () {

                it('should be false', function () {
                    viewModel.packageUrl('');
                    expect(viewModel.packageExists()).toBeFalsy();
                });

            });

            describe('when packageUrl is whitespace', function () {

                it('should be false', function () {
                    viewModel.packageUrl("    ");
                    expect(viewModel.packageExists()).toBeFalsy();
                });

            });

            describe('when packageUrl is a non-whitespace string', function () {

                it('should be true', function () {
                    viewModel.packageUrl("packageUrl");
                    expect(viewModel.packageExists()).toBeTruthy();
                });

            });

        });

        describe('subscriptions:', function () {
            it('should be array', function () {
                expect(viewModel.subscriptions).toBeArray();
            });
        });

        describe('courseDeliveringStarted:', function () {
            it('should be function', function () {
                expect(viewModel.courseDeliveringStarted).toBeFunction();
            });

            describe('when course is current course', function () {
                beforeEach(function () {
                    viewModel.courseId = course.id;
                });

                it('should set isCourseDelivering to true', function () {
                    viewModel.isCourseDelivering(false);
                    viewModel.courseDeliveringStarted(course);
                    expect(viewModel.isCourseDelivering()).toBeTruthy();
                });
            });

            describe('when course is not current course', function () {
                beforeEach(function () {
                    viewModel.courseId = '';
                });

                it('should not change isCourseDelivering', function () {
                    viewModel.isCourseDelivering(false);
                    viewModel.courseDeliveringStarted({ id: 'none' });
                    expect(viewModel.isCourseDelivering()).toBeFalsy();
                });
            });
        });

        describe('courseDeliveringFinished:', function () {
            it('should be function', function () {
                expect(viewModel.courseDeliveringFinished).toBeFunction();
            });

            describe('when course is current course', function () {
                beforeEach(function () {
                    viewModel.courseId = course.id;
                });

                it('should set isCourseDelivering to false', function () {
                    viewModel.isCourseDelivering(true);
                    viewModel.courseDeliveringFinished(course);
                    expect(viewModel.isCourseDelivering()).toBeFalsy();
                });
            });

            describe('when course is not current course', function () {
                beforeEach(function () {
                    viewModel.courseId = '';
                });

                it('should not change isCourseDelivering', function () {
                    viewModel.isCourseDelivering(true);
                    viewModel.courseDeliveringFinished({ id: 'none' });
                    expect(viewModel.isCourseDelivering()).toBeTruthy();
                });
            });
        });

        describe('deactivate:', function () {
            var subscriptions;
            beforeEach(function () {
                subscriptions = [{ off: function () { } }, { off: function () { } }];
                spyOn(subscriptions[0], 'off');
                spyOn(subscriptions[1], 'off');

                viewModel.subscriptions = [subscriptions[0], subscriptions[1]];
            });

            it('should be function', function () {
                expect(viewModel.deactivate).toBeFunction();
            });

            it('should call off() for each subsription', function () {
                viewModel.deactivate();
                expect(subscriptions[0].off).toHaveBeenCalled();
                expect(subscriptions[1].off).toHaveBeenCalled();
            });

            it('should clear subscriptions', function () {
                viewModel.deactivate();
                expect(viewModel.subscriptions.length).toBe(0);
            });
        });

        describe('activate:', function () {
            it('should be function', function () {
                expect(viewModel.activate).toBeFunction();
            });

            it('should return promise', function () {
                expect(viewModel.activate()).toBePromise();
            });

            describe('when course received', function() {
                beforeEach(function() {
                    getByIdDefer.resolve(course);
                });

                it('should set state', function (done) {
                    viewModel.state('');
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(viewModel.state()).toBe(action.state);
                        done();
                    });
                });

                it('should set packageUrl', function (done) {
                    viewModel.packageUrl('');
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(viewModel.packageUrl()).toBe(action.packageUrl);
                        done();
                    });
                });

                it('should set isCourseDelivering', function (done) {
                    viewModel.isCourseDelivering(false);
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(viewModel.isCourseDelivering()).toBe(course.isDelivering);
                        done();
                    });
                });

                it('should set courseId', function (done) {
                    viewModel.courseId = '';
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(viewModel.courseId).toBe(course.id);
                        done();
                    });
                });

                it('should subscribe to course.delivering.started event', function (done) {
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(app.on).toHaveBeenCalledWith(constants.messages.course.delivering.started);
                        done();
                    });
                });

                it('should subscribe to course.delivering.finished event', function (done) {
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(app.on).toHaveBeenCalledWith(constants.messages.course.delivering.finished);
                        done();
                    });
                });

                it('should fill subscriptions', function (done) {
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(viewModel.subscriptions.length).toBe(8);
                        done();
                    });
                });

                it('should subscribe to course.build.started event', function (done) {
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(app.on).toHaveBeenCalledWith(constants.messages.course.build.started);
                        done();
                    });
                });

                it('should subscribe to course.build.failed event', function (done) {
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(app.on).toHaveBeenCalledWith(constants.messages.course.build.failed);
                        done();
                    });
                });

                it('should subscribe to course.publish.started event', function (done) {
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(app.on).toHaveBeenCalledWith(constants.messages.course.publish.started);
                        done();
                    });
                });

                it('should subscribe to course.publish.completed event', function (done) {
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(app.on).toHaveBeenCalledWith(constants.messages.course.publish.completed);
                        done();
                    });
                });

                it('should subscribe to course.publish.failed event', function (done) {
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(app.on).toHaveBeenCalledWith(constants.messages.course.publish.failed);
                        done();
                    });
                });

                it('should subscribe to course.stateChanged event', function (done) {
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(app.on).toHaveBeenCalledWith(constants.messages.course.stateChanged + course.id);
                        done();
                    });
                });

                it('should set courseHasUnpublishedChanges', function (done) {
                    viewModel.courseHasUnpublishedChanges(false);
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(viewModel.courseHasUnpublishedChanges()).toBe(course.hasUnpublishedChanges);
                        done();
                    });
                });

                it('should set linkCopied to false', function (done) {
                    viewModel.linkCopied(true);
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(viewModel.linkCopied()).toBeFalsy();
                        done();
                    });
                });

                it('should set embedCodeCopied to false', function (done) {
                    viewModel.embedCodeCopied(true);
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(viewModel.embedCodeCopied()).toBeFalsy();
                        done();
                    });
                });

                it('should set copyBtnDisabled to false', function (done) {
                    viewModel.copyBtnDisabled(true);
                    var promise = viewModel.activate(course.id);
                    promise.fin(function () {
                        expect(viewModel.copyBtnDisabled()).toBeFalsy();
                        done();
                    });
                });
            });
        });

        //#endregion

        describe('courseHasUnpublishedChanges:', function () {
            it('should be observable', function () {
                expect(viewModel.courseHasUnpublishedChanges).toBeObservable();
            });
        });

        describe('eventCategory:', function () {
            it('should be defined', function () {
                expect(viewModel.eventCategory).toBe(eventCategory);
            });
        });

        describe('isPublishing', function () {
            it('should be computed', function () {
                expect(viewModel.isPublishing).toBeComputed();
            });

            describe('when state is \'building\'', function () {
                beforeEach(function () {
                    viewModel.state(constants.publishingStates.building);
                });

                it('should return true', function () {
                    expect(viewModel.isPublishing()).toBeTruthy();
                });
            });

            describe('when state is not \'building\'', function () {

                describe('when state is \'publishing\'', function () {
                    beforeEach(function () {
                        viewModel.state(constants.publishingStates.publishing);
                    });

                    it('should return true', function () {
                        expect(viewModel.isPublishing()).toBeTruthy();
                    });
                });

                describe('when state is not \'publishing\'', function () {
                    beforeEach(function () {
                        viewModel.state('');
                    });

                    it('should return false', function () {
                        expect(viewModel.isPublishing()).toBeFalsy();
                    });
                });

            });
        });

        describe('publishCourse:', function () {

            var coursePublishDefer;
            var coursePublishPromise;

            beforeEach(function () {
                coursePublishDefer = Q.defer();
                coursePublishPromise = coursePublishDefer.promise;
                viewModel.courseId = course.id;
                spyOn(course, 'publish').and.returnValue(coursePublishPromise);
            });

            it('should be a function', function () {
                expect(viewModel.publishCourse).toBeFunction();
            });

            describe('when course received', function() {
                beforeEach(function () {
                    getByIdDefer.resolve(course);
                });

                describe('when course is not delivering', function () {

                    beforeEach(function () {
                        viewModel.isCourseDelivering(false);
                    });

                    it('should return promise', function () {
                        expect(viewModel.publishCourse()).toBePromise();
                    });

                    it('should send event \"Publish course\"', function (done) {
                        coursePublishDefer.resolve();
                        var promise = viewModel.publishCourse();
                        promise.fin(function () {
                            expect(eventTracker.publish).toHaveBeenCalledWith('Publish course', eventCategory);
                            done();
                        });
                    });

                    it('should start publish of current course', function (done) {
                        coursePublishDefer.resolve();
                        var promise = viewModel.publishCourse();
                        promise.fin(function () {
                            expect(course.publish).toHaveBeenCalled();
                            done();
                        });
                    });

                    describe('when course publish failed', function () {

                        var message = 'Some error message';
                        beforeEach(function () {
                            coursePublishDefer.reject(message);
                        });

                        it('should show error notification', function (done) {
                            spyOn(notify, 'error');
                            var promise = viewModel.publishCourse();
                            promise.fin(function () {
                                expect(notify.error).toHaveBeenCalledWith(message);
                                done();
                            });
                        });
                    });
                });

                describe('when course is delivering', function () {
                    beforeEach(function () {
                        viewModel.isCourseDelivering(true);
                    });

                    it('should return undefined', function () {
                        expect(viewModel.publishCourse()).toBeUndefined();
                    });

                    it('should not send event \"Publish course\"', function () {
                        viewModel.publishCourse();
                        expect(eventTracker.publish).not.toHaveBeenCalledWith('Publish course');
                    });
                });
            });
        });

        describe('openPublishedCourse:', function () {

            it('should be function', function () {
                expect(viewModel.openPublishedCourse).toBeFunction();
            });

            describe('when package exists', function () {

                beforeEach(function () {
                    spyOn(viewModel, 'packageExists').and.returnValue(true);
                });

                it('should open publish url', function () {
                    viewModel.packageUrl('Some url');

                    viewModel.openPublishedCourse();
                    expect(router.openUrl).toHaveBeenCalledWith(viewModel.packageUrl());
                });

            });

            describe('when package not exists', function () {

                beforeEach(function () {
                    spyOn(viewModel, 'packageExists').and.returnValue(false);
                });

                it('should not open link', function () {
                    viewModel.packageUrl('Some url');

                    viewModel.openPublishedCourse();
                    expect(router.openUrl).not.toHaveBeenCalledWith(viewModel.packageUrl());
                });

            });

        });

        describe('courseStateChanged:', function () {

            describe('when state hasUnpublishedChanges is true', function () {
                it('should update courseHasUnpublishedChanges to true', function () {
                    viewModel.courseHasUnpublishedChanges(false);
                    viewModel.courseStateChanged({ hasUnpublishedChanges: true });
                    expect(viewModel.courseHasUnpublishedChanges()).toBeTruthy();
                });
            });

            describe('when state hasUnpublishedChanges is false', function () {
                it('should update courseHasUnpublishedChanges to false', function () {
                    viewModel.courseHasUnpublishedChanges(true);
                    viewModel.courseStateChanged({ hasUnpublishedChanges: false });
                    expect(viewModel.courseHasUnpublishedChanges()).toBeFalsy();
                });
            });
        });

        describe('courseBuildStarted:', function () {
            it('should be function', function () {
                expect(viewModel.courseBuildStarted).toBeFunction();
            });

            describe('and when course is current course', function () {

                beforeEach(function () {
                    viewModel.courseId = course.id;
                });

                describe('and when course.publish state is not ' + constants.publishingStates.building, function () {

                    beforeEach(function () {
                        course.publish.state = '';
                    });

                    it('should not change action state', function () {
                        viewModel.state(constants.publishingStates.notStarted);

                        viewModel.courseBuildStarted(course);

                        expect(viewModel.state()).toEqual(constants.publishingStates.notStarted);
                    });
                });

                describe('and when course.publish state is ' + constants.publishingStates.building, function () {

                    beforeEach(function () {
                        course.publish.state = constants.publishingStates.building;
                    });

                    it('should change action state to ' + constants.publishingStates.building, function () {
                        viewModel.state('');

                        viewModel.courseBuildStarted(course);

                        expect(viewModel.state()).toEqual(constants.publishingStates.building);
                    });
                });
            });

            describe('and when course is any other course', function () {

                beforeEach(function () {
                    viewModel.courseId = '100500';
                });

                it('should not change action state', function () {
                    viewModel.state(constants.publishingStates.notStarted);

                    viewModel.courseBuildStarted(course);

                    expect(viewModel.state()).toEqual(constants.publishingStates.notStarted);
                });
            });

        });

        describe('courseBuildFailed:', function () {
            it('should be function', function () {
                expect(viewModel.courseBuildFailed).toBeFunction();
            });

            describe('and when course is current course', function () {

                beforeEach(function () {
                    viewModel.courseId = course.id;
                });

                describe('and when course.publish state is not ' + constants.publishingStates.failed, function () {

                    beforeEach(function () {
                        course.publish.state = '';
                    });

                    it('should not change action state', function () {
                        viewModel.state(constants.publishingStates.notStarted);

                        viewModel.courseBuildFailed(course);

                        expect(viewModel.state()).toEqual(constants.publishingStates.notStarted);
                    });

                    it('should not clear package url', function () {
                        viewModel.packageUrl('packageUrl');

                        viewModel.courseBuildFailed(course);

                        expect(viewModel.packageUrl()).toEqual('packageUrl');
                    });
                });

                describe('and when course.publish state is ' + constants.publishingStates.failed, function () {

                    beforeEach(function () {
                        course.publish.state = constants.publishingStates.failed;
                    });

                    it('should change action state to ' + constants.publishingStates.failed, function () {
                        viewModel.state('');

                        viewModel.courseBuildFailed(course);

                        expect(viewModel.state()).toEqual(constants.publishingStates.failed);
                    });

                    it('should clear package url', function () {
                        viewModel.packageUrl('packageUrl');

                        viewModel.courseBuildFailed(course);

                        expect(viewModel.packageUrl()).toEqual('');
                    });
                });
            });

            describe('and when course is any other course', function () {

                beforeEach(function () {
                    viewModel.courseId = '100500';
                });

                it('should not change action state', function () {
                    viewModel.state(constants.publishingStates.notStarted);

                    viewModel.courseBuildFailed(course);

                    expect(viewModel.state()).toEqual(constants.publishingStates.notStarted);
                });

                it('should not clear package url', function () {
                    viewModel.packageUrl('packageUrl');

                    viewModel.courseBuildFailed(course);

                    expect(viewModel.packageUrl()).toEqual('packageUrl');
                });

            });

        });

        describe('coursePublishStarted:', function () {
            it('should be function', function () {
                expect(viewModel.coursePublishStarted).toBeFunction();
            });

            describe('and when course is current course', function () {

                beforeEach(function () {
                    viewModel.courseId = course.id;
                });

                describe('and when ', function () {

                });

                it('should change action state to \'publishing\'', function () {
                    viewModel.state('');

                    viewModel.coursePublishStarted(course);

                    expect(viewModel.state()).toEqual(constants.publishingStates.publishing);
                });

            });

            describe('and when course is any other course', function () {

                beforeEach(function () {
                    viewModel.courseId = '100500';
                });

                it('should not change action state', function () {
                    viewModel.state(constants.publishingStates.notStarted);

                    viewModel.coursePublishStarted(course);

                    expect(viewModel.state()).toEqual(constants.publishingStates.notStarted);
                });

            });

        });

        describe('coursePublishCompleted:', function () {
            beforeEach(function () {
                viewModel.course = course;
            });

            it('should be function', function () {
                expect(viewModel.coursePublishCompleted).toBeFunction();
            });

            describe('and when course is current course', function () {

                beforeEach(function () {
                    viewModel.courseId = course.id;
                });

                it('should update action state to \'success\'', function () {
                    viewModel.state('');
                    course.buildingStatus = constants.publishingStates.succeed;

                    viewModel.coursePublishCompleted(course);

                    expect(viewModel.state()).toEqual(constants.publishingStates.succeed);
                });

                it('should update action packageUrl to the corresponding one', function () {
                    viewModel.packageUrl('');
                    course.publish.packageUrl = "http://xxx.com";

                    viewModel.coursePublishCompleted(course);

                    expect(viewModel.packageUrl()).toEqual(course.publish.packageUrl);
                });

            });

            describe('and when course is any other course', function () {

                it('should not update action state', function () {
                    viewModel.courseId = course.id;
                    viewModel.state(constants.publishingStates.notStarted);

                    viewModel.coursePublishCompleted({ id: '100500' });

                    expect(viewModel.state()).toEqual(constants.publishingStates.notStarted);
                });

                it('should not update current publishedPackageUrl', function () {
                    viewModel.courseId = course.id;
                    viewModel.packageUrl('http://xxx.com');

                    viewModel.coursePublishCompleted({ id: '100500' });

                    expect(viewModel.packageUrl()).toEqual("http://xxx.com");
                });
            });

        });

        describe('coursePublishFailed:', function () {
            it('should be function', function () {
                expect(viewModel.coursePublishFailed).toBeFunction();
            });

            describe('and when course is current course', function () {

                it('should update action state to \'failed\'', function () {
                    viewModel.courseId = course.id;
                    viewModel.state('');

                    viewModel.coursePublishFailed(course);

                    expect(viewModel.state()).toEqual(constants.publishingStates.failed);
                });

                it('should clear package url', function () {
                    viewModel.courseId = course.id;
                    viewModel.packageUrl('publishedPackageUrl');

                    viewModel.coursePublishFailed(course);

                    expect(viewModel.packageUrl()).toEqual('');
                });
            });

            describe('and when course is any other course', function () {

                it('should not update publish action state to \'failed\'', function () {
                    viewModel.courseId = course.id;
                    viewModel.state('');

                    viewModel.coursePublishFailed({ id: '100500' });

                    expect(viewModel.state()).toEqual('');
                });

                it('should not clear package url', function () {
                    viewModel.courseId = course.id;
                    viewModel.packageUrl('packageUrl');

                    viewModel.coursePublishFailed({ id: '100500' });

                    expect(viewModel.packageUrl()).toEqual('packageUrl');
                });

            });

        });

        describe('isCourseDelivering:', function () {
            it('should be observable', function () {
                expect(viewModel.isCourseDelivering).toBeObservable();
            });
        });

        describe('courseDeliveringStarted:', function () {
            beforeEach(function () {
                viewModel.course = course;
            });

            it('should be function', function () {
                expect(viewModel.courseDeliveringStarted).toBeFunction();
            });

            describe('when course is current course', function () {
                beforeEach(function () {
                    viewModel.courseId = course.id;
                });

                it('should set isCourseDelivering to true', function () {
                    viewModel.isCourseDelivering(false);
                    viewModel.courseDeliveringStarted(course);
                    expect(viewModel.isCourseDelivering()).toBeTruthy();
                });
            });

            describe('when course is not current course', function () {
                beforeEach(function () {
                    viewModel.courseId = '';
                });

                it('should not change isCourseDelivering', function () {
                    viewModel.isCourseDelivering(false);
                    viewModel.courseDeliveringStarted({ id: 'none' });
                    expect(viewModel.isCourseDelivering()).toBeFalsy();
                });
            });
        });

        describe('courseDeliveringFinished:', function () {
            it('should be function', function () {
                expect(viewModel.courseDeliveringFinished).toBeFunction();
            });

            describe('when course is current course', function () {
                beforeEach(function () {
                    viewModel.courseId = course.id;
                });

                it('should set isCourseDelivering to false', function () {
                    viewModel.isCourseDelivering(true);
                    viewModel.courseDeliveringFinished(course);
                    expect(viewModel.isCourseDelivering()).toBeFalsy();
                });
            });

            describe('when course is not current course', function () {
                beforeEach(function () {
                    viewModel.courseId = '';
                });

                it('should not change isCourseDelivering', function () {
                    viewModel.isCourseDelivering(true);
                    viewModel.courseDeliveringFinished({ id: 'none' });
                    expect(viewModel.isCourseDelivering()).toBeTruthy();
                });
            });
        });

        describe('frameWidth:', function () {

            it('should be observable', function () {
                expect(viewModel.frameWidth).toBeObservable();
            });

        });

        describe('frameHeight:', function () {

            it('should be observable', function () {
                expect(viewModel.frameHeight).toBeObservable();
            });

        });

        describe('embedCode:', function () {

            var embedCode;

            beforeEach(function () {
                var packageUrl = 'url';
                viewModel.packageUrl(packageUrl);
                viewModel.course = course;
                embedCode = constants.embedCode.replace('{W}', viewModel.frameWidth()).replace('{H}', viewModel.frameHeight()).replace('{src}', viewModel.packageUrl());
            });

            it('should be observable', function () {
                expect(viewModel.embedCode).toBeObservable();
            });

            it('should be equal embedCode', function () {
                expect(viewModel.embedCode()).toBe(embedCode);
            });

        });

        describe('copyLinkToClipboard:', function () {

            it('should be function', function () {
                expect(viewModel.copyLinkToClipboard).toBeFunction();
            });

            it('should send event \'Copy publish link\'', function () {
                viewModel.eventCategory = 'category';
                viewModel.copyLinkToClipboard();
                expect(eventTracker.publish).toHaveBeenCalledWith('Copy publish link', 'category');
            });

        });

        describe('copyLinkToClipboard:', function () {

            it('should be function', function () {
                expect(viewModel.copyEmbedCodeToClipboard).toBeFunction();
            });

            it('should send event \'Copy embed code\'', function () {
                viewModel.eventCategory = 'category';
                viewModel.copyEmbedCodeToClipboard();
                expect(eventTracker.publish).toHaveBeenCalledWith('Copy embed code', 'category');
            });

        });

        describe('validateFrameWidth:', function () {

            it('should be function', function () {
                expect(viewModel.validateFrameWidth).toBeFunction();
            });

            describe('when frameWidth is not validate', function () {

                it('should set frameWidth to default value', function () {
                    viewModel.frameWidth(0);
                    viewModel.validateFrameWidth();
                    expect(viewModel.frameWidth()).toBe(constants.frameSize.width.value);
                });

            });

            describe('when frameWidth is validate', function () {

                it('should not update frameWidth', function () {
                    viewModel.frameWidth(25);
                    viewModel.validateFrameWidth();
                    expect(viewModel.frameWidth()).toBe(25);
                });

            });

        });

        describe('validateFrameHeight:', function () {

            it('should be function', function () {
                expect(viewModel.validateFrameHeight).toBeFunction();
            });

            describe('when frameHeight is not validate', function () {

                it('should set frameHeight to default value', function () {
                    viewModel.frameHeight(0);
                    viewModel.validateFrameHeight();
                    expect(viewModel.frameHeight()).toBe(constants.frameSize.height.value);
                });

            });

            describe('when frameHeight is validate', function () {

                it('should not update frameHeight', function () {
                    viewModel.frameHeight(25);
                    viewModel.validateFrameHeight();
                    expect(viewModel.frameHeight()).toBe(25);
                });

            });

        });
    });
});