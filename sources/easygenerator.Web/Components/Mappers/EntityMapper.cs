﻿using easygenerator.DomainModel.Entities;
using easygenerator.Infrastructure;
using System;

namespace easygenerator.Web.Components.Mappers
{
    public class EntityMapper : IEntityMapper
    {
        private readonly IDependencyResolverWrapper _dependencyResolver;

        public EntityMapper(IDependencyResolverWrapper dependencyResolver)
        {
            _dependencyResolver = dependencyResolver;
        }

        public dynamic Map<T>(T entity) where T : Entity
        {
            ArgumentValidation.ThrowIfNull(entity, "entity");

            var modelMapper = _dependencyResolver.GetService<IEntityModelMapper<T>>();
            if (modelMapper == null)
                throw new ArgumentException("Model mapper is not registered for this type of entity", "entity");

            return modelMapper.Map(entity);
        }
    }
}