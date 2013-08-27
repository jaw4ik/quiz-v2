﻿define(['plugins/http', 'repositories/experienceRepository', 'constants'], function (http, repository, constants) {

    var build = function (experienceId) {

        var deferred = Q.defer();

        repository.getById(experienceId).then(function (experience) {

            if (_.isNull(experience)) {
                deferred.reject('Experience was not found');
                return;
            }

            if (experience.buildingStatus == constants.buildingStatuses.inProgress) {
                deferred.reject('Experience is already building');
                return;
            }
            
            experience.buildingStatus = constants.buildingStatuses.inProgress;

            http.post('experience/build', experience)
                .done(function (response) {
                    if (_.isUndefined(response) || _.isUndefined(response.Success)) {
                        deferred.reject('Response has invalid format');
                    }
                    if (response.Success) {
                        experience.buildingStatus = constants.buildingStatuses.succeed;
                        experience.packageUrl = response.PackageUrl;
                        deferred.resolve(response);
                    } else {
                        experience.buildingStatus = constants.buildingStatuses.failed;
                        experience.packageUrl = '';
                        deferred.resolve({ Success: false, PackageUrl: '' });
                    }
                })
                .fail(function () {
                    experience.buildingStatus = constants.buildingStatuses.failed;
                    deferred.resolve({Success: false, PackageUrl: ''});
                });
        });

        return deferred.promise;

    };

    return {
        build: build
    };
});