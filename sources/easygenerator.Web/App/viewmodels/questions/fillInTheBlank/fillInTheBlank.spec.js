﻿define(function (require) {
    "use strict";

    var
        viewModel = require('viewmodels/questions/fillInTheBlank/fillInTheBlank'),
        router = require('plugins/router'),
        eventTracker = require('eventTracker'),
        questionRepository = require('repositories/questionRepository'),
        http = require('plugins/http');

    var objectiveId = 'objectiveId';

    var question = {
        id: '1',
        title: 'lalala',
        content: 'ololosh',
        createdOn: new Date(),
        modifiedOn: new Date(),
        answerOptions: [],
        learningContents: []
    };

    describe('question [fillInTheBlank]', function () {
        beforeEach(function () {
            spyOn(eventTracker, 'publish');
            spyOn(router, 'navigate');
            spyOn(router, 'navigateWithQueryString');
            spyOn(router, 'replace');
        });

        it('should be defined', function () {
            expect(viewModel).toBeDefined();
        });

        describe('eventTracker:', function () {

            it('should be object', function () {
                expect(viewModel.eventTracker).toBeObject();
            });

        });

        describe('localizationManager', function () {

            it('should be defined', function () {
                expect(viewModel.localizationManager).toBeDefined();
            });

        });

        describe('initialize:', function () {
            var getFillInTheBlankDefer;

            beforeEach(function () {
                getFillInTheBlankDefer = Q.defer();
                spyOn(questionRepository, 'getFillInTheBlank').and.returnValue(getFillInTheBlankDefer.promise);

                spyOn(http, 'post');
            });

            it('should return promise', function () {
                var promise = viewModel.initialize(objectiveId, question);
                expect(promise).toBePromise();
            });

            it('should initialize field', function () {
                viewModel.initialize(objectiveId, question);
                expect(viewModel.objectiveId).toBe(objectiveId);
                expect(viewModel.questionId).toBe(question.id);
            });

            it('should initialize fields', function (done) {
                getFillInTheBlankDefer.resolve();

                var promise = viewModel.initialize(objectiveId, question);
                promise.fin(function () {
                    expect(viewModel.fillInTheBlank).toBeDefined();
                    done();
                });
            });

        });

        describe('isExpanded:', function () {

            it('should be observable', function () {
                expect(viewModel.isExpanded).toBeObservable();
            });

            it('should be true by default', function () {
                expect(viewModel.isExpanded()).toBeTruthy();
            });

        });

        describe('toggleExpand:', function () {

            it('should be function', function () {
                expect(viewModel.toggleExpand).toBeFunction();
            });

            it('should toggle isExpanded value', function () {
                viewModel.isExpanded(false);
                viewModel.toggleExpand();
                expect(viewModel.isExpanded()).toEqual(true);
            });

        });

        describe('questionId:', function () {
            it('should be defined', function () {
                expect(viewModel.questionId).toBeDefined();
            });
        });

        describe('updatedByCollaborator:', function () {
            beforeEach(function () {
                viewModel.fillInTheBlank = { updatedByCollaborator: function () { } };
                spyOn(viewModel.fillInTheBlank, 'updatedByCollaborator');
            });

            it('should be function', function () {
                expect(viewModel.updatedByCollaborator).toBeFunction();
            });

            it('should update fillInTheBlank', function () {
                viewModel.questionId = question.id;
                viewModel.updatedByCollaborator(question.id, {});
                expect(viewModel.fillInTheBlank.updatedByCollaborator).toHaveBeenCalled();
            });

            describe('when question is not current', function () {
                it('should not update fillInTheBlank', function () {
                    viewModel.questionId = 'someId';
                    viewModel.updatedByCollaborator(question.id, {});
                    expect(viewModel.fillInTheBlank.updatedByCollaborator).not.toHaveBeenCalled();
                });
            });
        });
    });

});