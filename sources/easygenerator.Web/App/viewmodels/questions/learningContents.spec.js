﻿define(['viewmodels/questions/learningContents'], function (viewModel) {
    "use strict";

    var
        repository = require('repositories/learningContentRepository'),
        eventTracker = require('eventTracker'),
        notify = require('notify');

    describe('viewModel [learningContents]', function () {

        var questionId = 'questionId';

        beforeEach(function () {
            spyOn(notify, 'saved');
            spyOn(eventTracker, 'publish');
        });

        it('should be defined', function () {
            expect(viewModel).toBeDefined();
        });

        describe('learningContents:', function () {

            it('should be observable array', function() {
                expect(viewModel.learningContents).toBeObservableArray();
            });

        });

        describe('addLearningContent:', function () {

            it('should be function', function () {
                expect(viewModel.addLearningContent).toBeFunction();
            });

            it('should add empty learning content', function () {
                viewModel.addLearningContent();
                expect(viewModel.learningContents().length).toEqual(1);
                expect(viewModel.learningContents()[0].id).toBeObservable();
                expect(viewModel.learningContents()[0].id()).toEqual("");
                expect(viewModel.learningContents()[0].text).toBeObservable();
                expect(viewModel.learningContents()[0].text()).toEqual("");
                expect(viewModel.learningContents()[0].hasFocus).toBeObservable();
                expect(viewModel.learningContents()[0].hasFocus()).toBeTruthy();
            });

            it('should send event \'Add learning content\'', function () {
                viewModel.addLearningContent();
                expect(eventTracker.publish).toHaveBeenCalledWith('Add learning content');
            });

        });

        describe('removeLearningContent:', function () {

            var removeLearningContent;
            var learningContent;

            beforeEach(function () {
                learningContent = { id: ko.observable(''), text: ko.observable('') };

                removeLearningContent = Q.defer();
                spyOn(repository, 'removeLearningContent').and.returnValue(removeLearningContent.promise);
            });

            it('should be function', function () {
                expect(viewModel.removeLearningContent).toBeFunction();
            });

            it('should send event \'Delete learning content\'', function () {
                viewModel.removeLearningContent(learningContent);
                expect(eventTracker.publish).toHaveBeenCalledWith('Delete learning content');
            });

            describe('when learning content id is set', function () {
                beforeEach(function () {
                    learningContent.id('id');
                });

                it('should remove learning content from the repository', function () {
                    viewModel.learningContents([learningContent]);
                    viewModel.questionId = questionId;

                    viewModel.removeLearningContent(learningContent);

                    expect(repository.removeLearningContent).toHaveBeenCalledWith(questionId, learningContent.id());
                });

                it('should remove learning content from the viewModel', function () {
                    viewModel.learningContents([learningContent]);

                    viewModel.removeLearningContent(learningContent);

                    expect(viewModel.learningContents().length).toEqual(0);
                });

                it('should show notification', function (done) {
                    viewModel.learningContents([learningContent]);
                    removeLearningContent.resolve({ modifiedOn: new Date() });

                    viewModel.removeLearningContent(learningContent);

                    removeLearningContent.promise.fin(function () {
                        expect(notify.saved).toHaveBeenCalled();
                        done();
                    });
                });

            });

            describe('when learning content id is not set initially', function () {
                beforeEach(function () {
                    learningContent.id('');
                });

                it('should not remove learning content from the repository', function () {

                    viewModel.learningContents([learningContent]);
                    viewModel.removeLearningContent(learningContent);

                    expect(repository.removeLearningContent).not.toHaveBeenCalledWith(questionId, learningContent.id());
                });

                it('should not remove learning content from the viewModel', function () {
                    viewModel.learningContents([learningContent]);

                    viewModel.removeLearningContent(learningContent);

                    expect(viewModel.learningContents().length).toEqual(1);
                });

                it('should not show notification', function (done) {
                    viewModel.learningContents([learningContent]);
                    removeLearningContent.resolve({ modifiedOn: new Date() });

                    viewModel.removeLearningContent(learningContent);

                    removeLearningContent.promise.fin(function () {
                        expect(notify.saved).not.toHaveBeenCalled();
                        done();
                    });
                });

                describe('and learning content id is set later', function () {

                    it('should remove learning content from the repository', function () {
                        viewModel.learningContents([learningContent]);

                        viewModel.removeLearningContent(learningContent);
                        learningContent.id('id');

                        expect(repository.removeLearningContent).toHaveBeenCalledWith(questionId, learningContent.id());
                    });

                    it('should remove learning content from the viewModel', function () {
                        viewModel.learningContents([learningContent]);

                        viewModel.removeLearningContent(learningContent);
                        learningContent.id('id');

                        expect(viewModel.learningContents().length).toEqual(0);
                    });

                    it('should show notification', function (done) {
                        viewModel.learningContents([learningContent]);
                        removeLearningContent.resolve({ modifiedOn: new Date() });

                        viewModel.removeLearningContent(learningContent);
                        learningContent.id('id');

                        removeLearningContent.promise.fin(function () {
                            expect(notify.saved).toHaveBeenCalled();
                            done();
                        });
                    });

                });
            });

        });

        describe('beginEditText:', function () {

            it('should be function', function () {
                expect(viewModel.beginEditText).toBeFunction();
            });

            it('should send event \'Start editing learning content\'', function () {
                viewModel.beginEditText({});
                expect(eventTracker.publish).toHaveBeenCalledWith('Start editing learning content');
            });
        });

        describe('endEditText:', function () {

            var removeLearningContent;
            beforeEach(function () {
                removeLearningContent = Q.defer();
                spyOn(repository, 'removeLearningContent').and.returnValue(removeLearningContent.promise);
            });

            it('should be function', function () {
                expect(viewModel.endEditText).toBeFunction();
            });

            it('should send event \'End editing learning content\'', function () {
                var learningContent = { id: ko.observable('learningContentId'), text: ko.observable('') };
                viewModel.endEditText(learningContent);
                expect(eventTracker.publish).toHaveBeenCalledWith('End editing learning content');
            });

            describe('when learningContent has been deleted by collaborator', function () {
                it('should be removed from learningContents list', function () {
                    var learningContent = { id: ko.observable('learningContentId'), text: ko.observable(''), isDeleted: true };
                    viewModel.learningContents([learningContent]);

                    viewModel.endEditText(learningContent);

                    expect(viewModel.learningContents().length).toBe(0);
                });
            });

            describe('when text is empty', function () {

                describe('and id is not empty', function () {

                    it('should remove learning content from the repository', function () {
                        var learningContent = { id: ko.observable('learningContentId'), text: ko.observable('') };
                        viewModel.learningContents([learningContent]);

                        viewModel.endEditText(learningContent);

                        expect(repository.removeLearningContent).toHaveBeenCalledWith(questionId, learningContent.id());
                    });

                    it('should show notification', function (done) {
                        var learningContent = { id: ko.observable('learningContentId'), text: ko.observable('') };
                        viewModel.learningContents([learningContent]);
                        removeLearningContent.resolve(new Date());

                        viewModel.endEditText(learningContent);

                        removeLearningContent.promise.fin(function () {
                            expect(notify.saved).toHaveBeenCalled();
                            done();
                        });
                    });

                });

                describe('and id is empty', function () {

                    it('should not remove learning content from the repository', function () {
                        var learningContent = { id: ko.observable(''), text: ko.observable('') };
                        viewModel.learningContents([learningContent]);

                        viewModel.endEditText(learningContent);

                        expect(repository.removeLearningContent).not.toHaveBeenCalled();
                    });

                });

                it('should remove learning content from the viewModel', function () {
                    var learningContent = { id: ko.observable(''), text: ko.observable('') };
                    viewModel.learningContents([learningContent]);

                    viewModel.endEditText(learningContent);

                    expect(viewModel.learningContents().length).toEqual(0);
                });

            });

        });

        describe('updateText:', function () {

            var addLearningContent;
            var updateLearningContentText;

            var learningContents = [{ id: '0', text: '0' }, { id: '1', text: '1' }];

            beforeEach(function () {
                addLearningContent = Q.defer();
                updateLearningContentText = Q.defer();

                spyOn(repository, 'addLearningContent').and.returnValue(addLearningContent.promise);
                spyOn(repository, 'updateText').and.returnValue(updateLearningContentText.promise);
            });

            it('should be function', function () {
                expect(viewModel.updateText).toBeFunction();
            });

            describe('when text is not empty', function () {

                describe('and id is not empty', function () {
                    var text = 'text';
                    var learningContent = { id: ko.observable('learningContentId'), text: ko.observable(text) };

                    describe('and text is not modified', function () {
                        beforeEach(function () {
                            learningContent.originalText = text;
                        });

                        it('should not update learning content text in the repository', function () {
                            viewModel.updateText(learningContent);
                            expect(repository.updateText).not.toHaveBeenCalledWith(learningContent.id(), learningContent.text());
                        });

                    });

                    describe('and text is modified', function () {
                        beforeEach(function () {
                            learningContent.originalText = 'text2';
                        });

                        it('should update learning content text in the repository', function (done) {
                            updateLearningContentText.resolve();

                            viewModel.updateText(learningContent);

                            updateLearningContentText.promise.fin(function () {
                                expect(repository.updateText).toHaveBeenCalledWith(questionId, learningContent.id(), learningContent.text());
                                done();
                            });
                        });

                        it('should show notification', function (done) {
                            updateLearningContentText.resolve({ modifiedOn: new Date() });

                            viewModel.updateText(learningContent);

                            updateLearningContentText.promise.fin(function () {
                                expect(notify.saved).toHaveBeenCalled();
                                done();
                            });
                        });

                        it('should update learning content original text', function (done) {
                            updateLearningContentText.resolve(new Date());

                            viewModel.updateText(learningContent);

                            updateLearningContentText.promise.fin(function () {
                                expect(learningContent.originalText).toBe(learningContent.text());
                                done();
                            });
                        });

                    });

                });

                describe('and id is empty', function () {

                    var id = 'id';
                    var learningContent;

                    beforeEach(function () {
                        learningContent = { id: ko.observable(''), text: ko.observable('text') };
                    });

                    it('should add learning content to the repository', function () {
                        viewModel.updateText(learningContent);
                        expect(repository.addLearningContent).toHaveBeenCalledWith(questionId, { text: learningContent.text() });
                    });

                    it('should update learning content id in the viewModel', function (done) {
                        addLearningContent.resolve({ id: id, createdOn: new Date() });

                        viewModel.updateText(learningContent);

                        addLearningContent.promise.fin(function () {
                            expect(learningContent.id()).toEqual(id);
                            done();
                        });
                    });


                    it('should show notification', function (done) {
                        addLearningContent.resolve({ id: id, createdOn: new Date() });
                        viewModel.updateText(learningContent);

                        addLearningContent.promise.fin(function () {
                            expect(notify.saved).toHaveBeenCalled();
                            done();
                        });
                    });

                    it('should set learning content original text', function (done) {
                        addLearningContent.resolve({ id: id, createdOn: new Date() });

                        viewModel.updateText(learningContent);

                        addLearningContent.promise.fin(function () {
                            expect(learningContent.originalText).toBe(learningContent.text());
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

        describe('autosaveInterval:', function () {

            it('should be number', function () {
                expect(viewModel.autosaveInterval).toEqual(jasmine.any(Number));
            });

        });

        describe('canAddLearningContent:', function () {

            it('should be computed', function () {
                expect(viewModel.canAddLearningContent).toBeComputed();
            });

            describe('when a learning content with empty id exist', function () {

                it('should be false', function () {
                    viewModel.learningContents([{ id: '' }]);
                    expect(viewModel.canAddLearningContent()).toBeFalsy();
                });

            });

            describe('when a learning content with empty id does not exist', function () {

                it('should be true', function () {
                    viewModel.learningContents([]);
                    expect(viewModel.canAddLearningContent()).toBeTruthy();
                });

            });

        });

        describe('createdByCollaborator:', function () {
            var question = { id: questionId },
                learningContent = { id: 'learningContentId', text: 'some text' };

            it('should be function', function () {
                expect(viewModel.createdByCollaborator).toBeFunction();
            });

            describe('when it is current question', function () {

                it('should add learning content to list', function () {
                    viewModel.learningContents([]);
                    viewModel.createdByCollaborator(question, learningContent);

                    expect(viewModel.learningContents().length).toBe(1);
                    expect(viewModel.learningContents()[0].id()).toBe(learningContent.id);
                });

            });

            describe('when it is not current question', function () {

                it('should not add learning content to list', function () {
                    viewModel.learningContents([]);
                    question.id = 'another id';
                    viewModel.createdByCollaborator(question, learningContent);

                    expect(viewModel.learningContents().length).toBe(0);
                });

            });

        });

        describe('deletedByCollaborator:', function () {
            var question = { id: questionId },
                learningContentId = 'learningContentId';

            it('should be function', function () {
                expect(viewModel.deletedByCollaborator).toBeFunction();
            });

            describe('when question is not current question', function () {

                it('should not delete learning content from list', function () {
                    viewModel.learningContents([{ id: ko.observable(learningContentId), hasFocus: ko.observable(false) }]);
                    question.id = 'another id';

                    viewModel.deletedByCollaborator(question, learningContentId);
                    expect(viewModel.learningContents().length).toEqual(1);
                });

            });

            describe('when question is current question', function () {

                beforeEach(function() {
                    viewModel.questionId = question.id;
                });

                describe('and learning content with appropriate id exists', function () {

                    describe('and does not have focus', function () {

                        it('should remove learning objective', function () {
                            viewModel.learningContents([{ id: ko.observable(learningContentId), hasFocus: ko.observable(false) }]);
                            viewModel.deletedByCollaborator(question, learningContentId);

                            expect(viewModel.learningContents().length).toEqual(0);
                        });

                    });

                    describe('and has focus', function () {

                        beforeEach(function () {
                            viewModel.learningContents([{ id: ko.observable(learningContentId), hasFocus: ko.observable(true) }]);
                            spyOn(notify, 'error');
                        });

                        it('should not remove learning objective', function () {
                            viewModel.deletedByCollaborator(question, learningContentId);
                            expect(viewModel.learningContents().length).toEqual(1);
                        });

                        it('should show error notification', function () {
                            viewModel.deletedByCollaborator(question, learningContentId);
                            expect(notify.error).toHaveBeenCalled();
                        });

                        it('should set \'isDeleted\' of learningContent to true', function () {
                            viewModel.deletedByCollaborator(question, learningContentId);
                            expect(viewModel.learningContents()[0].isDeleted).toBeTruthy();
                        });

                    });

                });

                describe('and learning content with appropriate id does not exist', function () {

                    it('should not remove learning objective', function () {
                        viewModel.learningContents([{ id: ko.observable('otherId') }]);
                        viewModel.deletedByCollaborator(question, learningContentId);

                        expect(viewModel.learningContents().length).toEqual(1);
                    });

                });

            });

        });

        describe('textUpdatedByCollaborator:', function () {
            var question = { id: questionId },
                learningContent = { id: ko.observable('0'), text: ko.observable(''), originalText: '', hasFocus: ko.observable(false) },
                updatedLearningContent = { id: '0', text: 'newLearningContent' };

            it('should be function', function () {
                expect(viewModel.textUpdatedByCollaborator).toBeFunction();
            });

            describe('when question is not current question', function () {

                it('should not update learning content', function () {
                    viewModel.learningContents([{ id: ko.observable('0'), text: ko.observable(''), originalText: '', hasFocus: ko.observable(false) }]);

                    viewModel.textUpdatedByCollaborator(question, updatedLearningContent);
                    expect(viewModel.learningContents()[0].text()).toBe('');
                });

            });

            describe('when question is current question', function () {

                beforeEach(function() {
                    viewModel.questionId = question.id;
                });

                describe('and learning content is found', function () {

                    beforeEach(function () {
                        viewModel.learningContents([learningContent]);
                    });

                    it('should update original text', function () {
                        viewModel.learningContents()[0].originalText = '';
                        viewModel.textUpdatedByCollaborator(question, updatedLearningContent);

                        expect(viewModel.learningContents()[0].originalText).toBe(updatedLearningContent.text);
                    });

                    describe('and it does not have focus', function () {

                        it('should be updated', function () {
                            viewModel.learningContents()[0].text('');
                            viewModel.learningContents()[0].hasFocus(false);
                            viewModel.textUpdatedByCollaborator(question, updatedLearningContent);

                            expect(viewModel.learningContents()[0].text()).toBe(updatedLearningContent.text);
                        });

                    });

                    describe('and has focus', function () {

                        it('should not be updated', function () {
                            viewModel.learningContents()[0].text('');
                            viewModel.learningContents()[0].hasFocus(true);
                            viewModel.textUpdatedByCollaborator(question, updatedLearningContent);

                            expect(viewModel.learningContents()[0].text()).not.toBe(updatedLearningContent.text);
                        });

                    });

                });

            });

        });

    });

});