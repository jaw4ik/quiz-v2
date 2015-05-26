﻿define(['reporting/viewmodels/results'], function (viewModel) {
    "use strict";

    var
        eventTracker = require('eventTracker'),
        courseRepository = require('repositories/courseRepository'),
        xApiProvider = require('reporting/xApiProvider'),
        constants = require('constants'),
        dialog = require('plugins/dialog'),
        userContext = require('userContext'),
        router = require('plugins/router'),
        CourseStatement = require('reporting/viewmodels/courseStatement'),
        fileSaverWrapper = require('utils/fileSaverWrapper');

    describe('viewModel [results]', function () {

        var courseId,
            getCourseDefer;
        var time = '2015-02-03_05-38';

        var fakeMoment = {
            format: function () {
                return time;
            }
        };

        var courseStatements = [
            {
                id: 'id1',
                score: 10,
                actor: { name: 'name1', email: 'email1' }
            },
            {
                id: 'id2',
                score: 20,
                actor: { name: 'name2', email: 'email2' }
            },
            {
                id: 'id3',
                score: 30,
                actor: { name: 'name3', email: 'email3' }
            },
            {
                id: 'id4',
                score: 40,
                actor: { name: 'name4', email: 'email4' }
            },
            {
                id: 'id5',
                score: 50,
                actor: { name: 'name5', email: 'email5' }
            }
        ];

        beforeEach(function () {
            getCourseDefer = Q.defer();
            courseId = 'courseId';
            spyOn(eventTracker, 'publish');
            spyOn(router, 'openUrl');
            spyOn(courseRepository, 'getById').and.returnValue(getCourseDefer.promise);

            spyOn(window, 'moment').and.returnValue(fakeMoment);
            spyOn(fakeMoment, 'format').and.returnValue(time);
        });

        describe('courseId:', function () {
            it('should be defined', function () {
                expect(viewModel.courseId).toBeDefined();
            });

            it('should be an empty string', function () {
                expect(viewModel.courseId).toBe('');
            });
        });

        describe('courseTitle:', function () {
            it('should be defined', function () {
                expect(viewModel.courseTitle).toBeDefined();
            });

            it('should be an empty string', function () {
                expect(viewModel.courseTitle).toBe('');
            });
        });

        describe('loadedResults', function () {
            it('should be defined', function () {
                expect(viewModel.loadedResults).toBeDefined();
            });

            it('should be an empty array', function () {
                expect(viewModel.loadedResults).toBeArray();
                expect(viewModel.loadedResults.length).toBe(0);
            });
        });

        describe('pageNumber:', function () {
            it('should be defined', function () {
                expect(viewModel.pageNumber).toBeDefined();
            });

            it('should be 1', function () {
                expect(viewModel.pageNumber).toBe(1);
            });
        });

        describe('allResultsLoaded:', function () {
            it('should be defined', function () {
                expect(viewModel.allResultsLoaded).toBeDefined();
            });

            it('should be false', function () {
                expect(viewModel.allResultsLoaded).toBeFalsy();
            });
        });

        describe('isLoading:', function () {
            it('should be observable', function () {
                expect(viewModel.isLoading).toBeObservable();
            });

            it('should be true observable by default', function () {
                expect(viewModel.isLoading()).toBeTruthy();
            });
        });

        describe('results:', function () {
            it('should be observable array', function () {
                expect(viewModel.results).toBeObservableArray();
            });

            it('should be empty by default', function () {
                expect(viewModel.results().length).toBe(0);
            });
        });

        describe('isResultsDialogShown:', function () {
            it('should be observable', function () {
                expect(viewModel.isResultsDialogShown).toBeObservable();
            });

            it('should be false by default', function () {
                expect(viewModel.isResultsDialogShown()).toBeFalsy();
            });
        });

        describe('navigateToCoursesEvent:', function () {

            it('should be function', function () {
                expect(viewModel.navigateToCoursesEvent).toBeFunction();
            });

            it('should send event \'Navigate to courses\'', function () {
                viewModel.navigateToCoursesEvent();
                expect(eventTracker.publish).toHaveBeenCalledWith('Navigate to courses');
            });

        });

        describe('activate:', function () {

            it('should return promise', function () {
                expect(viewModel.activate()).toBePromise();
            });

            it('should get course from repository', function () {
                viewModel.activate(courseId);
                expect(courseRepository.getById).toHaveBeenCalledWith(courseId);
            });

            it('should fill courseId for viewModel', function () {
                viewModel.activate(courseId);
                expect(viewModel.courseId).toBe(courseId);
            });

            it('should empty results array', function () {
                viewModel.results(['element1', 'element2']);
                viewModel.activate(courseId);
                expect(viewModel.results().length).toBe(0);
            });

            it('should empty loaded results', function () {
                viewModel.loadedResults = ['element1', 'element2'];
                viewModel.activate(courseId);
                expect(viewModel.loadedResults.length).toBe(0);
            });

            it('should reset page to first', function () {
                viewModel.activate(courseId);
                expect(viewModel.pageNumber).toBe(1);
            });

            it('should reset isResultsDialogShown', function () {
                viewModel.isResultsDialogShown(true);
                viewModel.activate(courseId);
                expect(viewModel.isResultsDialogShown()).toBeFalsy();
            });

            it('should reset isDownloadDialogShown', function () {
                viewModel.isDownloadDialogShown(true);
                viewModel.activate(courseId);
                expect(viewModel.isDownloadDialogShown()).toBeFalsy();
            });

            it('should reset isDownloadDialogShown', function () {
                viewModel.isDownloadDialogShown(true);
                viewModel.activate(courseId);
                expect(viewModel.isDownloadDialogShown()).toBeFalsy();
            });

            it('should set allResultsLoaded to false', function () {
                viewModel.allResultsLoaded = true;
                viewModel.activate(courseId);
                expect(viewModel.allResultsLoaded).toBeFalsy();
            });

            describe('when course exists', function () {

                var
                    course = { id: 'courseId', title: 'title' };

                beforeEach(function () {
                    getCourseDefer.resolve(course);
                });

                it('should set courseTitle', function () {
                    viewModel.activate(course.id).fin(function () {
                        expect(viewModel.courseTitle).toBe(course.title);
                        done();
                    });
                });
            });
        });

        describe('deactivate:', function () {
            it('should be function', function () {
                expect(viewModel.deactivate).toBeFunction();
            });

            it('should remove all items from results collection', function () {
                viewModel.results.push({});
                viewModel.results.push({});
                viewModel.deactivate();
                expect(viewModel.results().length).toBe(0);
            });

            it('should empty loaded results', function () {
                viewModel.loadedResults = ['element1', 'element2'];
                viewModel.deactivate();
                expect(viewModel.loadedResults.length).toBe(0);
            });
        });

        describe('attached:', function () {

            var dfd;

            beforeEach(function () {
                dfd = Q.defer();
                viewModel.activate(courseId);
                spyOn(xApiProvider, 'getCourseCompletedStatements').and.returnValue(dfd.promise);;
                dfd.resolve(courseStatements);
            });

            it('should return a promise', function () {
                dfd.resolve(null);
                expect(viewModel.attached()).toBePromise();
            });

            it('should call getCourseCompletedStatements with correct params', function (done) {
                viewModel.attached().fin(function () {
                    expect(xApiProvider.getCourseCompletedStatements).toHaveBeenCalledWith(
                        courseId,
                        constants.courseResults.pageSize + 1,
                        0
                    );
                    done();
                });
            });

            describe('when getCourseCompletedStatements failed', function () {
                beforeEach(function () {
                    dfd.reject();
                });
                it('should set isLoading to false', function (done) {
                    viewModel.attached().fin(function () {
                        expect(viewModel.isLoading()).toBeFalsy();
                        done();
                    });
                });
            });

            describe('when getCourseCompletedStatements returned statements', function () {
                it('should fill results field with results', function (done) {
                    constants.courseResults.pageSize = 1;
                    viewModel.attached().fin(function () {
                        expect(viewModel.results()[0].lrsStatement).toBe(courseStatements[0]);
                        expect(viewModel.results()[0]).toBeInstanceOf(CourseStatement);
                        expect(viewModel.results().length).toBe(1);
                        done();
                    });
                });

                it('should set isLoading to false', function (done) {
                    viewModel.attached().fin(function () {
                        expect(viewModel.isLoading()).toBeFalsy();
                        done();
                    });
                });
            });
        });

        describe('showMoreResults:', function () {

            var dfd;
            beforeEach(function () {
                dfd = Q.defer();
                viewModel.activate(courseId);
                spyOn(dialog, 'show');
                spyOn(xApiProvider, 'getCourseCompletedStatements').and.returnValue(dfd.promise);;
                dfd.resolve(courseStatements);
            });

            //it('should be function', function () {
            //    expect(viewModel.showMoreResults).toBeFunction();
            //});

            //it('should send event \'Show more results\'', function (done) {
            //    viewModel.showMoreResults().fin(function () {
            //        expect(eventTracker.publish).toHaveBeenCalledWith('Show more results');
            //        done();
            //    });
            //});

            //it('should return promise', function () {
            //    expect(viewModel.showMoreResults()).toBePromise();
            //});

            //describe('when no more results', function () {
            //    beforeEach(function () {
            //        viewModel.hasMoreResults = ko.observable(false);
            //    });

            //    it('should not call getCourseCompletedStatements', function () {
            //        viewModel.showMoreResults().fin(function (done) {
            //            expect(xApiProvider.getCourseCompletedStatements).not.toHaveBeenCalled();
            //            done();
            //        });
            //    });

            //    it('should not change page number', function (done) {
            //        viewModel.pageNumber = 1;
            //        viewModel.showMoreResults().fin(function () {
            //            expect(viewModel.pageNumber).toEqual(1);
            //            done();
            //        });

            //    });
            //});

            //describe('when not all results are shown', function () {

            //    beforeEach(function () {
            //        viewModel.hasMoreResults = ko.observable(true);
            //        viewModel.pageNumber = 0;
            //        viewModel.loadedResults = [1, 2, 3];
            //        constants.courseResults.pageSize = 1;
            //        viewModel.results([]);
            //    });

            //    describe('when user access type forbids to view more results', function () {
            //        beforeEach(function () {
            //            viewModel.isResultsDialogShown = ko.observable(false);
            //            userContext.identity = {
            //                email: 'test@test.com',
            //                subscription: {
            //                    accessType: 0,
            //                    expirationDate: new Date().setYear(1990)
            //                }
            //            };
            //        });

            //        it('should not increase page number', function (done) {
            //            var pageNumber = viewModel.pageNumber;
            //            viewModel.showMoreResults().fin(function () {
            //                expect(viewModel.pageNumber).toEqual(pageNumber);
            //                done();
            //            });
            //        });

            //        it('should show upgrade results dialog', function (done) {
            //            viewModel.showMoreResults().fin(function () {
            //                expect(viewModel.isResultsDialogShown()).toBeTruthy();
            //                done();
            //            });
            //        });

            //        it('should not add loaded result for new page to results array', function (done) {
            //            viewModel.showMoreResults().fin(function () {
            //                expect(viewModel.results().length).toEqual(0);
            //                done();
            //            });
            //        });

            //    });

            //    describe('when user access type allows to view more results', function () {

            //        beforeEach(function () {
            //            userContext.identity = {
            //                email: 'test@test.com',
            //                subscription: {
            //                    accessType: 2,
            //                    expirationDate: new Date().setYear(2055)
            //                }
            //            };
            //        });

            //        it('should increase page number', function (done) {
            //            var pageNumber = viewModel.pageNumber;
            //            viewModel.showMoreResults().fin(function () {
            //                expect(viewModel.pageNumber).toEqual(pageNumber + 1);
            //                done();
            //            });
            //        });

            //        describe('when requested results were already loaded', function () {
            //            it('should not call getCourseCompletedStatements to load results', function () {
            //                viewModel.showMoreResults().fin(function (done) {
            //                    expect(xApiProvider.getCourseCompletedStatements).not.toHaveBeenCalled();
            //                    done();
            //                });
            //            });

            //            it('should add loaded result for new page to results array', function () {
            //                viewModel.showMoreResults().fin(function () {
            //                    expect(viewModel.results().length).toEqual(viewModel.pageNumber * constants.courseResults.pageSize);
            //                });
            //            });
            //        });

            //        describe('when all results were loaded by download results functionality', function () {
            //            beforeEach(function () {
            //                constants.courseResults.pageSize = 5;
            //                viewModel.allResultsLoaded = true;
            //            });

            //            it('should not call getCourseCompletedStatements to load results', function () {
            //                viewModel.showMoreResults().fin(function (done) {
            //                    expect(xApiProvider.getCourseCompletedStatements).not.toHaveBeenCalled();
            //                    done();
            //                });
            //            });

            //            it('should add loaded result for new page to results array', function () {
            //                viewModel.showMoreResults().fin(function () {
            //                    expect(viewModel.results().length).toEqual(3);
            //                });
            //            });
            //        });

            //        describe('when requested results were not loaded yet', function () {
            //            beforeEach(function () {
            //                viewModel.loadedResults = [];
            //                viewModel.allResultsLoaded = false;
            //                viewModel.pageNumber = 1;
            //                constants.courseResults.pageSize = 1;
            //            });

            //            it('should call getCourseCompletedStatements with correct params', function () {
            //                viewModel.showMoreResults().fin(function (done) {
            //                    expect(xApiProvider.getCourseCompletedStatements).toHaveBeenCalled();
            //                    done();
            //                });
            //            });

            //            describe('when getCourseCompletedStatements returned statements', function () {
            //                it('should fill results field with results', function (done) {
            //                    viewModel.showMoreResults().fin(function () {
            //                        expect(viewModel.results()[0].lrsStatement).toBe(courseStatements[0]);
            //                        expect(viewModel.results()[0]).toBeInstanceOf(CourseStatement);
            //                        expect(viewModel.results().length).toBe(1);
            //                        done();
            //                    });
            //                });
            //            });

            //            describe('when all results are loaded', function () {
            //                it('should set allResultsLoaded to true', function (done) {
            //                    constants.courseResults.pageSize = 10;
            //                    viewModel.showMoreResults().fin(function () {
            //                        expect(viewModel.allResultsLoaded).toBeTruthy();
            //                        done();
            //                    });
            //                });
            //            });
            //        });
            //    });
            //});
        });

        describe('upgradeNowForLoadMore:', function () {

            it('should be function', function () {
                expect(viewModel.upgradeNowForLoadMore).toBeFunction();
            });

            it('should close dialog', function () {
                viewModel.upgradeNowForLoadMore();
                expect(viewModel.isResultsDialogShown()).toBeFalsy();
            });

            it('should send event \'Upgrade now\'', function () {
                viewModel.upgradeNowForLoadMore();
                expect(eventTracker.publish).toHaveBeenCalledWith('Upgrade now', 'Load more results');
            });

            it('should open upgrade url', function () {
                viewModel.upgradeNowForLoadMore();
                expect(router.openUrl).toHaveBeenCalledWith(constants.upgradeUrl);
            });

        });

        describe('upgradeNowForDownloadCsv:', function () {

            it('should be function', function () {
                expect(viewModel.upgradeNowForDownloadCsv).toBeFunction();
            });

            it('should close dialog', function () {
                viewModel.upgradeNowForDownloadCsv();
                expect(viewModel.isDownloadDialogShown()).toBeFalsy();
            });

            it('should send event \'Upgrade now\'', function () {
                viewModel.upgradeNowForDownloadCsv();
                expect(eventTracker.publish).toHaveBeenCalledWith('Upgrade now', 'Download results CSV');
            });

            it('should open upgrade url', function () {
                viewModel.upgradeNowForDownloadCsv();
                expect(router.openUrl).toHaveBeenCalledWith(constants.upgradeUrl);
            });

        });

        describe('skipUpgradeForLoadMore:', function () {

            it('should be function', function () {
                expect(viewModel.skipUpgradeForLoadMore).toBeFunction();
            });

            it('should close dialog', function () {
                viewModel.skipUpgradeForLoadMore();
                expect(viewModel.isResultsDialogShown()).toBeFalsy();
            });

            it('should send event \'Skip upgrade\'', function () {
                viewModel.skipUpgradeForLoadMore();
                expect(eventTracker.publish).toHaveBeenCalledWith('Skip upgrade', 'Load more results');
            });

        });

        describe('skipUpgradeForDownloadCsv:', function () {

            it('should be function', function () {
                expect(viewModel.skipUpgradeForDownloadCsv).toBeFunction();
            });

            it('should close dialog', function () {
                viewModel.skipUpgradeForDownloadCsv();
                expect(viewModel.isDownloadDialogShown()).toBeFalsy();
            });

            it('should send event \'Skip upgrade\'', function () {
                viewModel.skipUpgradeForDownloadCsv();
                expect(eventTracker.publish).toHaveBeenCalledWith('Skip upgrade', 'Download results CSV');
            });

        });

        describe('downloadResults:', function () {
            beforeEach(function () {
                fileSaverWrapper.saveAs = function () { };
                spyOn(fileSaverWrapper, 'saveAs');
            });

            it('should be function', function () {
                expect(viewModel.downloadResults).toBeFunction();
            });

            it('should return promise', function () {
                expect(viewModel.downloadResults()).toBePromise();
            });

            it('should send event \'Download results\'', function (done) {
                viewModel.downloadResults().fin(function () {
                    expect(eventTracker.publish).toHaveBeenCalledWith('Download results');
                    done();
                });
            });

            describe('when user access type allows to view more results', function () {

                beforeEach(function () {
                    userContext.identity = {
                        email: 'test@test.com',
                        subscription: {
                            accessType: 2,
                            expirationDate: new Date().setYear(2055)
                        }
                    };
                    spyOn(viewModel, 'generateResultsCsvBlob').and.callThrough();
                });

                it('should call generateResultsCsvBlob method', function () {
                    viewModel.downloadResults().fin(function () {
                        expect(viewModel.generateResultsCsvBlob).toHaveBeenCalled();
                        done();
                    });
                });

                it('should call saveAs method with proper args', function () {
                    viewModel.generateResultsCsvBlob().fin(function (result) {
                        viewModel.downloadResults().fin(function () {
                            expect(fileSaverWrapper.saveAs).toHaveBeenCalledWith(result, viewModel.getResultsFileName());
                            done();
                        });
                    });
                });
            });

            describe('when user access type forbids to view more results', function () {

                beforeEach(function () {
                    userContext.identity = {
                        email: 'test@test.com',
                        subscription: {
                            accessType: 0,
                            expirationDate: new Date().setYear(1990)
                        }
                    };
                });

                it('should show upgrade results dialog', function (done) {
                    viewModel.downloadResults().fin(function () {
                        expect(viewModel.isDownloadDialogShown()).toBeTruthy();
                        done();
                    });
                });

                it('should not call saveAs', function (done) {
                    viewModel.downloadResults().fin(function () {
                        expect(fileSaverWrapper.saveAs).not.toHaveBeenCalled();
                        done();
                    });
                });

            });

        });

        describe('getResultsFileName:', function () {

            it('should be function', function () {
                expect(viewModel.getResultsFileName).toBeFunction();
            });

            it('should call moment', function () {
                var a = viewModel.getResultsFileName();
                expect(moment().format).toHaveBeenCalled();
            });

            it('should call moment', function () {
                viewModel.courseTitle = 'Course-123.\\/ фывяй 续约我的服务';
                var a = viewModel.getResultsFileName();
                expect(a).toBe('results_Course-123_2015-02-03_05-38.csv');
            });

        });

        describe('generateResultsCsvBlob:', function () {
            it('should be function', function () {
                expect(viewModel.generateResultsCsvBlob).toBeFunction();
            });

            it('should retur promise', function() {
                expect(viewModel.generateResultsCsvBlob()).toBePromise();
            });

            describe('when all results were already loaded', function () {
                beforeEach(function() {
                    viewModel.loadedResults = [];
                    viewModel.allResultsLoaded = true;
                });

                it('should not call getCourseCompletedStatements', function () {
                    viewModel.generateResultsCsvBlob().fin(function() {
                        expect(xApiProvider.getCourseCompletedStatements).not.toHaveBeenCalled();
                    });
                });
            });

            describe('when all results were not loaded yet', function() {
                beforeEach(function () {
                    viewModel.loadedResults = [];
                    viewModel.allResultsLoaded = false;
                });

                it('should call getCourseCompletedStatements', function () {
                    viewModel.generateResultsCsvBlob().fin(function () {
                        expect(xApiProvider.getCourseCompletedStatements).toHaveBeenCalledWith(viewModel.courseId);
                    });
                });

                it('should set allResultsLoaded to true', function () {
                    viewModel.generateResultsCsvBlob().fin(function () {
                        expect(viewModel.allResultsLoaded).toBeTruthy();
                    });
                });
            });
        });

        describe('noResults:', function () {
            it('should be computed', function () {
                expect(viewModel.noResults).toBeComputed();
            });

            it('should be true if results field contains no elements', function () {
                viewModel.results([]);
                expect(viewModel.noResults()).toBeTruthy();
            });

            it('should be false if results field contains the elements', function () {
                viewModel.results(['some element']);
                expect(viewModel.noResults()).toBeFalsy();
            });
        });

        describe('hasMoreResults:', function () {

            it('should be observable', function () {
                expect(viewModel.hasMoreResults).toBeComputed();
            });

            describe('when shown more results than loaded', function () {

                it('should return true', function () {
                    viewModel.loadedResults = [1, 2, 3];
                    viewModel.results([viewModel.loadedResults[0]]);

                    expect(viewModel.hasMoreResults()).toBeTruthy();
                });

            });

            describe('when all loaded results shown', function () {

                it('should return false', function () {
                    viewModel.loadedResults = [1, 2, 3];
                    viewModel.results(viewModel.loadedResults);

                    expect(viewModel.hasMoreResults()).toBeFalsy();
                });

            });

        });

    });

});