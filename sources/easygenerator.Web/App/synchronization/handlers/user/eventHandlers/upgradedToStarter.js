﻿define(['guard', 'userContext', 'durandal/app', 'constants'], function (guard, userContext, app, constants) {

    return function(expirationDate) {
        guard.throwIfNotAnObject(userContext.identity, "User identity is not an object");
        userContext.identity.upgradeToStarter(expirationDate);
        app.trigger(constants.messages.user.upgraded);
    }

});