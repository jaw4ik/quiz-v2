﻿import _ from 'underscore';
import app from 'durandal/app';
import guard from 'guard';
import constants from 'constants';
import dataContext from 'dataContext';

export default (objectiveId, questionIds, modifiedOn) => {
    guard.throwIfNotArray(questionIds, 'QuestionIds is not an array');
    guard.throwIfNotString(objectiveId, 'ObjectiveId is not a string');
    guard.throwIfNotString(modifiedOn, 'ModifiedOn is not a string');

    let objective = _.find(dataContext.objectives, item => item.id === objectiveId);

    if (!_.isObject(objective)) {
        guard.throwIfNotAnObject(objective, 'Objective has not been found');
    }

    objective.questions = _.map(questionIds, id => _.find(objective.questions, question => question.id === id));
    objective.modifiedOn = new Date(modifiedOn);

    app.trigger(constants.messages.objective.questionsReorderedByCollaborator, objective);
};