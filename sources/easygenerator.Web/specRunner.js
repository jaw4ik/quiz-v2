﻿function runSpecs(env) {

    Q.stopUnhandledRejectionTracking();

    System.import('bootstrapper').then(function (bootstrapper) {
        System.import('localization/localizationManager').then(function (localizationManager) {
            bootstrapper.run();

            var specs = [
                'authorization/limitCoursesAmount.spec',

                //#region commands
                'commands/createQuestionCommand.spec',
                'commands/createObjectiveCommand.spec',
                'commands/createCourseCommand.spec',
                'commands/duplicateCourseCommand.spec',
                'commands/presentationCourseImportCommand.spec',

                //#endregion commands

                //#region dialogs
                'dialogs/collaboration/addCollaborator.spec',
                'dialogs/collaboration/collaboration.spec',
                'dialogs/collaboration/collaborator.spec',
                'dialogs/moveCopyQuestion/moveCopyQuestion.spec',
                'dialogs/video/video.spec',
                'dialogs/audio/audioLibrary.spec',
                'dialogs/audio/audioViewModel.spec',
                'dialogs/learningPath/commands/deleteLearningPathCommand.spec',
                'dialogs/learningPath/deleteLearningPath.spec',
                'dialogs/course/common/templateSelector/templateBrief.spec',
                'dialogs/course/common/templateSelector/templateSelector.spec',
                'dialogs/course/changeTemplate/changeTemplate.spec',
                'dialogs/course/createCourse/createCourse.spec',
                'dialogs/course/createCourse/steps/courseTemplateStep.spec',
                'dialogs/course/createCourse/steps/courseTitleStep.spec',
                'dialogs/course/publishCourse/publishCourse.spec',
                'dialogs/releaseNotes/commands/updateLastReadReleaseNote.spec',
                'dialogs/releaseNotes/commands/getReleaseNote.spec',
                'dialogs/releaseNotes/releaseNotes.spec',
                'dialogs/branchtrack/branchtrack.spec',

                //#endregion dialogs

                //#region errorHandling
                'errorHandling/httpErrorHandlers/defaultHttpErrorHandler.spec',
                'errorHandling/httpErrorHandlers/forbiddenHttpErrorHandler.spec',
                'errorHandling/httpErrorHandlers/serviceUnavailableHttpErrorHandler.spec',
                'errorHandling/httpErrorHandlers/unauthorizedHttpErrorHandler.spec',
                'errorHandling/errorHandlingConfiguration.spec',
                'errorHandling/globalErrorHandler.spec',
                'errorHandling/httpErrorHandlerRegistrator.spec',

                //#endregion

                //#region notifications
                'notifications/notification.spec',
                'notifications/subscriptionExpiration/notificationController.spec',
                'notifications/subscriptionExpiration/notification.spec',
                'notifications/collaborationInvite/notification.spec',
                'notifications/collaborationInvite/queries/getInvites.spec',
                'notifications/collaborationInvite/commands/acceptInvite.spec',
                'notifications/collaborationInvite/commands/declineInvite.spec',
                'notifications/collaborationInvite/notificationController.spec',

                //#endregion 

                'localization/localizationManager.spec',
                'models/course.spec',
                'models/learningPath.spec',
                'models/user.spec',
                'models/video.spec',
                'repositories/answerRepository.spec',
                'repositories/commentRepository.spec',
                'repositories/collaboratorRepository.spec',
                'repositories/courseRepository.spec',
                'repositories/learningContentRepository.spec',
                'repositories/learningPathRepository.spec',
                'repositories/objectiveRepository.spec',
                'repositories/templateRepository.spec',
                'repositories/questionRepository.spec',
                'repositories/videoRepository.spec',
                'services/publishService.spec',
                'utils/waiter.spec',

                //#region onboarding
                'onboarding/initialization.spec',
                'onboarding/tasks.spec',
                'onboarding/onboarding.spec',

                //#endregion

                //#region reporting
                'models/reporting/statement.spec',
                'models/reporting/actor.spec',
                'reporting/xApiFilterCriteriaFactory.spec',
                'reporting/xApiProvider.spec',
                'reporting/viewmodels/expandableStatement.spec',
                'reporting/viewmodels/questionStatement.spec',
                'reporting/viewmodels/objectiveStatement.spec',
                'reporting/viewmodels/startedStatement.spec',
                'reporting/viewmodels/finishStatement.spec',
                'reporting/viewmodels/resultsBase.spec',
                'reporting/learningPathStatementsProvider.spec',
                'reporting/courseStatementsProvider.spec',
                //#endregion

                //#region synchronization
                'synchronization/handlers/objective/handler.spec',
                'synchronization/handlers/objective/eventHandlers/titleUpdated.spec',
                'synchronization/handlers/objective/eventHandlers/imageUrlUpdated.spec',
                'synchronization/handlers/objective/eventHandlers/questionsReordered.spec',
                'synchronization/handlers/collaboration/handler.spec',
                'synchronization/handlers/collaboration/eventHandlers/started.spec',
                'synchronization/handlers/collaboration/eventHandlers/finished.spec',
                'synchronization/handlers/collaboration/eventHandlers/inviteCreated.spec',
                'synchronization/handlers/collaboration/eventHandlers/inviteRemoved.spec',
                'synchronization/handlers/collaboration/eventHandlers/inviteAccepted.spec',
                'synchronization/handlers/collaboration/eventHandlers/inviteCourseTitleUpdated.spec',
                'synchronization/handlers/collaboration/eventHandlers/collaboratorAdded.spec',
                'synchronization/handlers/collaboration/eventHandlers/collaboratorRemoved.spec',
                'synchronization/handlers/collaboration/eventHandlers/collaboratorRegistered.spec',
                'synchronization/handlers/course/handler.spec',
                'synchronization/handlers/course/eventHandlers/deleted.spec',
                'synchronization/handlers/course/eventHandlers/introductionContentUpdated.spec',
                'synchronization/handlers/course/eventHandlers/objectiveRelated.spec',
                'synchronization/handlers/course/eventHandlers/objectivesReordered.spec',
                'synchronization/handlers/course/eventHandlers/objectivesReplaced.spec',
                'synchronization/handlers/course/eventHandlers/objectivesUnrelated.spec',
                'synchronization/handlers/course/eventHandlers/published.spec',
                'synchronization/handlers/course/eventHandlers/templateUpdated.spec',
                'synchronization/handlers/course/eventHandlers/titleUpdated.spec',
                'synchronization/handlers/course/eventHandlers/stateChanged.spec',
                'synchronization/handlers/learningContent/handler.spec',
                'synchronization/handlers/learningContent/eventHandlers/created.spec',
                'synchronization/handlers/learningContent/eventHandlers/deleted.spec',
                'synchronization/handlers/learningContent/eventHandlers/textUpdated.spec',
                'synchronization/handlers/answer/handler.spec',
                'synchronization/handlers/answer/eventHandlers/created.spec',
                'synchronization/handlers/answer/eventHandlers/deleted.spec',
                'synchronization/handlers/answer/eventHandlers/textUpdated.spec',
                'synchronization/handlers/answer/eventHandlers/answerCorrectnessUpdated.spec',
                'synchronization/handlers/user/handler.spec',
                'synchronization/handlers/user/eventHandlers/upgradedToStarter.spec',
                'synchronization/handlers/user/eventHandlers/upgradedToPlus.spec',
                'synchronization/handlers/user/eventHandlers/downgraded.spec',

                //#region synchronization questions
                'synchronization/handlers/questions/handler.spec',
                'synchronization/handlers/questions/question/handler.spec',
                'synchronization/handlers/questions/question/eventHandlers/titleUpdated.spec',
                 'synchronization/handlers/questions/question/eventHandlers/voiceOverUpdated.spec',
                'synchronization/handlers/questions/question/eventHandlers/backgroundChanged.spec',
                'synchronization/handlers/questions/question/eventHandlers/created.spec',
                'synchronization/handlers/questions/question/eventHandlers/deleted.spec',
                'synchronization/handlers/questions/question/eventHandlers/contentUpdated.spec',
                'synchronization/handlers/questions/question/eventHandlers/correctFeedbackUpdated.spec',
                'synchronization/handlers/questions/question/eventHandlers/incorrectFeedbackUpdated.spec',
                'synchronization/handlers/questions/question/eventHandlers/learningContentsReordered.spec',
                'synchronization/handlers/questions/fillInTheBlank/handler.spec',
                'synchronization/handlers/questions/fillInTheBlank/eventHandlers/updated.spec',
                'synchronization/handlers/questions/dragAndDropText/handler.spec',
                'synchronization/handlers/questions/dragAndDropText/eventHandlers/dropspotCreated.spec',
                'synchronization/handlers/questions/dragAndDropText/eventHandlers/dropspotDeleted.spec',
                'synchronization/handlers/questions/dragAndDropText/eventHandlers/dropspotPositionChanged.spec',
                'synchronization/handlers/questions/dragAndDropText/eventHandlers/dropspotTextChanged.spec',
                'synchronization/handlers/questions/textMatching/handler.spec',
                'synchronization/handlers/questions/textMatching/eventHandlers/answerCreated.spec',
                'synchronization/handlers/questions/textMatching/eventHandlers/answerDeleted.spec',
                'synchronization/handlers/questions/textMatching/eventHandlers/answerKeyChanged.spec',
                'synchronization/handlers/questions/textMatching/eventHandlers/answerValueChanged.spec',
                'synchronization/handlers/questions/singleSelectImage/handler.spec',
                'synchronization/handlers/questions/singleSelectImage/eventHandlers/answerCreated.spec',
                'synchronization/handlers/questions/singleSelectImage/eventHandlers/answerDeleted.spec',
                'synchronization/handlers/questions/singleSelectImage/eventHandlers/answerImageUpdated.spec',
                'synchronization/handlers/questions/singleSelectImage/eventHandlers/correctAnswerChanged.spec',
                'synchronization/handlers/questions/hotSpot/handler.spec',
                'synchronization/handlers/questions/hotSpot/eventHandlers/polygonCreated.spec',
                'synchronization/handlers/questions/hotSpot/eventHandlers/polygonDeleted.spec',
                'synchronization/handlers/questions/hotSpot/eventHandlers/polygonChanged.spec',
                'synchronization/handlers/questions/hotSpot/eventHandlers/isMultipleChanged.spec',
                'synchronization/handlers/questions/scenario/handler.spec',
                'synchronization/handlers/questions/scenario/eventHandlers/dataUpdated.spec',
                'synchronization/handlers/questions/scenario/eventHandlers/masteryScoreUpdated.spec',

                //#endregion

                //#endregion

                //#region learning paths
                'viewmodels/learningPaths/learningPaths/commands/createLearningPathCommand.spec',
                'viewmodels/learningPaths/learningPaths/queries/getLearningPathCollectionQuery.spec',
                'viewmodels/learningPaths/learningPaths/learningPathBrief.spec',
                'viewmodels/learningPaths/learningPaths/learningPaths.spec',
                'viewmodels/learningPaths/courseSelector/queries/getOwnedCoursesQuery.spec',
                'viewmodels/learningPaths/courseSelector/courseSelector.spec',
                'viewmodels/learningPaths/courseSelector/courseBrief.spec',
                'viewmodels/learningPaths/courseSelector/courseFilter.spec',
                'viewmodels/learningPaths/learningPath/commands/updateTitleCommand.spec',
                'viewmodels/learningPaths/learningPath/commands/addCourseCommand.spec',
                'viewmodels/learningPaths/learningPath/commands/removeCourseCommand.spec',
                'viewmodels/learningPaths/learningPath/commands/updateCoursesOrderCommand.spec',
                'viewmodels/learningPaths/learningPath/queries/getLearningPathByIdQuery.spec',
                'viewmodels/learningPaths/learningPath/index.spec',
                'viewmodels/learningPaths/learningPath/details.spec',
                'viewmodels/learningPaths/learningPath/publish.spec',
                'viewmodels/learningPaths/learningPath/courseBrief.spec',
                'viewmodels/learningPaths/learningPath/results.spec',
                'viewmodels/learningPaths/learningPath/actions/download.spec',
                'viewmodels/learningPaths/learningPath/actions/publish.spec',

                //#endregion

                'navigationBar/navigationBar.spec',
                'treeOfContent/handlers/treeOfContentEventHandler.spec',
                'treeOfContent/handlers/treeOfContentAutoExpandHandler.spec',
                'treeOfContent/queries/getCourseByIdQuery.spec',
                'treeOfContent/queries/getObjectiveByIdQuery.spec',
                'treeOfContent/CourseTreeNode.spec',
                'treeOfContent/RelatedObjectiveTreeNode.spec',
                'treeOfContent/QuestionTreeNode.spec',
                'viewmodels/common/contentField.spec',
                'viewmodels/library/index.spec',
                'viewmodels/videos/videos.spec',
                'viewmodels/videos/commands/deleteVideo.spec',
                'viewmodels/common/titleField.spec',
                'viewmodels/courses/courses.spec',
                'viewmodels/courses/course/index.spec',
                'viewmodels/courses/course/create/course.spec',
                'viewmodels/courses/course/design/design.spec',
                'viewmodels/courses/course/design/templateBrief.spec',
                'viewmodels/courses/course/configure.spec',
                'viewmodels/courses/course/publish.spec',
                'viewmodels/courses/course/results.spec',
                'viewmodels/courses/publishingActions/publishingAction.spec',
                'viewmodels/courses/publishingActions/build.spec',
                'viewmodels/courses/publishingActions/publish.spec',
                'viewmodels/courses/publishingActions/scormBuild.spec',
                'viewmodels/courses/publishingActions/publishToCustomLms.spec',
                'viewmodels/courses/courseComments.spec',
                'viewmodels/objectives/objectives.spec',
                'viewmodels/objectives/objective.spec',
                'viewmodels/objectives/objectiveBrief.spec',
                'viewmodels/panels/sidePanel.spec',
                'viewmodels/panels/tabs/reviewTab.spec',
                'viewmodels/panels/tabs/feedbackTab.spec',

                //#region questions
                'viewmodels/questions/question.spec',
                'viewmodels/questions/voiceOver.spec',
                'viewmodels/questions/answers.spec',
                'viewmodels/questions/multipleSelect/multipleSelectAnswers.spec',
                'viewmodels/questions/multipleSelect/multipleSelect.spec',
                'viewmodels/questions/singleSelectText/singleSelectTextAnswers.spec',
                'viewmodels/questions/singleSelectText/singleSelectText.spec',
                'viewmodels/questions/fillInTheBlank/fillInTheBlank.spec',
                'viewmodels/questions/fillInTheBlank/fibControl.spec',
                'viewmodels/questions/informationContent/informationContent.spec',
                'viewmodels/questions/statement/statement.spec',
                'viewmodels/questions/statement/statementAnswers.spec',
                'viewmodels/questions/dragAndDropText/dragAndDropText.spec',
                'viewmodels/questions/dragAndDropText/designer.spec',
                'viewmodels/questions/dragAndDropText/dropspot.spec',
                'viewmodels/questions/dragAndDropText/dropspotToAdd.spec',
                'viewmodels/questions/dragAndDropText/commands/addDropspot.spec',
                'viewmodels/questions/dragAndDropText/commands/removeDropspot.spec',
                'viewmodels/questions/dragAndDropText/commands/changeDropspotText.spec',
                'viewmodels/questions/dragAndDropText/commands/changeDropspotPosition.spec',
                'viewmodels/questions/dragAndDropText/commands/changeBackground.spec',
                'viewmodels/questions/dragAndDropText/queries/getQuestionContentById.spec',
                'viewmodels/questions/singleSelectImage/singleSelectImage.spec',
                'viewmodels/questions/singleSelectImage/designer.spec',
                'viewmodels/questions/singleSelectImage/answer.spec',
                'viewmodels/questions/singleSelectImage/commands/addAnswer.spec',
                'viewmodels/questions/singleSelectImage/commands/removeAnswer.spec',
                'viewmodels/questions/singleSelectImage/commands/setCorrectAnswer.spec',
                'viewmodels/questions/singleSelectImage/commands/updateAnswerImage.spec',
                'viewmodels/questions/singleSelectImage/queries/getQuestionContentById.spec',
                'viewmodels/questions/textMatching/textMatching.spec',
                'viewmodels/questions/textMatching/textMatchingAnswer.spec',
                'viewmodels/questions/textMatching/queries/getTextMatchingAnswersById.spec',
                'viewmodels/questions/textMatching/commands/addAnswer.spec',
                'viewmodels/questions/textMatching/commands/removeAnswer.spec',
                'viewmodels/questions/textMatching/commands/changeAnswerKey.spec',
                'viewmodels/questions/textMatching/commands/changeAnswerValue.spec',
                'viewmodels/questions/hotspot/designer.spec',
                'viewmodels/questions/hotspot/hotSpot.spec',
                'viewmodels/questions/hotspot/polygon.spec',
                'viewmodels/questions/hotspot/commands/addPolygon.spec',
                'viewmodels/questions/hotspot/commands/removePolygon.spec',
                'viewmodels/questions/hotspot/commands/updatePolygon.spec',
                'viewmodels/questions/hotspot/commands/changeBackground.spec',
                'viewmodels/questions/hotspot/commands/changeType.spec',
                'viewmodels/questions/hotspot/queries/getQuestionContentById.spec',
                'viewmodels/questions/openQuestion/openQuestion.spec',
                'viewmodels/questions/scenario/scenario.spec',
                'viewmodels/questions/scenario/commands/updateData.spec',
                'viewmodels/questions/scenario/commands/updateMasteryScore.spec',
                'viewmodels/questions/scenario/queries/getDashboardInfo.spec',
                'viewmodels/questions/scenario/queries/getProjectEditingInfoById.spec',
                'viewmodels/questions/scenario/queries/getProjectInfoById.spec',
                'viewmodels/questions/scenario/queries/getQuestionDataById.spec',
                'viewmodels/questions/questionTitle.spec',
                'viewmodels/questions/feedback.spec',
                'viewmodels/learningContents/learningContents.spec',
                'viewmodels/learningContents/learningContentBase.spec',
                'viewmodels/learningContents/content.spec',
                'viewmodels/learningContents/hotspotOnAnImage.spec',

                //#endregion

                //#region video upload
                'videoUpload/commands/storage.spec',
                'videoUpload/commands/vimeo.spec',
                'videoUpload/handlers/progress.spec',
                'videoUpload/handlers/thumbnails.spec',
                'videoUpload/handlers/durations.spec',
                'videoUpload/uploadDataContext.spec',
                'videoUpload/uploadTracking.spec',
                'videoUpload/upload.spec',
                //#endregion

                //#region audio upload
                'viewmodels/audios/audios.spec',
                'viewmodels/audios/AudioViewModel.spec',
                'audio/commands/markAvailable.spec',
                'audio/convertion/commands/convert.spec',
                'audio/convertion/commands/finalize.spec',
                'audio/convertion/commands/getTicket.spec',
                'audio/queries/getCollection.spec',
                'audio/queries/getNotAvailable.spec',
                'audio/vimeo/commands/pull.spec',
                'audio/vimeo/availabilityTracker.spec',
                'audio/factory.spec',
                'audio/finishUpload.spec',
                'audio/UploadAudioModel.spec',
                'vimeo/queries/checkAvailability.spec',
                'vimeo/queries/getVideo.spec',
                //#endregion

                //#region widgets
                'widgets/notifyViewer/viewmodel.spec',
                'widgets/uiLockViewer/viewmodel.spec',
                'widgets/createQuestion/viewmodel.spec',
                'widgets/cursorTooltip/viewmodel.spec',
                'widgets/hotSpotOnImageTextEditor/viewmodel.spec',
                'widgets/upgradeDialog/viewmodel.spec',
                'widgets/dialog/viewmodel.spec',
                //#endregion

                'viewmodels/user/userMenu.spec',
                'viewmodels/shell.spec',
                'bootstrapper.spec',
                'guard.spec',
                'http/apiHttpWrapper.spec',
                'http/publishHttpWrapper.spec',
                'http/authHttpWrapper.spec',
                'http/storageHttpWrapper.spec',
                'http/httpRequestSender.spec',
                'http/storageHttpRequestSender.spec',
                'notify.spec',
                'uiLocker.spec',
                'userContext.spec',

                './Scripts/account/signup.spec',
                './Scripts/account/signin.spec',
                './Scripts/account/passwordrecovery.spec',
                './Scripts/account/signupsecondstep.spec',
                './Scripts/review/review.spec',
                './Scripts/common/serviceUnavailableAjaxErrorHandler.spec'
            ];

            localizationManager.initialize(['en'], 'app/localization/lang/').then(function () {

                var modulesDependencies = {};
                specs.forEach(function (spec) {
                    modulesDependencies[spec] = [spec.replace('.spec', '')];
                });
                System.config({
                    depCache: modulesDependencies
                });

                Promise.all(specs.map(function (spec) {
                    return System.import(spec);
                })).then(function () {
                    env.execute();
                });
            });
        });
    });
}