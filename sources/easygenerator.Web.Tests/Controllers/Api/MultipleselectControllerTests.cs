﻿using easygenerator.DomainModel;
using easygenerator.DomainModel.Entities;
using easygenerator.DomainModel.Entities.Questions;
using easygenerator.DomainModel.Events;
using easygenerator.DomainModel.Events.SectionEvents;
using easygenerator.DomainModel.Events.QuestionEvents;
using easygenerator.DomainModel.Tests.ObjectMothers;
using easygenerator.Infrastructure;
using easygenerator.Web.Controllers.Api;
using easygenerator.Web.Extensions;
using easygenerator.Web.Tests.Utils;
using easygenerator.Web.ViewModels.Api;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace easygenerator.Web.Tests.Controllers.Api
{
    [TestClass]
    public class MultipleselectControllerTests
    {
        private const string CreatedBy = "easygenerator@easygenerator.com";

        private MultipleselectController _controller;

        IEntityFactory _entityFactory;
        IPrincipal _user;
        HttpContextBase _context;

        [TestInitialize]
        public void InitializeContext()
        {
            _entityFactory = Substitute.For<IEntityFactory>();
            _controller = new MultipleselectController(_entityFactory);

            _user = Substitute.For<IPrincipal>();
            _context = Substitute.For<HttpContextBase>();
            _context.User.Returns(_user);
            _controller.ControllerContext = new ControllerContext(_context, new RouteData(), _controller);
        }

        #region Create question

        [TestMethod]
        public void CreateMultipleSelect_ShouldReturnJsonErrorResult_WnenSectionIsNull()
        {
            DateTimeWrapper.Now = () => DateTime.MinValue;
            var result = _controller.Create(null, null);

            result.Should().BeJsonErrorResult().And.Message.Should().Be("Section is not found");
            result.Should().BeJsonErrorResult().And.ResourceKey.Should().Be("sectionNotFoundError");
        }

        [TestMethod]
        public void CreateMultipleSelect_ShouldAddTwoAnswerOptionsToQuestion()
        {
            const string title = "title";
            const string defaultAnswerText = "Put your answer option here";
            var user = "Test user";
            _user.Identity.Name.Returns(user);
            DateTimeWrapper.Now = () => DateTime.MinValue;
            var section = Substitute.For<Section>("Section title", CreatedBy);
            var question = Substitute.For<Multipleselect>("Question title", CreatedBy);
            var correctAnswer = Substitute.For<Answer>(defaultAnswerText, true, user, DateTimeWrapper.Now());
            var incorrectAnswer = Substitute.For<Answer>(defaultAnswerText, false, user, DateTimeWrapper.Now().AddSeconds(1));

            _entityFactory.Answer(defaultAnswerText, true, user, Arg.Any<DateTime>()).Returns(correctAnswer);
            _entityFactory.Answer(defaultAnswerText, false, user, Arg.Any<DateTime>()).Returns(incorrectAnswer);

            _entityFactory.MultipleselectQuestion(title, user, correctAnswer, incorrectAnswer).Returns(question);

            _controller.Create(section, title);
            _entityFactory.Received().MultipleselectQuestion(title, user, correctAnswer, incorrectAnswer);
        }

        [TestMethod]
        public void CreateMultipleSelect_ShouldAddQuestionToSection()
        {
            const string title = "title";
            var user = "Test user";
            DateTimeWrapper.Now = () => DateTime.MinValue;
            _user.Identity.Name.Returns(user);
            var section = Substitute.For<Section>("Section title", CreatedBy);
            var question = Substitute.For<Multipleselect>("Question title", CreatedBy);

            _entityFactory.MultipleselectQuestion(title, user, Arg.Any<Answer>(), Arg.Any<Answer>()).Returns(question);

            _controller.Create(section, title);

            section.Received().AddQuestion(question, user);
        }

        [TestMethod]
        public void CreateMultipleSelect_ShouldReturnJsonSuccessResult()
        {
            const string title = "title";
            var user = "Test user";
            _user.Identity.Name.Returns(user);
            DateTimeWrapper.Now = () => DateTime.MinValue;
            var question = Substitute.For<Multipleselect>("Question title", CreatedBy);

            _entityFactory.MultipleselectQuestion(title, user, Arg.Any<Answer>(), Arg.Any<Answer>()).Returns(question);

            var result = _controller.Create(Substitute.For<Section>("Section title", CreatedBy), title);

            result.Should()
                .BeJsonSuccessResult()
                .And.Data.ShouldBeSimilar(new { Id = question.Id.ToNString(), CreatedOn = question.CreatedOn });
        }

        #endregion

    }
}
