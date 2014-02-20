﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using easygenerator.Infrastructure;

namespace easygenerator.DomainModel.Entities
{
    public class Objective : Entity
    {
        protected internal Objective() { }

        protected internal Objective(string title, string createdBy)
            : base(createdBy)
        {
            ThrowIfTitleIsInvalid(title);
            Title = title;

            QuestionsCollection = new Collection<Question>();
            QuestionsOrder = null;
        }

        public string Title { get; private set; }

        public virtual void UpdateTitle(string title, string modifiedBy)
        {
            ThrowIfTitleIsInvalid(title);
            ThrowIfModifiedByIsInvalid(modifiedBy);

            Title = title;
            MarkAsModified(modifiedBy);
        }

        protected internal virtual ICollection<Course> RelatedCoursesCollection { get; set; }

        public virtual IEnumerable<Course> Courses
        {
            get { return RelatedCoursesCollection.AsEnumerable(); }
        }

        protected internal virtual ICollection<Question> QuestionsCollection { get; set; }

        public virtual IEnumerable<Question> Questions
        {
            get { return GetOrderedQuestions().AsEnumerable(); }
        }

        protected internal string QuestionsOrder { get; set; }

        public virtual void AddQuestion(Question question, string modifiedBy)
        {
            ThrowIfQuestionIsInvalid(question);
            ThrowIfModifiedByIsInvalid(modifiedBy);

            QuestionsCollection.Add(question);
            question.Objective = this;
            DoUpdateQuestionsOrder(QuestionsCollection);
            MarkAsModified(modifiedBy);
        }

        public virtual void RemoveQuestion(Question question, string modifiedBy)
        {
            ThrowIfQuestionIsInvalid(question);
            ThrowIfModifiedByIsInvalid(modifiedBy);

            QuestionsCollection.Remove(question);
            question.Objective = null;
            DoUpdateQuestionsOrder(QuestionsCollection);
            MarkAsModified(modifiedBy);
        }

        public virtual void UpdateQuestionsOrder(ICollection<Question> questions, string modifiedBy)
        {
            ArgumentValidation.ThrowIfNull(questions, "questions");

            DoUpdateQuestionsOrder(questions);
            MarkAsModified(modifiedBy);
        }

        private void DoUpdateQuestionsOrder(ICollection<Question> questions)
        {
            QuestionsOrder = questions.Count == 0 ? null : String.Join(",", questions.Select(i => i.Id).ToArray());
        }

        private IEnumerable<Question> GetOrderedQuestions()
        {
            if (String.IsNullOrEmpty(QuestionsOrder))
            {
                return QuestionsCollection;
            }

            var orderedQuestionIds = QuestionsOrder.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries).ToList();
            return QuestionsCollection.OrderBy(item => GetQuestionIndex(orderedQuestionIds, item));
        }

        private int GetQuestionIndex(List<string> orderedQuestionIds, Question question)
        {
            var index = orderedQuestionIds.IndexOf(question.Id.ToString());
            return index > -1 ? index : orderedQuestionIds.Count;
        }

        private void ThrowIfTitleIsInvalid(string title)
        {
            ArgumentValidation.ThrowIfNullOrEmpty(title, "title");
            ArgumentValidation.ThrowIfLongerThan255(title, "title");
        }

        private void ThrowIfQuestionIsInvalid(Question question)
        {
            ArgumentValidation.ThrowIfNull(question, "question");
        }

        private void ThrowIfModifiedByIsInvalid(string modifiedBy)
        {
            ArgumentValidation.ThrowIfNullOrEmpty(modifiedBy, "modifiedBy");
        }
    }
}
