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
    [NUnit.Framework.DescriptionAttribute("ListOfQuestions")]
    public partial class ListOfQuestionsFeature
    {
        
        private static TechTalk.SpecFlow.ITestRunner testRunner;
        
#line 1 "ListOfQuestions.feature"
#line hidden
        
        [NUnit.Framework.TestFixtureSetUpAttribute()]
        public virtual void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "ListOfQuestions", "As an author I can see list of previously created Questions related to selected L" +
                    "earning Objective, so I can select one for editing.", ProgrammingLanguage.CSharp, ((string[])(null)));
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
#line 4
#line 5
testRunner.When("open page by url \'http://localhost:5656\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
            TechTalk.SpecFlow.Table table1 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table1.AddRow(new string[] {
                        "Objective1",
                        "1"});
#line 6
testRunner.Given("objectives are present in database", ((string)(null)), table1, "Given ");
#line hidden
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("All questions should be present in list")]
        public virtual void AllQuestionsShouldBePresentInList()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("All questions should be present in list", ((string[])(null)));
#line 10
this.ScenarioSetup(scenarioInfo);
#line 4
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table2 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table2.AddRow(new string[] {
                        "Question1"});
            table2.AddRow(new string[] {
                        "Question2"});
            table2.AddRow(new string[] {
                        "Question3"});
#line 11
testRunner.Given("questions related to \'Objective1\' are present in database", ((string)(null)), table2, "Given ");
#line 16
testRunner.When("select objective list item with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
            TechTalk.SpecFlow.Table table3 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table3.AddRow(new string[] {
                        "Question1"});
            table3.AddRow(new string[] {
                        "Question2"});
            table3.AddRow(new string[] {
                        "Question3"});
#line 17
testRunner.Then("questions list contains items with data", ((string)(null)), table3, "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Questions are sorted by title ascending by default")]
        public virtual void QuestionsAreSortedByTitleAscendingByDefault()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Questions are sorted by title ascending by default", ((string[])(null)));
#line 23
this.ScenarioSetup(scenarioInfo);
#line 4
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table4 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table4.AddRow(new string[] {
                        "Question_a"});
            table4.AddRow(new string[] {
                        "a_Question"});
            table4.AddRow(new string[] {
                        "Question_z"});
            table4.AddRow(new string[] {
                        "1_Question"});
            table4.AddRow(new string[] {
                        "_Question"});
#line 24
testRunner.Given("questions related to \'Objective1\' are present in database", ((string)(null)), table4, "Given ");
#line 31
testRunner.When("select objective list item with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
            TechTalk.SpecFlow.Table table5 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table5.AddRow(new string[] {
                        "_Question"});
            table5.AddRow(new string[] {
                        "1_Question"});
            table5.AddRow(new string[] {
                        "a_Question"});
            table5.AddRow(new string[] {
                        "Question_a"});
            table5.AddRow(new string[] {
                        "Question_z"});
#line 32
testRunner.Then("questions list consists of ordered items", ((string)(null)), table5, "Then ");
#line 39
testRunner.And("questions list order switch is set to \'ascending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Questions are sorted by title descending if set descending order")]
        public virtual void QuestionsAreSortedByTitleDescendingIfSetDescendingOrder()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Questions are sorted by title descending if set descending order", ((string[])(null)));
#line 42
this.ScenarioSetup(scenarioInfo);
#line 4
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table6 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table6.AddRow(new string[] {
                        "Question_a"});
            table6.AddRow(new string[] {
                        "a_Question"});
            table6.AddRow(new string[] {
                        "Question_z"});
            table6.AddRow(new string[] {
                        "1_Question"});
            table6.AddRow(new string[] {
                        "_Question"});
#line 43
testRunner.Given("questions related to \'Objective1\' are present in database", ((string)(null)), table6, "Given ");
#line 50
testRunner.When("select objective list item with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 51
testRunner.And("I switch questions list order to \'ascending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 52
testRunner.And("I switch questions list order to \'descending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            TechTalk.SpecFlow.Table table7 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table7.AddRow(new string[] {
                        "Question_z"});
            table7.AddRow(new string[] {
                        "Question_a"});
            table7.AddRow(new string[] {
                        "a_Question"});
            table7.AddRow(new string[] {
                        "1_Question"});
            table7.AddRow(new string[] {
                        "_Question"});
#line 53
testRunner.Then("questions list consists of ordered items", ((string)(null)), table7, "Then ");
#line 60
testRunner.And("questions list order switch is set to \'descending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Questions are sorted by title ascending if set ascending order")]
        public virtual void QuestionsAreSortedByTitleAscendingIfSetAscendingOrder()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Questions are sorted by title ascending if set ascending order", ((string[])(null)));
#line 62
this.ScenarioSetup(scenarioInfo);
#line 4
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table8 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table8.AddRow(new string[] {
                        "Question_a"});
            table8.AddRow(new string[] {
                        "a_Question"});
            table8.AddRow(new string[] {
                        "Question_z"});
            table8.AddRow(new string[] {
                        "1_Question"});
            table8.AddRow(new string[] {
                        "_Question"});
#line 63
testRunner.Given("questions related to \'Objective1\' are present in database", ((string)(null)), table8, "Given ");
#line 70
testRunner.When("select objective list item with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 71
testRunner.And("I switch questions list order to \'descending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 72
testRunner.And("I switch questions list order to \'ascending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            TechTalk.SpecFlow.Table table9 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table9.AddRow(new string[] {
                        "_Question"});
            table9.AddRow(new string[] {
                        "1_Question"});
            table9.AddRow(new string[] {
                        "a_Question"});
            table9.AddRow(new string[] {
                        "Question_a"});
            table9.AddRow(new string[] {
                        "Question_z"});
#line 73
testRunner.Then("questions list consists of ordered items", ((string)(null)), table9, "Then ");
#line 80
testRunner.And("questions list order switch is set to \'ascending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Question should be highlited on mouse hover")]
        public virtual void QuestionShouldBeHighlitedOnMouseHover()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Question should be highlited on mouse hover", ((string[])(null)));
#line 82
this.ScenarioSetup(scenarioInfo);
#line 4
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table10 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table10.AddRow(new string[] {
                        "Question1"});
            table10.AddRow(new string[] {
                        "Question2"});
            table10.AddRow(new string[] {
                        "Question3"});
#line 83
testRunner.Given("questions related to \'Objective1\' are present in database", ((string)(null)), table10, "Given ");
#line 88
testRunner.When("select objective list item with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 89
testRunner.And("mouse hover element of questions list with title \'Question2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 90
testRunner.Then("questions list item with title \'\'Question2\' is highlited", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 91
testRunner.But("questions list item with title \'\'Question1\' is not highlited", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "But ");
#line 92
testRunner.And("questions list item with title \'\'Question3\' is not highlited", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Selected question should be highlited after selecting")]
        public virtual void SelectedQuestionShouldBeHighlitedAfterSelecting()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Selected question should be highlited after selecting", ((string[])(null)));
#line 94
this.ScenarioSetup(scenarioInfo);
#line 4
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table11 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table11.AddRow(new string[] {
                        "Question1"});
            table11.AddRow(new string[] {
                        "Question2"});
            table11.AddRow(new string[] {
                        "Question3"});
#line 95
testRunner.Given("questions related to \'Objective1\' are present in database", ((string)(null)), table11, "Given ");
#line 100
testRunner.When("select objective list item with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 101
testRunner.And("click on questions list item with title \'Question2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 102
testRunner.Then("questions list item with title \'\'Question2\' is highlited", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 103
testRunner.But("questions list item with title \'\'Question1\' is not highlited", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "But ");
#line 104
testRunner.And("questions list item with title \'\'Question3\' is not highlited", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("No questions are selected by default in questions list")]
        public virtual void NoQuestionsAreSelectedByDefaultInQuestionsList()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("No questions are selected by default in questions list", ((string[])(null)));
#line 107
this.ScenarioSetup(scenarioInfo);
#line 4
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table12 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table12.AddRow(new string[] {
                        "Question1"});
            table12.AddRow(new string[] {
                        "Question2"});
            table12.AddRow(new string[] {
                        "Question3"});
#line 108
testRunner.Given("questions related to \'Objective1\' are present in database", ((string)(null)), table12, "Given ");
#line 113
testRunner.When("select objective list item with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 114
testRunner.Then("questions list item with title \'Question2\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 115
testRunner.And("questions list item with title \'Question1\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 116
testRunner.And("questions list item with title \'Question3\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("All elements of questions list can be made visible using scroll")]
        public virtual void AllElementsOfQuestionsListCanBeMadeVisibleUsingScroll()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("All elements of questions list can be made visible using scroll", ((string[])(null)));
#line 118
this.ScenarioSetup(scenarioInfo);
#line 4
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table13 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table13.AddRow(new string[] {
                        "Question1"});
            table13.AddRow(new string[] {
                        "Question2"});
            table13.AddRow(new string[] {
                        "Question3"});
            table13.AddRow(new string[] {
                        "Question4"});
            table13.AddRow(new string[] {
                        "Question5"});
            table13.AddRow(new string[] {
                        "Question6"});
            table13.AddRow(new string[] {
                        "Question7"});
            table13.AddRow(new string[] {
                        "Question8"});
            table13.AddRow(new string[] {
                        "Question9"});
            table13.AddRow(new string[] {
                        "Question10"});
            table13.AddRow(new string[] {
                        "Question11"});
            table13.AddRow(new string[] {
                        "Question12"});
            table13.AddRow(new string[] {
                        "Question13"});
            table13.AddRow(new string[] {
                        "Question14"});
#line 119
testRunner.Given("questions related to \'Objective1\' are present in database", ((string)(null)), table13, "Given ");
#line 135
testRunner.When("select objective list item with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 136
testRunner.And("browser window width and height is set to 400 and 300", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 137
testRunner.And("scroll publications list item with title \'Question14\' into the view", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 138
testRunner.Then("element with title \'Question14\' of questions list is visible", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Actions add content and edit are enabled if hover item of questions list")]
        public virtual void ActionsAddContentAndEditAreEnabledIfHoverItemOfQuestionsList()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Actions add content and edit are enabled if hover item of questions list", ((string[])(null)));
#line 140
this.ScenarioSetup(scenarioInfo);
#line 4
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table14 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table14.AddRow(new string[] {
                        "Question1"});
            table14.AddRow(new string[] {
                        "Question2"});
            table14.AddRow(new string[] {
                        "Question3"});
#line 141
testRunner.Given("questions related to \'Objective1\' are present in database", ((string)(null)), table14, "Given ");
#line 146
testRunner.When("select objective list item with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 147
testRunner.And("mouse hover element of questions list with title \'Question2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 148
testRunner.Then("Action add content is enabled true for questions list item with title \'Question2\'" +
                    "", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 149
testRunner.And("Action edit is enabled true for questions list item with title \'Question2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Actions add content and edit should remain enabled after selecting item of questi" +
            "ons list")]
        public virtual void ActionsAddContentAndEditShouldRemainEnabledAfterSelectingItemOfQuestionsList()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Actions add content and edit should remain enabled after selecting item of questi" +
                    "ons list", ((string[])(null)));
#line 151
this.ScenarioSetup(scenarioInfo);
#line 4
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table15 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table15.AddRow(new string[] {
                        "Question1"});
            table15.AddRow(new string[] {
                        "Question2"});
            table15.AddRow(new string[] {
                        "Question3"});
#line 152
testRunner.Given("questions related to \'Objective1\' are present in database", ((string)(null)), table15, "Given ");
#line 157
testRunner.When("select objective list item with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 158
testRunner.And("click on questions list item with title \'Question2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 159
testRunner.And("mouse hover element of questions list with title \'Question3\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 160
testRunner.Then("Action add content is enabled true for questions list item with title \'Question2\'" +
                    "", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 161
testRunner.And("Action edit is enabled true for questions list item with title \'Question2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 162
testRunner.And("Action add content is enabled true for questions list item with title \'Question3\'" +
                    "", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 163
testRunner.And("Action edit is enabled true for questions list item with title \'Question3\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Edit question action of questions list navigates to question\'s editing page")]
        public virtual void EditQuestionActionOfQuestionsListNavigatesToQuestionSEditingPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Edit question action of questions list navigates to question\'s editing page", ((string[])(null)));
#line 165
this.ScenarioSetup(scenarioInfo);
#line 4
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table16 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table16.AddRow(new string[] {
                        "Question1",
                        "1"});
#line 166
testRunner.Given("questions related to \'Objective1\' are present in database", ((string)(null)), table16, "Given ");
#line 169
testRunner.When("select objective list item with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 170
testRunner.And("mouse hover element of questions list with title \'Question1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 171
testRunner.And("click on edit question with title \'Question1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 172
testRunner.Then("browser navigates to url \'http://localhost:5656/#/objective/1/question/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Back action of questions list navigates to objectives list page")]
        public virtual void BackActionOfQuestionsListNavigatesToObjectivesListPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Back action of questions list navigates to objectives list page", ((string[])(null)));
#line 175
this.ScenarioSetup(scenarioInfo);
#line 4
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table17 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table17.AddRow(new string[] {
                        "Question1"});
#line 176
testRunner.Given("questions related to \'Objective1\' are present in database", ((string)(null)), table17, "Given ");
#line 179
testRunner.When("select objective list item with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 180
testRunner.And("click on back from questions list", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 181
testRunner.Then("browser navigates to url \'http://localhost:5656/#/\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
    }
}
#pragma warning restore
#endregion
