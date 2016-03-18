﻿import command from './presentationCourseImportCommand';

import eventTracker from 'eventTracker';
import fileUpload from 'fileUpload';
import notify from 'notify';
import localizationManager from 'localization/localizationManager';
import dataContext from 'dataContext';
import courseModelMapper from 'mappers/courseModelMapper';
import sectionModelMapper from 'mappers/sectionModelMapper';
import app from 'durandal/app';
import constants from 'constants';

describe('command [presentationCourseImportCommand]', function() {

    describe('execute:', function() {

        var options = {
            startLoading: function() { },
            complete: function() { },
            success: function () { },
            eventCategory: 'category'
        };

        beforeEach(function() {
            spyOn(eventTracker, 'publish');
        });

        it('should be function', function() {
            expect(command.execute).toBeFunction();
        });

        it('should send event \'Open "choose PowerPoint file" dialogue\'', function () {
            spyOn(fileUpload, 'upload');
            command.execute(options);
            expect(eventTracker.publish).toHaveBeenCalledWith('Open "choose PowerPoint file" dialogue', options.eventCategory);
        });

        describe('when upload is started', function() {
            beforeEach(function() {
                spyOn(options, 'startLoading');
                spyOn(fileUpload, 'upload').and.callFake(function(spec) {
                    spec.startLoading();
                });
            });

            it('should send event \'Import from PowerPoint file\'', function() {
                command.execute(options);
                expect(eventTracker.publish).toHaveBeenCalledWith('Import from PowerPoint file', options.eventCategory);
            });

            it('should call options startLoading function', function() {
                command.execute(options);
                expect(options.startLoading).toHaveBeenCalled();
            });
        });

        describe('when upload is complete', function() {
            beforeEach(function() {
                spyOn(options, 'complete');
                spyOn(fileUpload, 'upload').and.callFake(function(spec) {
                    spec.complete();
                });
            });

            it('should call options complete function', function() {
                command.execute(options);
                expect(options.complete).toHaveBeenCalled();
            });
        });

        describe('when upload is failed', function() {
            describe('when error is not defined', function() {
                var error = 'some error';
                beforeEach(function() {
                    spyOn(localizationManager, 'localize').and.returnValue(error);
                    spyOn(notify, 'error');
                    spyOn(fileUpload, 'upload').and.callFake(function(spec) {
                        spec.error();
                    });
                });

                it('should localize message', function() {
                    command.execute(options);
                    expect(localizationManager.localize).toHaveBeenCalledWith('responseFailed');
                });

                it('should notify error', function() {
                    command.execute(options);
                    expect(notify.error).toHaveBeenCalledWith(error);
                });
            });

            describe('when error status is 400', function() {
                var error = 'some error';
                beforeEach(function() {
                    spyOn(localizationManager, 'localize').and.returnValue(error);
                    spyOn(notify, 'error');
                    spyOn(fileUpload, 'upload').and.callFake(function(spec) {
                        spec.error({ status: 400 });
                    });
                });

                it('should localize message', function() {
                    command.execute(options);
                    expect(localizationManager.localize).toHaveBeenCalledWith('pptxUploadError');
                });

                it('should notify error', function() {
                    command.execute(options);
                    expect(notify.error).toHaveBeenCalledWith(error);
                });
            });

            describe('when error status is 413', function() {
                var error = 'some error';
                beforeEach(function() {
                    spyOn(localizationManager, 'localize').and.returnValue(error);
                    spyOn(notify, 'error');
                    spyOn(fileUpload, 'upload').and.callFake(function(spec) {
                        spec.error({ status: 413 });
                    });
                });

                it('should localize message', function() {
                    command.execute(options);
                    expect(localizationManager.localize).toHaveBeenCalledWith('pptxSizeIsTooLarge');
                });

                it('should notify error', function() {
                    command.execute(options);
                    expect(notify.error).toHaveBeenCalledWith(error);
                });
            });
        });

        describe('when upload is successfull', function() {
            var response = {},
                data = {},
                courseData = {},
                course = { id: 'courseId', sections: [] },
                sectionData = {},
                section = { id: 'sectionId' };

            beforeEach(function() {
                response.data = data;
                data.course = courseData;
                data.sections = [sectionData];
                spyOn(fileUpload, 'upload').and.callFake(function(spec) {
                    spec.success(response);
                });

                spyOn(options, 'success');
                spyOn(app, 'trigger');
                spyOn(courseModelMapper, 'map').and.returnValue(course);
                spyOn(sectionModelMapper, 'map').and.returnValue(section);
                dataContext.courses = [];
                dataContext.sections = [];
            });

            it('should add course to data context', function() {
                command.execute(options);
                expect(dataContext.courses[0]).toBe(course);
            });

            it('should add section to data context', function() {
                command.execute(options);
                expect(dataContext.sections[0]).toBe(section);
            });

            it('should call options success callback', function() {
                command.execute(options);
                expect(options.success).toHaveBeenCalledWith(course);
            });

            it('should trigger course created app event', function() {
                command.execute(options);
                expect(app.trigger).toHaveBeenCalledWith(constants.messages.course.created, course);
            });

            describe('when course containe section', function() {
                beforeEach(function() {
                    course.sections = [{ id: 'sectionId', questions: [] }];
                });

                it('should trigger app event', function() {
                    command.execute(options);
                    expect(app.trigger).toHaveBeenCalledWith(constants.messages.section.createdInCourse);
                });

                describe('and when section contains questions', function() {
                    beforeEach(function() {
                        course.sections[0].questions = [{id:'questionId'}];
                    });

                    it('should trigger app event', function() {
                        command.execute(options);
                        expect(app.trigger).toHaveBeenCalledWith(constants.messages.question.created, course.sections[0].id, course.sections[0].questions[0]);
                    });
                });
            });

        });
    });

});
