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
    [NUnit.Framework.DescriptionAttribute("ListOfObjectives")]
    [NUnit.Framework.CategoryAttribute("ObjectivesList")]
    public partial class ListOfObjectivesFeature
    {
        
        private static TechTalk.SpecFlow.ITestRunner testRunner;
        
#line 1 "ListOfObjectives.feature"
#line hidden
        
        [NUnit.Framework.TestFixtureSetUpAttribute()]
        public virtual void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "ListOfObjectives", "As an author I want to see list of previously created Learning Objectives, so I c" +
                    "ould select certain Learning Objective to start working with related content.", ProgrammingLanguage.CSharp, new string[] {
                        "ObjectivesList"});
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
#line 6
testRunner.When("open page by url \'http://localhost:5656\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("All objectives should be present in list")]
        public virtual void AllObjectivesShouldBePresentInList()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("All objectives should be present in list", ((string[])(null)));
#line 8
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table1 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table1.AddRow(new string[] {
                        "Objective1"});
            table1.AddRow(new string[] {
                        "Objective2"});
            table1.AddRow(new string[] {
                        "Objective3"});
#line 9
testRunner.Given("objectives are present in database", ((string)(null)), table1, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table2 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table2.AddRow(new string[] {
                        "Objective1"});
            table2.AddRow(new string[] {
                        "Objective2"});
            table2.AddRow(new string[] {
                        "Objective3"});
#line 14
testRunner.Then("objectives tiles list contains items with data", ((string)(null)), table2, "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Objectives are sorted by title ascending by default")]
        public virtual void ObjectivesAreSortedByTitleAscendingByDefault()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Objectives are sorted by title ascending by default", ((string[])(null)));
#line 21
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table3 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table3.AddRow(new string[] {
                        "Objective_a"});
            table3.AddRow(new string[] {
                        "a_Objective"});
            table3.AddRow(new string[] {
                        "Objective_z"});
            table3.AddRow(new string[] {
                        "1_Objective"});
            table3.AddRow(new string[] {
                        "_Objective"});
#line 22
testRunner.Given("objectives are present in database", ((string)(null)), table3, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table4 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table4.AddRow(new string[] {
                        "_Objective"});
            table4.AddRow(new string[] {
                        "1_Objective"});
            table4.AddRow(new string[] {
                        "a_Objective"});
            table4.AddRow(new string[] {
                        "Objective_a"});
            table4.AddRow(new string[] {
                        "Objective_z"});
#line 29
testRunner.Then("objectives tiles list consists of ordered items", ((string)(null)), table4, "Then ");
#line 36
testRunner.And("objectives list order switch is set to \'ascending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Objectives are sorted by title descending if set descending order")]
        public virtual void ObjectivesAreSortedByTitleDescendingIfSetDescendingOrder()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Objectives are sorted by title descending if set descending order", ((string[])(null)));
#line 38
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table5 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table5.AddRow(new string[] {
                        "Objective_a"});
            table5.AddRow(new string[] {
                        "a_Objective"});
            table5.AddRow(new string[] {
                        "Objective_z"});
            table5.AddRow(new string[] {
                        "1_Objective"});
            table5.AddRow(new string[] {
                        "_Objective"});
#line 39
testRunner.Given("objectives are present in database", ((string)(null)), table5, "Given ");
#line 46
testRunner.When("I switch objectives list order to \'ascending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 47
testRunner.And("I switch objectives list order to \'descending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            TechTalk.SpecFlow.Table table6 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table6.AddRow(new string[] {
                        "Objective_z"});
            table6.AddRow(new string[] {
                        "Objective_a"});
            table6.AddRow(new string[] {
                        "a_Objective"});
            table6.AddRow(new string[] {
                        "1_Objective"});
            table6.AddRow(new string[] {
                        "_Objective"});
#line 48
testRunner.Then("objectives tiles list consists of ordered items", ((string)(null)), table6, "Then ");
#line 55
testRunner.And("objectives list order switch is set to \'descending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Objectives are sorted by title ascending if set ascending order")]
        public virtual void ObjectivesAreSortedByTitleAscendingIfSetAscendingOrder()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Objectives are sorted by title ascending if set ascending order", ((string[])(null)));
#line 57
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table7 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table7.AddRow(new string[] {
                        "Objective_a"});
            table7.AddRow(new string[] {
                        "a_Objective"});
            table7.AddRow(new string[] {
                        "Objective_z"});
            table7.AddRow(new string[] {
                        "1_Objective"});
            table7.AddRow(new string[] {
                        "_Objective"});
#line 58
testRunner.Given("objectives are present in database", ((string)(null)), table7, "Given ");
#line 65
testRunner.When("I switch objectives list order to \'descending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 66
testRunner.And("I switch objectives list order to \'ascending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            TechTalk.SpecFlow.Table table8 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table8.AddRow(new string[] {
                        "_Objective"});
            table8.AddRow(new string[] {
                        "1_Objective"});
            table8.AddRow(new string[] {
                        "a_Objective"});
            table8.AddRow(new string[] {
                        "Objective_a"});
            table8.AddRow(new string[] {
                        "Objective_z"});
#line 67
testRunner.Then("objectives tiles list consists of ordered items", ((string)(null)), table8, "Then ");
#line 74
testRunner.And("objectives list order switch is set to \'ascending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Selected objective should be highlited after selecting")]
        public virtual void SelectedObjectiveShouldBeHighlitedAfterSelecting()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Selected objective should be highlited after selecting", ((string[])(null)));
#line 76
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table9 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table9.AddRow(new string[] {
                        "Objective1"});
            table9.AddRow(new string[] {
                        "Objective2"});
            table9.AddRow(new string[] {
                        "Objective3"});
#line 77
testRunner.Given("objectives are present in database", ((string)(null)), table9, "Given ");
#line 82
testRunner.When("click on objective list item with title \'Objective2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 83
testRunner.Then("objective list item with title \'Objective2\' is selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 84
testRunner.But("objective list item with title \'Objective1\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "But ");
#line 85
testRunner.And("objective list item with title \'Objective3\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Selected objective changed if click other objective")]
        public virtual void SelectedObjectiveChangedIfClickOtherObjective()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Selected objective changed if click other objective", ((string[])(null)));
#line 87
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table10 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table10.AddRow(new string[] {
                        "Objective1"});
            table10.AddRow(new string[] {
                        "Objective2"});
            table10.AddRow(new string[] {
                        "Objective3"});
#line 88
testRunner.Given("objectives are present in database", ((string)(null)), table10, "Given ");
#line 93
testRunner.When("click on objective list item with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 94
testRunner.And("click on objective list item with title \'Objective2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 95
testRunner.Then("objective list item with title \'Objective2\' is selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 96
testRunner.But("objective list item with title \'Objective1\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "But ");
#line 97
testRunner.And("objective list item with title \'Objective3\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("No objectives are selected by default in objectives list")]
        public virtual void NoObjectivesAreSelectedByDefaultInObjectivesList()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("No objectives are selected by default in objectives list", ((string[])(null)));
#line 100
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table11 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table11.AddRow(new string[] {
                        "Objective1"});
            table11.AddRow(new string[] {
                        "Objective2"});
            table11.AddRow(new string[] {
                        "Objective3"});
#line 101
testRunner.Given("objectives are present in database", ((string)(null)), table11, "Given ");
#line 106
testRunner.Then("objective list item with title \'Objective2\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 107
testRunner.And("objective list item with title \'Objective1\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 108
testRunner.And("objective list item with title \'Objective3\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Objectives list columns count should depend on screen width")]
        [NUnit.Framework.TestCaseAttribute("400", "1", null)]
        [NUnit.Framework.TestCaseAttribute("800", "2", null)]
        [NUnit.Framework.TestCaseAttribute("1024", "3", null)]
        [NUnit.Framework.TestCaseAttribute("1920", "6", null)]
        public virtual void ObjectivesListColumnsCountShouldDependOnScreenWidth(string windowWidth, string columnsCount, string[] exampleTags)
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Objectives list columns count should depend on screen width", exampleTags);
#line 111
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table12 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table12.AddRow(new string[] {
                        "Objective1"});
            table12.AddRow(new string[] {
                        "Objective2"});
            table12.AddRow(new string[] {
                        "Objective3"});
            table12.AddRow(new string[] {
                        "Objective4"});
            table12.AddRow(new string[] {
                        "Objective5"});
#line 112
testRunner.Given("objectives are present in database", ((string)(null)), table12, "Given ");
#line 119
testRunner.When(string.Format("browser window width and height is set to {0} and 600", windowWidth), ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 120
testRunner.Then(string.Format("objectives list is displayed in {0} columns", columnsCount), ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("All elements of objectives list can be made visible using scroll")]
        public virtual void AllElementsOfObjectivesListCanBeMadeVisibleUsingScroll()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("All elements of objectives list can be made visible using scroll", ((string[])(null)));
#line 129
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table13 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table13.AddRow(new string[] {
                        "Objective1"});
            table13.AddRow(new string[] {
                        "Objective2"});
            table13.AddRow(new string[] {
                        "Objective3"});
            table13.AddRow(new string[] {
                        "Objective4"});
            table13.AddRow(new string[] {
                        "Objective5"});
#line 130
testRunner.Given("objectives are present in database", ((string)(null)), table13, "Given ");
#line 137
testRunner.When("browser window width and height is set to 400 and 300", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 138
testRunner.And("scroll browser window to the bottom", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 139
testRunner.Then("last element of objectives list is visible", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Actions open and select are enabled if hover item of objectives list")]
        public virtual void ActionsOpenAndSelectAreEnabledIfHoverItemOfObjectivesList()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Actions open and select are enabled if hover item of objectives list", ((string[])(null)));
#line 142
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table14 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table14.AddRow(new string[] {
                        "Objective1"});
            table14.AddRow(new string[] {
                        "Objective2"});
            table14.AddRow(new string[] {
                        "Objective3"});
#line 143
testRunner.Given("objectives are present in database", ((string)(null)), table14, "Given ");
#line 148
testRunner.When("mouse hover element of objectives list with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 149
testRunner.Then("Action open is enabled true for objectives list item with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Open action of objectives list item navigates to objective\'s editing page")]
        public virtual void OpenActionOfObjectivesListItemNavigatesToObjectiveSEditingPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Open action of objectives list item navigates to objective\'s editing page", ((string[])(null)));
#line 152
this.ScenarioSetup(scenarioInfo);
#line 5
this.FeatureBackground();
#line hidden
            TechTalk.SpecFlow.Table table15 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table15.AddRow(new string[] {
                        "Objective1",
                        "1"});
#line 153
testRunner.Given("objectives are present in database", ((string)(null)), table15, "Given ");
#line 156
testRunner.When("mouse hover element of objectives list with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 157
testRunner.And("click on objective list item with title \'Objective1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 158
testRunner.Then("browser navigates to url \"http://localhost:5656/#/objective/1\"", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
    }
}
#pragma warning restore
#endregion
