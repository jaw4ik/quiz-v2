﻿import CourseViewModel from './index';
import _ from 'underscore';
import eventTracker from 'eventTracker';
import localizationManager from 'localization/localizationManager';
import notify from 'notify';
import CreateBar from './viewmodels/CreateBarViewModel';
import SectionViewModel from './viewmodels/SectionViewModel';
import courseRepository from 'repositories/courseRepository';
import createSectionCommand from './commands/createSectionCommand';
import createQuestionCommand from './commands/createQuestionCommand';
import deleteQuestionCommand from './commands/deleteQuestionCommand';
import reorderQuestionCommand from './commands/reorderQuestionCommand';
import moveQuestionCommand from './commands/moveQuestionCommand';
import reorderSectionCommand from './commands/reorderSectionCommand';
import unrelateSectionCommand from './commands/unrelateSectionCommand';
import vmContentField from 'viewmodels/common/contentField';
import deleteSectionDialog from 'editor/course/dialogs/deleteSection/deleteSection';

describe('[drag and drop course editor]', () => {

    let courseViewModel;
    let courseId;
    let course;
    let modifiedOn;
    const eventCategory = 'Course editor (drag and drop)';

    beforeEach(() => {
        courseViewModel = new CourseViewModel();
        modifiedOn = new Date();
        courseId = 'courseId';
        course = {
            id: courseId,
            createdBy: 'user',
            introductionContent: 'introductionContent',
            objectives: [
                {
                    id: 'sectionId1',
                    title: 'sectionTitle1',
                    modifiedOn: modifiedOn,
                    image: 'sectionImage1'
                }, {
                    id: 'sectionId2',
                    title: 'sectionTitle2',
                    modifiedOn: modifiedOn,
                    image: 'sectionImage2'
                }
            ]
        };
        spyOn(notify, 'saved');
        spyOn(eventTracker, 'publish');
    });

    it('should be a class', () => {
        expect(CourseViewModel).toBeFunction();
    });

    it('should be singleton', () => {
        let newCourseViewModel = new CourseViewModel();
        expect(newCourseViewModel).toBe(courseViewModel);
    });

    it('should inititalize fields', () => {
        expect(courseViewModel.id).toBe('');
        expect(courseViewModel.createdBy).toBe('');
        expect(courseViewModel.sections).toBeObservableArray();
        expect(courseViewModel.lastDraggingSectionState).toBe(null);
        expect(courseViewModel.eventTracker).toBe(eventTracker);
        expect(courseViewModel.localizationManager).toBe(localizationManager);
        expect(courseViewModel.courseIntroductionContent).toBe(null);
        expect(courseViewModel.notContainSections).toBeObservable();
        expect(courseViewModel.notContainSections()).toBeFalsy();
        expect(courseViewModel.createBar).toBeInstanceOf(CreateBar);
        expect(courseViewModel.activate).toBeFunction();
        expect(courseViewModel.createSection).toBeFunction();
        expect(courseViewModel.reorderSection).toBeFunction();
        expect(courseViewModel.createSectionWithOrder).toBeFunction();
        expect(courseViewModel.createQuestion).toBeFunction();
        expect(courseViewModel.deleteQuestion).toBeFunction();
        expect(courseViewModel.reorderQuestion).toBeFunction();
        expect(courseViewModel.createQuestionWithOrder).toBeFunction();
        expect(courseViewModel.hideQuestions).toBeFunction();
        expect(courseViewModel.restoreQuestionsExpandingState).toBeFunction();
    });

    describe('activate:', () => {

        let promise;

        beforeEach(() => {
            promise = Promise.resolve(course);
            spyOn(courseRepository, 'getById').and.returnValue(promise);
        });

        it('should set course id', done => (async () => {
            courseViewModel.activate(courseId);
            await promise;
            expect(courseViewModel.id).toBe(courseId);
        })().then(done));

        it('should activate createBar', done => (async () => {
            spyOn(courseViewModel.createBar, 'activate');
            courseViewModel.activate(courseId);
            await promise;
            expect(courseViewModel.createBar.activate).toHaveBeenCalled();
        })().then(done));

        it('should set createdBy', done => (async () => {
            courseViewModel.activate(courseId);
            await promise;
            expect(courseViewModel.createdBy).toBe(course.createdBy);
        })().then(done));

        it('should set sections', done => (async () => {
            courseViewModel.activate(courseId);
            await promise;
            expect(courseViewModel.sections()[0]).toBeInstanceOf(SectionViewModel);
            expect(courseViewModel.sections().length).toBe(2);
        })().then(done));

        it('should set courseIntroductionContent', done => (async () => {
            courseViewModel.activate(courseId);
            await promise;
            expect(courseViewModel.courseIntroductionContent.text()).toBe(course.introductionContent);
        })().then(done));

    });

    describe('createSection:', () => {

        let promise;

        beforeEach(() => {
            promise = Promise.resolve({
                id: 'sectionId3',
                title: 'sectionTitle3',
                modifiedOn: modifiedOn,
                image: 'sectionImage3'
            });
            spyOn(createSectionCommand, 'execute').and.returnValue(promise);
        });

        it('should create section', done => (async () => {
            courseViewModel.createSection({ type: 'section' });
            let result = await promise;
            expect(result.id).toBe('sectionId3');
        })().then(done));

        it('should add created section to view model', done => (async () => {
            courseViewModel.createSection({ type: 'section' });
            await promise;
            let foundSection = _.find(courseViewModel.sections(), section => section.id() === 'sectionId3');
            expect(foundSection.id()).toBe('sectionId3');
        })().then(done));

    });

    describe('reorderSection:', () => {

        describe('when section id is not defined', () => {

            it('should do nothing', done => (async () => {
                let result = await courseViewModel.reorderSection();
                expect(result).toBe(undefined);
            })().then(done));

            it('should not call reorder section command', done => (async () => {
                spyOn(reorderSectionCommand, 'execute');
                await courseViewModel.reorderSection();
                expect(reorderSectionCommand.execute).not.toHaveBeenCalled();
            })().then(done));

        });

        describe('when section id is defined', () => {

            let promise;

            beforeEach(() => {
                promise = Promise.resolve();
                spyOn(reorderSectionCommand, 'execute').and.returnValue(promise);
            });

            it('should show notify saved message', done => (async () => {
                courseViewModel.reorderSection({ sectionId: course.objectives[0].id });
                await promise;
                expect(notify.saved).toHaveBeenCalled();
            })().then(done));

            describe('when next section id is not defined', () => {

                it('should push section to end', done => (async () => {
                    courseViewModel.reorderSection({ sectionId: course.objectives[0].id });
                    await promise;
                    let length = courseViewModel.sections().length;
                    expect(courseViewModel.sections()[length - 1].id()).toBe(course.objectives[0].id);
                })().then(done));

            });

            describe('when next section id is defined', () => {

                it('should push section before next section', done => (async () => {
                    courseViewModel.reorderSection({ sectionId: course.objectives[0].id }, { sectionId: course.objectives[1].id });
                    await promise;
                    expect(courseViewModel.sections()[0].id()).toBe(course.objectives[0].id);
                })().then(done));

            });

        });

    });

    describe('createSectionWithOrder:', () => {

        describe('when type is not defined', () => {

            it('should do nothing', done => (async () => {
                let result = await courseViewModel.createSectionWithOrder();
                expect(result).toBe(undefined);
            })().then(done));
        });

        describe('when type is defined', () => {

            let createSectionPromise;
            let reorderSectionPromise;

            beforeEach(() => {
                createSectionPromise = Promise.resolve({
                    id: 'sectionId4',
                    title: 'sectionTitle4',
                    modifiedOn: modifiedOn,
                    image: 'sectionImage4'
                });
                reorderSectionPromise = Promise.resolve();

                spyOn(createSectionCommand, 'execute').and.returnValue(createSectionPromise);
                spyOn(reorderSectionCommand, 'execute').and.returnValue(reorderSectionPromise);
            });

            it('should show notify saved message', done => (async () => {
                courseViewModel.createSectionWithOrder({ type: 'section' });
                await createSectionPromise;
                await reorderSectionPromise;
                expect(notify.saved).toHaveBeenCalled();
            })().then(done));

            describe('when next section id is not defined', () => {

                it('should push section to end', done => (async () => {
                    courseViewModel.createSectionWithOrder({ type: 'section' });
                    await createSectionPromise;
                    await reorderSectionPromise;
                    let length = courseViewModel.sections().length;
                    expect(courseViewModel.sections()[length - 1].id()).toBe('sectionId4');
                })().then(done));

            });

            describe('when next section id is defined', () => {

                it('should push section before the next section', done => (async () => {
                    courseViewModel.createSectionWithOrder({ type: 'section' }, { sectionId: courseViewModel.sections()[2].id() });
                    await createSectionPromise;
                    await reorderSectionPromise;
                    expect(courseViewModel.sections()[2].id()).toBe('sectionId4');
                })().then(done));

            });

        });

    });

    describe('deleteSection:', () => {

        it('should show dialog', () => {
            spyOn(deleteSectionDialog, 'show');
            var section = {
                id: ko.observable('some_id'),
                title: ko.observable('some title'),
                createdBy: 'username'
            };
            courseViewModel.deleteSection(section);
            expect(deleteSectionDialog.show).toHaveBeenCalledWith(courseViewModel.id, section.id(), section.title(), section.createdBy);
        });

    });

    describe('createQuestion:', () => {

        let sectionId = 'some_id';
        let questionType = 'question_type';
        let createdQuestion = { id: 'new_question' };
        let createdQuestionViewModel = { updateFields: jasmine.createSpy() };
        let createQuestionCommandPromise;

        beforeEach(() => {
            courseViewModel.sections = ko.observableArray([new SectionViewModel(null, { id: sectionId })]);
            createQuestionCommandPromise = Promise.resolve(createdQuestion);
            spyOn(createQuestionCommand, 'execute').and.returnValue(createQuestionCommandPromise);
            spyOn(courseViewModel.sections()[0], 'addQuestion').and.returnValue(createdQuestionViewModel);
        });

        describe('when section viewmodel is defined', () => {

            it('should add question', () => {
                courseViewModel.createQuestion({}, null, { sectionId: sectionId });
                expect(courseViewModel.sections()[0].addQuestion).toHaveBeenCalled();
            });

            it('should execute createQuestion command', () => {
                courseViewModel.createQuestion({ type: questionType }, null, { sectionId: sectionId });
                expect(createQuestionCommand.execute).toHaveBeenCalledWith(sectionId, questionType);
            });

            it('should update created question fields', done => (async () => {
                courseViewModel.createQuestion({ type: questionType }, null, { sectionId: sectionId });
                await createQuestionCommandPromise;
                expect(createdQuestionViewModel.updateFields).toHaveBeenCalledWith(createdQuestion);
            })().then(done));

        });

    });

    describe('deleteQuestion:', () => {

        let sectionId = 'some_section_id';
        let question = { id: ko.observable('some_question_id'), sectionId: sectionId };
        let deleteQuestionCommandPromise;

        beforeEach(() => {
            courseViewModel.sections = ko.observableArray([new SectionViewModel(null, { id: sectionId })]);
            deleteQuestionCommandPromise = Promise.resolve();
            spyOn(deleteQuestionCommand, 'execute').and.returnValue(deleteQuestionCommandPromise);
        });

        it('should execute deleteQuestion command', () => {
            courseViewModel.deleteQuestion(question);
            expect(deleteQuestionCommand.execute).toHaveBeenCalledWith(question.sectionId, question.id());
        });

        it('should call deleteQuestion', done => (async () => {
            spyOn(courseViewModel.sections()[0], 'deleteQuestion');
            courseViewModel.deleteQuestion(question);
            await deleteQuestionCommandPromise;
            expect(courseViewModel.sections()[0].deleteQuestion).toHaveBeenCalledWith(question);
        })().then(done));

        it('should notify', done => (async () => {
            courseViewModel.deleteQuestion(question);
            await deleteQuestionCommandPromise;
            expect(notify.saved).toHaveBeenCalled();
        })().then(done));

    });

    describe('reorderQuestion:', () => {

        let question = { id: 'question_id' };
        let nextQuestion = { id: 'next_question_id' };
        let targetSection = { sectionId: 'target_section_id' };
        let sourceSection = { sectionId: 'source_section_id' };

        let moveQuestionCommandPromise;
        let reorderQuestionCommandPromise;

        beforeEach(() => {
            courseViewModel.sections = ko.observableArray([
                new SectionViewModel(null, { id: sourceSection.sectionId, questions: [{ id: question.id }]}),
                new SectionViewModel(null, { id: targetSection.sectionId, questions: [{ id: nextQuestion.id }]})
            ]);

            moveQuestionCommandPromise = Promise.resolve();
            spyOn(moveQuestionCommand, 'execute').and.returnValue(moveQuestionCommandPromise);
            reorderQuestionCommandPromise = Promise.resolve();
            spyOn(reorderQuestionCommand, 'execute').and.returnValue(reorderQuestionCommandPromise);
        });

        it('should send event \'Change order of questions\'', () => {
            courseViewModel.reorderQuestion(question, nextQuestion, targetSection, sourceSection);
            expect(eventTracker.publish).toHaveBeenCalledWith('Change order of questions', eventCategory);
        });

        it('should delet question from section viewmodel', () => {
            spyOn(courseViewModel.sections()[0], 'deleteQuestion');
            courseViewModel.reorderQuestion(question, nextQuestion, targetSection, sourceSection);
            expect(courseViewModel.sections()[0].deleteQuestion).toHaveBeenCalledWith(courseViewModel.sections()[0].questions()[0]);
        });

        describe('when target section not equal source section', () => {

            it('should execute moveQuestion command', () => {
                courseViewModel.reorderQuestion(question, nextQuestion, targetSection, sourceSection);
                expect(moveQuestionCommand.execute).toHaveBeenCalledWith(question.id, sourceSection.sectionId, targetSection.sectionId);
            });

        });

        // Please continue from HERE

    });

    describe('createQuestionWithOrder:', () => {
        
    });

    describe('hideQuestions:', () => {

        describe('when section id is not defined', () => {

            it('should do nothing', () => {
                let result = courseViewModel.hideQuestions();
                expect(result).toBe(undefined);
            });

        });

        describe('when section with id is not found', () => {

            it('should do nothing', () => {
                let result = courseViewModel.hideQuestions({ sectionId: 'blablalbla' });
                expect(result).toBe(undefined);
            });

        });

        describe('when section id is defined and sevtion found', () => {

            it('should update last dragging section state', () => {
                courseViewModel.sections()[0].questionsExpanded(true);
                courseViewModel.hideQuestions({ sectionId: courseViewModel.sections()[0].id() });
                expect(courseViewModel.lastDraggingSectionState).toBeTruthy();
            });

            it('should hide questions', () => {
                courseViewModel.sections()[0].questionsExpanded(true);
                courseViewModel.hideQuestions({ sectionId: courseViewModel.sections()[0].id() });
                expect(courseViewModel.sections()[0].questionsExpanded()).toBeFalsy();
            });

        });

    });

    describe('restoreQuestionsExpandingState:', () => {
        
        describe('when section id is not defined', () => {

            it('should do nothing', () => {
                let result = courseViewModel.restoreQuestionsExpandingState();
                expect(result).toBe(undefined);
            });

        });

        describe('whne section with id is not found', () => {

            it('should do nothing', () => {
                let result = courseViewModel.restoreQuestionsExpandingState({ sectionId: 'blablalbla' });
                expect(result).toBe(undefined);
            });

        });

        describe('when section id is defined and sevtion found', () => {
            
            it('should restore previous state of questions', () => {
                courseViewModel.lastDraggingSectionState = true;
                courseViewModel.sections()[0].questionsExpanded(false);
                courseViewModel.restoreQuestionsExpandingState({ sectionId: courseViewModel.sections()[0].id() });
                expect(courseViewModel.sections()[0].questionsExpanded()).toBeTruthy();
            });

        });

    });
    
});