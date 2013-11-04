﻿define(['viewmodels/experiences/experiences'],
    function (viewModel) {
        "use strict";

        var
            app = require('durandal/app'),
            router = require('plugins/router'),
            eventTracker = require('eventTracker'),
            dataContext = require('dataContext'),
            experienceModel = require('models/experience'),
            constants = require('constants'),
            localizationManage = require('localization/localizationManager'),
            clientContext = require('clientContext');

        var
            template = { id: '0', name: 'name', image: 'img' },
            experiences = [
                new experienceModel({
                    id: 'testId3',
                    title: 'Test Experience 3',
                    objectives: [],
                    buildingStatus: constants.buildingStatuses.notStarted,
                    template: template
                }),
                new experienceModel({
                    id: 'testId2',
                    title: 'Test Experience 2',
                    objectives: [],
                    buildingStatus: constants.buildingStatuses.notStarted,
                    template: template
                }),
                new experienceModel({
                    id: 'testId1',
                    title: 'Test Experience 1',
                    objectives: [],
                    buildingStatus: constants.buildingStatuses.notStarted,
                    template: template
                })
            ];

        describe('viewModel [experiences]', function () {

            beforeEach(function () {
                spyOn(eventTracker, 'publish');
                spyOn(router, 'navigate');
                spyOn(router, 'replace');
            });

            it('should be object', function () {
                expect(viewModel).toBeObject();
            });

            describe('experiences:', function () {

                it('should be observable', function () {
                    expect(viewModel.experiences).toBeObservable();
                });

            });

            describe('sortingOptions:', function () {

                it('should be defined', function () {
                    expect(viewModel.sortingOptions).toBeDefined();
                });

            });

            describe('currentSortingOption', function () {

                it('should be observable', function () {
                    expect(viewModel.currentSortingOption).toBeObservable();
                });

            });

            describe('enableSorting:', function () {

                it('should be computed', function () {
                    expect(viewModel.enableSorting).toBeComputed();
                });

                describe('when there are no experiences', function () {

                    it('should be false', function () {
                        viewModel.experiences([]);
                        expect(viewModel.enableSorting()).toBeFalsy();
                    });

                });

                describe('when there is only one experience', function () {

                    it('should be false', function () {
                        viewModel.experiences([{}]);
                        expect(viewModel.enableSorting()).toBeFalsy();
                    });

                });

                describe('when there are more than one experience', function () {

                    it('should be true', function () {
                        viewModel.experiences([{}, {}]);
                        expect(viewModel.enableSorting()).toBeTruthy();
                    });

                });

            });

            describe('buildingStatuses:', function () {

                it('should be defined', function () {
                    expect(viewModel.buildingStatuses).toBeDefined();
                });

            });

            describe('currentLanguage', function () {

                it('should be defined', function () {
                    expect(viewModel.currentLanguage).toBeDefined();
                });

            });

            describe('activate:', function () {

                it('should be a function', function () {
                    expect(viewModel.activate).toBeFunction();
                });

                it('should take data from dataContext', function () {
                    dataContext.experiences = experiences;
                    viewModel.activate();
                    expect(viewModel.experiences().length).toEqual(3);
                });

                it('should sort experiences asc', function () {
                    dataContext.experiences = experiences;
                    viewModel.activate();
                    expect(viewModel.experiences()).toBeSortedAsc('title');
                    expect(viewModel.currentSortingOption()).toBe(constants.sortingOptions.byTitleAsc);
                });

                it('should set current language', function () {
                    viewModel.currentLanguage = null;
                    viewModel.activate();
                    expect(viewModel.currentLanguage).toBe(localizationManage.currentLanguage);
                });

                describe('when previous showBuildingStatus is not set', function () {

                    var dataExperience;

                    beforeEach(function () {
                        dataContext.experiences = [];
                        viewModel.activate();
                        viewModel.deactivate();

                        dataContext.experiences = experiences;
                        dataExperience = dataContext.experiences[0];
                    });

                    describe('and buildingStatus is \"Not started\"', function () {

                        beforeEach(function () {
                            dataExperience.buildingStatus = constants.buildingStatuses.notStarted;
                        });

                        it('should set current showBuildingStatus to \"false\"', function () {
                            viewModel.activate();
                            var viewExperience = _.find(viewModel.experiences(), function (item) { return item.id == dataExperience.id; });
                            expect(viewExperience.showBuildingStatus()).toBe(false);
                        });

                    });

                    describe('and buildingStatus is \"In progress\"', function () {

                        beforeEach(function () {
                            dataExperience.buildingStatus = constants.buildingStatuses.inProgress;
                        });

                        it('should set current showBuildingStatus to \"true\"', function () {
                            viewModel.activate();
                            var viewExperience = _.find(viewModel.experiences(), function (item) { return item.id == dataExperience.id; });
                            expect(viewExperience.showBuildingStatus()).toBe(true);
                        });

                    });

                    describe('and buildingStatus is \"Failed\"', function () {

                        beforeEach(function () {
                            dataExperience.buildingStatus = constants.buildingStatuses.failed;
                        });

                        it('should set current showBuildingStatus to \"true\"', function () {
                            viewModel.activate();
                            var viewExperience = _.find(viewModel.experiences(), function (item) { return item.id == dataExperience.id; });
                            expect(viewExperience.showBuildingStatus()).toBe(true);
                        });

                    });

                    describe('and buildingStatus is \"Succeed\"', function () {

                        beforeEach(function () {
                            dataExperience.buildingStatus = constants.buildingStatuses.succeed;
                        });

                        it('should set current showBuildingStatus to \"true\"', function () {
                            viewModel.activate();
                            var viewExperience = _.find(viewModel.experiences(), function (item) { return item.id == dataExperience.id; });
                            expect(viewExperience.showBuildingStatus()).toBe(true);
                        });

                    });

                });

                describe('when previous showBuildingStatus is \"false\"', function () {
                    var dataExperience,
                        viewExperience;

                    beforeEach(function () {
                        dataContext.experiences = experiences;
                        dataExperience = dataContext.experiences[0];
                        viewModel.activate();

                        viewExperience = _.find(viewModel.experiences(), function (item) { return item.id == dataExperience.id; });
                        viewExperience.showBuildingStatus(false);
                    });

                    describe('and previous buildingStatus is \"Not started\"', function () {

                        beforeEach(function () {
                            viewExperience.buildingStatus(constants.buildingStatuses.notStarted);
                            viewModel.deactivate();
                        });

                        describe('and buildingStatus is not changed', function () {

                            beforeEach(function () {
                                dataExperience.buildingStatus = constants.buildingStatuses.notStarted;
                            });

                            it('should set current showBuildingStatus to \"false\"', function () {
                                viewModel.activate();
                                var experience = _.find(viewModel.experiences(), function (item) { return item.id == dataExperience.id; });
                                expect(experience.showBuildingStatus()).toBe(false);
                            });

                        });

                        describe('and buildingStatus is changed', function () {

                            beforeEach(function () {
                                dataExperience.buildingStatus = constants.buildingStatuses.succeed;
                            });

                            it('should set current showBuildingStatus to \"true\"', function () {
                                viewModel.activate();
                                var experience = _.find(viewModel.experiences(), function (item) { return item.id == dataExperience.id; });
                                expect(experience.showBuildingStatus()).toBe(true);
                            });

                        });

                    });

                    describe('and buildingStatus is \"In progress\"', function () {

                        beforeEach(function () {
                            viewExperience.buildingStatus(constants.buildingStatuses.inProgress);
                            viewModel.deactivate();
                        });

                        describe('and buildingStatus is not changed', function () {

                            beforeEach(function () {
                                dataExperience.buildingStatus = constants.buildingStatuses.inProgress;
                            });

                            it('should set current showBuildingStatus to \"true\"', function () {
                                viewModel.activate();
                                var experience = _.find(viewModel.experiences(), function (item) { return item.id == dataExperience.id; });
                                expect(experience.showBuildingStatus()).toBe(true);
                            });

                        });

                        describe('and buildingStatus is changed', function () {

                            beforeEach(function () {
                                dataExperience.buildingStatus = constants.buildingStatuses.succeed;
                            });

                            it('should set current showBuildingStatus to \"true\"', function () {
                                viewModel.activate();
                                var experience = _.find(viewModel.experiences(), function (item) { return item.id == dataExperience.id; });
                                expect(experience.showBuildingStatus()).toBe(true);
                            });

                        });

                    });

                    describe('and buildingStatus is \"Failed\"', function () {

                        beforeEach(function () {
                            viewExperience.buildingStatus(constants.buildingStatuses.failed);
                            viewModel.deactivate();
                        });

                        describe('and buildingStatus is not changed', function () {

                            beforeEach(function () {
                                dataExperience.buildingStatus = constants.buildingStatuses.failed;
                            });

                            it('should set current showBuildingStatus to \"false\"', function () {
                                viewModel.activate();
                                var experience = _.find(viewModel.experiences(), function (item) { return item.id == dataExperience.id; });
                                expect(experience.showBuildingStatus()).toBe(false);
                            });

                        });

                        describe('and buildingStatus is changed', function () {

                            beforeEach(function () {
                                dataExperience.buildingStatus = constants.buildingStatuses.succeed;
                            });

                            it('should set current showBuildingStatus to \"true\"', function () {
                                viewModel.activate();
                                var experience = _.find(viewModel.experiences(), function (item) { return item.id == dataExperience.id; });
                                expect(experience.showBuildingStatus()).toBe(true);
                            });

                        });

                    });

                    describe('and buildingStatus is \"Succeed\"', function () {

                        beforeEach(function () {
                            viewExperience.buildingStatus(constants.buildingStatuses.succeed);
                            viewModel.deactivate();
                        });

                        describe('and buildingStatus is not changed', function () {

                            beforeEach(function () {
                                dataExperience.buildingStatus = constants.buildingStatuses.succeed;
                            });

                            it('should set current showBuildingStatus to \"false\"', function () {
                                viewModel.activate();
                                var experience = _.find(viewModel.experiences(), function (item) { return item.id == dataExperience.id; });
                                expect(experience.showBuildingStatus()).toBe(false);
                            });

                        });

                        describe('and buildingStatus is changed', function () {

                            beforeEach(function () {
                                dataExperience.buildingStatus = constants.buildingStatuses.failed;
                            });

                            it('should set current showBuildingStatus to \"true\"', function () {
                                viewModel.activate();
                                var experience = _.find(viewModel.experiences(), function (item) { return item.id == dataExperience.id; });
                                expect(experience.showBuildingStatus()).toBe(true);
                            });

                        });

                    });

                });

                describe('when previous showBuildingStatus is \"true\"', function () {
                    var dataExperience;

                    beforeEach(function () {
                        dataContext.experiences = experiences;
                        dataExperience = dataContext.experiences[0];
                        viewModel.activate();
                        var viewExperience = _.find(viewModel.experiences(), function (item) { return item.id == dataExperience.id; });

                        viewExperience.showBuildingStatus(true);
                        viewModel.deactivate();
                    });

                    it('should set current showBuildingStatus to \"true\"', function () {
                        viewModel.activate();

                        var viewExperience = _.find(viewModel.experiences(), function (item) { return item.id == dataExperience.id; });
                        expect(viewExperience.showBuildingStatus()).toBe(true);
                    });

                });

            });

            describe('deactivate:', function () {

                it('should be a function', function () {
                    expect(viewModel.deactivate).toBeFunction();
                });

            });

            describe('navigateToCreation', function () {

                it('should be a function', function () {
                    expect(viewModel.navigateToCreation).toBeFunction();
                });

                it('should send event \"Navigate to create experience\"', function () {
                    viewModel.navigateToCreation();
                    expect(eventTracker.publish).toHaveBeenCalledWith('Navigate to create experience');
                });

                it('should navigate to #experience/create', function () {
                    viewModel.navigateToCreation();
                    expect(router.navigate).toHaveBeenCalledWith('experience/create');
                });

            });

            describe('navigateToDetails:', function () {

                it('should be a function', function () {
                    expect(viewModel.navigateToDetails).toBeFunction();
                });

                it('should send event \"Navigate to details\"', function () {
                    dataContext.experiences = experiences;
                    viewModel.navigateToDetails(experiences[0]);
                    expect(eventTracker.publish).toHaveBeenCalledWith('Navigate to details');
                });

                it('should navigate to #experience/id', function () {
                    dataContext.experiences = experiences;
                    viewModel.navigateToDetails(experiences[0]);
                    expect(router.navigate).toHaveBeenCalledWith('experience/' + experiences[0].id);
                });

            });

            describe('navigateToObjectives:', function () {

                it('should be a function', function () {
                    expect(viewModel.navigateToObjectives).toBeFunction();
                });

                it('should send event \"Navigate to objectives\"', function () {
                    viewModel.navigateToObjectives();
                    expect(eventTracker.publish).toHaveBeenCalledWith('Navigate to objectives');
                });

                it('should navigate to #objectives', function () {
                    viewModel.navigateToObjectives();
                    expect(router.navigate).toHaveBeenCalledWith('objectives');
                });

            });

            describe('toggleSelection:', function () {
                var experience;

                beforeEach(function () {
                    experience = {
                        isSelected: ko.observable()
                    };
                });

                it('should be a function', function () {
                    expect(viewModel.toggleSelection).toBeFunction();
                });

                it('should select experience', function () {
                    experience.isSelected(false);
                    viewModel.toggleSelection(experience);
                    expect(experience.isSelected()).toBe(true);
                });

                it('should send event \"Experience unselected\" when was selected', function () {
                    experience.isSelected(true);
                    viewModel.toggleSelection(experience);
                    expect(eventTracker.publish).toHaveBeenCalledWith('Experience unselected');
                });

                it('should send event \"Experience selected\" when was not selected', function () {
                    experience.isSelected(false);
                    viewModel.toggleSelection(experience);
                    expect(eventTracker.publish).toHaveBeenCalledWith('Experience selected');
                });

            });

            describe('canDeleteExperiences:', function () {

                it('should be computed', function () {
                    expect(viewModel.canDeleteExperiences).toBeComputed();
                });

                describe('when no experience is selected', function () {

                    it('should be false', function () {
                        viewModel.experiences([{ isSelected: ko.observable(false) }]);
                        expect(viewModel.canDeleteExperiences()).toBeFalsy();
                    });

                });

                describe('when only 1 experience is selected', function () {

                    it('should be true', function () {
                        viewModel.experiences([{ isSelected: ko.observable(true) }]);
                        expect(viewModel.canDeleteExperiences()).toBeTruthy();
                    });

                });

                describe('when more than 1 experiences are selected', function () {

                    it('should be false', function () {
                        viewModel.experiences([{ isSelected: ko.observable(true) }, { isSelected: ko.observable(true) }]);
                        expect(viewModel.canDeleteExperiences()).toBeFalsy();
                    });

                });
            });

            describe('deleteSelectedExperiences:', function () {

                it('should be function', function () {
                    expect(viewModel.deleteSelectedExperiences).toBeFunction();
                });

                it('should send event \'Delete selected experiences\'', function () {
                    viewModel.experiences([{ isSelected: ko.observable(true), objectives: [] }]);
                    viewModel.deleteSelectedExperiences();
                    expect(eventTracker.publish).toHaveBeenCalledWith('Delete selected experiences');
                });

                describe('when no experiences are selected', function () {

                    it('should throw exception', function () {
                        viewModel.experiences([]);

                        var f = function () {
                            viewModel.deleteSelectedExperiences();
                        };
                        expect(f).toThrow();
                    });

                });

                describe('when more that 1 experience are selected', function () {

                    it('should throw exception', function () {
                        viewModel.experiences([{ isSelected: ko.observable(true) }, { isSelected: ko.observable(true) }]);

                        var f = function () {
                            viewModel.deleteSelectedExperiences();
                        };
                        expect(f).toThrow();
                    });

                });

                describe('when there is only 1 selected objective', function () {

                    var notify = require('notify');
                    var repository = require('repositories/experienceRepository');

                    var removeExperience;

                    beforeEach(function () {
                        removeExperience = Q.defer();
                        spyOn(repository, 'removeExperience').andReturn(removeExperience.promise);
                    });

                    describe('and experience has related learning objectives', function () {

                        beforeEach(function () {
                            viewModel.experiences([{ isSelected: ko.observable(true), objectives: [{}] }]);
                            spyOn(notify, 'error');
                        });

                        it('should show error notification', function () {
                            viewModel.deleteSelectedExperiences();
                            expect(notify.error).toHaveBeenCalled();
                        });

                        it('should not remove experience from repository', function () {
                            viewModel.deleteSelectedExperiences();
                            expect(repository.removeExperience).not.toHaveBeenCalled();
                        });

                    });

                    describe('and experience has no related learning objectives', function () {

                        beforeEach(function () {
                            viewModel.experiences([{ id: 'id', isSelected: ko.observable(true), objectives: [] }]);
                            spyOn(notify, 'hide');
                        });

                        it('should hide notification', function () {
                            viewModel.deleteSelectedExperiences();
                            expect(notify.hide).toHaveBeenCalled();
                        });

                        it('should remove experience from repository', function () {
                            viewModel.deleteSelectedExperiences();
                            expect(repository.removeExperience).toHaveBeenCalledWith('id');
                        });

                        describe('and experience was successfully removed from repository', function () {

                            it('should remove experience from view model', function () {
                                viewModel.deleteSelectedExperiences();

                                var promise = removeExperience.promise.fin(function () { });

                                removeExperience.resolve();

                                waitsFor(function () {
                                    return !promise.isPending();
                                });
                                runs(function () {
                                    expect(viewModel.experiences().length).toBe(0);
                                });
                            });

                        });
                    });

                });

            });

            describe('sortByTitleAsc:', function () {

                beforeEach(function () {
                    viewModel.experiences([
                        { title: "title 3" },
                        { title: "title 1" },
                        { title: "title 2" }
                    ]);
                });

                it('should be a function', function () {
                    expect(viewModel.sortByTitleAsc).toBeFunction();
                });

                it('should set currentSortingoption to constants.sortingOptions.byTitleAsc', function () {
                    viewModel.sortByTitleAsc();
                    expect(viewModel.currentSortingOption()).toBe(constants.sortingOptions.byTitleAsc);
                });

                it('should sort experiences', function () {
                    viewModel.sortByTitleDesc();
                    viewModel.sortByTitleAsc();
                    expect(viewModel.experiences()).toBeSortedAsc('title');
                });

                it('should send event \"Sort by title ascending\"', function () {
                    viewModel.currentSortingOption(constants.sortingOptions.byTitleDesc);
                    viewModel.sortByTitleAsc();
                    expect(eventTracker.publish).toHaveBeenCalledWith('Sort by title ascending');
                });

            });

            describe('sortByTitleDesc:', function () {

                beforeEach(function () {
                    viewModel.experiences([
                        { title: "title 3" },
                        { title: "title 1" },
                        { title: "title 2" }
                    ]);
                });

                it('should be a function', function () {
                    expect(viewModel.sortByTitleDesc).toBeFunction();
                });

                it('should set currentSortingoption to constants.sortingOptions.byTitleDesc', function () {
                    viewModel.sortByTitleDesc();
                    expect(viewModel.currentSortingOption()).toBe(constants.sortingOptions.byTitleDesc);
                });

                it('should sort experiences', function () {
                    viewModel.sortByTitleAsc();
                    viewModel.sortByTitleDesc();
                    expect(viewModel.experiences()).toBeSortedDesc('title');
                });

                it('should send event \"Sort by title descending\"', function () {
                    viewModel.currentSortingOption(constants.sortingOptions.byTitleAsc);
                    viewModel.sortByTitleDesc();
                    expect(eventTracker.publish).toHaveBeenCalledWith('Sort by title descending');
                });

            });

            describe('buildExperience:', function () {
                var experienceService = require('services/buildExperience');

                var buildDeferred,
                    experience,
                    buildPromise;

                beforeEach(function () {
                    experience = {
                        id: 'testId3',
                        buildingStatus: ko.observable(),
                        showBuildingStatus: ko.observable(),
                        isSelected: ko.observable(),
                        isFirstBuild: ko.observable()
                    };
                    buildDeferred = Q.defer();

                    buildPromise = buildDeferred.promise.finally(function () { });
                    spyOn(experienceService, 'build').andReturn(buildDeferred.promise);
                });

                it('should be a function', function () {
                    expect(viewModel.buildExperience).toBeFunction();
                });

                it('should send event \"Build experience\"', function () {
                    viewModel.buildExperience(experience);

                    expect(eventTracker.publish).toHaveBeenCalledWith('Build experience');
                });

                it('should reset item selection', function () {
                    experience.isSelected(true);

                    viewModel.buildExperience(experience);

                    expect(experience.isSelected()).toBe(false);
                });

                it('should call buildExperience service', function () {
                    viewModel.buildExperience(experience);

                    expect(experienceService.build).toHaveBeenCalledWith(experience.id);
                });

                describe('when build is finished', function () {

                    describe('and build failed', function () {

                        it('should send event \'Experience build is failed\'', function () {
                            viewModel.buildExperience(experience);

                            eventTracker.publish.reset();
                            buildDeferred.reject();

                            waitsFor(function () {
                                return !buildPromise.isPending();
                            });
                            runs(function () {
                                expect(eventTracker.publish).toHaveBeenCalledWith('Experience build is failed');
                            });
                        });

                    });

                });

            });

            describe('downloadExperience:', function () {

                var experience;

                beforeEach(function () {
                    experience = { packageUrl: ko.observable('some url') };

                    spyOn(router, 'download');
                });

                it('should be a function', function () {
                    expect(viewModel.downloadExperience).toBeFunction();
                });

                it('should send event \"Download experience\"', function () {
                    viewModel.downloadExperience(experience);
                    expect(eventTracker.publish).toHaveBeenCalledWith('Download experience');
                });

                it('should download experience package', function () {
                    viewModel.downloadExperience(experience);
                    expect(router.download).toHaveBeenCalledWith('download/' + experience.packageUrl());
                });
            });

            describe('enableOpenExperience:', function () {

                it('should be a function', function () {
                    expect(viewModel.enableOpenExperience).toBeFunction();
                });

                it('should hide showBuildingStatus and so enable open experience', function () {
                    var experience = { showBuildingStatus: ko.observable() };
                    experience.showBuildingStatus(true);

                    viewModel.enableOpenExperience(experience);

                    expect(experience.showBuildingStatus()).toBe(false);
                });

            });

            describe('when experience build was started', function () {

                var experienceVm;

                beforeEach(function () {
                    experienceVm = {
                        id: 'experienceId',
                        buildingStatus: ko.observable(constants.statuses.notStarted),
                        showBuildingStatus: ko.observable(false)
                    };
                    viewModel.experiences([experienceVm]);
                });

                it('should change status of corresponding experience to \'inProgress\'', function () {
                    app.trigger(constants.messages.experience.build.started, { id: experienceVm.id });
                    expect(experienceVm.buildingStatus()).toEqual(constants.statuses.inProgress);
                });

                it('should show building status for corresponding experience', function () {
                    app.trigger(constants.messages.experience.build.started, { id: experienceVm.id });
                    expect(experienceVm.showBuildingStatus()).toBeTruthy();
                });

                it('should not change status of other experiences', function () {
                    app.trigger(constants.messages.experience.build.started, { id: '100500' });
                    expect(experienceVm.buildingStatus()).toEqual(constants.statuses.notStarted);
                });

                it('should not show building status for other experiences', function () {
                    app.trigger(constants.messages.experience.build.started, { id: '100500' });
                    expect(experienceVm.showBuildingStatus()).toBeFalsy();
                });

            });

            describe('when experience build completed', function () {

                var experienceVm;

                beforeEach(function () {
                    experienceVm = {
                        id: 'experienceId',
                        packageUrl: ko.observable('packageUrl'),
                        buildingStatus: ko.observable(constants.statuses.inProgress)
                    };
                    viewModel.experiences([experienceVm]);
                });

                it('should change status of the corresponding experience to \'success\'', function () {
                    app.trigger(constants.messages.experience.build.completed, { id: experienceVm.id });
                    expect(experienceVm.buildingStatus()).toEqual(constants.statuses.succeed);
                });

                it('should change packageUrl of the corresponding experience', function () {
                    var packageUrl = "http://xxx.com";
                    app.trigger(constants.messages.experience.build.completed, { id: experienceVm.id, packageUrl: packageUrl });

                    expect(experienceVm.packageUrl()).toEqual(packageUrl);
                });

                it('should not change status of other experiences', function () {
                    app.trigger(constants.messages.experience.build.completed, { id: '100500' });
                    expect(experienceVm.buildingStatus()).toEqual(constants.statuses.inProgress);
                });

                it('should not change packageUrl of other experiences', function () {
                    var packageUrl = "http://xxx.com";
                    app.trigger(constants.messages.experience.build.completed, { id: '100500', packageUrl: packageUrl });

                    expect(experienceVm.packageUrl()).toEqual('packageUrl');
                });

            });

            describe('when experience build failed', function () {

                var experienceVm;

                beforeEach(function () {
                    experienceVm = {
                        id: 'experienceId',
                        packageUrl: ko.observable('packageUrl'),
                        buildingStatus: ko.observable(constants.statuses.inProgress),
                    };
                    viewModel.experiences([experienceVm]);
                });

                it('should change status of the corresponding experience to \'failed\'', function () {
                    app.trigger(constants.messages.experience.build.failed, experienceVm.id);
                    expect(experienceVm.buildingStatus()).toEqual(constants.statuses.failed);
                });

                it('should remove packageUrl of the corresponding experience', function () {
                    app.trigger(constants.messages.experience.build.failed, experienceVm.id);
                    expect(experienceVm.packageUrl()).toEqual("");
                });

                it('should not change status of other experiences', function () {
                    app.trigger(constants.messages.experience.build.failed, '100500');
                    expect(experienceVm.buildingStatus()).toEqual(constants.statuses.inProgress);
                });

                it('should not remove packageUrl of other experiences', function () {
                    app.trigger(constants.messages.experience.build.failed, '100500');
                    expect(experienceVm.packageUrl()).toEqual("packageUrl");
                });

            });

        });

    }
);