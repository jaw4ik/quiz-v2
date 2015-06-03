﻿define(['viewmodels/learningPaths/courseSelector/courseSelector'], function (viewModel) {
    "use strict";

    var
        getOwnedCoursesQuery = require('viewmodels/learningPaths/courseSelector/queries/getOwnedCoursesQuery'),
        getLearningPathByIdQuery = require('viewmodels/learningPaths/learningPath/queries/getLearningPathByIdQuery'),
        app = require('durandal/app'),
        constants = require('constants')
    ;


    describe('viewmodel learning path [courseSelector]', function () {

        beforeEach(function () {
            spyOn(app, 'on');
            spyOn(app, 'off');
        });

        describe('isExpanded:', function () {
            it('should be observable', function () {
                expect(viewModel.isExpanded).toBeObservable();
            });
        });

        describe('courses:', function () {
            it('should be observable array', function () {
                expect(viewModel.courses).toBeObservableArray();
            });
        });

        describe('expand:', function () {
            it('should set isExpanded to true', function () {
                viewModel.isExpanded(false);
                viewModel.expand();
                expect(viewModel.isExpanded()).toBeTruthy();
            });
        });

        describe('collapse:', function () {
            it('should set isExpanded to false', function () {
                viewModel.isExpanded(true);
                viewModel.collapse();
                expect(viewModel.isExpanded()).toBeFalsy();
            });
        });

        describe('activate:', function () {
            var getCoursesDefer,
                getLearningPathDefer,
                courses = [
                {
                    id: '0',
                    createdOn: new Date(1)
                },
                {
                    id: '1',
                    createdOn: new Date(1)
                }
                ],
                learningPath = {
                    courses: [courses[0]]
                };

            beforeEach(function () {
                getCoursesDefer = Q.defer();
                getLearningPathDefer = Q.defer();
                spyOn(getOwnedCoursesQuery, 'execute').and.returnValue(getCoursesDefer.promise);
                spyOn(getLearningPathByIdQuery, 'execute').and.returnValue(getLearningPathDefer.promise);
            });

            it('should subscribe on learningPath.removeCourse event', function () {
                viewModel.activate();
                expect(app.on).toHaveBeenCalledWith(constants.messages.learningPath.removeCourse, viewModel.courseRemoved);
            });

            describe('when learning path retrieved', function () {
                beforeEach(function () {
                    getLearningPathDefer.resolve(learningPath);
                });

                describe('when courses retrieved', function () {
                    beforeEach(function () {
                        getCoursesDefer.resolve(courses);
                    });

                    it('should set courses ordered by created on', function (done) {
                        viewModel.courses([]);
                        viewModel.activate().fin(function () {
                            expect(viewModel.courses().length).toBe(courses.length);
                            expect(viewModel.courses()[0].createdOn.toLocaleString()).toBe(courses[1].createdOn.toLocaleString());
                            expect(viewModel.courses()[1].createdOn.toLocaleString()).toBe(courses[0].createdOn.toLocaleString());
                            done();
                        });
                    });

                    it('should set correct isSelected field for each course', function (done) {
                        viewModel.courses([]);
                        viewModel.activate().fin(function () {
                            expect(viewModel.courses().length).toBe(courses.length);
                            expect(viewModel.courses()[0].isSelected()).toBeTruthy();
                            expect(viewModel.courses()[1].isSelected()).toBeFalsy();
                            done();
                        });
                    });
                });
            });

        });

        describe('deactivate:', function () {
            it('should unsubscribe from learningPath.removeCourse event', function () {
                viewModel.deactivate();
                expect(app.off).toHaveBeenCalledWith(constants.messages.learningPath.removeCourse, viewModel.courseRemoved);
            });
        });

        describe('courseRemoved:', function () {
            var courseBrief;
            beforeEach(function() {
                courseBrief = {
                    id: 'id',
                    isSelected: ko.observable(true)
                };
            });

            it('should set course isSelected to false', function () {
                viewModel.courses([courseBrief]);
                viewModel.courseRemoved(courseBrief.id);
                expect(courseBrief.isSelected()).toBeFalsy();
            });
        });

    });

});