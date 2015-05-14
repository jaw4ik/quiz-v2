﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using easygenerator.DomainModel.Entities.Questions;

namespace easygenerator.DomainModel.Tests.ObjectMothers
{
    public class TextMatchingObjectMother
    {
        private const string Title = "Question title";
        private const string CreatedBy = "username@easygenerator.com";

        public static TextMatching CreateWithTitle(string title)
        {
            return Create(title: title);
        }

        public static TextMatching CreateWithCreatedBy(string createdBy)
        {
            return Create(createdBy: createdBy);
        }

        public static TextMatching Create(string title = Title, string createdBy = CreatedBy)
        {
            return new TextMatching(title, createdBy);
        }
    }
}
