﻿define(['repositories/questionRepository', 'repositories/objectiveRepository', 'models/question'],
    function (questionRepository, objectiveRepository, QuestionModel) {
        "use strict";

        var
            httpWrapper = require('http/httpWrapper'),
            dataContext = require('dataContext'),
            constants = require('constants'),
            app = require('durandal/app');

        var questionType = 0;

        describe('[questionRepository]', function () {

            var post;

            beforeEach(function () {
                post = Q.defer();
                spyOn(httpWrapper, 'post').and.returnValue(post.promise);
                spyOn(app, 'trigger');
            });

            it('should be object', function () {
                expect(questionRepository).toBeObject();
            });

            describe('addQuestion:', function () {

                it('should be function', function () {
                    expect(questionRepository.addQuestion).toBeFunction();
                });

                it('should return promise', function () {
                    expect(questionRepository.addQuestion()).toBePromise();
                });

                describe('when objectiveId is undefined', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.addQuestion(undefined, {});

                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Objective id is not a string');
                            done();
                        });
                    });

                });

                describe('when objectiveId is null', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.addQuestion(null, {});

                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Objective id is not a string');
                            done();
                        });
                    });

                });

                describe('when objectiveId is not a string', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.addQuestion({}, {});

                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Objective id is not a string');
                            done();
                        });
                    });

                });

                describe('when question data is undefined', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.addQuestion('', undefined);
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question data is not an object');
                            done();
                        });
                    });

                });

                describe('when question data is null', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.addQuestion('', null);
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question data is not an object');
                            done();
                        });
                    });

                });

                describe('when question data is not an object', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.addQuestion('', '');
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question data is not an object');
                            done();
                        });
                    });

                });

                describe('when objective id is a string and question data is an object', function () {

                    it('should send request to server to api/question/{type}/create', function (done) {
                        var objectiveId = 'objectiveId';
                        var question = { title: 'title', description: 'description' };
                        post.reject();

                        var promise = questionRepository.addQuestion(objectiveId, question, questionType);

                        promise.fin(function () {
                            expect(httpWrapper.post).toHaveBeenCalledWith('api/question/' + questionType + '/create', {
                                objectiveId: objectiveId,
                                title: question.title,
                            });
                            done();
                        });
                    });

                    describe('and request to server was not successful', function () {

                        it('should reject promise', function (done) {
                            var reason = 'reason';
                            var promise = questionRepository.addQuestion('', {});

                            post.reject(reason);

                            promise.fin(function () {
                                expect(promise).toBeRejectedWith(reason);
                                done();
                            });
                        });

                    });

                    describe('and request to server was successful', function () {

                        describe('and response is undefined', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.addQuestion('', {});

                                post.resolve(undefined);

                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is null', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.addQuestion('', {});

                                post.resolve(null);

                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is not an object', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.addQuestion('', {});

                                post.resolve('');

                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response does not have an id of created question', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.addQuestion('', {});

                                post.resolve({ CreatedOn: '' });

                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Question Id is not a string');
                                    done();
                                });
                            });

                        });

                        describe('and response does not have a question creation date', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.addQuestion('', {});

                                post.resolve({ Id: '' });

                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Question creation date is not a string');
                                    done();
                                });
                            });

                        });

                        describe('and response has id and creation date', function () {

                            var createdOnDate = new Date();
                            var response = {
                                Id: 'questionId',
                                CreatedOn: createdOnDate.toISOString()
                            };

                            beforeEach(function () {
                                post.resolve(response);
                            });

                            describe('and objective does not exist in dataContext', function () {

                                it('should reject promise', function (done) {
                                    dataContext.objectives = [];

                                    var promise = questionRepository.addQuestion('', {});

                                    promise.fin(function () {
                                        expect(promise).toBeRejectedWith('Objective does not exist in dataContext');
                                        done();
                                    });
                                });

                            });

                            describe('and objective exists in dataContext', function () {

                                var objective = {
                                    id: 'objectiveId',
                                    questions: []
                                };

                                beforeEach(function () {
                                    objective.questions = [];
                                    dataContext.objectives = [objective];
                                });

                                it('should add question to objective', function (done) {
                                    var question = { title: 'title' };
                                    var promise = questionRepository.addQuestion(objective.id, question, questionType);

                                    promise.fin(function () {
                                        expect(objective.questions.length).toEqual(1);
                                        expect(objective.questions[0]).toEqual(new QuestionModel({
                                            id: response.Id,
                                            createdOn: new Date(createdOnDate.toISOString()),
                                            modifiedOn: new Date(createdOnDate.toISOString()),
                                            title: question.title,
                                            content: undefined,
                                            type: questionType
                                        }));
                                        done();
                                    });
                                });

                                it('should update objective modification date', function (done) {
                                    var promise = questionRepository.addQuestion(objective.id, {});

                                    promise.fin(function () {
                                        expect(objective.modifiedOn).toEqual(new Date(createdOnDate.toISOString()));
                                        done();
                                    });
                                });

                                it('should trigger event \'question:created\'', function (done) {
                                    var question = { title: 'title' };
                                    var promise = questionRepository.addQuestion(objective.id, question, questionType);
                                    promise.fin(function () {
                                        expect(app.trigger).toHaveBeenCalledWith(constants.messages.question.created, objective.id, new QuestionModel({
                                            id: response.Id,
                                            title: question.title,
                                            content: undefined,
                                            createdOn: new Date(createdOnDate.toISOString()),
                                            modifiedOn: new Date(createdOnDate.toISOString()),
                                            type: questionType
                                        }));
                                        done();
                                    });
                                });

                                it('should resolve promise with question', function (done) {
                                    var promise = questionRepository.addQuestion(objective.id, {});

                                    promise.fin(function () {
                                        var createdQuestion = promise.inspect().value;
                                        expect(createdQuestion.id).toEqual(response.Id);
                                        expect(createdQuestion.createdOn).toEqual(new Date(createdOnDate.toISOString()));
                                        done();
                                    });
                                });

                            });

                        });

                    });

                });

            });

            describe('removeQuestions:', function () {

                it('should be function', function () {
                    expect(questionRepository.removeQuestions).toBeFunction();
                });

                it('should return promise', function () {
                    expect(questionRepository.removeQuestions()).toBePromise();
                });

                describe('when objective id is undefined', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.removeQuestions(undefined, {});

                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Objective id is not a string');
                            done();
                        });
                    });

                });

                describe('when objective id is null', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.removeQuestions(null, {});

                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Objective id is not a string');
                            done();
                        });
                    });

                });

                describe('when objective id is not a string', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.removeQuestions({}, {});

                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Objective id is not a string');
                            done();
                        });
                    });

                });

                describe('when questions are null', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.removeQuestions('', null);
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Questions to remove are not an array');
                            done();
                        });
                    });

                });

                describe('when questions are undefined', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.removeQuestions('', undefined);
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Questions to remove are not an array');
                            done();
                        });
                    });

                });

                describe('when questions are not an array', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.removeQuestions('', {});
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Questions to remove are not an array');
                            done();
                        });
                    });

                });

                describe('when all arguments are valid', function () {
                    var objective;
                    var questionIds;

                    beforeEach(function () {
                        objective = { id: "SomeObjectiveId" };
                        questionIds = ["SomeQuestionId1", "SomeQuestionId2"];
                    });

                    it('should send request to server to api/question/delete', function (done) {
                        post.reject();

                        var promise = questionRepository.removeQuestions(objective.id, questionIds);
                        promise.fin(function () {
                            expect(httpWrapper.post).toHaveBeenCalledWith('api/question/delete', {
                                objectiveId: objective.id,
                                questions: ['SomeQuestionId1', 'SomeQuestionId2']
                            });
                            done();
                        });
                    });

                    describe('and request to server was not successful', function () {

                        it('should reject promise', function (done) {
                            var reason = 'reason';
                            var promise = questionRepository.removeQuestions(objective.id, questionIds);

                            post.reject(reason);
                            promise.fin(function () {
                                expect(promise).toBeRejectedWith(reason);
                                done();
                            });
                        });

                    });

                    describe('and request to server was successful', function () {

                        describe('and response is null', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.removeQuestions(objective.id, questionIds);

                                post.resolve(null);
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is undefined', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.removeQuestions(objective.id, questionIds);

                                post.resolve(undefined);
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is not an object', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.removeQuestions(objective.id, questionIds);

                                post.resolve('');
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response does not have modification date', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.removeQuestions(objective.id, questionIds);

                                post.resolve({});
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response does not have modification date');
                                    done();
                                });
                            });

                        });

                        describe('and response has modification date', function () {

                            var createdOnDate = new Date();
                            var response = { ModifiedOn: createdOnDate.toISOString() };

                            beforeEach(function () {
                                post.resolve(response);
                            });

                            describe('and objective does not exist in dataContext', function () {

                                beforeEach(function () {
                                    dataContext.objectives = [];
                                });

                                it('should reject promise', function (done) {
                                    var promise = questionRepository.removeQuestions(objective.id, questionIds);
                                    promise.fin(function () {
                                        expect(promise).toBeRejectedWith('Objective does not exist in dataContext');
                                        done();
                                    });
                                });

                            });

                            describe('and objective exists in dataContext', function () {

                                beforeEach(function () {
                                    dataContext.objectives = [{ id: objective.id, questions: [{ id: "SomeQuestionId1" }, { id: "SomeQuestionId2" }] }];
                                });

                                it('should remove questions from objective', function (done) {
                                    var promise = questionRepository.removeQuestions(objective.id, questionIds);
                                    promise.fin(function () {
                                        expect(dataContext.objectives[0].questions.length).toEqual(0);
                                        done();
                                    });
                                });

                                it('should update objective modification date', function (done) {
                                    var promise = questionRepository.removeQuestions(objective.id, questionIds);
                                    promise.fin(function () {
                                        expect(dataContext.objectives[0].modifiedOn).toEqual(new Date(response.ModifiedOn));
                                        done();
                                    });
                                });

                                it('should trigger event \'questions:deleted\'', function (done) {
                                    var promise = questionRepository.removeQuestions(objective.id, questionIds);
                                    promise.fin(function () {
                                        expect(app.trigger).toHaveBeenCalledWith(constants.messages.question.deleted, objective.id, questionIds);
                                        done();
                                    });
                                });

                                it('should resolve promise with modification date', function (done) {
                                    var promise = questionRepository.removeQuestions(objective.id, questionIds);
                                    promise.fin(function () {
                                        expect(promise).toBeResolvedWith(new Date(response.ModifiedOn));
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });

            describe('updateTitle:', function () {

                it('should be function', function () {
                    expect(questionRepository.updateTitle).toBeFunction();
                });

                it('should return promise', function () {
                    expect(questionRepository.updateTitle()).toBePromise();
                });

                describe('when question id is null', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.updateTitle(null, '');
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question id is not a string');
                            done();
                        });
                    });

                });

                describe('when question id is undefined', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.updateTitle(undefined, '');
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question id is not a string');
                            done();
                        });
                    });

                });

                describe('when question id is not a string', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.updateTitle({}, '');
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question id is not a string');
                            done();
                        });
                    });

                });

                describe('when title is null', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.updateTitle('', null);
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question title not a string');
                            done();
                        });
                    });

                });

                describe('when title is undefined', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.updateTitle('', undefined);
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question title not a string');
                            done();
                        });
                    });

                });

                describe('when title is not a string', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.updateTitle('', {});
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question title not a string');
                            done();
                        });
                    });

                });

                describe('when all arguments are valid', function () {

                    it('should send request to server to api/question/updateTitle', function (done) {
                        var questionId = 'questionId';
                        var questionTitle = 'questionTitle';

                        post.reject();

                        var promise = questionRepository.updateTitle(questionId, questionTitle);
                        promise.fin(function () {
                            expect(httpWrapper.post).toHaveBeenCalledWith('api/question/updateTitle', {
                                questionId: questionId,
                                title: questionTitle
                            });
                            done();
                        });
                    });

                    describe('and request to server was not successful', function () {

                        it('should reject promise', function (done) {
                            var reason = 'reason';
                            var promise = questionRepository.updateTitle('', '');

                            post.reject(reason);
                            promise.fin(function () {
                                expect(promise).toBeRejectedWith(reason);
                                done();
                            });
                        });

                    });

                    describe('and request to server was successful', function () {

                        describe('and response is undefined', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.updateTitle('', '');

                                post.resolve(undefined);
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is null', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.updateTitle('', '');

                                post.resolve(null);
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is not an object', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.updateTitle('', '');

                                post.resolve('');
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response does not have question modification date', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.updateTitle('', '');

                                post.resolve({});
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response does not have modification date');
                                    done();
                                });
                            });

                        });

                        describe('and response has modification date', function () {

                            var createdOnDate = new Date();
                            var response = { ModifiedOn: createdOnDate.toISOString() };

                            beforeEach(function () {
                                post.resolve(response);
                            });

                            describe('and question does not exist in dataContext', function () {

                                beforeEach(function () {
                                    dataContext.objectives = [];
                                });

                                it('should reject promise', function (done) {
                                    var promise = questionRepository.updateTitle('', '');
                                    promise.fin(function () {
                                        expect(promise).toBeRejectedWith('Question does not exist in dataContext');
                                        done();
                                    });
                                });

                            });

                            describe('and question exists in dataContext', function () {

                                var questionId = 'questionId';
                                var questionTitle = 'questionTitle';

                                beforeEach(function () {
                                    dataContext.objectives = [{ id: '', questions: [{ id: questionId }] }];
                                });

                                it('should update title and modification date', function (done) {
                                    var promise = questionRepository.updateTitle(questionId, questionTitle);
                                    promise.fin(function () {
                                        expect(dataContext.objectives[0].questions[0].title).toEqual(questionTitle);
                                        expect(dataContext.objectives[0].questions[0].modifiedOn).toEqual(new Date(response.ModifiedOn));
                                        done();
                                    });
                                });

                                it('should trigger event \'question:titleUpdated\'', function (done) {
                                    var promise = questionRepository.updateTitle(questionId, questionTitle);
                                    promise.fin(function () {
                                        expect(app.trigger).toHaveBeenCalledWith(constants.messages.question.titleUpdated, dataContext.objectives[0].questions[0]);
                                        done();
                                    });
                                });

                                it('should resolve promise with modification date', function (done) {
                                    var promise = questionRepository.updateTitle(questionId, questionTitle);
                                    promise.fin(function () {
                                        expect(promise).toBeResolvedWith(new Date(response.ModifiedOn));
                                        done();
                                    });
                                });

                            });

                        });

                    });

                });

            });

            describe('updateContent:', function () {

                it('should be function', function () {
                    expect(questionRepository.updateContent).toBeFunction();
                });

                it('should return promise', function () {
                    expect(questionRepository.updateContent()).toBePromise();
                });

                describe('when question id is undefined', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.updateContent(undefined, '');
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question id is not a string');
                            done();
                        });
                    });

                });

                describe('when question id is null', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.updateContent(null, '');
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question id is not a string');
                            done();
                        });
                    });

                });

                describe('when question id is not a string', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.updateContent({}, '');
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question id is not a string');
                            done();
                        });
                    });

                });

                describe('when all arguments are valid', function () {

                    it('should send request to server to api/question/updateContent', function (done) {
                        var questionId = 'questionId';
                        var questionContent = 'questionContent';

                        post.reject();

                        var promise = questionRepository.updateContent(questionId, questionContent);
                        promise.fin(function () {
                            expect(httpWrapper.post).toHaveBeenCalledWith('api/question/updateContent', {
                                questionId: questionId,
                                content: questionContent
                            });
                            done();
                        });
                    });

                    describe('and request to server was not successful', function () {

                        it('should reject promise', function (done) {
                            var reason = 'reason';
                            var promise = questionRepository.updateContent('', '');

                            post.reject(reason);
                            promise.fin(function () {
                                expect(promise).toBeRejectedWith(reason);
                                done();
                            });
                        });

                    });

                    describe('and request to server was successful', function () {

                        describe('and response is undefined', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.updateContent('', '');

                                post.resolve(undefined);
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is null', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.updateContent('', '');

                                post.resolve(null);
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is not an object', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.updateContent('', '');

                                post.resolve('');
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response does not have question modification date', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.updateContent('', '');

                                post.resolve({});
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response does not have modification date');
                                    done();
                                });
                            });

                        });

                        describe('and response has modification date', function () {


                            var createdOnDate = new Date();
                            var response = { ModifiedOn: createdOnDate.toISOString() };

                            beforeEach(function () {
                                post.resolve(response);
                            });

                            describe('and question does not exist in dataContext', function () {

                                beforeEach(function () {
                                    dataContext.objectives = [];
                                });

                                it('should reject promise', function (done) {
                                    var promise = questionRepository.updateContent('', '');
                                    promise.fin(function () {
                                        expect(promise).toBeRejectedWith('Question does not exist in dataContext');
                                        done();
                                    });
                                });

                            });

                            describe('and question exists in dataContext', function () {

                                var questionId = 'questionId';
                                var questionContent = 'questionContent';

                                beforeEach(function () {
                                    dataContext.objectives = [{ id: '', questions: [{ id: questionId }] }];
                                });

                                it('should update title and modification date', function (done) {

                                    var promise = questionRepository.updateContent(questionId, questionContent);
                                    promise.fin(function () {
                                        expect(dataContext.objectives[0].questions[0].content).toEqual(questionContent);
                                        expect(dataContext.objectives[0].questions[0].modifiedOn).toEqual(new Date(response.ModifiedOn));
                                        done();
                                    });
                                });

                                it('should resolve promise with modification date', function (done) {
                                    var promise = questionRepository.updateContent(questionId, questionContent);
                                    promise.fin(function () {
                                        expect(promise).toBeResolvedWith(new Date(response.ModifiedOn));
                                        done();
                                    });
                                });

                            });

                        });

                    });

                });

            });

            describe('getById:', function () {
                var getObjectiveDeferred;
                beforeEach(function () {
                    getObjectiveDeferred = Q.defer();
                    spyOn(objectiveRepository, 'getById').and.returnValue(getObjectiveDeferred.promise);
                });

                describe('when objectiveId is undefined', function () {
                    it('should throw exception', function () {
                        var f = function () {
                            questionRepository.getById(undefined);
                        };
                        expect(f).toThrow();
                    });
                });

                describe('when objectiveId is null', function () {
                    it('should throw exception', function () {
                        var f = function () {
                            questionRepository.getById(null);
                        };
                        expect(f).toThrow();
                    });
                });

                describe('when questionId is null', function () {
                    it('should throw exception', function () {
                        var f = function () {
                            questionRepository.getById(1, null);
                        };
                        expect(f).toThrow();
                    });
                });

                describe('when questionId is undefined', function () {
                    it('should throw exception', function () {
                        var f = function () {
                            questionRepository.getById(1);
                        };
                        expect(f).toThrow();
                    });
                });

                describe('when all arguments are valid', function () {

                    it('should return promise', function () {
                        var promise = questionRepository.getById(1, 0);
                        expect(promise).toBePromise();
                    });

                    describe('when objective does not exist', function () {
                        it('should reject promise', function (done) {
                            var promise = questionRepository.getById(-1, 0);
                            getObjectiveDeferred.resolve(null);
                            promise.fin(function () {
                                expect(promise).toBeRejectedWith('Objective does not exist');
                                done();
                            });
                        });
                    });

                    describe('when objective exists', function () {
                        var question = { id: 0, title: 'lalal' };
                        var objective = { id: 1, questions: [question] };

                        it('should resolve promise with question value', function (done) {
                            var promise = questionRepository.getById(objective.id, question.id);
                            getObjectiveDeferred.resolve(objective);
                            promise.fin(function () {
                                expect(promise.inspect().value).toEqual(question);
                                done();
                            });
                        });
                    });

                });

            });

            describe('updateFillInTheBlank:', function () {

                it('should be function', function () {
                    expect(questionRepository.updateFillInTheBlank).toBeFunction();
                });

                it('should return promise', function () {
                    expect(questionRepository.updateFillInTheBlank()).toBePromise();
                });

                describe('when question id is undefined', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.updateFillInTheBlank(undefined, '');
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question id is not a string');
                            done();
                        });
                    });

                });

                describe('when question id is null', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.updateFillInTheBlank(null, '');
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question id is not a string');
                            done();
                        });
                    });

                });

                describe('when question id is not a string', function () {

                    it('should reject promise', function (done) {
                        var promise = questionRepository.updateFillInTheBlank({}, '');
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question id is not a string');
                            done();
                        });
                    });

                });

                describe('when all arguments are valid', function () {

                    it('should send request to server to api/question/updateContent', function (done) {
                        var questionId = 'questionId';
                        var fillInTheBlank = 'fillInTheBlank';
                        var answersCollection = [];

                        post.reject();

                        var promise = questionRepository.updateFillInTheBlank(questionId, fillInTheBlank, answersCollection);
                        promise.fin(function () {
                            expect(httpWrapper.post).toHaveBeenCalledWith('api/question/updatefillintheblank', {
                                questionId: questionId,
                                fillInTheBlank: fillInTheBlank,
                                answersCollection: answersCollection
                            });
                            done();
                        });
                    });

                    describe('and request to server was not successful', function () {

                        it('should reject promise', function (done) {
                            var reason = 'reason';
                            var promise = questionRepository.updateFillInTheBlank('', '');

                            post.reject(reason);
                            promise.fin(function () {
                                expect(promise).toBeRejectedWith(reason);
                                done();
                            });
                        });

                    });

                    describe('and request to server was successful', function () {

                        describe('and response is undefined', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.updateFillInTheBlank('', '');

                                post.resolve(undefined);
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is null', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.updateFillInTheBlank('', '');

                                post.resolve(null);
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is not an object', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.updateFillInTheBlank('', '');

                                post.resolve('');
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is an object', function () {

                            describe('and response does not have question modification date', function () {

                                it('should reject promise', function (done) {
                                    var promise = questionRepository.updateFillInTheBlank('', '');

                                    post.resolve({});
                                    promise.fin(function () {
                                        expect(promise).toBeRejectedWith('Response does not have modification date');
                                        done();
                                    });
                                });

                            });

                            describe('and response has modification date', function () {

                                var createdOnDate = new Date();
                                var response = { ModifiedOn: createdOnDate.toISOString() };

                                beforeEach(function () {
                                    post.resolve(response);
                                });

                                describe('and question does not exist in dataContext', function () {

                                    beforeEach(function () {
                                        dataContext.objectives = [];
                                    });

                                    it('should reject promise', function (done) {
                                        var promise = questionRepository.updateFillInTheBlank('', '', {});
                                        promise.fin(function () {
                                            expect(promise).toBeRejectedWith('Question does not exist in dataContext');
                                            done();
                                        });
                                    });

                                });

                                describe('and question exists in dataContext', function () {

                                    var questionId = 'questionId';
                                    var questionContent = 'questionContent';

                                    beforeEach(function () {
                                        dataContext.objectives = [{ id: '', questions: [{ id: questionId }] }];
                                    });

                                    it('should update content and modification date', function (done) {

                                        var promise = questionRepository.updateFillInTheBlank(questionId, questionContent, {});
                                        promise.fin(function () {
                                            expect(dataContext.objectives[0].questions[0].content).toEqual(questionContent);
                                            expect(dataContext.objectives[0].questions[0].modifiedOn).toEqual(new Date(response.ModifiedOn));
                                            done();
                                        });
                                    });

                                    it('should resolve promise with modification date', function (done) {
                                        var promise = questionRepository.updateFillInTheBlank(questionId, questionContent, {});
                                        promise.fin(function () {
                                            expect(promise).toBeResolvedWith(new Date(response.ModifiedOn));
                                            done();
                                        });
                                    });

                                });

                            });

                        });

                    });

                });

            });

            describe('getQuestionFeedback:', function() {

                it('should be function', function() {
                    expect(questionRepository.getQuestionFeedback).toBeFunction();
                });

                it('should return promise', function () {
                    expect(questionRepository.getQuestionFeedback()).toBePromise();
                });

                var questionId;
                describe('when question id is undefined', function () {

                    beforeEach(function () {
                        questionId = undefined;
                    });

                    it('should reject promise', function (done) {
                        var promise = questionRepository.getQuestionFeedback(questionId);
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question id is not a string');
                            done();
                        });
                    });

                });

                describe('when question id is not a string', function () {

                    beforeEach(function () {
                        questionId = {};
                    });

                    it('should reject promise', function (done) {
                        var promise = questionRepository.getQuestionFeedback(questionId);
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question id is not a string');
                            done();
                        });
                    });

                });

                describe('when question id is valid', function () {

                    beforeEach(function () {
                        questionId = 'questionId';
                    });

                    it('should send request to server to api/question/getQuestionFeedback', function (done) {
                        post.reject();

                        var promise = questionRepository.getQuestionFeedback(questionId);
                        promise.fin(function () {
                            expect(httpWrapper.post).toHaveBeenCalledWith('api/question/getQuestionFeedback', {
                                questionId: questionId
                            });
                            done();
                        });
                    });

                    describe('and request to server was not successful', function () {

                        it('should reject promise', function (done) {
                            var reason = 'reason';
                            var promise = questionRepository.getQuestionFeedback(questionId);

                            post.reject(reason);
                            promise.fin(function () {
                                expect(promise).toBeRejectedWith(reason);
                                done();
                            });
                        });

                    });

                    describe('and request to server was successful', function () {

                        describe('and response is undefined', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.getQuestionFeedback(questionId);

                                post.resolve(undefined);
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is null', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.getQuestionFeedback(questionId);

                                post.resolve(null);
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is not an object', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.getQuestionFeedback(questionId);

                                post.resolve('');
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is an object', function () {

                            describe('and response does not have question modification date', function () {

                                it('should reject promise', function (done) {
                                    var promise = questionRepository.getQuestionFeedback(questionId);

                                    post.resolve({});
                                    promise.fin(function () {
                                        expect(promise).toBeRejectedWith('Response does not have modification date');
                                        done();
                                    });
                                });

                            });

                            describe('and response has modification date', function () {

                                var createdOnDate = new Date();
                                var response = {
                                    ModifiedOn: createdOnDate.toISOString(),
                                    CorrectFeedbackText: 'correct text',
                                    IncorrectFeedbackText: 'incorrect text'
                                };

                                beforeEach(function () {
                                    post.resolve(response);
                                });

                                describe('and question does not exist in dataContext', function () {

                                    beforeEach(function () {
                                        dataContext.objectives = [];
                                    });

                                    it('should reject promise', function (done) {
                                        var promise = questionRepository.getQuestionFeedback(questionId);
                                        promise.fin(function () {
                                            expect(promise).toBeRejectedWith('Question does not exist in dataContext');
                                            done();
                                        });
                                    });

                                });

                                describe('and question exists in dataContext', function () {

                                    beforeEach(function () {
                                        dataContext.objectives = [{ id: '', questions: [{ id: questionId, feedback: {} }] }];
                                    });

                                    it('should update modification date', function (done) {
                                        var promise = questionRepository.getQuestionFeedback(questionId);
                                        promise.fin(function () {
                                            expect(dataContext.objectives[0].questions[0].modifiedOn).toEqual(new Date(response.ModifiedOn));
                                            done();
                                        });
                                    });

                                    it('should resolve promise with feedback texts', function (done) {
                                        var promise = questionRepository.getQuestionFeedback(questionId);
                                        promise.fin(function () {
                                            expect(promise).toBeResolvedWith({
                                                correctFeedbackText: response.CorrectFeedbackText,
                                                incorrectFeedbackText: response.IncorrectFeedbackText
                                            });
                                            done();
                                        });
                                    });

                                });

                            });

                        });

                    });

                });

            });

            describe('updateCorrectFeedback:', function() {

                it('should be function', function() {
                    expect(questionRepository.updateCorrectFeedback).toBeFunction();
                });

                it('should return promise', function() {
                    expect(questionRepository.updateCorrectFeedback()).toBePromise();
                });

                var questionId, feedbackText;
                describe('when question id is undefined', function () {

                    beforeEach(function() {
                        questionId = undefined;
                    });

                    it('should reject promise', function (done) {
                        var promise = questionRepository.updateCorrectFeedback(questionId, feedbackText);
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question id is not a string');
                            done();
                        });
                    });

                });

                describe('when question id is not a string', function () {

                    beforeEach(function() {
                        questionId = {};
                    });

                    it('should reject promise', function (done) {
                        var promise = questionRepository.updateCorrectFeedback(questionId, feedbackText);
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question id is not a string');
                            done();
                        });
                    });

                });

                describe('when all arguments are valid', function() {

                    beforeEach(function() {
                        questionId = 'questionId';
                        feedbackText = 'correct feedback text';
                    });

                    it('should send request to server to api/question/updateCorrectFeedback', function (done) {
                        post.reject();

                        var promise = questionRepository.updateCorrectFeedback(questionId, feedbackText);
                        promise.fin(function () {
                            expect(httpWrapper.post).toHaveBeenCalledWith('api/question/updateCorrectFeedback', {
                                questionId: questionId,
                                feedbackText: feedbackText
                            });
                            done();
                        });
                    });

                    describe('and request to server was not successful', function () {

                        it('should reject promise', function (done) {
                            var reason = 'reason';
                            var promise = questionRepository.updateCorrectFeedback(questionId, feedbackText);

                            post.reject(reason);
                            promise.fin(function () {
                                expect(promise).toBeRejectedWith(reason);
                                done();
                            });
                        });

                    });

                    describe('and request to server was successful', function() {

                        describe('and response is undefined', function() {

                            it('should reject promise', function(done) {
                                var promise = questionRepository.updateCorrectFeedback(questionId, feedbackText);

                                post.resolve(undefined);
                                promise.fin(function() {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is null', function() {

                            it('should reject promise', function(done) {
                                var promise = questionRepository.updateCorrectFeedback(questionId, feedbackText);

                                post.resolve(null);
                                promise.fin(function() {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is not an object', function() {

                            it('should reject promise', function(done) {
                                var promise = questionRepository.updateCorrectFeedback(questionId, feedbackText);

                                post.resolve('');
                                promise.fin(function() {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });
                       
                        });

                        describe('and response is an object', function () {

                            describe('and response does not have question modification date', function () {

                                it('should reject promise', function (done) {
                                    var promise = questionRepository.updateCorrectFeedback(questionId, feedbackText);

                                    post.resolve({});
                                    promise.fin(function () {
                                        expect(promise).toBeRejectedWith('Response does not have modification date');
                                        done();
                                    });
                                });

                            });

                            describe('and response has modification date', function() {
                                
                                var createdOnDate = new Date();
                                var response = { ModifiedOn: createdOnDate.toISOString() };

                                beforeEach(function () {
                                    post.resolve(response);
                                });

                                describe('and question does not exist in dataContext', function () {

                                    beforeEach(function () {
                                        dataContext.objectives = [];
                                    });

                                    it('should reject promise', function (done) {
                                        var promise = questionRepository.updateCorrectFeedback(questionId, feedbackText);
                                        promise.fin(function () {
                                            expect(promise).toBeRejectedWith('Question does not exist in dataContext');
                                            done();
                                        });
                                    });

                                });

                                describe('and question exists in dataContext', function () {

                                    beforeEach(function () {
                                        dataContext.objectives = [{ id: '', questions: [{ id: questionId, feedback: {} }] }];
                                    });

                                    it('should update modification date', function (done) {
                                        var promise = questionRepository.updateCorrectFeedback(questionId, feedbackText);
                                        promise.fin(function () {
                                            expect(dataContext.objectives[0].questions[0].modifiedOn).toEqual(new Date(response.ModifiedOn));
                                            done();
                                        });
                                    });

                                    it('should resolve promise with modification date', function (done) {
                                        var promise = questionRepository.updateCorrectFeedback(questionId, feedbackText);
                                        promise.fin(function () {
                                            expect(promise).toBeResolvedWith(new Date(response.ModifiedOn));
                                            done();
                                        });
                                    });

                                });

                            });

                        });

                    });

                });

            });

            describe('updateIncorrectFeedback:', function () {

                it('should be function', function () {
                    expect(questionRepository.updateIncorrectFeedback).toBeFunction();
                });

                it('should return promise', function () {
                    expect(questionRepository.updateIncorrectFeedback()).toBePromise();
                });

                var questionId, feedbackText;
                describe('when question id is undefined', function () {

                    beforeEach(function () {
                        questionId = undefined;
                    });

                    it('should reject promise', function (done) {
                        var promise = questionRepository.updateIncorrectFeedback(questionId, feedbackText);
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question id is not a string');
                            done();
                        });
                    });

                });

                describe('when question id is not a string', function () {

                    beforeEach(function () {
                        questionId = {};
                    });

                    it('should reject promise', function (done) {
                        var promise = questionRepository.updateIncorrectFeedback(questionId, feedbackText);
                        promise.fin(function () {
                            expect(promise).toBeRejectedWith('Question id is not a string');
                            done();
                        });
                    });

                });

                describe('when all arguments are valid', function () {

                    beforeEach(function () {
                        questionId = 'questionId';
                        feedbackText = 'correct feedback text';
                    });

                    it('should send request to server to api/question/updateIncorrectFeedback', function (done) {
                        post.reject();

                        var promise = questionRepository.updateIncorrectFeedback(questionId, feedbackText);
                        promise.fin(function () {
                            expect(httpWrapper.post).toHaveBeenCalledWith('api/question/updateIncorrectFeedback', {
                                questionId: questionId,
                                feedbackText: feedbackText
                            });
                            done();
                        });
                    });

                    describe('and request to server was not successful', function () {

                        it('should reject promise', function (done) {
                            var reason = 'reason';
                            var promise = questionRepository.updateIncorrectFeedback(questionId, feedbackText);

                            post.reject(reason);
                            promise.fin(function () {
                                expect(promise).toBeRejectedWith(reason);
                                done();
                            });
                        });

                    });

                    describe('and request to server was successful', function () {

                        describe('and response is undefined', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.updateIncorrectFeedback(questionId, feedbackText);

                                post.resolve(undefined);
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is null', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.updateIncorrectFeedback(questionId, feedbackText);

                                post.resolve(null);
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is not an object', function () {

                            it('should reject promise', function (done) {
                                var promise = questionRepository.updateIncorrectFeedback(questionId, feedbackText);

                                post.resolve('');
                                promise.fin(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                    done();
                                });
                            });

                        });

                        describe('and response is an object', function () {

                            describe('and response does not have question modification date', function () {

                                it('should reject promise', function (done) {
                                    var promise = questionRepository.updateIncorrectFeedback(questionId, feedbackText);

                                    post.resolve({});
                                    promise.fin(function () {
                                        expect(promise).toBeRejectedWith('Response does not have modification date');
                                        done();
                                    });
                                });

                            });

                            describe('and response has modification date', function () {

                                var createdOnDate = new Date();
                                var response = { ModifiedOn: createdOnDate.toISOString() };

                                beforeEach(function () {
                                    post.resolve(response);
                                });

                                describe('and question does not exist in dataContext', function () {

                                    beforeEach(function () {
                                        dataContext.objectives = [];
                                    });

                                    it('should reject promise', function (done) {
                                        var promise = questionRepository.updateIncorrectFeedback(questionId, feedbackText);
                                        promise.fin(function () {
                                            expect(promise).toBeRejectedWith('Question does not exist in dataContext');
                                            done();
                                        });
                                    });

                                });

                                describe('and question exists in dataContext', function () {

                                    beforeEach(function () {
                                        dataContext.objectives = [{ id: '', questions: [{ id: questionId, feedback: {} }] }];
                                    });

                                    it('should update modification date', function (done) {
                                        var promise = questionRepository.updateIncorrectFeedback(questionId, feedbackText);
                                        promise.fin(function () {
                                            expect(dataContext.objectives[0].questions[0].modifiedOn).toEqual(new Date(response.ModifiedOn));
                                            done();
                                        });
                                    });

                                    it('should resolve promise with modification date', function (done) {
                                        var promise = questionRepository.updateIncorrectFeedback(questionId, feedbackText);
                                        promise.fin(function () {
                                            expect(promise).toBeResolvedWith(new Date(response.ModifiedOn));
                                            done();
                                        });
                                    });

                                });

                            });

                        });

                    });

                });

            });

        });
    });