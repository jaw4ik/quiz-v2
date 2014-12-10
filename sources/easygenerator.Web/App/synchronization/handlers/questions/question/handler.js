﻿define([
    'synchronization/handlers/questions/question/eventHandlers/titleUpdated',
    'synchronization/handlers/questions/question/eventHandlers/contentUpdated',
    'synchronization/handlers/questions/question/eventHandlers/backgroundChanged',
    'synchronization/handlers/questions/question/eventHandlers/correctFeedbackUpdated',
    'synchronization/handlers/questions/question/eventHandlers/incorrectFeedbackUpdated',
    'synchronization/handlers/questions/question/eventHandlers/created',
    'synchronization/handlers/questions/question/eventHandlers/deleted'],
    function (
        titleUpdated,
        contentUpdated,
        backgroundChanged,
        correctFeedbackUpdated,
        incorrectFeedbackUpdated,
        created,
        deleted) {
        "use strict";

        return {
            titleUpdated: titleUpdated,
            contentUpdated: contentUpdated,
            backgroundChanged: backgroundChanged,
            correctFeedbackUpdated: correctFeedbackUpdated,
            incorrectFeedbackUpdated: incorrectFeedbackUpdated,
            created: created,
            deleted: deleted
        };

    });