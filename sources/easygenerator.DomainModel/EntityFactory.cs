﻿using System;
using easygenerator.DomainModel.Entities;

namespace easygenerator.DomainModel
{
    public interface IEntityFactory
    {
        Objective Objective(string title, string createdBy);
        Course Course(string title, Template template, string createdBy);
        Question Question(string title, string createdBy);
        Comment Comment(string text, string createdBy);
        Answer Answer(string text, bool isCorrect, string createdBy);
        LearningContent LearningContent(string text, string createdBy);
        User User(string email, string password, string firstname, string lastname, string phone, string organization,
            string country, string createdBy, UserSettings userSettings, UserSubscription subscription);
        MailNotification MailNotification(string body, string subject, string from, string to, string cc = null, string bcc = null);
        PasswordRecoveryTicket PasswordRecoveryTicket(User user);
        ImageFile ImageFile(string title, string createdBy);
        UserSubscription UserSubscription(AccessType accessType, DateTime? expirationTime);
    }

    public class EntityFactory : IEntityFactory
    {
        public Objective Objective(string title, string createdBy)
        {
            return new Objective(title, createdBy);
        }

        public Course Course(string title, Template template, string createdBy)
        {
            return new Course(title, template, createdBy);
        }

        public Question Question(string title, string createdBy)
        {
            return new Question(title, createdBy);
        }

        public Comment Comment(string text, string createdBy)
        {
            return new Comment(createdBy, text);
        }

        public Answer Answer(string text, bool isCorrect, string createdBy)
        {
            return new Answer(text, isCorrect, createdBy);
        }

        public LearningContent LearningContent(string text, string createdBy)
        {
            return new LearningContent(text, createdBy);
        }

        public User User(string email, string password, string firstname, string lastname, string phone, string organization,
            string country, string createdBy, UserSettings userSettings, UserSubscription subscription)
        {
            return new User(email, password, firstname, lastname, phone, organization, country, createdBy, userSettings, subscription);
        }

        public MailNotification MailNotification(string body, string subject, string from, string to, string cc = null, string bcc = null)
        {
            return new MailNotification(body, subject, from, to, cc, bcc);
        }

        public PasswordRecoveryTicket PasswordRecoveryTicket(User user)
        {
            return new PasswordRecoveryTicket();
        }

        public ImageFile ImageFile(string title, string createdBy)
        {
            return new ImageFile(title, createdBy);
        }

        public UserSubscription UserSubscription(AccessType accessType, DateTime? expirationTime)
        {
            return new UserSubscription(accessType, expirationTime);
        }
    }
}
