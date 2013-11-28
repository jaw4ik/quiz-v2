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
    [NUnit.Framework.DescriptionAttribute("PackageQuestionPage")]
    [NUnit.Framework.CategoryAttribute("PackageListOfObjectives")]
    public partial class PackageQuestionPageFeature
    {
        
        private static TechTalk.SpecFlow.ITestRunner testRunner;
        
#line 1 "PackageQuestionPage.feature"
#line hidden
        
        [NUnit.Framework.TestFixtureSetUpAttribute()]
        public virtual void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "PackageQuestionPage", "As a learner I can unzip downloaded package and open “index” file that is contain" +
                    "ed by this package,\r\nso I\'m able to see the tree of objectives and related to th" +
                    "em questions.", ProgrammingLanguage.CSharp, new string[] {
                        "PackageListOfObjectives"});
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
#line 6
#line 7
testRunner.Given("clear data context", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line hidden
            TechTalk.SpecFlow.Table table1 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table1.AddRow(new string[] {
                        "Experience1",
                        "00000000000000000000000000000001"});
            table1.AddRow(new string[] {
                        "Experience2",
                        "00000000000000000000000000000002"});
#line 8
testRunner.Given("publications are present in database", ((string)(null)), table1, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table2 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table2.AddRow(new string[] {
                        "Objective11",
                        "00000000000000000000000000000001"});
            table2.AddRow(new string[] {
                        "Objective12",
                        "00000000000000000000000000000002"});
            table2.AddRow(new string[] {
                        "Objective21",
                        "00000000000000000000000000000003"});
            table2.AddRow(new string[] {
                        "Objective22",
                        "00000000000000000000000000000004"});
#line 12
testRunner.Given("objectives are present in database", ((string)(null)), table2, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table3 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table3.AddRow(new string[] {
                        "Objective11",
                        "00000000000000000000000000000001"});
            table3.AddRow(new string[] {
                        "Objective12",
                        "00000000000000000000000000000002"});
#line 18
testRunner.Given("objectives are linked to experiance \'Experience1\'", ((string)(null)), table3, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table4 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table4.AddRow(new string[] {
                        "Objective21",
                        "00000000000000000000000000000003"});
            table4.AddRow(new string[] {
                        "Objective22",
                        "00000000000000000000000000000004"});
#line 22
testRunner.Given("objectives are linked to experiance \'Experience2\'", ((string)(null)), table4, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table5 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table5.AddRow(new string[] {
                        "Question11",
                        "00000000000000000000000000000001"});
            table5.AddRow(new string[] {
                        "Question12",
                        "00000000000000000000000000000002"});
#line 27
testRunner.Given("questions related to \'Objective11\' are present in database", ((string)(null)), table5, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table6 = new TechTalk.SpecFlow.Table(new string[] {
                        "Text",
                        "isCorrect"});
            table6.AddRow(new string[] {
                        "AnswerOption11",
                        "true"});
            table6.AddRow(new string[] {
                        "AnswerOption12",
                        "false"});
#line 31
testRunner.Given("answer options related to \'Question11\' of \'Objective11\' are present in database", ((string)(null)), table6, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table7 = new TechTalk.SpecFlow.Table(new string[] {
                        "Text",
                        "isCorrect"});
            table7.AddRow(new string[] {
                        "AnswerOption21",
                        "true"});
            table7.AddRow(new string[] {
                        "AnswerOption22",
                        "false"});
#line 35
testRunner.Given("answer options related to \'Question12\' of \'Objective11\' are present in database", ((string)(null)), table7, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table8 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table8.AddRow(new string[] {
                        "Explanation11"});
            table8.AddRow(new string[] {
                        "Explanation12"});
#line 39
testRunner.Given("explanations related to \'Question11\' of \'Objective11\' are present in database", ((string)(null)), table8, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table9 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table9.AddRow(new string[] {
                        "Explanation21"});
            table9.AddRow(new string[] {
                        "Explanation22"});
#line 43
testRunner.Given("explanations related to \'Question12\' of \'Objective11\' are present in database", ((string)(null)), table9, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table10 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table10.AddRow(new string[] {
                        "Question21",
                        "00000000000000000000000000000003"});
            table10.AddRow(new string[] {
                        "Question22",
                        "00000000000000000000000000000004"});
#line 48
testRunner.Given("questions related to \'Objective12\' are present in database", ((string)(null)), table10, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table11 = new TechTalk.SpecFlow.Table(new string[] {
                        "Text",
                        "isCorrect"});
            table11.AddRow(new string[] {
                        "AnswerOption211",
                        "true"});
            table11.AddRow(new string[] {
                        "AnswerOption212",
                        "false"});
#line 52
testRunner.Given("answer options related to \'Question21\' of \'Objective12\' are present in database", ((string)(null)), table11, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table12 = new TechTalk.SpecFlow.Table(new string[] {
                        "Text",
                        "isCorrect"});
            table12.AddRow(new string[] {
                        "AnswerOption221",
                        "true"});
            table12.AddRow(new string[] {
                        "AnswerOption222",
                        "false"});
#line 56
testRunner.Given("answer options related to \'Question22\' of \'Objective12\' are present in database", ((string)(null)), table12, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table13 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table13.AddRow(new string[] {
                        "Explanation211"});
            table13.AddRow(new string[] {
                        "Explanation212"});
#line 60
testRunner.Given("explanations related to \'Question21\' of \'Objective12\' are present in database", ((string)(null)), table13, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table14 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table14.AddRow(new string[] {
                        "Explanation221"});
            table14.AddRow(new string[] {
                        "Explanation222"});
#line 64
testRunner.Given("explanations related to \'Question22\' of \'Objective12\' are present in database", ((string)(null)), table14, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table15 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table15.AddRow(new string[] {
                        "Question11e2",
                        "00000000000000000000000000000005"});
            table15.AddRow(new string[] {
                        "Question12e2",
                        "00000000000000000000000000000006"});
#line 70
testRunner.Given("questions related to \'Objective21\' are present in database", ((string)(null)), table15, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table16 = new TechTalk.SpecFlow.Table(new string[] {
                        "Text",
                        "isCorrect"});
            table16.AddRow(new string[] {
                        "AnswerOption11e2",
                        "true"});
            table16.AddRow(new string[] {
                        "AnswerOption12e2",
                        "false"});
#line 74
testRunner.Given("answer options related to \'Question11e2\' of \'Objective21\' are present in database" +
                    "", ((string)(null)), table16, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table17 = new TechTalk.SpecFlow.Table(new string[] {
                        "Text",
                        "isCorrect"});
            table17.AddRow(new string[] {
                        "AnswerOption21e2",
                        "true"});
            table17.AddRow(new string[] {
                        "AnswerOption22e2",
                        "false"});
#line 78
testRunner.Given("answer options related to \'Question12e2\' of \'Objective21\' are present in database" +
                    "", ((string)(null)), table17, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table18 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table18.AddRow(new string[] {
                        "Explanation11e2"});
            table18.AddRow(new string[] {
                        "Explanation12e2"});
#line 82
testRunner.Given("explanations related to \'Question11e2\' of \'Objective21\' are present in database", ((string)(null)), table18, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table19 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table19.AddRow(new string[] {
                        "Explanation21e2"});
            table19.AddRow(new string[] {
                        "Explanation22e2"});
#line 86
testRunner.Given("explanations related to \'Question12e2\' of \'Objective21\' are present in database", ((string)(null)), table19, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table20 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table20.AddRow(new string[] {
                        "Question21e2",
                        "00000000000000000000000000000007"});
            table20.AddRow(new string[] {
                        "Question22e2",
                        "00000000000000000000000000000008"});
#line 91
testRunner.Given("questions related to \'Objective22\' are present in database", ((string)(null)), table20, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table21 = new TechTalk.SpecFlow.Table(new string[] {
                        "Text",
                        "isCorrect"});
            table21.AddRow(new string[] {
                        "AnswerOption211e2",
                        "true"});
            table21.AddRow(new string[] {
                        "AnswerOption212e2",
                        "false"});
#line 95
testRunner.Given("answer options related to \'Question21e2\' of \'Objective22\' are present in database" +
                    "", ((string)(null)), table21, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table22 = new TechTalk.SpecFlow.Table(new string[] {
                        "Text",
                        "isCorrect"});
            table22.AddRow(new string[] {
                        "AnswerOption221e2",
                        "true"});
            table22.AddRow(new string[] {
                        "AnswerOption222e2",
                        "false"});
#line 99
testRunner.Given("answer options related to \'Question22e2\' of \'Objective22\' are present in database" +
                    "", ((string)(null)), table22, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table23 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table23.AddRow(new string[] {
                        "Explanation211e2"});
            table23.AddRow(new string[] {
                        "Explanation212e2"});
#line 103
testRunner.Given("explanations related to \'Question21e2\' of \'Objective22\' are present in database", ((string)(null)), table23, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table24 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table24.AddRow(new string[] {
                        "Explanation221e2"});
            table24.AddRow(new string[] {
                        "Explanation222e2"});
#line 107
testRunner.Given("explanations related to \'Question22e2\' of \'Objective22\' are present in database", ((string)(null)), table24, "Given ");
#line 111
testRunner.When("open page by url \'http://localhost:5656/signout\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 112
testRunner.And("open page by url \'http://localhost:5656/signin\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 113
testRunner.And("sign in as \'test\' user on sign in page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 114
testRunner.Then("browser navigates to url \'http://localhost:5656/\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 116
testRunner.When("open page by url \'http://localhost:5656/#/experiences\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 117
testRunner.And("mouse hover element of publications list with title \'Experience1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 118
testRunner.And("click build publication list item with title \'Experience1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 119
testRunner.And("sleep 1000 milliseconds", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 120
testRunner.And("refresh page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 121
testRunner.And("mouse hover element of publications list with title \'Experience1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 122
testRunner.And("click download publication list item with title \'Experience1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 123
testRunner.And("unzip \'00000000000000000000000000000001\' package to \'tmp\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 124
testRunner.And("open page by url \'http://localhost:5656/Templates/tmp\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Correct package question title is shown on package question page")]
        public virtual void CorrectPackageQuestionTitleIsShownOnPackageQuestionPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Correct package question title is shown on package question page", ((string[])(null)));
#line 129
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 130
testRunner.When("toggle expand package objective item with title \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 131
testRunner.And("click package question list item \'Question11\' of \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 132
testRunner.Then("package question title \'Question11\' is shown on package question page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("All package answer options are present on page")]
        public virtual void AllPackageAnswerOptionsArePresentOnPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("All package answer options are present on page", ((string[])(null)));
#line 135
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 136
testRunner.When("toggle expand package objective item with title \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 137
testRunner.And("click package question list item \'Question11\' of \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            TechTalk.SpecFlow.Table table25 = new TechTalk.SpecFlow.Table(new string[] {
                        "Text"});
            table25.AddRow(new string[] {
                        "AnswerOption11"});
            table25.AddRow(new string[] {
                        "AnswerOption12"});
#line 138
testRunner.Then("package answer options list contains only items with data", ((string)(null)), table25, "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Submit button on package question page navigates to feedback page")]
        public virtual void SubmitButtonOnPackageQuestionPageNavigatesToFeedbackPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Submit button on package question page navigates to feedback page", ((string[])(null)));
#line 143
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 144
testRunner.When("toggle expand package objective item with title \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 145
testRunner.And("click package question list item \'Question11\' of \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 146
testRunner.And("click on submit button on package question page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 147
testRunner.Then("browser navigates to url \'http://localhost:5656/Templates/tmp/#objective/00000000" +
                    "000000000000000000000001/question/00000000000000000000000000000001/feedback\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Show explanations link on package question page navigates to related explanations" +
            " page")]
        public virtual void ShowExplanationsLinkOnPackageQuestionPageNavigatesToRelatedExplanationsPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Show explanations link on package question page navigates to related explanations" +
                    " page", ((string[])(null)));
#line 149
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 150
testRunner.When("toggle expand package objective item with title \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 151
testRunner.And("click package question list item \'Question11\' of \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 152
testRunner.And("click on show explanations link on package question page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 153
testRunner.Then("browser navigates to url \'http://localhost:5656/Templates/tmp/#objective/00000000" +
                    "000000000000000000000001/question/00000000000000000000000000000001/learningConte" +
                    "nts\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Back action on package question page navigates back to package objectives list pa" +
            "ge")]
        public virtual void BackActionOnPackageQuestionPageNavigatesBackToPackageObjectivesListPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Back action on package question page navigates back to package objectives list pa" +
                    "ge", ((string[])(null)));
#line 155
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 156
testRunner.When("toggle expand package objective item with title \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 157
testRunner.And("click package question list item \'Question11\' of \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 158
testRunner.And("click on back to objectives link on package question page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 159
testRunner.Then("browser navigates to url \'http://localhost:5656/Templates/tmp/#\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Progress summary link on package question page navigates to summary page")]
        public virtual void ProgressSummaryLinkOnPackageQuestionPageNavigatesToSummaryPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Progress summary link on package question page navigates to summary page", ((string[])(null)));
#line 161
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 162
testRunner.When("toggle expand package objective item with title \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 163
testRunner.And("click package question list item \'Question11\' of \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 164
testRunner.And("click on progress summary link on package question page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 165
testRunner.Then("browser navigates to url \'http://localhost:5656/Templates/tmp/#summary\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Home link on package question page navigates to package home page")]
        public virtual void HomeLinkOnPackageQuestionPageNavigatesToPackageHomePage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Home link on package question page navigates to package home page", ((string[])(null)));
#line 167
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 168
testRunner.When("toggle expand package objective item with title \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 169
testRunner.And("click package question list item \'Question11\' of \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 170
testRunner.And("click home link on package question page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 171
testRunner.Then("browser navigates to url \'http://localhost:5656/Templates/tmp/#\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Package answer option checkbox status can be toggled")]
        public virtual void PackageAnswerOptionCheckboxStatusCanBeToggled()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Package answer option checkbox status can be toggled", ((string[])(null)));
#line 173
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 174
testRunner.When("toggle expand package objective item with title \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 175
testRunner.And("click package question list item \'Question11\' of \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 176
testRunner.And("toggle package answer option \'AnswerOption11\' checkbox", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 177
testRunner.And("toggle package answer option \'AnswerOption12\' checkbox", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 178
testRunner.And("toggle package answer option \'AnswerOption11\' checkbox", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 179
testRunner.Then("package answer option \'AnswerOption11\' is checked false", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 180
testRunner.And("package answer option \'AnswerOption12\' is checked true", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
    }
}
#pragma warning restore
#endregion
