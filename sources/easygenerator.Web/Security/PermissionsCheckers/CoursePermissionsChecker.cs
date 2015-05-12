﻿using easygenerator.DomainModel.Entities;
using easygenerator.Web.Security.FeatureAvailability;
using System;
using System.Linq;

namespace easygenerator.Web.Security.PermissionsCheckers
{
    public class CoursePermissionsChecker : EntityPermissionsChecker<Course>
    {
        private readonly IFeatureAvailabilityChecker _featureAvailabilityChecker;

        public CoursePermissionsChecker(IFeatureAvailabilityChecker featureAvailabilityChecker)
        {
            _featureAvailabilityChecker = featureAvailabilityChecker;
        }

        public override bool HasCollaboratorPermissions(string username, Course course)
        {
            return HasOwnerPermissions(username, course) ||
                (course.Collaborators.Any(e => e.Email.Equals(username, StringComparison.InvariantCultureIgnoreCase) && e.IsAccepted
                    && _featureAvailabilityChecker.IsCourseCollaborationEnabled(course)));
        }
    }
}