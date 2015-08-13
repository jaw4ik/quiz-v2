﻿using easygenerator.Auth.Attributes.Mvc;
using easygenerator.Auth.Providers;
using easygenerator.DomainModel.Repositories;
using easygenerator.Infrastructure;
using easygenerator.Web.Components;
using System.Web.Mvc;

namespace easygenerator.Web.Controllers
{
    public class AuthController : DefaultController
    {
        private readonly IUserRepository _repository;
        private readonly ITokenProvider _tokenProvider;

        public AuthController(IUserRepository repository, ITokenProvider tokenProvider)
        {
            _repository = repository;
            _tokenProvider = tokenProvider;
        }

        [HttpPost, AllowAnonymous]
        public ActionResult Token(string username, string password, string grant_type, string[] endpoints)
        {
            if (grant_type == "password")
            {
                var user = _repository.GetUserByEmail(username);
                if (user != null && user.VerifyPassword(password))
                {
                    var tokens = _tokenProvider.GenerateTokens(username, Request.Url.Host, endpoints);
                    return JsonSuccess(tokens);
                }
            }
            return JsonError(AccountRes.Resources.IncorrectEmailOrPassword);
        }

        [HttpPost, Scope("auth")]
        public ActionResult Tokens(string[] endpoints)
        {
            var tokens = _tokenProvider.GenerateTokens(GetCurrentUsername(), Request.Url.Host, endpoints);
            return JsonSuccess(tokens);
        }

        [HttpPost, Scope("auth")]
        public ActionResult Identity()
        {
            var user = _repository.GetUserByEmail(GetCurrentUsername());

            if (user == null)
            {
                return JsonError(Errors.UserWithSpecifiedEmailDoesntExist);
            }

            return JsonSuccess(new
            {
                email = user.Email,
                firstname = user.FirstName,
                lastname = user.LastName,
                role = user.Role,
                subscription = new
                {
                    accessType = user.AccessType,
                    expirationDate = user.ExpirationDate
                }
            });

        }
    }
}