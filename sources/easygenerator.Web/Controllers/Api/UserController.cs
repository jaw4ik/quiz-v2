﻿using System;
using System.Runtime.CompilerServices;
using System.Web.DynamicData;
using easygenerator.DomainModel;
using easygenerator.DomainModel.Entities;
using easygenerator.DomainModel.Events;
using easygenerator.DomainModel.Handlers;
using easygenerator.DomainModel.Repositories;
using easygenerator.Infrastructure;
using easygenerator.Web.Components;
using easygenerator.Web.Mail;
using easygenerator.Web.ViewModels.Account;
using System.Web.Mvc;
using easygenerator.Web.Components.ActionFilters;
using easygenerator.Web.Extensions;
using Microsoft.Ajax.Utilities;

namespace easygenerator.Web.Controllers.Api
{
    [NoCache]
    public class UserController : DefaultController
    {
        private readonly IUserRepository _repository;
        private readonly IEntityFactory _entityFactory;
        private readonly IAuthenticationProvider _authenticationProvider;
        private readonly ISignupFromTryItNowHandler _signupFromTryItNowHandler;
        private readonly IDomainEventPublisher<UserSignedUpEvent> _publisher;
        private readonly IMailSenderWrapper _mailSenderWrapper;

        public UserController(IUserRepository repository,
            IEntityFactory entityFactory,
            IAuthenticationProvider authenticationProvider,
            ISignupFromTryItNowHandler signupFromTryItNowHandler,
            IDomainEventPublisher<UserSignedUpEvent> publisher,
            IMailSenderWrapper mailSenderWrapper)
        {
            _repository = repository;
            _entityFactory = entityFactory;
            _authenticationProvider = authenticationProvider;
            _signupFromTryItNowHandler = signupFromTryItNowHandler;
            _publisher = publisher;
            _mailSenderWrapper = mailSenderWrapper;
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Signin(string username, string password)
        {
            var user = _repository.GetUserByEmail(username);
            if (user == null || !user.VerifyPassword(password))
            {
                return JsonError(AccountRes.Resources.IncorrectEmailOrPassword);
            }

            _authenticationProvider.SignIn(username, true);
            return JsonSuccess();
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Signup(UserSignUpViewModel profile)
        {
            if (_repository.GetUserByEmail(profile.Email) != null)
            {
                return JsonError("Account with this email already exists");
            }

            var user = _entityFactory.User(profile.Email, profile.Password, profile.FirstName, profile.LastName, profile.Phone,
                profile.Organization, profile.Country, profile.Email, new UserSettings(profile.Email, true));

            _repository.Add(user);
            _publisher.Publish(new UserSignedUpEvent(user, profile.PeopleBusyWithCourseDevelopmentAmount, profile.NeedAuthoringTool, profile.UsedAuthoringTool));

            if (User.Identity.IsAuthenticated && _repository.GetUserByEmail(User.Identity.Name) == null)
            {
                _signupFromTryItNowHandler.HandleOwnership(User.Identity.Name, user.Email);
            }

            _authenticationProvider.SignIn(profile.Email, true);

            return JsonSuccess(profile.Email);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult ForgotPassword(string email)
        {
            var user = _repository.GetUserByEmail(email);

            if (user != null)
            {
                var ticket = _entityFactory.PasswordRecoveryTicket(user);
                user.AddPasswordRecoveryTicket(ticket);

                _mailSenderWrapper.SendForgotPasswordMessage(email, ticket.Id.ToNString());
            }

            return JsonSuccess();
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult RecoverPassword(PasswordRecoveryTicket ticket, string password)
        {
            if (ticket == null)
            {
                return JsonError("Ticket does not exist");
            }

            ticket.User.RecoverPasswordUsingTicket(ticket, password);

            return JsonSuccess();
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Exists(string email)
        {
            var exists = _repository.GetUserByEmail(email) != null;
            return JsonSuccess(exists);
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult GetCurrentUserInfo()
        {
            var user = _repository.GetUserByEmail(GetCurrentUsername());

            return JsonSuccess(new
            {
                IsShowIntroductionPage = (user == null) || user.UserSetting.IsShowIntroductionPage,
                IsRegisteredOnAim4You = false
            });
        }

        [HttpPost]
        [Route("api/identify")]
        public ActionResult Identify()
        {
            var user = _repository.GetUserByEmail(GetCurrentUsername());

            if (user == null)
            {
                return Json(new { });
            }

            return Json(new { email = user.Email, fullname = user.GetFullName(), accessType = user.AccessType });

        }

        [HttpPost]
        public ActionResult SetIsShowIntroductionPage(bool isShowIntroduction)
        {
            var user = _repository.GetUserByEmail(GetCurrentUsername());
            if (user != null && user.UserSetting.IsShowIntroductionPage != isShowIntroduction)
            {
                user.UserSetting.UpdateIsShowIntroduction(isShowIntroduction);
            }
            return JsonSuccess();
        }
    }
}
