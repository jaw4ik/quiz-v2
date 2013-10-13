﻿using System.Web.Mvc;
using Autofac;
using Autofac.Integration.Mvc;
using easygenerator.DataAccess;
using easygenerator.DomainModel;
using easygenerator.DomainModel.Entities;
using easygenerator.DomainModel.Handlers;
using easygenerator.DomainModel.Repositories;
using easygenerator.Infrastructure;
using easygenerator.Web.BuildExperience;
using easygenerator.Web.Components;
using easygenerator.Web.Components.ModelBinding;

namespace easygenerator.Web.Configuration
{
    public static class ContainerConfiguration
    {
        public static void Configure()
        {
            var builder = new ContainerBuilder();

            builder.RegisterControllers(typeof(MvcApplication).Assembly);

            builder.RegisterType<ExperienceBuilder>()
                   .As<IExperienceBuilder>();

            builder.RegisterGeneric(typeof(EntityModelBinder<>)).As(typeof(IEntityModelBinder<>));
            builder.RegisterGeneric(typeof(EntityCollectionModelBinder<>)).As(typeof(IEntityCollectionModelBinder<>));

            builder.RegisterType<BuildPathProvider>();
            builder.RegisterType<PhysicalFileManager>();
            builder.RegisterType<HttpRuntimeWrapper>();
            builder.RegisterType<BuildPackageCreator>();
            builder.RegisterType<PackageModelMapper>();
            builder.RegisterType<PackageModelSerializer>();
            builder.RegisterType<BuildPackageCreator>();
            builder.RegisterType<SignupFromTryItNowHandler>().As<ISignupFromTryItNowHandler>();

            builder.RegisterModule(new DataAccessModule());

            builder.RegisterType<EntityFactory>().As<IEntityFactory>();

            builder.RegisterType<AuthenticationProvider>().As<IAuthenticationProvider>();

            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}