﻿define(function (require) {
    "use strict";

    var
        viewModel = require('viewmodels/questions/statement/statement'),
        router = require('plugins/router'),
        eventTracker = require('eventTracker'),
        answerRepository = require('repositories/answerRepository'),
        http = require('plugins/http'),
        localizationManager = require('localization/localizationManager');

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

    describe('question [statement]', function () {

        beforeEach(function () {
            spyOn(eventTracker, 'publish');
            spyOn(router, 'navigate');
            spyOn(router, 'navigateWithQueryString');
            spyOn(router, 'replace');
        });

        it('should be defined', function () {
            expect(viewModel).toBeDefined();
        });

        describe('initialize:', function () {
            var getAnswerCollectionDefer;

            beforeEach(function () {
                getAnswerCollectionDefer = Q.defer();
                spyOn(answerRepository, 'getCollection').and.returnValue(getAnswerCollectionDefer.promise);
                spyOn(http, 'post');
                spyOn(localizationManager, 'localize').and.callFake(function (arg) {
                    return arg;
                });
            });

            it('should return promise', function () {
                var promise = viewModel.initialize(objectiveId, question);
                expect(promise).toBePromise();
            });

            it('should set objectiveId', function () {
                viewModel.initialize(objectiveId, question);

                expect(viewModel.objectiveId).toBe(objectiveId);
            });

            it('should set questionId', function () {
                viewModel.initialize(objectiveId, question);

                expect(viewModel.questionId).toBe(question.id);
            });

            it('should get answers', function () {
                viewModel.initialize(objectiveId, question);

                expect(answerRepository.getCollection).toHaveBeenCalledWith(question.id);
            });

            describe('when answers are recived', function () {
                var answers = [];

                beforeEach(function () {
                    getAnswerCollectionDefer.resolve(answers);
                });

                it('should set answers', function () {
                    viewModel.answers = null;

                    viewModel.initialize(objectiveId, question);

                    expect(viewModel.answers).toBeDefined();
                });

                it('should return object', function (done) {
                    var promise = viewModel.initialize(objectiveId, question);
                    promise.then(function (result) {
                        expect(result).toBeObject();
                        done();
                    });
                });

                describe('and result object', function () {
                    it('should contain \'statementQuestionEditor\' viewCaption', function (done) {
                        var promise = viewModel.initialize(objectiveId, question);
                        promise.then(function (result) {
                            expect(result.viewCaption).toBe('statementQuestionEditor');
                            done();
                        });
                    });

                    it('should have hasQuestionView property with true value', function (done) {
                        var promise = viewModel.initialize(objectiveId, question);
                        promise.then(function (result) {
                            expect(result.hasQuestionView).toBeTruthy();
                            done();
                        });
                    });

                    it('should have hasQuestionContent property with true value', function (done) {
                        var promise = viewModel.initialize(objectiveId, question);
                        promise.then(function (result) {
                            expect(result.hasQuestionContent).toBeTruthy();
                            done();
                        });
                    });

                    it('should have hasFeedback property with true value', function (done) {
                        var promise = viewModel.initialize(objectiveId, question);
                        promise.then(function (result) {
                            expect(result.hasFeedback).toBeTruthy();
                            done();
                        });
                    });
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

    });

});