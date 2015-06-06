﻿define(['knockout', 'durandal/app', 'constants', 'notify', 'eventTracker', 'repositories/learningContentRepository'],
    function (ko, app, constants, notify, eventTracker, learningContentsrepository) {
        "use strict";

        var viewModel = function (learningContent, questionId, questionType, canBeAddedImmediately) {
            //private
            var _questionId = questionId,
                _questionType = questionType;

            //public
            var that = this;
            this.id = ko.observable(learningContent.id || '');
            this.text = ko.observable(learningContent.text || '');
            this.originalText = learningContent.text || '';
            this.type = learningContent.type;
            this.hasFocus = ko.observable(false);
            this.isDeleted = false;
            this.canBeAdded = ko.observable(canBeAddedImmediately);
            this.isRemoved = ko.observable(false);

            this.updateLearningContent = function () {
                var id = ko.unwrap(that.id);
                var text = ko.unwrap(that.text);

                if (_.isEmptyHtmlText(text) || ((!_.isNullOrUndefined(that.isDeleted) && that.isDeleted))) {
                    return;
                }

                if (_.isEmptyOrWhitespace(id)) {
                    learningContentsrepository.addLearningContent(_questionId, { text: text }).then(function (item) {
                        that.id(item.id);
                        that.originalText = text;
                        showNotification(item.createdOn);
                    });
                } else {
                    if (text != that.originalText && !that.isRemoved()) {
                        learningContentsrepository.updateText(_questionId, id, text).then(function (response) {
                            that.originalText = text;
                            showNotification(response.modifiedOn);
                        });
                    }
                }
            };

            this.endEditLearningContent = function () {
                if (!_.isNullOrUndefined(that.isDeleted) && that.isDeleted) {
                    app.trigger(constants.messages.question.learningContent.remove, that);
                    return;
                }

                var id = ko.unwrap(that.id);
                var text = ko.unwrap(that.text);

                if (_.isEmptyHtmlText(text)) {
                    app.trigger(constants.messages.question.learningContent.remove, that);
                    if (!_.isEmptyOrWhitespace(id)) {
                        learningContentsrepository.removeLearningContent(_questionId, id).then(function (modifiedOn) {
                            showNotification(modifiedOn);
                        });
                    }
                }
            };

            this.removeLearningContent = function () {
                if (!_.isNullOrUndefined(that.isDeleted) && that.isDeleted) {
                    app.trigger(constants.messages.question.learningContent.remove, that);
                    return;
                }

                performActionWhenLearningContentIdIsSet(function () {
                    app.trigger(constants.messages.question.learningContent.remove, that);
                    learningContentsrepository.removeLearningContent(_questionId, ko.unwrap(that.id)).then(function (response) {
                        showNotification(response.modifiedOn);
                    });
                });
            };

            this.restoreLearningContent = function () {
                var text = ko.unwrap(that.text);

                learningContentsrepository.addLearningContent(_questionId, { text: text }).then(function (item) {
                    that.id(item.id);
                    that.originalText = text;
                    app.trigger(constants.messages.question.learningContent.restore, that);
                    showNotification(item.createdOn);
                });
            }

            this.publishActualEvent = function (event) {
                if (_questionType === constants.questionType.informationContent.type) {
                    eventTracker.publish(event, constants.eventCategories.informationContent);
                } else {
                    eventTracker.publish(event);
                }
            };

            if (!_.isEmpty(this.id())) {
                this.canBeAdded(true);
            }

            function performActionWhenLearningContentIdIsSet(action) {
                if (_.isEmptyOrWhitespace(ko.unwrap(that.id))) {
                    var subscription = that.id.subscribe(function () {
                        if (!_.isEmptyOrWhitespace(ko.unwrap(that.id))) {
                            action();
                            subscription.dispose();
                        }
                    });
                } else {
                    action();
                }
            }

            function showNotification() {
                notify.saved();
            }

        };

        return viewModel;
    }
);