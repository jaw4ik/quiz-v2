﻿define(['services/publishService'], function (service) {
    "use strict";

    var
        publishHttpWrapper = require('http/publishHttpWrapper');

    describe('service [publishCourse]', function () {

        describe('buildCourse:', function () {

            var course;
            var post;

            beforeEach(function () {
                course = { id: 'someId' };

                post = Q.defer();
                spyOn(publishHttpWrapper, 'post').and.returnValue(post.promise);
            });

            it('should be function', function () {
                expect(service.buildCourse).toBeFunction();
            });

            it('should return promise', function () {
                var promise = service.buildCourse();

                expect(promise).toBePromise();
            });

            it('should send request', function (done) {
                post.resolve({});

                var promise = service.buildCourse(course.id);
                promise.fin(done);

                expect(publishHttpWrapper.post).toHaveBeenCalledWith('api/course/build', { courseId: course.id });
            });

            describe('and send request to server', function () {

                it('should resolve promise with true', function (done) {
                    post.resolve({ PackageUrl: 'SomeUrl', BuildOn: '1378106938845' });

                    var promise = service.buildCourse();
                    promise.then(function () {
                        expect(promise).toBeResolvedWith({ packageUrl: 'SomeUrl', builtOn: new Date('1378106938845') });
                        done();
                    });

                });

            });

        });

        describe('scormBuildCourse:', function () {
            var course;
            var post;

            beforeEach(function () {
                course = { id: 'someId' };

                post = Q.defer();
                spyOn(publishHttpWrapper, 'post').and.returnValue(post.promise);
            });

            it('should be function', function () {
                expect(service.scormBuildCourse).toBeFunction();
            });

            it('should return promise', function () {
                var promise = service.scormBuildCourse();

                expect(promise).toBePromise();
            });

            it('should send request', function (done) {
                post.resolve({});
                var promise = service.scormBuildCourse(course.id);
                promise.fin(function () {
                    expect(publishHttpWrapper.post).toHaveBeenCalledWith('api/course/scormbuild', { courseId: course.id });
                    done();
                });
            });

            describe('and send request to server', function () {

                beforeEach(function () {
                    post.resolve({ ScormPackageUrl: 'SomeUrl' });
                });

                it('should resolve promise with true', function (done) {
                    var promise = service.scormBuildCourse();
                    promise.fin(function () {
                        expect(promise).toBeResolvedWith({ scormPackageUrl: 'SomeUrl' });
                        done();
                    });
                });

            });

        });

        describe('publishCourse:', function () {
            var course;
            var post;

            beforeEach(function () {
                course = { id: 'someId' };

                post = Q.defer();
                spyOn(publishHttpWrapper, 'post').and.returnValue(post.promise);
            });

            it('should be function', function () {
                expect(service.publishCourse).toBeFunction();
            });

            it('should return promise', function () {
                var promise = service.publishCourse();

                expect(promise).toBePromise();
            });

            it('should send request', function (done) {
                post.resolve({});
                var promise = service.publishCourse(course.id);
                promise.fin(function () {
                    expect(publishHttpWrapper.post).toHaveBeenCalledWith('api/course/publish', { courseId: course.id });
                    done();
                });

            });

            describe('and send request to server', function () {

                beforeEach(function () {
                    post.resolve({ PublishedPackageUrl: 'SomeUrl' });
                });

                it('should resolve promise with true', function (done) {
                    var promise = service.publishCourse();

                    promise.fin(function () {
                        expect(promise).toBeResolvedWith({ publishedPackageUrl: 'SomeUrl' });
                        done();
                    });
                });

            });

        });

        describe('publishCourseForReview:', function () {
            var course;
            var post;

            beforeEach(function () {
                course = { id: 'someId' };

                post = Q.defer();
                spyOn(publishHttpWrapper, 'post').and.returnValue(post.promise);
            });

            it('should be function', function () {
                expect(service.publishCourseForReview).toBeFunction();
            });

            it('should return promise', function () {
                var promise = service.publishCourseForReview();

                expect(promise).toBePromise();
            });

            it('should send request', function (done) {

                post.resolve({});

                var promise = service.publishCourseForReview(course.id);

                promise.fin(function () {
                    expect(publishHttpWrapper.post).toHaveBeenCalledWith('api/course/publishForReview', { courseId: course.id });
                    done();
                });
            });

            describe('and send request to server', function () {

                beforeEach(function () {
                    post.resolve({ ReviewUrl: 'SomeUrl' });
                });

                it('should resolve promise with true', function (done) {
                    var promise = service.publishCourseForReview();
                    promise.fin(function () {
                        expect(promise).toBeResolvedWith({ reviewUrl: 'SomeUrl' });
                        done();
                    });

                });

            });

        });

        describe('publishCourseToStore:', function () {
            var course;
            var post;

            beforeEach(function () {
                course = { id: 'someId' };

                post = Q.defer();
                spyOn(publishHttpWrapper, 'post').and.returnValue(post.promise);
            });

            it('should be function', function () {
                expect(service.publishCourseToStore).toBeFunction();
            });

            it('should return promise', function () {
                var promise = service.publishCourseToStore();

                expect(promise).toBePromise();
            });

            it('should send request to \'\'', function (done) {
                post.resolve({});

                var promise = service.publishCourseToStore(course.id);

                promise.fin(function () {
                    expect(publishHttpWrapper.post).toHaveBeenCalledWith('api/aim4you/publish', { courseId: course.id });
                    done();
                });

            });

            describe('and send request to server', function () {

                describe('and request success', function () {

                    it('should resolve promise with true', function (done) {
                        post.resolve();

                        var promise = service.publishCourseToStore();

                        promise.fin(function () {
                            expect(promise).toBeResolvedWith();
                            done();
                        });

                    });

                });

            });
        });

        describe('buildLearningPath:', function() {
            var post,
                learningPathId;

            beforeEach(function () {
                post = Q.defer();
                learningPathId = 'learnigPathId';
                spyOn(publishHttpWrapper, 'post').and.returnValue(post.promise);
            });

            it('should be a function', function () {
                expect(service.buildLearningPath).toBeFunction();
            });

            it('should return promise', function () {
                var promise = service.buildLearningPath(learningPathId);

                expect(promise).toBePromise();
            });

            it('should send request', function (done) {
                post.resolve({});

                var promise = service.buildLearningPath(learningPathId);
                promise.fin(done);

                expect(publishHttpWrapper.post).toHaveBeenCalledWith('api/learningpath/build', { learningPathId: learningPathId });
            });

            describe('when server return response', function () {

                it('should resolve promise with packageUrl', function (done) {
                    post.resolve({ PackageUrl: 'SomeUrl' });

                    var promise = service.buildLearningPath(learningPathId);
                    promise.then(function () {
                        expect(promise).toBeResolvedWith({ packageUrl: 'SomeUrl' });
                        done();
                    });

                });

            });
        });

        describe('publishLearningPath:', function () {
            var post,
                learningPathId;

            beforeEach(function () {
                post = Q.defer();
                learningPathId = 'learnigPathId';
                spyOn(publishHttpWrapper, 'post').and.returnValue(post.promise);
            });

            it('should be a function', function () {
                expect(service.publishLearningPath).toBeFunction();
            });

            it('should return promise', function () {
                var promise = service.publishLearningPath(learningPathId);

                expect(promise).toBePromise();
            });

            it('should send request', function (done) {
                post.resolve({});

                var promise = service.publishLearningPath(learningPathId);
                promise.fin(done);

                expect(publishHttpWrapper.post).toHaveBeenCalledWith('api/learningpath/publish', { learningPathId: learningPathId });
            });

            describe('when server return response', function () {

                it('should resolve promise with packageUrl', function (done) {
                    post.resolve({ PublicationUrl: 'SomeUrl' });

                    var promise = service.publishLearningPath(learningPathId);
                    promise.then(function () {
                        expect(promise).toBeResolvedWith({ publicationUrl: 'SomeUrl' });
                        done();
                    });

                });

            });
        });

        describe('publishCourseToCustomLms:', function () {
            var course;
            var post;

            beforeEach(function () {
                course = { id: 'someId' };

                post = Q.defer();
                spyOn(publishHttpWrapper, 'post').and.returnValue(post.promise);
            });

            it('should be a function', function () {
                expect(service.publishCourseToCustomLms).toBeFunction();
            });

            it('should return promise', function () {
                expect(service.publishCourseToCustomLms()).toBePromise();
            });

            it('should send request', function (done) {
                post.resolve({});
                var promise = service.publishCourseToCustomLms(course.id);
                promise.fin(function () {
                    expect(publishHttpWrapper.post).toHaveBeenCalledWith('api/course/publishToCustomLms', { courseId: course.id });
                    done();
                });
            });

        });

    });

});