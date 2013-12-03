﻿function signUpSecondStepModel() {
    var peopleBusyWithCourseDevelopmentAmount = ko.observable(null),
        needAuthoringTool = ko.observable(null),
        usedAuthoringTool = ko.observable(null),
        isSignupRequestPending = ko.observable(false),

        isInitializationContextCorrect = function () {
            var data = app.clientSessionContext.get(appConstants.userSignUpFirstStepData);
            return !_.isNullOrUndefined(data);
        },

        signUp = function () {
            if (isSignupRequestPending()) {
                return;
            }

            var data = app.clientSessionContext.get(appConstants.userSignUpFirstStepData);
            if (_.isNullOrUndefined(data)) {
                throw 'User sign up data is not defined';
            }

            data.PeopleBusyWithCourseDevelopmentAmount = peopleBusyWithCourseDevelopmentAmount();
            data.NeedAuthoringTool = needAuthoringTool();
            data.UsedAuthoringTool = usedAuthoringTool();

            isSignupRequestPending(true);

            $.ajax({
                url: '/api/user/signup',
                data: data,
                type: 'POST'
            }).done(function (response) {
                app.clientSessionContext.remove(appConstants.userSignUpFirstStepData);
                app.trackEvent(appConstants.events.signup, { username: response.data }).done(function () {
                    app.openHomePage();
                });
            }).fail(function () {
                isSignupRequestPending(false);
            });
        };

    return {
        peopleBusyWithCourseDevelopmentAmount: peopleBusyWithCourseDevelopmentAmount,
        needAuthoringTool: needAuthoringTool,
        usedAuthoringTool: usedAuthoringTool,
        signUp: signUp,
        isSignupRequestPending: isSignupRequestPending,
        isInitializationContextCorrect: isInitializationContextCorrect
    };
}