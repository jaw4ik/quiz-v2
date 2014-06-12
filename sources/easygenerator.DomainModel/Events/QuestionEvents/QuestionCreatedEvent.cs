﻿using easygenerator.DomainModel.Entities;

namespace easygenerator.DomainModel.Events.QuestionEvents
{
    public class QuestionCreatedEvent : QuestionEvent
    {
        public QuestionCreatedEvent(Question question)
            : base(question)
        {

        }
    }
}
