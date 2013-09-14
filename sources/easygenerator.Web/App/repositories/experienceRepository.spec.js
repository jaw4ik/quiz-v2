﻿define(['repositories/experienceRepository'],
    function (repository) {
        "use strict";

        var constants = require('constants'),
            http = require('plugins/http'),
            httpWrapper = require('httpWrapper'),
            dataContext = require('dataContext');

        describe('repository [experienceRepository]', function () {

            var post;

            beforeEach(function () {
                post = $.Deferred();
                spyOn(http, 'post').andReturn(post.promise());
                spyOn(httpWrapper, 'post').andReturn(post.promise());
            });

            it('should be object', function () {
                expect(repository).toBeObject();
            });

            describe('addExperience:', function () {

                it('should be function', function () {
                    expect(repository.addExperience).toBeFunction();
                });

                it('should return promise', function () {
                    expect(repository.addExperience()).toBePromise();
                });

                describe('when experience data is undefined', function () {

                    it('should reject promise', function () {
                        var promise = repository.addExperience();

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(promise).toBeRejected();
                        });
                    });

                });

                describe('when experience data is null', function () {

                    it('should reject promise', function () {
                        var promise = repository.addExperience(null);

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(promise).toBeRejected();
                        });
                    });

                });

                describe('when experience data is an object', function () {

                    it('should send request to server to api/experience/create', function () {
                        var experience = {};
                        var promise = repository.addExperience(experience);

                        post.reject();

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(http.post).toHaveBeenCalledWith('api/experience/create', experience);
                        });
                    });

                    describe('and send request to server', function () {

                        describe('and request failed', function () {

                            it('should reject promise', function () {
                                var promise = repository.addExperience({});

                                post.reject();

                                waitsFor(function () {
                                    return !promise.isPending();
                                });
                                runs(function () {
                                    expect(promise).toBeRejected();
                                });
                            });

                        });

                        describe('and request succeed', function () {

                            describe('and response is undefined', function () {

                                it('should reject promise', function () {
                                    var promise = repository.addExperience({});

                                    post.resolve();

                                    waitsFor(function () {
                                        return !promise.isPending();
                                    });
                                    runs(function () {
                                        expect(promise).toBeRejected();
                                    });
                                });

                            });

                            describe('and response is null', function () {

                                it('should reject promise', function () {
                                    var promise = repository.addExperience({});

                                    post.resolve(null);

                                    waitsFor(function () {
                                        return !promise.isPending();
                                    });
                                    runs(function () {
                                        expect(promise).toBeRejected();
                                    });
                                });

                            });

                            describe('and response is an object', function () {

                                describe('and response is not successful', function () {

                                    beforeEach(function () {
                                        post.resolve({});
                                    });

                                    it('should reject promise', function () {
                                        var promise = repository.addExperience({});

                                        waitsFor(function () {
                                            return !promise.isPending();
                                        });
                                        runs(function () {
                                            expect(promise).toBeRejected();
                                        });
                                    });

                                });

                                describe('and response is successful', function () {

                                    describe('and response data is undefined', function () {

                                        beforeEach(function () {
                                            post.resolve({ success: true });
                                        });

                                        it('should reject promise', function () {
                                            var promise = repository.addExperience({});

                                            waitsFor(function () {
                                                return !promise.isPending();
                                            });
                                            runs(function () {
                                                expect(promise).toBeRejected();
                                            });
                                        });

                                    });

                                    describe('and response data is null', function () {

                                        beforeEach(function () {
                                            post.resolve({ success: true, data: null });
                                        });

                                        it('should reject promise', function () {
                                            var promise = repository.addExperience({});

                                            waitsFor(function () {
                                                return !promise.isPending();
                                            });
                                            runs(function () {
                                                expect(promise).toBeRejected();
                                            });
                                        });

                                    });

                                    describe('and response data is an object', function () {

                                        var experienceId = 'experienceId';
                                        var experienceTitle = 'experienceTitle';
                                        var templateId = '123';
                                        var experienceCreatedOn = '/Date(1378106938845)/';

                                        beforeEach(function () {
                                            post.resolve({ success: true, data: { Id: experienceId, CreatedOn: experienceCreatedOn } });
                                        });

                                        it('should resolve promise with experience id', function () {
                                            var promise = repository.addExperience({});

                                            waitsFor(function () {
                                                return !promise.isPending();
                                            });
                                            runs(function () {
                                                expect(promise).toBeResolvedWith(experienceId);
                                            });
                                        });

                                        it('should add experience to dataContext', function () {
                                            var dataContext = require('dataContext');
                                            dataContext.experiences = [];

                                            var promise = repository.addExperience({ title: experienceTitle, templateId: templateId });

                                            waitsFor(function () {
                                                return !promise.isPending();
                                            });
                                            runs(function () {
                                                expect(dataContext.experiences.length).toEqual(1);
                                                expect(dataContext.experiences[0]).toEqual({
                                                    id: experienceId,
                                                    title: experienceTitle,
                                                    templateId: templateId,
                                                    createdOn: utils.getDateFromString(experienceCreatedOn),
                                                    modifiedOn: utils.getDateFromString(experienceCreatedOn),
                                                    buildingStatus: constants.buildingStatuses.notStarted,
                                                    objectives: []
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

            describe('removeExperience:', function () {

                it('should be function', function () {
                    expect(repository.removeExperience).toBeFunction();
                });

                it('should return promise', function () {
                    expect(repository.removeExperience()).toBePromise();
                });

                describe('when experience id is not a string', function () {

                    it('should reject promise', function () {
                        var promise = repository.removeExperience();

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(promise).toBeRejected();
                        });
                    });

                    it('should not send request to server to api/experience/delete', function () {
                        var promise = repository.removeExperience();

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(http.post).not.toHaveBeenCalled();
                        });
                    });

                });

                describe('when experience id is a string', function () {

                    it('should send request to server to api/experience/delete', function () {
                        var experienceId = 'id';
                        var promise = repository.removeExperience(experienceId);

                        post.reject();

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(http.post).toHaveBeenCalledWith('api/experience/delete', {
                                experienceId: experienceId
                            });
                        });
                    });

                    describe('and send request to server', function () {

                        describe('and request failed', function () {

                            it('should reject promise', function () {
                                var reason = 'reason';
                                var promise = repository.removeExperience('id');

                                post.reject(reason);

                                waitsFor(function () {
                                    return !promise.isPending();
                                });
                                runs(function () {
                                    expect(promise).toBeRejectedWith(reason);
                                });
                            });

                        });

                        describe('and request succeed', function () {

                            describe('and response is not an object', function () {

                                it('should reject promise', function () {
                                    var promise = repository.removeExperience('id');

                                    post.resolve();

                                    waitsFor(function () {
                                        return !promise.isPending();
                                    });
                                    runs(function () {
                                        expect(promise).toBeRejected();
                                    });
                                });

                            });

                            describe('and response is an object', function () {

                                describe('and response is not successful', function () {

                                    beforeEach(function () {
                                        post.resolve({});
                                    });

                                    it('should reject promise', function () {
                                        var promise = repository.removeExperience('id');

                                        waitsFor(function () {
                                            return !promise.isPending();
                                        });
                                        runs(function () {
                                            expect(promise).toBeRejected();
                                        });
                                    });

                                });

                                describe('and response is successful', function () {

                                    beforeEach(function () {
                                        post.resolve({ success: true });
                                    });

                                    it('should resolve promise', function () {
                                        var promise = repository.removeExperience('id');

                                        waitsFor(function () {
                                            return !promise.isPending();
                                        });
                                        runs(function () {
                                            expect(promise).toBeResolved();
                                        });
                                    });

                                    it('should remove experience from dataContext', function () {
                                        var experienceId = 'id';
                                        var dataContext = require('dataContext');
                                        dataContext.experiences = [{ id: 'id' }];

                                        var promise = repository.removeExperience(experienceId);

                                        waitsFor(function () {
                                            return !promise.isPending();
                                        });
                                        runs(function () {
                                            expect(dataContext.experiences.length).toEqual(0);
                                        });
                                    });

                                });

                            });

                        });

                    });

                });

            });

            describe('relateObjectives:', function () {

                it('should be function', function () {
                    expect(repository.relateObjectives).toBeFunction();
                });

                it('should return promise', function () {
                    var result = repository.relateObjectives('0', []);
                    expect(result).toBePromise();
                });

                describe('when argument \"experienceId\" is not a string', function () {

                    it('should reject promise', function () {
                        var promise = repository.relateObjectives({});

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(promise).toBeRejected();
                        });
                    });

                });

                describe('when argument \"objectives\" is not an array', function () {

                    it('should reject promise', function () {
                        var promise = repository.relateObjectives('some experience Id', {});

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(promise).toBeRejected();
                        });
                    });

                });

                describe('when arguments are valid', function () {
                    var getById;

                    beforeEach(function () {
                        getById = Q.defer();
                        spyOn(repository, 'getById').andReturn(getById.promise);
                    });

                    describe('and experience not exist', function () {

                        it('should reject promise', function () {
                            getById.reject('reject reason');
                            var promise = repository.relateObjectives('0', []);

                            waitsFor(function () {
                                return !promise.isPending();
                            });
                            runs(function () {
                                expect(promise).toBeRejectedWith('reject reason');
                            });
                        });

                    });

                    describe('and experience exists', function () {
                        var experience;

                        beforeEach(function () {
                            experience = { id: '1', objectives: [] };
                            getById.resolve(experience);
                        });

                        it('should append list of objectives to experience', function () {
                            var promise = repository.relateObjectives('1', [{ id: '0' }, { id: '1' }]);

                            waitsFor(function () {
                                return !promise.isPending();
                            });
                            runs(function () {
                                expect(experience.objectives.length).toBe(2);
                            });
                        });

                        it('should update modified date', function () {
                            var promise = repository.relateObjectives('1', [{ id: '0' }]);

                            waitsFor(function () {
                                return !promise.isPending();
                            });
                            runs(function () {
                                expect(experience.modifiedOn).toBeDefined();
                            });
                        });

                        it('should be resolved with modified date', function () {
                            var promise = repository.relateObjectives('1', []);

                            waitsFor(function () {
                                return !promise.isPending();
                            });
                            runs(function () {
                                expect(promise).toBeResolvedWith(experience.modifiedOn);
                            });
                        });

                    });

                });

            });

            describe('unrelateObjectives', function () {

                it('should be a function', function () {
                    expect(repository.unrelateObjectives).toBeFunction();
                });

                it('should return promise', function () {
                    var result = repository.unrelateObjectives('0', []);
                    expect(result).toBePromise();
                });

                describe('when argument \"experienceId\" is undefined', function () {

                    it('should reject pomise', function () {
                        var promise = repository.unrelateObjectives();

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(promise).toBeRejected();
                        });
                    });

                });

                describe('when argument \"experienceId\" is null', function () {

                    it('should reject promise', function () {
                        var promise = repository.unrelateObjectives(null);

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(promise).toBeRejected();
                        });
                    });

                });

                describe('when argument \"experienceId\" is not a string', function () {

                    it('should reject promise', function () {
                        var promise = repository.unrelateObjectives({});

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(promise).toBeRejected();
                        });
                    });

                });

                describe('when argument \"objectives\" is undefined', function () {

                    it('should reject promise', function () {
                        var promise = repository.unrelateObjectives('some experience Id');

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(promise).toBeRejected();
                        });
                    });

                });

                describe('when argument \"objectives\" is null', function () {

                    it('should reject promise', function () {
                        var promise = repository.unrelateObjectives('some experience Id', null);

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(promise).toBeRejected();
                        });
                    });

                });

                describe('when argument \"objectives\" is not an array', function () {

                    it('should reject promise', function () {
                        var promise = repository.unrelateObjectives('some experience Id', {});

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(promise).toBeRejected();
                        });
                    });

                });

                describe('when all arguments are valid', function () {
                    var getById;

                    beforeEach(function () {
                        getById = Q.defer();
                        spyOn(repository, 'getById').andReturn(getById.promise);
                    });

                    describe('and experience doesn\'t exist', function () {

                        it('should reject promise', function () {
                            getById.reject('Experience doesn\'t exist');
                            var promise = repository.unrelateObjectives('some experience Id', []);

                            waitsFor(function () {
                                return !promise.isPending();
                            });
                            runs(function () {
                                expect(promise).toBeRejected();
                            });
                        });

                    });

                    describe('and experience exists', function () {
                        var objectives,
                            experience;

                        beforeEach(function () {
                            objectives = ['2', '6'],
                            experience = { objectives: [{ id: '2' }, { id: '4' }, { id: '6' }] };
                            getById.resolve(experience);
                        });

                        it('should remove objectives', function () {
                            var promise = repository.unrelateObjectives('some Id', objectives);

                            waitsFor(function () {
                                return !promise.isPending();
                            });
                            runs(function () {
                                expect(experience.objectives.length).toBe(1);
                                expect(experience.objectives[0].id).toBe('4');
                            });
                        });

                        it('should update modified date', function () {
                            var promise = repository.unrelateObjectives('some Id', objectives);

                            waitsFor(function () {
                                return !promise.isPending();
                            });
                            runs(function () {
                                expect(experience.modifiedOn).toBeDefined();
                            });
                        });

                        it('should resolve promise with modified date', function () {
                            var promise = repository.unrelateObjectives('some Id', objectives);

                            waitsFor(function () {
                                return !promise.isPending();
                            });
                            runs(function () {
                                expect(promise).toBeResolvedWith(experience.modifiedOn);
                            });
                        });

                    });

                });

            });

            describe("updateExperience:", function () {

                it('should be function', function () {
                    expect(repository.updateExperience).toBeFunction();
                });

                describe('when arguments not valid', function () {

                    describe('and when experience data is undefined', function () {

                        it('should throw exception', function () {
                            var f = function () { repository.updateExperience(undefined); };
                            expect(f).toThrow();
                        });

                    });

                    describe('and when experience data is null', function () {

                        it('should throw exception', function () {
                            var f = function () { repository.updateExperience(null); };
                            expect(f).toThrow();
                        });

                    });

                });

                describe('when arguments are valid', function () {

                    it('should return promise', function () {
                        var promise = repository.updateExperience({ id: "0", title: "test title" });
                        expect(promise).toBePromise();
                    });

                    describe('when get experience to update', function () {

                        describe('and when experience does not exist', function () {

                            it('should be rejected', function () {
                                var promise = repository.updateExperience({ id: "-1" });

                                waitsFor(function () {
                                    return !promise.isPending();
                                });
                                runs(function () {
                                    expect(promise).toBeRejected();
                                });
                            });

                        });

                        describe('and when experience exists', function () {

                            var experience = {};
                            beforeEach(function () {
                                experience = { id: '0', title: 'some title', modifiedOn: '' };
                                var getExperienceDeferred = $.Deferred();
                                spyOn(repository, 'getById').andReturn(getExperienceDeferred.promise());
                                getExperienceDeferred.resolve(experience);
                            });

                            it('should be resolved', function () {
                                var promise = repository.updateExperience(experience);

                                waitsFor(function () {
                                    return !promise.isPending();
                                });
                                runs(function () {
                                    expect(promise).toBeResolved();
                                });
                            });

                            it('should update title', function () {
                                var newTitle = 'new title';
                                var promise = repository.updateExperience({ id: '0', title: newTitle });

                                waitsFor(function () {
                                    return !promise.isPending();
                                });
                                runs(function () {
                                    expect(experience.title).toBe(newTitle);
                                });
                            });

                            it('should update templateId', function () {
                                var templateId = "1";
                                var promise = repository.updateExperience({ id: '0', templateId: templateId, title: "lala" });

                                waitsFor(function () {
                                    return !promise.isPending();
                                });
                                runs(function () {
                                    expect(experience.templateId).toBe(templateId);
                                });
                            });

                            it('should update modifiedOn', function () {
                                var promise = repository.updateExperience({ id: '0', title: "lala" });

                                waitsFor(function () {
                                    return !promise.isPending();
                                });
                                runs(function () {
                                    expect(experience.modifiedOn).toNotBe('');
                                });
                            });
                        });
                    });
                });
            });

            describe('updateExperienceTitle:', function () {

                it('should be function', function() {
                    expect(repository.updateExperienceTitle).toBeFunction();
                });

                it('should return promise', function () {
                    expect(repository.updateExperienceTitle()).toBePromise();
                });

                describe('when experienceId is not a string', function () {

                    it('should reject promise with reason \'Experience id is not a string\'', function () {
                        var promise = repository.updateExperienceTitle({}, 'Some title');

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(promise).toBeRejectedWith('Experience id is not a string');
                        });
                    });

                });

                describe('when experienceTitle is not a string', function () {

                    it('should reject promise with reason \'Experience title is not a string\'', function () {
                        var promise = repository.updateExperienceTitle('Some id', {});

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(promise).toBeRejectedWith('Experience title is not a string');
                        });
                    });

                });

                describe('when experienceId and experienceTitle are strings', function () {

                    it('should send request to /api/experience/updateTitle', function () {
                        var experienceId = 'Some id',
                            experienceTitle = 'Some title';
                        var promise = repository.updateExperienceTitle(experienceId, experienceTitle);
                        post.resolve();

                        waitsFor(function () {
                            return !promise.isPending();
                        });
                        runs(function () {
                            expect(httpWrapper.post).toHaveBeenCalledWith('api/experience/updateTitle', jasmine.any(Object));
                            expect(httpWrapper.post.mostRecentCall.args[1].experienceId).toEqual(experienceId);
                            expect(httpWrapper.post.mostRecentCall.args[1].experienceTitle).toEqual(experienceTitle);
                        });
                    });

                    describe('and request fails', function () {

                        it('should reject promise', function () {
                            var reason = 'Some reason';
                            var promise = repository.updateExperienceTitle('Some id', 'Some title');
                            post.reject(reason);

                            waitsFor(function () {
                                return !promise.isPending();
                            });
                            runs(function () {
                                expect(promise).toBeRejectedWith(reason);
                            });
                        });

                    });

                    describe('and request successful', function () {

                        describe('and response is not an object', function () {

                            it('should reject promise with \'Response is not an object\'', function () {
                                var promise = repository.updateExperienceTitle('Some id', 'Some title');
                                post.resolve('Not an object');

                                waitsFor(function () {
                                    return !promise.isPending();
                                });
                                runs(function () {
                                    expect(promise).toBeRejectedWith('Response is not an object');
                                });
                            });

                        });

                        describe('and response is an object', function () {

                            describe('and doesn`t have ModifiedOn date', function () {

                                it('should reject promise with \'Response does not have modification date\'', function () {
                                    var promise = repository.updateExperienceTitle('Some id', 'Some title');
                                    post.resolve({});

                                    waitsFor(function () {
                                        return !promise.isPending();
                                    });
                                    runs(function () {
                                        expect(promise).toBeRejectedWith('Response does not have modification date');
                                    });
                                });

                            });

                            describe('and have ModifiedOn date', function () {

                                describe('and experience not found in dataContext', function () {

                                    it('should reject promise with \'Experience does not exist in dataContext\'', function () {
                                        dataContext.experiences = [];
                                        var promise = repository.updateExperienceTitle('Some id', 'Some title');
                                        post.resolve({ ModifiedOn: "/Date(1378106938845)/" });

                                        waitsFor(function () {
                                            return !promise.isPending();
                                        });
                                        runs(function () {
                                            expect(promise).toBeRejectedWith('Experience does not exist in dataContext');
                                        });
                                    });

                                });

                                describe('and experience found in dataContext', function () {

                                    it('should update experience title', function () {
                                        var newTitle = 'Some new title',
                                            newModifiedOnDate = "/Date(1378106938845)/",
                                            experience = {
                                                id: 'Some id',
                                                title: 'Original title',
                                                modifiedOn: 'Some date'
                                            };

                                        dataContext.experiences = [experience];
                                        var promise = repository.updateExperienceTitle(experience.id, newTitle);
                                        post.resolve({ ModifiedOn: newModifiedOnDate });

                                        waitsFor(function () {
                                            return !promise.isPending();
                                        });
                                        runs(function () {
                                            expect(experience.title).toEqual(newTitle);
                                        });
                                    });

                                    it('should update experience modifiedOn date', function () {
                                        var newTitle = 'Some new title',
                                            newModifiedOnDate = "/Date(1378106938845)/",
                                            parsedNewModifiedOnDate = new Date(parseInt(newModifiedOnDate.substr(6), 10)),
                                            experience = {
                                                id: 'Some id',
                                                title: 'Original title',
                                                modifiedOn: 'Some date'
                                            };

                                        dataContext.experiences = [experience];
                                        var promise = repository.updateExperienceTitle(experience.id, newTitle);
                                        post.resolve({ ModifiedOn: newModifiedOnDate });

                                        waitsFor(function () {
                                            return !promise.isPending();
                                        });
                                        runs(function () {
                                            expect(experience.modifiedOn).toEqual(parsedNewModifiedOnDate);
                                        });
                                    });

                                    it('should resolve promise with modifiedOn date', function () {
                                        var newTitle = 'Some new title',
                                            newModifiedOnDate = "/Date(1378106938845)/",
                                            parsedNewModifiedOnDate = new Date(parseInt(newModifiedOnDate.substr(6), 10)),
                                            experience = {
                                                id: 'Some id',
                                                title: 'Original title',
                                                modifiedOn: 'Some date'
                                            };

                                        dataContext.experiences = [experience];
                                        var promise = repository.updateExperienceTitle(experience.id, newTitle);
                                        post.resolve({ ModifiedOn: newModifiedOnDate });

                                        waitsFor(function () {
                                            return !promise.isPending();
                                        });
                                        runs(function () {
                                            expect(promise).toBeResolvedWith(parsedNewModifiedOnDate);
                                        });
                                    });

                                });

                            });

                        });

                    });

                });

            });

        });

    }
);