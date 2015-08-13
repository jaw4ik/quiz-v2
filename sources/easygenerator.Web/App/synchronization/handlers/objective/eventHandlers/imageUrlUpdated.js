﻿define(['guard', 'durandal/app', 'constants', 'dataContext'],
    function (guard, app, constants, dataContext) {
        "use strict";

        return function (objectiveId, imageUrl, modifiedOn) {
            guard.throwIfNotString(objectiveId, 'ObjectiveId is not a string');
            guard.throwIfNotString(imageUrl, 'ImageUrl is not a string');
            guard.throwIfNotString(modifiedOn, 'ModifiedOn is not a string');

            var objective = _.find(dataContext.objectives, function (item) {
                return item.id == objectiveId;
            });

            if (!_.isObject(objective)) {
                guard.throwIfNotAnObject(objective, 'Objective has not been found');
            }

            objective.image = imageUrl;
            objective.modifiedOn = new Date(modifiedOn);

            app.trigger(constants.messages.objective.imageUrlUpdatedByCollaborator, objective);
        };
    }
);