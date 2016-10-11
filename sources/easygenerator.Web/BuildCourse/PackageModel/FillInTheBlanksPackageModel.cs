﻿using System.Collections.Generic;
using easygenerator.DomainModel.Entities.Questions;

namespace easygenerator.Web.BuildCourse.PackageModel
{
    public class FillInTheBlanksPackageModel : QuestionPackageModel
    {
        public override string Type => Question.QuestionTypes.FillInTheBlanks;

        public List<BlankAnswerGroupPackageModel> AnswerGroups { get; set; }
    }
}