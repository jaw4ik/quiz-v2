﻿using easygenerator.DomainModel.Entities.Questions;
using easygenerator.DomainModel.Events;
using easygenerator.DomainModel.Events.QuestionEvents.RankingTextEvents;
using easygenerator.Web.Domain.DomainEvents.ChangeTracking.Events;

namespace easygenerator.Web.Domain.DomainEvents.ChangeTracking.Trackers
{
    public class RankingTextAnswerChangeTracker :
       IDomainEventHandler<RankingTextAnswerTextChangedEvent>,
       IDomainEventHandler<RankingTextAnswerCreatedEvent>
    {
        private readonly IDomainEventPublisher _eventPublisher;

        public RankingTextAnswerChangeTracker(IDomainEventPublisher eventPublisher)
        {
            _eventPublisher = eventPublisher;
        }

        #region Handlers

        public void Handle(RankingTextAnswerTextChangedEvent args)
        {
            RaiseAnswerChangedEvent(args.Answer);
        }

        public void Handle(RankingTextAnswerCreatedEvent args)
        {
            RaiseAnswerChangedEvent(args.Answer);
        }

        #endregion

        private void RaiseAnswerChangedEvent(RankingTextAnswer answer)
        {
            _eventPublisher.Publish(new RankingTextAnswerChangedEvent(answer));
        }

    }
}