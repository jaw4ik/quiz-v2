﻿import Statement from './statement';

import constants from 'constants';

describe('model [Statement]', function () {

    it('should be constructor function', function () {
        expect(Statement).toBeFunction();
    });

    describe('when specification is not an object', function () {

        it('should throw exception', function () {
            var f = function () {
                new Statement();
            };
            expect(f).toThrow();
        });

    });

    describe('constructor:', function () {
        var passedSpec, failedSpec;
        beforeEach(function () {
            passedSpec = {
                timestamp: "2013-12-27T07:58:07.617000+00:00",
                actor: {
                    name: "Username",
                    mbox: "mailto:email@example.com"
                },
                verb: {
                    id: constants.reporting.xApiVerbIds.passed
                },
                result: {
                    score: {
                        "scaled": 0.5
                    }
                },
                object: {
                    id: 'object1id',
                    definition: {
                        name: {
                            "en-US": "title"
                        }
                    }
                },
                context: {
                    extensions: {
                        'http://easygenerator/expapi/question/survey': false,
                        'http://easygenerator/expapi/question/type': constants.questionType.statement.type
                    }
                }
            };

            failedSpec = {
                timestamp: "2013-12-27T07:58:07.617000+00:00",
                actor: {
                    name: "Username",
                    mbox: "mailto:email@example.com"
                },
                verb: {
                    id: constants.reporting.xApiVerbIds.failed
                },
                result: {
                    score: {
                        "scaled": 0.5
                    }
                },
                object: {
                    id: "object2id",
                    definition: {
                        name: {
                            "en-US": "title"
                        }
                    }
                }
            }
        });

        it('should fill model with correct initial data', function () {
            var statement = new Statement(passedSpec);

            expect(statement.date).toEqual(new Date(passedSpec.timestamp));
            expect(statement.actor.name).toEqual(passedSpec.actor.name);
            expect(statement.actor.email).toEqual(passedSpec.actor.mbox.replace('mailto:', ''));
            expect(statement.name).toEqual(passedSpec.object.definition.name["en-US"]);
            expect(statement.id).toEqual(passedSpec.object.id);
            expect(statement.verb).toEqual(passedSpec.verb.id);
        });

        it('should set score to spec.result.score.scaled multiplied by 100', function () {
            var statement = new Statement(passedSpec);
            expect(statement.score).toBe(50);
        });

        it('should set score to null if result is not specified', function () {
            passedSpec.result = null;
            var statement = new Statement(passedSpec);
            expect(statement.score).toBeNull();
        });

        it('should set attemptId field to be equal to registration field if exists', function () {
            passedSpec.context = {
                registration: "registration"
            }
            var statement = new Statement(passedSpec);
            expect(statement.attemptId).toBe(passedSpec.context.registration);
        });

        it('should not set attemptId field if registration field does not exist', function () {
            var statement = new Statement(passedSpec);
            expect(statement.attemptId).toBeUndefined();
        });

        it('should set parentId field to be equal to spec.context.contextActivities.parent.id field if exists', function () {
            passedSpec.context = {
                contextActivities: {
                    parent: [{
                        id: "parentId"
                    }]
                }
            }
            var statement = new Statement(passedSpec);
            expect(statement.parentId).toBe(passedSpec.context.contextActivities.parent[0].id);
        });

        it('should not set parentId field if spec.context.contextActivities.parent.id does not exist', function () {
            var statement = new Statement(passedSpec);
            expect(statement.parentId).toBeUndefined();
        });

        describe('when statement has object property', () => {

            describe('and when object property has definition property', () => {

                it('should set deinition field', () => {
                    var statement = new Statement(passedSpec);
                    expect(statement.definition).toBeDefined();
                });

            });

        });

        describe('when statement has context property', () => {

            describe('and when context has extensions property', () => {

                describe('and when extensions has survey mode prop', () => {

                    it('should set isSurvey', () => {
                        var statement = new Statement(passedSpec);
                        expect(statement.isSurvey).toBeDefined();
                    });

                });

                describe('and when extensions has question type', () => {

                    it('should set questionType', () => {
                        var statement = new Statement(passedSpec);
                        expect(statement.questionType).toBeDefined();
                    });

                });

            });

        });
    });
});
