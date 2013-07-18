﻿// ------------------------------------------------------------------------------
//  <auto-generated>
//      This code was generated by SpecFlow (http://www.specflow.org/).
//      SpecFlow Version:1.9.0.77
//      SpecFlow Generator Version:1.9.0.0
//      Runtime Version:4.0.30319.17929
// 
//      Changes to this file may cause incorrect behavior and will be lost if
//      the code is regenerated.
//  </auto-generated>
// ------------------------------------------------------------------------------
#region Designer generated code
#pragma warning disable
namespace easygenerator.AcceptanceTests.Tests
{
    using TechTalk.SpecFlow;
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("TechTalk.SpecFlow", "1.9.0.77")]
    [System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [NUnit.Framework.TestFixtureAttribute()]
    [NUnit.Framework.DescriptionAttribute("Question")]
    [NUnit.Framework.CategoryAttribute("Question")]
    public partial class QuestionFeature
    {
        
        private static TechTalk.SpecFlow.ITestRunner testRunner;
        
#line 1 "Question.feature"
#line hidden
        
        [NUnit.Framework.TestFixtureSetUpAttribute()]
        public virtual void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "Question", "As an author I can see content of open Question, so I can check if it is enough t" +
                    "o check/provide a learner\'s knowledge.", ProgrammingLanguage.CSharp, new string[] {
                        "Question"});
            testRunner.OnFeatureStart(featureInfo);
        }
        
        [NUnit.Framework.TestFixtureTearDownAttribute()]
        public virtual void FeatureTearDown()
        {
            testRunner.OnFeatureEnd();
            testRunner = null;
        }
        
        [NUnit.Framework.SetUpAttribute()]
        public virtual void TestInitialize()
        {
        }
        
        [NUnit.Framework.TearDownAttribute()]
        public virtual void ScenarioTearDown()
        {
            testRunner.OnScenarioEnd();
        }
        
        public virtual void ScenarioSetup(TechTalk.SpecFlow.ScenarioInfo scenarioInfo)
        {
            testRunner.OnScenarioStart(scenarioInfo);
        }
        
        public virtual void ScenarioCleanup()
        {
            testRunner.CollectScenarioErrors();
        }
        
        public virtual void FeatureBackground()
        {
#line 5
#line hidden
            TechTalk.SpecFlow.Table table1 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table1.AddRow(new string[] {
                        "Objective1",
                        "1"});
            table1.AddRow(new string[] {
                        "Objective2",
                        "2"});
#line 6
testRunner.Given("objectives are present in database", ((string)(null)), table1, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table2 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table2.AddRow(new string[] {
                        "Question11",
                        "1"});
            table2.AddRow(new string[] {
                        "Question12",
                        "2"});
            table2.AddRow(new string[] {
                        "Question13",
                        "3"});
#line 10
testRunner.Given("questions related to \'Objective1\' are present in database", ((string)(null)), table2, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table3 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table3.AddRow(new string[] {
                        "Question112",
                        "1"});
            table3.AddRow(new string[] {
                        "Question113",
                        "2"});
#line 15
testRunner.Given("questions related to \'Objective2\' are present in database", ((string)(null)), table3, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table4 = new TechTalk.SpecFlow.Table(new string[] {
                        "Text",
                        "isCorrect"});
            table4.AddRow(new string[] {
                        "AnswerOption11",
                        "1"});
            table4.AddRow(new string[] {
                        "AnswerOption12",
                        "0"});
            table4.AddRow(new string[] {
                        "AnswerOption13",
                        "1"});
#line 19
testRunner.Given("answer options related to \'Question11\' of \'Objective1\' are present in database", ((string)(null)), table4, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table5 = new TechTalk.SpecFlow.Table(new string[] {
                        "Text"});
            table5.AddRow(new string[] {
                        "AnswerOption21"});
            table5.AddRow(new string[] {
                        "AnswerOption22"});
            table5.AddRow(new string[] {
                        "AnswerOption23"});
#line 24
testRunner.Given("answer options related to \'Question12\' of \'Objective1\' are present in database", ((string)(null)), table5, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table6 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table6.AddRow(new string[] {
                        "Explanation11"});
            table6.AddRow(new string[] {
                        "Explanation12"});
            table6.AddRow(new string[] {
                        "Explanation13"});
#line 29
testRunner.Given("explanations related to \'Question11\' of \'Objective1\' are present in database", ((string)(null)), table6, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table7 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table7.AddRow(new string[] {
                        "Explanation21"});
            table7.AddRow(new string[] {
                        "Explanation22"});
            table7.AddRow(new string[] {
                        "Explanation23"});
#line 34
testRunner.Given("explanations related to \'Question12\' of \'Objective1\' are present in database", ((string)(null)), table7, "Given ");
#line hidden
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("All answer options and explanations related to question are present on question p" +
            "age")]
        public virtual void AllAnswerOptionsAndExplanationsRelatedToQuestionArePresentOnQuestionPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("All answer options and explanations related to question are present on question p" +
                    "age", ((string[])(null)));
#line 40
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line 41
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
            TechTalk.SpecFlow.Table table8 = new TechTalk.SpecFlow.Table(new string[] {
                        "Text"});
            table8.AddRow(new string[] {
                        "AnswerOption21"});
            table8.AddRow(new string[] {
                        "AnswerOption22"});
            table8.AddRow(new string[] {
                        "AnswerOption23"});
#line 42
testRunner.Then("answer options list contains only items with data", ((string)(null)), table8, "Then ");
#line hidden
            TechTalk.SpecFlow.Table table9 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table9.AddRow(new string[] {
                        "Explanation21"});
            table9.AddRow(new string[] {
                        "Explanation22"});
            table9.AddRow(new string[] {
                        "Explanation23"});
#line 47
testRunner.And("explanations list contains only items with data", ((string)(null)), table9, "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Related objective title is shown in back to objective link")]
        public virtual void RelatedObjectiveTitleIsShownInBackToObjectiveLink()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Related objective title is shown in back to objective link", ((string[])(null)));
#line 53
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line 54
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 55
testRunner.Then("\'Objective1\' title is shown in back to objective link", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Related question title is shown in question page header")]
        public virtual void RelatedQuestionTitleIsShownInQuestionPageHeader()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Related question title is shown in question page header", ((string[])(null)));
#line 57
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line 58
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 59
testRunner.Then("\'Question12\' title is shown in question page header", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Correct indicators are shown for answer options on question page")]
        public virtual void CorrectIndicatorsAreShownForAnswerOptionsOnQuestionPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Correct indicators are shown for answer options on question page", ((string[])(null)));
#line 61
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line 62
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 63
testRunner.Then("correct is set to true for \'AnswerOption11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 64
testRunner.And("correct is set to false for \'AnswerOption12\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Next and previous actions of question page navigate through questions of current " +
            "objective")]
        public virtual void NextAndPreviousActionsOfQuestionPageNavigateThroughQuestionsOfCurrentObjective()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Next and previous actions of question page navigate through questions of current " +
                    "objective", ((string[])(null)));
#line 66
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line 67
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 68
testRunner.And("click on next question", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 69
testRunner.And("click on next question", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 70
testRunner.And("click on previous question", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 71
testRunner.Then("browser navigates to url \'http://localhost:5656/#/objective/1/question/2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Previous question action is not available for first question")]
        public virtual void PreviousQuestionActionIsNotAvailableForFirstQuestion()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Previous question action is not available for first question", ((string[])(null)));
#line 73
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line 74
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 75
testRunner.Then("previous question action is not available", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Next question action is not available for last question")]
        public virtual void NextQuestionActionIsNotAvailableForLastQuestion()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Next question action is not available for last question", ((string[])(null)));
#line 77
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line 78
testRunner.When("navigate to \'Question13\' of \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 79
testRunner.Then("next question action is not available", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("answer options block and explanations block are expanded by default")]
        public virtual void AnswerOptionsBlockAndExplanationsBlockAreExpandedByDefault()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("answer options block and explanations block are expanded by default", ((string[])(null)));
#line 81
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line 82
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 83
testRunner.Then("answer options block is expanded", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 84
testRunner.And("explanations block is expanded", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Collapse answer options action on question page collapses answer options block")]
        public virtual void CollapseAnswerOptionsActionOnQuestionPageCollapsesAnswerOptionsBlock()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Collapse answer options action on question page collapses answer options block", ((string[])(null)));
#line 86
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line 87
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 88
testRunner.And("click on collapse answer options", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 89
testRunner.Then("answer options block is collapsed", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 90
testRunner.And("explanations block is expanded", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Collapse explanations action on question page collapses explanations block")]
        public virtual void CollapseExplanationsActionOnQuestionPageCollapsesExplanationsBlock()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Collapse explanations action on question page collapses explanations block", ((string[])(null)));
#line 92
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line 93
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 94
testRunner.And("click on collapse explanations", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 95
testRunner.Then("explanations block is collapsed", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 96
testRunner.And("answer options block is expanded", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Expand answer options action on question page expands answer option block")]
        public virtual void ExpandAnswerOptionsActionOnQuestionPageExpandsAnswerOptionBlock()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Expand answer options action on question page expands answer option block", ((string[])(null)));
#line 98
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line 99
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 100
testRunner.And("click on collapse answer options", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 101
testRunner.And("click on collapse explanations", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 102
testRunner.And("click on expand answer options", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 103
testRunner.Then("answer options block is expanded", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 104
testRunner.And("explanations block is collapsed", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Expand explanations action on question page expands explanations block")]
        public virtual void ExpandExplanationsActionOnQuestionPageExpandsExplanationsBlock()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Expand explanations action on question page expands explanations block", ((string[])(null)));
#line 106
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line 107
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 108
testRunner.And("click on collapse answer options", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 109
testRunner.And("click on collapse explanations", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 110
testRunner.And("click on expand explanations options", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 111
testRunner.Then("explanations block is expanded", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 112
testRunner.And("answer options block is collapsed", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Back action of question page navigates to relative objective page")]
        public virtual void BackActionOfQuestionPageNavigatesToRelativeObjectivePage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Back action of question page navigates to relative objective page", ((string[])(null)));
#line 114
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line 115
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 116
testRunner.And("click on back to objective", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 117
testRunner.Then("browser navigates to url \'http://localhost:5656/#/objective/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
    }
}
#pragma warning restore
#endregion
