﻿using easygenerator.DomainModel.Entities;
using easygenerator.DomainModel.Events;
using easygenerator.DomainModel.Events.CourseEvents;
using easygenerator.DomainModel.Repositories;
using easygenerator.Infrastructure;
using easygenerator.Web.Components;
using easygenerator.Web.Components.ActionFilters.Permissions;
using easygenerator.Web.Components.Mappers;
using System.Web.Mvc;

namespace easygenerator.Web.Controllers.Api
{
    public class CourseCollaborationController : DefaultController
    {
        private readonly IUserRepository _userRepository;
        private readonly IEntityModelMapper<CourseCollaborator> _collaboratorEntityModelMapper;
        private readonly IDomainEventPublisher _eventPublisher;

        public CourseCollaborationController(IUserRepository userRepository, IDomainEventPublisher eventPublisher,
            IEntityModelMapper<CourseCollaborator> collaboratorEntityModelMapper)
        {
            _userRepository = userRepository;
            _collaboratorEntityModelMapper = collaboratorEntityModelMapper;
            _eventPublisher = eventPublisher;
        }

        [HttpPost]
        [EntityOwner(typeof(Course))]
        [Route("api/course/collaborator/add")]
        public ActionResult AddCollaborator(Course course, string email)
        {
            if (course == null)
            {
                return HttpNotFound(Errors.CourseNotFoundError);
            }

            var user = _userRepository.GetUserByEmail(email);
            if (user == null)
            {
                return JsonLocalizableError(Errors.UserWithSpecifiedEmailDoesntExist, Errors.UserWithSpecifiedEmailDoesntExistResourceKey);
            }

            var collaborator = course.Collaborate(email, GetCurrentUsername());
            if (collaborator == null)
            {
                return JsonSuccess(true);
            }

            var courseCollaboratorAddedEvent = new CourseCollaboratorAddedEvent(collaborator, GetCurrentUsername());
            _eventPublisher.Publish(courseCollaboratorAddedEvent);

            return JsonSuccess(_collaboratorEntityModelMapper.Map(collaborator));
        }
    }
}