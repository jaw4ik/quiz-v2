﻿define(['models/entity', 'durandal/app', 'constants', 'services/publishService'],
    function (EntityModel, app, constants, publishService) {
        "use strict";

        function Course(spec) {

            EntityModel.call(this, spec);

            this.title = spec.title;
            this.sections = spec.sections;
            this.createdBy = spec.createdBy;
            this.createdByName = spec.createdByName;
            this.createdOn = spec.createdOn;
            this.builtOn = spec.builtOn;
            this.template = spec.template;
            this.introductionContent = spec.introductionContent;
            this.collaborators = spec.collaborators;
            this.isDirty = spec.isDirty;
            this.isDirtyForSale = spec.isDirtyForSale;
            this.saleInfo = {
                isProcessing: spec.saleInfo.isProcessing
            },
            this.courseCompanies = spec.courseCompanies;

            this.build = deliveringAction.call(this, buildActionHandler, spec.packageUrl);
            this.scormBuild = buildingAction.call(this, scormBuildActionHandler, spec.scormPackageUrl);
            this.publish = deliveringAction.call(this, publishActionHandler, spec.publishedPackageUrl, true);
            this.publishToCoggno = deliveringScormPackageAction.call(this, publishToCoggnoActionHandler, spec.saleInfo.documentId);
            this.publishForReview = deliveringAction.call(this, publishForReviewActionHandler, spec.reviewUrl);
            this.publishToCustomLms = publishToCustomLms;

            this.getState = getState;
            this.isDelivering = false;

            this.ownership = spec.ownership;
            this.publicationAccessControlList = spec.publicationAccessControlList;
        }

        return Course;

        function buildingAction(actionHandler, packageUrl) {
            var course = this;

            var self = function (includeMedia) {
                course.isDelivering = true;
                app.trigger(constants.messages.course.delivering.started, course);

                return actionHandler.call(course, self, includeMedia)
                    .fin(function () {
                        course.isDelivering = false;
                        app.trigger(constants.messages.course.delivering.finished, course);
                    });
            };
            self.packageUrl = packageUrl;
            self.state = constants.publishingStates.notStarted;
            self.setState = function (value) {
                this.state = course._lastState = value;
            };

            return self;
        }

        function deliveringAction(actionHandler, packageUrl, enableAccessLimitation) {
            var course = this;

            return buildingAction.call(course, function (action, includeMedia) {
                return buildPackage.call(course, action, includeMedia, enableAccessLimitation).then(function (buildInfo) {
                    return actionHandler.call(course, action, buildInfo);
                });
            }, packageUrl);
        }

        function deliveringScormPackageAction(actionHandler, packageUrl) {
            var course = this;

            return buildingAction.call(course, function (action, includeMedia) {
                return buildScormPackage.call(course, action, includeMedia).then(function (buildInfo) {
                    return actionHandler.call(course, action, buildInfo);
                });
            }, packageUrl);
        }

        function getState() {
            return this._lastState;
        }

        function buildPackage(action, includeMedia, enableAccessLimitation) {
            var that = this;
            return Q.fcall(function () {
                if (action.state === constants.publishingStates.building) {
                    throw 'Course is already building.';
                }

                action.setState(constants.publishingStates.building);
                app.trigger(constants.messages.course.build.started, that);

                return publishService.buildCourse(that.id, includeMedia, enableAccessLimitation).then(function (buildInfo) {
                    that.builtOn = buildInfo.builtOn;

                    action.setState(constants.publishingStates.succeed);
                    app.trigger(constants.messages.course.build.completed, that);

                    return buildInfo;
                }).fail(function (message) {
                    action.setState(constants.publishingStates.failed);
                    app.trigger(constants.messages.course.build.failed, that, message);

                    throw message;
                });
            });
        }

        function buildScormPackage(action, includeMedia) {
            var that = this;
            return Q.fcall(function () {
                if (action.state === constants.publishingStates.building) {
                    throw 'Course is already building.';
                }

                action.setState(constants.publishingStates.building);
                app.trigger(constants.messages.course.scormBuild.started, that);

                return publishService.scormBuildCourse(that.id, includeMedia).then(function (buildInfo) {
                    action.setState(constants.publishingStates.succeed);
                    app.trigger(constants.messages.course.scormBuild.completed, that);

                    return buildInfo;
                }).fail(function (message) {
                    action.setState(constants.publishingStates.failed);
                    app.trigger(constants.messages.course.scormBuild.failed, that, message);

                    throw message;
                });
            });
        }


        /*-------------Actions handlers--------------*/

        function buildActionHandler(action, buildInfo) {
            var that = this;
            return Q.fcall(function () {
                if (action.state === constants.publishingStates.building) {
                    throw 'Course is already building.';
                }

                action.packageUrl = buildInfo.packageUrl;
                return that;
            });
        }

        function scormBuildActionHandler(action, includeMedia) {
            var that = this;
            return Q.fcall(function () {
                if (action.state === constants.publishingStates.building) {
                    throw 'Course is already building.';
                }

                action.setState(constants.publishingStates.building);
                app.trigger(constants.messages.course.scormBuild.started, that);

                return publishService.scormBuildCourse(that.id, includeMedia).then(function (buildInfo) {
                    action.packageUrl = buildInfo.scormPackageUrl;

                    action.setState(constants.publishingStates.succeed);
                    app.trigger(constants.messages.course.scormBuild.completed, that);

                    return that;
                }).fail(function (message) {
                    action.packageUrl = '';

                    action.setState(constants.publishingStates.failed);
                    app.trigger(constants.messages.course.scormBuild.failed, that, message);

                    throw message;
                });
            });
        }

        function publishActionHandler(action) {
            var that = this;
            return Q.fcall(function () {
                if (action.state === constants.publishingStates.publishing) {
                    throw 'Course is already publishing.';
                }

                action.setState(constants.publishingStates.publishing);
                app.trigger(constants.messages.course.publish.started, that);

                return publishService.publishCourse(that.id).then(function (publishInfo) {
                    action.packageUrl = publishInfo.publishedPackageUrl;

                    action.setState(constants.publishingStates.succeed);
                    app.trigger(constants.messages.course.publish.completed, that);

                    return that;
                }).fail(function (message) {
                    action.packageUrl = '';

                    action.setState(constants.publishingStates.failed);
                    app.trigger(constants.messages.course.publish.failed, that, message);

                    throw message;
                });
            });
        }

        function publishToCoggnoActionHandler(action) {
            var that = this;
            return Q.fcall(function () {
                if (action.state === constants.publishingStates.publishing) {
                    throw 'Course is already publishing.';
                }

                action.setState(constants.publishingStates.publishing);
                app.trigger(constants.messages.course.publishToCoggno.started, that);

                return publishService.publishCourseToCoggno(that.id).then(function () {
                    that.saleInfo.isProcessing = true;

                    action.setState(constants.publishingStates.succeed);
                    app.trigger(constants.messages.course.publishToCoggno.completed, that);

                    return that;
                }).fail(function (message) {
                    action.setState(constants.publishingStates.failed);
                    app.trigger(constants.messages.course.publishToCoggno.failed, that, message);

                    throw message;
                });
            });
        }

        function publishForReviewActionHandler(action) {
            var that = this;
            return Q.fcall(function () {
                if (action.state === constants.publishingStates.publishing) {
                    throw 'Course is already publishing.';
                }

                action.setState(constants.publishingStates.publishing);
                app.trigger(constants.messages.course.publishForReview.started, that);

                return publishService.publishCourseForReview(that.id).then(function (publishInfo) {
                    action.packageUrl = publishInfo.reviewUrl;

                    action.setState(constants.publishingStates.succeed);
                    app.trigger(constants.messages.course.publishForReview.completed, that);

                    return that;
                }).fail(function (message) {
                    action.packageUrl = '';

                    action.setState(constants.publishingStates.failed);
                    app.trigger(constants.messages.course.publishForReview.failed, that, message);

                    throw message;
                });
            });
        }
      
        function publishToCustomLms(companyId) {
            var that = this;
            return Q.fcall(function () {
                app.trigger(constants.messages.course.publishToCustomLms.started, that);

                return publishService.publishCourseToCustomLms(that.id, companyId).then(function () {
                    that.courseCompanies.push({ id: companyId });
                    app.trigger(constants.messages.course.publishToCustomLms.completed, that);

                    return that;
                }).fail(function (message) {
                    app.trigger(constants.messages.course.publishToCustomLms.failed, that, message);

                    throw message;
                });
            });
        }

    }
);