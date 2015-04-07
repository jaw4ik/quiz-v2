﻿using easygenerator.DomainModel.Events;
using easygenerator.DomainModel.Events.AnswerEvents;
using easygenerator.DomainModel.Tests.ObjectMothers;
using easygenerator.Web.DomainEvents.ChangeTracking.Events;
using easygenerator.Web.DomainEvents.ChangeTracking.Trackers;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NSubstitute;
using System.Linq;

namespace easygenerator.Web.Tests.DomainEvents.ChangeTracking.Trackers
{
    [TestClass]
    public class AnswerChangeTrackerTests
    {
        private AnswerChangeTracker _tracker;
        private IDomainEventPublisher _publisher;

        [TestInitialize]
        public void Initialize()
        {
            _publisher = Substitute.For<IDomainEventPublisher>();
            _tracker = new AnswerChangeTracker(_publisher);
        }

        #region Handlers

        [TestMethod]
        public void Handler_AnswerCorrectnessUpdated_Should_Publish_AnswerChangedEvent()
        {
            //Act
            _tracker.Handle(new AnswerCorrectnessUpdatedEvent(AnswerObjectMother.Create()));

            //Assert
            ShouldPublishAnswerChangedEvent();
        }

        [TestMethod]
        public void Handler_AnswerCreated_Should_Publish_AnswerChangedEvent()
        {
            //Act
            _tracker.Handle(new AnswerCreatedEvent(AnswerObjectMother.Create()));

            //Assert
            ShouldPublishAnswerChangedEvent();
        }

        [TestMethod]
        public void Handler_AnswerTextUpdated_Should_Publish_AnswerChangedEvent()
        {
            //Act
            _tracker.Handle(new AnswerTextUpdatedEvent(AnswerObjectMother.Create()));

            //Assert
            ShouldPublishAnswerChangedEvent();
        }

        #endregion

        private void ShouldPublishAnswerChangedEvent()
        {
            var calls = _publisher.ReceivedCalls();
            calls.Count().Should().Be(1);
            calls.First().GetArguments()[0].Should().BeOfType<AnswerChangedEvent>();
        }
    }
}
