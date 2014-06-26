﻿using easygenerator.DomainModel.Entities;
using easygenerator.Web.Permissions;
using System;

namespace easygenerator.Web.Components.ActionFilters.Permissions
{
    public class EntityOwnerAttribute : EntityAccessAttribute
    {
        public EntityOwnerAttribute(Type entityType)
            :base(entityType)
        {
            
        }

        protected override bool CheckEntityAccess(Entity entity, User user)
        {
            return (bool)CallGenericTypeMethod(typeof(IEntityPermissionsChecker<>), "HasOwnerPermissions", new object[] { user.Email, entity });
        }
    }
}