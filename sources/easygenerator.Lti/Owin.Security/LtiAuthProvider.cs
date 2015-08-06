﻿using System.Linq;
using System.Security.Policy;
using easygenerator.Auth.Providers;
using easygenerator.DomainModel;
using easygenerator.DomainModel.Entities;
using easygenerator.DomainModel.Events;
using easygenerator.DomainModel.Repositories;
using easygenerator.Infrastructure;
using LtiLibrary.Core.Common;
using LtiLibrary.Core.OAuth;
using LtiLibrary.Owin.Security.Lti.Provider;
using System;
using System.Threading.Tasks;
using easygenerator.DomainModel.Events.UserEvents;

namespace easygenerator.Lti.Owin.Security
{
    public class LtiAuthProvider : LtiAuthenticationProvider
    {
        private readonly IConsumerToolRepository _consumerToolRepository;
        private readonly ITokenProvider _tokenProvider;
        private readonly IUserRepository _userRepository;
        private readonly IEntityFactory _entityFactory;
        private readonly IDomainEventPublisher _eventPublisher;
        private readonly IDependencyResolverWrapper _dependencyResolver;

        public LtiAuthProvider(IConsumerToolRepository consumerToolRepository, ITokenProvider tokenProvider, IUserRepository userRepository, 
            IEntityFactory entityFactory, IDomainEventPublisher eventPublisher, IDependencyResolverWrapper dependencyResolver)
        {
            _consumerToolRepository = consumerToolRepository;
            _tokenProvider = tokenProvider;
            _userRepository = userRepository;
            _entityFactory = entityFactory;
            _eventPublisher = eventPublisher;
            _dependencyResolver = dependencyResolver;

            OnAuthenticate = context =>
            {
                var timeout = TimeSpan.FromMinutes(5);
                var oauthTimestampAbsolute = OAuthConstants.Epoch.AddSeconds(context.LtiRequest.Timestamp);
                if (DateTimeWrapper.Now().ToUniversalTime() - oauthTimestampAbsolute > timeout)
                {
                    throw new LtiException("Expired " + OAuthConstants.TimestampParameter);
                }

                var consumerTool = _consumerToolRepository.GetByKey(context.LtiRequest.ConsumerKey);
                if (consumerTool == null)
                {
                    throw new LtiException("Invalid " + OAuthConstants.ConsumerKeyParameter);
                }

                var consumerSignature = context.LtiRequest.GenerateSignature(consumerTool.Secret);
                if (!consumerSignature.Equals(context.LtiRequest.Signature))
                {
                    throw new LtiException("Invalid " + OAuthConstants.SignatureParameter);
                }

                return Task.FromResult<object>(null);
            };

            OnAuthenticated = context =>
            {
                //TODO: validate user first
                var userEmail = context.LtiRequest.LisPersonEmailPrimary;
                if (!string.IsNullOrWhiteSpace(context.LtiRequest.LisPersonEmailPrimary))
                {
                    var user = _userRepository.GetUserByEmail(userEmail);
                    var ltiAuthUrl = context.LtiRequest.Parameters[Constants.ToolProviderAuthUrl];

                    if (ltiAuthUrl == null)
                    {
                        ltiAuthUrl = context.Request.Uri.GetLeftPart(UriPartial.Authority);
                    }

                    if (user == null)
                    {
                        CreateNewUser(userEmail, context.LtiRequest.LisPersonNameGiven,
                            context.LtiRequest.LisPersonNameFamily, context.LtiRequest.UserId);

                    }
                    else if (!user.IsLtiUser() || user.LtiUserInfo.LtiUserId != context.LtiRequest.UserId)
                    {
                        context.RedirectUrl = string.Format("{0}#logout=true", ltiAuthUrl);
                        return Task.FromResult<object>(null);
                    }

                    var authToken = _tokenProvider.GenerateTokens(userEmail, context.Request.Uri.Host, new[] { "auth" });

                    ltiAuthUrl = string.Format("{0}#token.auth={1}", ltiAuthUrl, authToken[0].Token);

                    context.RedirectUrl = ltiAuthUrl;
                }
                return Task.FromResult<object>(null);
            };
        }

        public void CreateNewUser(string email, string firstName, string lastName, string ltiUserId)
        {
            var dataContext = _dependencyResolver.GetService<IUnitOfWork>();
            var userRepository = _dependencyResolver.GetService<IUserRepository>();
            var user = _entityFactory.User(email, Guid.NewGuid().ToString("N"), firstName, lastName, "LTI", "LTI", "LTI", email, AccessType.Plus, DateTimeWrapper.Now().AddYears(50));
            user.UpdateLtiUserInfo(ltiUserId);

            userRepository.Add(user);

            _eventPublisher.Publish(new CreateUserInitialDataEvent(user));

            dataContext.Save();
        }
    }
}
