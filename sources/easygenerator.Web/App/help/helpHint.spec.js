﻿define(['help/helpHint'], function (viewModel) {

    describe('viewModel [helpHint]', function () {

        var
            repository = require('repositories/helpHintRepository'),
            localizationManager = require('localization/localizationManager');

        describe('visible:', function () {

            describe('when title exists', function() {
            
                it('should be true', function () {
                    viewModel.title('title');
                    viewModel.text('');
                    expect(viewModel.visible()).toBeTruthy();
                });

            });
            
            describe('when text exists', function () {

                it('should be true', function () {
                    viewModel.title('');
                    viewModel.text('text');
                    expect(viewModel.visible()).toBeTruthy();
                });

            });
            
            describe('when title and text do not exist', function () {

                it('should be false', function () {
                    viewModel.title('');
                    viewModel.text('');
                    expect(viewModel.visible()).toBeFalsy();
                });

            });

            
        });

        describe('show:', function () {

            var addHint;

            beforeEach(function () {
                addHint = Q.defer();
                spyOn(repository, 'addHint').andReturn(addHint.promise);
                spyOn(localizationManager, 'localize').andCallFake(function (key) { return key; });
            });

            it('should be function', function () {
                expect(viewModel.show).toBeFunction();
            });

            describe('when help hint already exists', function () {

                it('should not add it to repository again', function () {
                    viewModel.id = 'id';
                    viewModel.isRequestPending = false;

                    viewModel.show();

                    expect(repository.addHint).not.toHaveBeenCalled();
                });

            });

            it('should add help hint to repository', function () {
                var key = 'key';
                viewModel.id = '';
                viewModel.key = key;
                viewModel.isRequestPending = false;

                viewModel.show();

                expect(repository.addHint).toHaveBeenCalledWith(key);
            });

            it('should set isRequestPending to true', function () {
                viewModel.id = '';
                viewModel.isRequestPending = false;

                viewModel.show();

                expect(viewModel.isRequestPending).toBeTruthy();
            });

            describe('when request is pending', function () {

                beforeEach(function () {
                    viewModel.id = '';
                    viewModel.isRequestPending = true;
                });

                it('should not add help hint to repository again', function () {
                    viewModel.show();

                    expect(repository.addHint).not.toHaveBeenCalled();
                });

            });

            describe('when help hint was added', function () {

                var hint = { id: 'id', key: 'key', localizationKey: 'localizationKey' };

                beforeEach(function () {
                    viewModel.id = '';
                    viewModel.isRequestPending = false;
                    addHint.resolve(hint);
                });

                it('should set help hint id', function () {
                    var promise = addHint.promise.fin(function () { });

                    viewModel.show();

                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(viewModel.id).toEqual(hint.id);
                    });
                });

                it('should set help hint title', function () {
                    var promise = addHint.promise.fin(function () { });

                    viewModel.show();

                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(viewModel.title()).toEqual(hint.localizationKey + 'Title');
                    });
                });

                it('should set help hint text', function () {
                    var promise = addHint.promise.fin(function () { });

                    viewModel.show();

                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(viewModel.text()).toEqual(hint.localizationKey);
                    });
                });

                it('should set isRequestPending to false', function () {
                    var promise = addHint.promise.fin(function () { });

                    viewModel.show();

                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(viewModel.isRequestPending).toBeFalsy();
                    });
                });

            });

        });

        describe('close:', function () {

            var removeHint;

            beforeEach(function () {
                removeHint = Q.defer();
                spyOn(repository, 'removeHint').andReturn(removeHint.promise);
            });

            it('should be function', function () {
                expect(viewModel.close).toBeFunction();
            });

            describe('when help hint does not exist', function () {

                it('should not add it to repository again', function () {
                    viewModel.id = '';
                    viewModel.isRequestPending = false;

                    viewModel.close();

                    expect(repository.removeHint).not.toHaveBeenCalled();
                });

            });

            it('should remove help hint from repository', function () {
                var id = 'id';
                viewModel.id = id;
                viewModel.isRequestPending = false;

                viewModel.close();

                expect(repository.removeHint).toHaveBeenCalledWith(id);
            });

            it('should set isRequestPending to true', function () {
                viewModel.id = 'id';
                viewModel.isRequestPending = false;

                viewModel.close();

                expect(viewModel.isRequestPending).toBeTruthy();
            });

            describe('when request is pending', function () {

                beforeEach(function () {
                    viewModel.id = 'id';
                    viewModel.isRequestPending = true;
                });

                it('should not remove help hint from repository again', function () {
                    viewModel.close();

                    expect(repository.removeHint).not.toHaveBeenCalled();
                });

            });

            describe('when help hint was removed', function () {

                beforeEach(function () {
                    viewModel.isRequestPending = false;
                    removeHint.resolve();
                });

                it('should clear help hint id', function () {
                    var promise = removeHint.promise.fin(function () { });

                    viewModel.close();

                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(viewModel.id).toEqual('');
                    });
                });

                it('should clear help hint title', function () {
                    var promise = removeHint.promise.fin(function () { });

                    viewModel.close();

                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(viewModel.title()).toEqual('');
                    });
                });

                it('should clear help hint text', function () {
                    var promise = removeHint.promise.fin(function () { });

                    viewModel.close();

                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(viewModel.text()).toEqual('');
                    });
                });

                it('should set isRequestPending to false', function () {
                    var promise = removeHint.promise.fin(function () { });

                    viewModel.close();

                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(viewModel.isRequestPending).toBeFalsy();
                    });
                });

            });
        });

        describe('activate:', function () {

            var getHint;

            beforeEach(function () {
                getHint = Q.defer();
                spyOn(repository, 'getHint').andReturn(getHint.promise);
            });

            it('should be function', function () {
                expect(viewModel.activate).toBeFunction();
            });

            it('should return promise', function () {
                expect(viewModel.activate()).toBePromise();
            });

            it('should set help hint key', function () {
                var key = 'key';
                viewModel.key = '';

                viewModel.activate(key);

                expect(viewModel.key).toEqual(key);
            });

            describe('when help hint exists', function () {

                var hint = { id: 'id', key: 'key', localizationKey: 'localizationKey' };

                beforeEach(function () {
                    getHint.resolve(hint);
                    spyOn(localizationManager, 'localize').andCallFake(function (key) { return key; });
                    spyOn(localizationManager, 'hasKey').andReturn(true);
                });

                it('should set help hint id', function () {
                    viewModel.id = '';

                    var promise = viewModel.activate(hint.key);

                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(viewModel.id).toEqual(hint.id);
                    });
                });

                it('should set help hint title', function () {
                    viewModel.title('');

                    var promise = viewModel.activate(hint.key);

                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(viewModel.title()).toEqual(hint.localizationKey + 'Title');
                    });
                });

                it('should set help hint text', function () {
                    viewModel.text('');

                    var promise = viewModel.activate(hint.key);

                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(viewModel.text()).toEqual(hint.localizationKey);
                    });
                });

            });

            describe('when help hint does not exist', function () {

                beforeEach(function () {
                    spyOn(localizationManager, 'localize').andCallFake(function (key) { return key; });
                    getHint.resolve(null);
                });

                it('should clear help hint id', function () {
                    viewModel.id = 'id';

                    var promise = viewModel.activate();

                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(viewModel.id).toEqual('');
                    });
                });

                it('should set help hint title', function () {
                    viewModel.title('title');

                    var promise = viewModel.activate();

                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(viewModel.title()).toEqual('');
                    });
                });

                it('should set help hint text', function () {
                    viewModel.text('text');

                    var promise = viewModel.activate();

                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(viewModel.text()).toEqual('');
                    });
                });

                it('should set isEmptyHint to false', function () {
                    viewModel.isEmptyHint(true);

                    var promise = viewModel.activate();

                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(viewModel.text()).toBeFalsy();
                    });
                });

            });

            describe('when help hint could not be retrieved', function() {

                var reason = 'reason';

                beforeEach(function () {
                    getHint.reject(reason);
                });

                it('should reject promise', function() {
                    var promise = viewModel.activate();

                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(promise).toBeRejectedWith(reason);
                    });
                });
            });

            describe('when help hint does not have localization key', function() {
                
                var hint = { id: 'id', key: 'key', localizationKey: 'localizationKey' };

                beforeEach(function () {
                    getHint.resolve(hint);
                    spyOn(localizationManager, 'hasKey').andReturn(false);
                });

                it('should set isEmptyHint to true', function () {
                    viewModel.isEmptyHint(false);
                    var promise = viewModel.activate();
                    
                    waitsFor(function () {
                        return !promise.isPending();
                    });
                    runs(function () {
                        expect(viewModel.isEmptyHint()).toBeTruthy();
                    });
                });

            });

        });

    });

})