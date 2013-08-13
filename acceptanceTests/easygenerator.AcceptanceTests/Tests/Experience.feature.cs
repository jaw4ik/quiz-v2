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
    [NUnit.Framework.DescriptionAttribute("Experience")]
    [NUnit.Framework.CategoryAttribute("Experience")]
    public partial class ExperienceFeature
    {
        
        private static TechTalk.SpecFlow.ITestRunner testRunner;
        
#line 1 "Experience.feature"
#line hidden
        
        [NUnit.Framework.TestFixtureSetUpAttribute()]
        public virtual void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "Experience", "As an author I can see Title, list of related objectives and assigned Template na" +
                    "me  of open Experience,\r\nso I can check if the current experience is ready for p" +
                    "ublishing.", ProgrammingLanguage.CSharp, new string[] {
                        "Experience"});
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
#line hidden
            TechTalk.SpecFlow.Table table1 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table1.AddRow(new string[] {
                        "Experience1",
                        "1"});
            table1.AddRow(new string[] {
                        "Experience2",
                        "2"});
            table1.AddRow(new string[] {
                        "Experience3",
                        "3"});
#line 7
testRunner.Given("publications are present in database", ((string)(null)), table1, "Given ");
#line hidden
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Experience title is shown in experiance page header")]
        public virtual void ExperienceTitleIsShownInExperiancePageHeader()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Experience title is shown in experiance page header", ((string[])(null)));
#line 13
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 14
testRunner.When("open page by url \'http://localhost:5656/#/experience/2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 15
testRunner.Then("\'Experience2\' title is shown in experiance page header", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("All related objectives should be present in list")]
        public virtual void AllRelatedObjectivesShouldBePresentInList()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("All related objectives should be present in list", ((string[])(null)));
#line 17
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table2 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table2.AddRow(new string[] {
                        "Objective11",
                        "1"});
            table2.AddRow(new string[] {
                        "Objective12",
                        "2"});
            table2.AddRow(new string[] {
                        "Objective21",
                        "3"});
            table2.AddRow(new string[] {
                        "Objective22",
                        "4"});
#line 18
testRunner.Given("objectives are present in database", ((string)(null)), table2, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table3 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table3.AddRow(new string[] {
                        "Objective11",
                        "1"});
            table3.AddRow(new string[] {
                        "Objective12",
                        "2"});
#line 24
testRunner.Given("objectives are linked to experiance \'Experience1\'", ((string)(null)), table3, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table4 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table4.AddRow(new string[] {
                        "Objective21",
                        "3"});
            table4.AddRow(new string[] {
                        "Objective22",
                        "4"});
#line 28
testRunner.Given("objectives are linked to experiance \'Experience2\'", ((string)(null)), table4, "Given ");
#line 32
testRunner.When("open page by url \'http://localhost:5656/#/experience/2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
            TechTalk.SpecFlow.Table table5 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table5.AddRow(new string[] {
                        "Objective21"});
            table5.AddRow(new string[] {
                        "Objective22"});
#line 33
testRunner.Then("related objectives list contains only items with data", ((string)(null)), table5, "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Objectives list item name could contain special symbols")]
        public virtual void ObjectivesListItemNameCouldContainSpecialSymbols()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Objectives list item name could contain special symbols", ((string[])(null)));
#line 38
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table6 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table6.AddRow(new string[] {
                        "~`!@#$%^&*()_+-={[]}:;\"\'|\\<,.>/?№ё",
                        "1"});
#line 39
testRunner.Given("objectives are present in database", ((string)(null)), table6, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table7 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table7.AddRow(new string[] {
                        "~`!@#$%^&*()_+-={[]}:;\"\'|\\<,.>/?№ё",
                        "1"});
#line 42
testRunner.Given("objectives are linked to experiance \'Experience1\'", ((string)(null)), table7, "Given ");
#line 45
testRunner.When("open page by url \'http://localhost:5656/#/experience/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
            TechTalk.SpecFlow.Table table8 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table8.AddRow(new string[] {
                        "~`!@#$%^&*()_+-={[]}:;\"\'|\\<,.>/?№ё"});
#line 46
testRunner.Then("related objectives list contains only items with data", ((string)(null)), table8, "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Actions open and select are enabled if hover item of objectives list")]
        [NUnit.Framework.CategoryAttribute("NotFirefox")]
        public virtual void ActionsOpenAndSelectAreEnabledIfHoverItemOfObjectivesList()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Actions open and select are enabled if hover item of objectives list", new string[] {
                        "NotFirefox"});
#line 51
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table9 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table9.AddRow(new string[] {
                        "Objective11",
                        "1"});
            table9.AddRow(new string[] {
                        "Objective12",
                        "2"});
#line 52
testRunner.Given("objectives are present in database", ((string)(null)), table9, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table10 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table10.AddRow(new string[] {
                        "Objective11",
                        "1"});
            table10.AddRow(new string[] {
                        "Objective12",
                        "2"});
#line 56
testRunner.Given("objectives are linked to experiance \'Experience1\'", ((string)(null)), table10, "Given ");
#line 60
testRunner.When("open page by url \'http://localhost:5656/#/experience/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 61
testRunner.And("mouse hover element of related objectives list with title \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 62
testRunner.Then("Action open is enabled true for related objectives list item with title \'Objectiv" +
                    "e11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 63
testRunner.And("Action select is enabled true for related objectives list item with title \'Object" +
                    "ive11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("No objectives are selected by default in related objectives list")]
        public virtual void NoObjectivesAreSelectedByDefaultInRelatedObjectivesList()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("No objectives are selected by default in related objectives list", ((string[])(null)));
#line 65
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table11 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table11.AddRow(new string[] {
                        "Objective11",
                        "1"});
            table11.AddRow(new string[] {
                        "Objective12",
                        "2"});
            table11.AddRow(new string[] {
                        "Objective13",
                        "3"});
#line 66
testRunner.Given("objectives are present in database", ((string)(null)), table11, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table12 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table12.AddRow(new string[] {
                        "Objective11",
                        "1"});
            table12.AddRow(new string[] {
                        "Objective12",
                        "2"});
            table12.AddRow(new string[] {
                        "Objective13",
                        "3"});
#line 71
testRunner.Given("objectives are linked to experiance \'Experience1\'", ((string)(null)), table12, "Given ");
#line 76
testRunner.When("open page by url \'http://localhost:5656/#/experience/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 77
testRunner.Then("related objectives list item with title \'Objective12\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 78
testRunner.And("related objectives list item with title \'Objective11\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 79
testRunner.And("related objectives list item with title \'Objective13\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Selected objective should be highlited after selecting")]
        public virtual void SelectedObjectiveShouldBeHighlitedAfterSelecting()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Selected objective should be highlited after selecting", ((string[])(null)));
#line 81
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table13 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table13.AddRow(new string[] {
                        "Objective11",
                        "1"});
            table13.AddRow(new string[] {
                        "Objective12",
                        "2"});
            table13.AddRow(new string[] {
                        "Objective13",
                        "3"});
#line 82
testRunner.Given("objectives are present in database", ((string)(null)), table13, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table14 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table14.AddRow(new string[] {
                        "Objective11",
                        "1"});
            table14.AddRow(new string[] {
                        "Objective12",
                        "2"});
            table14.AddRow(new string[] {
                        "Objective13",
                        "3"});
#line 87
testRunner.Given("objectives are linked to experiance \'Experience1\'", ((string)(null)), table14, "Given ");
#line 92
testRunner.When("open page by url \'http://localhost:5656/#/experience/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 93
testRunner.And("mouse hover element of related objectives list with title \'Objective12\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 94
testRunner.And("select related objective list item with title \'Objective12\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 95
testRunner.Then("related objectives list item with title \'Objective12\' is selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 96
testRunner.But("related objectives list item with title \'Objective11\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "But ");
#line 97
testRunner.And("related objectives list item with title \'Objective13\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Objective could be deselected")]
        public virtual void ObjectiveCouldBeDeselected()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Objective could be deselected", ((string[])(null)));
#line 99
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table15 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table15.AddRow(new string[] {
                        "Objective11",
                        "1"});
            table15.AddRow(new string[] {
                        "Objective12",
                        "2"});
            table15.AddRow(new string[] {
                        "Objective13",
                        "3"});
#line 100
testRunner.Given("objectives are present in database", ((string)(null)), table15, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table16 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table16.AddRow(new string[] {
                        "Objective11",
                        "1"});
            table16.AddRow(new string[] {
                        "Objective12",
                        "2"});
            table16.AddRow(new string[] {
                        "Objective13",
                        "3"});
#line 105
testRunner.Given("objectives are linked to experiance \'Experience1\'", ((string)(null)), table16, "Given ");
#line 110
testRunner.When("open page by url \'http://localhost:5656/#/experience/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 111
testRunner.When("mouse hover element of related objectives list with title \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 112
testRunner.And("select related objective list item with title \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 113
testRunner.And("mouse hover element of related objectives list with title \'Objective12\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 114
testRunner.And("select related objective list item with title \'Objective12\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 115
testRunner.And("mouse hover element of related objectives list with title \'Objective13\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 116
testRunner.And("select related objective list item with title \'Objective13\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 117
testRunner.And("mouse hover element of related objectives list with title \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 118
testRunner.And("select related objective list item with title \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 119
testRunner.And("mouse hover element of related objectives list with title \'Objective12\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 120
testRunner.And("select related objective list item with title \'Objective12\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 121
testRunner.Then("related objectives list item with title \'Objective11\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 122
testRunner.And("related objectives list item with title \'Objective12\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 123
testRunner.And("related objectives list item with title \'Objective13\' is selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Question count is shown for each related objective list item")]
        public virtual void QuestionCountIsShownForEachRelatedObjectiveListItem()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Question count is shown for each related objective list item", ((string[])(null)));
#line 128
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table17 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table17.AddRow(new string[] {
                        "Objective11",
                        "1"});
            table17.AddRow(new string[] {
                        "Objective12",
                        "2"});
#line 129
testRunner.Given("objectives are present in database", ((string)(null)), table17, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table18 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table18.AddRow(new string[] {
                        "Objective11",
                        "1"});
            table18.AddRow(new string[] {
                        "Objective12",
                        "2"});
#line 133
testRunner.Given("objectives are linked to experiance \'Experience1\'", ((string)(null)), table18, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table19 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table19.AddRow(new string[] {
                        "Question11",
                        "1"});
            table19.AddRow(new string[] {
                        "Question12",
                        "2"});
#line 137
testRunner.Given("questions related to \'Objective11\' are present in database", ((string)(null)), table19, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table20 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table20.AddRow(new string[] {
                        "Question21",
                        "1"});
#line 141
testRunner.Given("questions related to \'Objective12\' are present in database", ((string)(null)), table20, "Given ");
#line 144
testRunner.When("open page by url \'http://localhost:5656/#/experience/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 145
testRunner.Then("question count for related objective item with title \'Objective11\' is \'2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 146
testRunner.And("question count for related objective item with title \'Objective12\' is \'1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Back action of experience page navigates to experiences page")]
        public virtual void BackActionOfExperiencePageNavigatesToExperiencesPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Back action of experience page navigates to experiences page", ((string[])(null)));
#line 148
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 149
testRunner.When("open page by url \'http://localhost:5656/#/experience/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 150
testRunner.And("click on back to experiences", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 151
testRunner.Then("browser navigates to url \'http://localhost:5656/#/experiences\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Next and previous actions of experience page navigate through experiences")]
        public virtual void NextAndPreviousActionsOfExperiencePageNavigateThroughExperiences()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Next and previous actions of experience page navigate through experiences", ((string[])(null)));
#line 153
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 154
testRunner.When("open page by url \'http://localhost:5656/#/experience/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 155
testRunner.And("click on next experience", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 156
testRunner.Then("browser navigates to url \'http://localhost:5656/#/experience/2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 157
testRunner.When("click on next experience", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 158
testRunner.Then("browser navigates to url \'http://localhost:5656/#/experience/3\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 159
testRunner.When("click on previous experience", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 160
testRunner.Then("browser navigates to url \'http://localhost:5656/#/experience/2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Previous experience action is not available for first experience")]
        public virtual void PreviousExperienceActionIsNotAvailableForFirstExperience()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Previous experience action is not available for first experience", ((string[])(null)));
#line 162
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 163
testRunner.When("open page by url \'http://localhost:5656/#/experience/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 164
testRunner.Then("previous experience action is not available", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Next experience action is not available for last experience")]
        public virtual void NextExperienceActionIsNotAvailableForLastExperience()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Next experience action is not available for last experience", ((string[])(null)));
#line 166
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 167
testRunner.When("open page by url \'http://localhost:5656/#/experience/3\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 168
testRunner.Then("next experience action is not available", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
    }
}
#pragma warning restore
#endregion
