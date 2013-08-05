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
    [NUnit.Framework.DescriptionAttribute("ListOfPublications")]
    [NUnit.Framework.CategoryAttribute("ExperiencesList")]
    public partial class ListOfPublicationsFeature
    {
        
        private static TechTalk.SpecFlow.ITestRunner testRunner;
        
#line 1 "ListOfPublications.feature"
#line hidden
        
        [NUnit.Framework.TestFixtureSetUpAttribute()]
        public virtual void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "ListOfPublications", "As an author I want to see list of previously created Publications,\r\nso I could c" +
                    "orrect needed settings and perform publication once more without defining all th" +
                    "e settings each time.", ProgrammingLanguage.CSharp, new string[] {
                        "ExperiencesList"});
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
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("All publications should be present in list")]
        public virtual void AllPublicationsShouldBePresentInList()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("All publications should be present in list", ((string[])(null)));
#line 7
this.ScenarioSetup(scenarioInfo);
#line hidden
            TechTalk.SpecFlow.Table table1 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table1.AddRow(new string[] {
                        "Publication1"});
            table1.AddRow(new string[] {
                        "Publication2"});
            table1.AddRow(new string[] {
                        "Publication3"});
#line 8
testRunner.Given("publications are present in database", ((string)(null)), table1, "Given ");
#line 13
testRunner.When("open page by url \'http://localhost:5656/#/experiences\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
            TechTalk.SpecFlow.Table table2 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table2.AddRow(new string[] {
                        "Publication1"});
            table2.AddRow(new string[] {
                        "Publication2"});
            table2.AddRow(new string[] {
                        "Publication3"});
#line 14
testRunner.Then("publications tiles list contains items with data", ((string)(null)), table2, "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Publications list item name could contain special symbols")]
        public virtual void PublicationsListItemNameCouldContainSpecialSymbols()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Publications list item name could contain special symbols", ((string[])(null)));
#line 21
this.ScenarioSetup(scenarioInfo);
#line hidden
            TechTalk.SpecFlow.Table table3 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table3.AddRow(new string[] {
                        "~`!@#$%^&*()_+-={[]}:;\"\'|\\<,.>/?№ё"});
#line 22
testRunner.Given("publications are present in database", ((string)(null)), table3, "Given ");
#line 25
testRunner.When("open page by url \'http://localhost:5656/#/experiences\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
            TechTalk.SpecFlow.Table table4 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table4.AddRow(new string[] {
                        "~`!@#$%^&*()_+-={[]}:;\"\'|\\<,.>/?№ё"});
#line 26
testRunner.Then("publications tiles list contains items with data", ((string)(null)), table4, "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Publications are sorted by title ascending by default")]
        public virtual void PublicationsAreSortedByTitleAscendingByDefault()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Publications are sorted by title ascending by default", ((string[])(null)));
#line 30
this.ScenarioSetup(scenarioInfo);
#line hidden
            TechTalk.SpecFlow.Table table5 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table5.AddRow(new string[] {
                        "Publication_a"});
            table5.AddRow(new string[] {
                        "a_Publication"});
            table5.AddRow(new string[] {
                        "Publication_z"});
            table5.AddRow(new string[] {
                        "1_Publication"});
            table5.AddRow(new string[] {
                        "_Publication"});
#line 31
testRunner.Given("publications are present in database", ((string)(null)), table5, "Given ");
#line 38
testRunner.When("open page by url \'http://localhost:5656/#/experiences\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
            TechTalk.SpecFlow.Table table6 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table6.AddRow(new string[] {
                        "1_Publication"});
            table6.AddRow(new string[] {
                        "_Publication"});
            table6.AddRow(new string[] {
                        "a_Publication"});
            table6.AddRow(new string[] {
                        "Publication_a"});
            table6.AddRow(new string[] {
                        "Publication_z"});
#line 39
testRunner.Then("publications tiles list consists of ordered items", ((string)(null)), table6, "Then ");
#line 46
testRunner.And("publications list order switch is set to \'ascending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Publications are sorted by title descending if set descending order")]
        public virtual void PublicationsAreSortedByTitleDescendingIfSetDescendingOrder()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Publications are sorted by title descending if set descending order", ((string[])(null)));
#line 49
this.ScenarioSetup(scenarioInfo);
#line hidden
            TechTalk.SpecFlow.Table table7 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table7.AddRow(new string[] {
                        "Publication_a"});
            table7.AddRow(new string[] {
                        "a_Publication"});
            table7.AddRow(new string[] {
                        "Publication_z"});
            table7.AddRow(new string[] {
                        "_Publication"});
            table7.AddRow(new string[] {
                        "1_Publication"});
#line 50
testRunner.Given("publications are present in database", ((string)(null)), table7, "Given ");
#line 57
testRunner.When("open page by url \'http://localhost:5656/#/experiences\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 58
testRunner.And("I switch publications list order to \'ascending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 59
testRunner.And("I switch publications list order to \'descending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            TechTalk.SpecFlow.Table table8 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table8.AddRow(new string[] {
                        "Publication_z"});
            table8.AddRow(new string[] {
                        "Publication_a"});
            table8.AddRow(new string[] {
                        "a_Publication"});
            table8.AddRow(new string[] {
                        "_Publication"});
            table8.AddRow(new string[] {
                        "1_Publication"});
#line 60
testRunner.Then("publications tiles list consists of ordered items", ((string)(null)), table8, "Then ");
#line 67
testRunner.And("publications list order switch is set to \'descending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Publications are sorted by title ascending if set ascending order")]
        public virtual void PublicationsAreSortedByTitleAscendingIfSetAscendingOrder()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Publications are sorted by title ascending if set ascending order", ((string[])(null)));
#line 69
this.ScenarioSetup(scenarioInfo);
#line hidden
            TechTalk.SpecFlow.Table table9 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table9.AddRow(new string[] {
                        "Publication_a"});
            table9.AddRow(new string[] {
                        "a_Publication"});
            table9.AddRow(new string[] {
                        "Publication_z"});
            table9.AddRow(new string[] {
                        "1_Publication"});
            table9.AddRow(new string[] {
                        "_Publication"});
#line 70
testRunner.Given("publications are present in database", ((string)(null)), table9, "Given ");
#line 77
testRunner.When("open page by url \'http://localhost:5656/#/experiences\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 78
testRunner.And("I switch publications list order to \'descending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 79
testRunner.And("I switch publications list order to \'ascending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            TechTalk.SpecFlow.Table table10 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table10.AddRow(new string[] {
                        "1_Publication"});
            table10.AddRow(new string[] {
                        "_Publication"});
            table10.AddRow(new string[] {
                        "a_Publication"});
            table10.AddRow(new string[] {
                        "Publication_a"});
            table10.AddRow(new string[] {
                        "Publication_z"});
#line 80
testRunner.Then("publications tiles list consists of ordered items", ((string)(null)), table10, "Then ");
#line 87
testRunner.And("publications list order switch is set to \'ascending\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Selected publication should be highlited after selecting")]
        public virtual void SelectedPublicationShouldBeHighlitedAfterSelecting()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Selected publication should be highlited after selecting", ((string[])(null)));
#line 89
this.ScenarioSetup(scenarioInfo);
#line hidden
            TechTalk.SpecFlow.Table table11 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table11.AddRow(new string[] {
                        "Publication1"});
            table11.AddRow(new string[] {
                        "Publication2"});
            table11.AddRow(new string[] {
                        "Publication3"});
#line 90
testRunner.Given("publications are present in database", ((string)(null)), table11, "Given ");
#line 95
testRunner.When("open page by url \'http://localhost:5656/#/experiences\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 96
testRunner.And("mouse hover element of publications list with title \'Publication2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 97
testRunner.And("select publication list item with title \'Publication2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 98
testRunner.Then("publication list item with title \'Publication2\' is selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 99
testRunner.But("publication list item with title \'Publication1\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "But ");
#line 100
testRunner.And("publication list item with title \'Publication3\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Publication could be deselected")]
        public virtual void PublicationCouldBeDeselected()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Publication could be deselected", ((string[])(null)));
#line 102
this.ScenarioSetup(scenarioInfo);
#line hidden
            TechTalk.SpecFlow.Table table12 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table12.AddRow(new string[] {
                        "Publication1"});
            table12.AddRow(new string[] {
                        "Publication2"});
            table12.AddRow(new string[] {
                        "Publication3"});
#line 103
testRunner.Given("publications are present in database", ((string)(null)), table12, "Given ");
#line 108
testRunner.When("open page by url \'http://localhost:5656/#/experiences\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 109
testRunner.And("mouse hover element of publications list with title \'Publication1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 110
testRunner.And("select publication list item with title \'Publication1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 111
testRunner.And("mouse hover element of publications list with title \'Publication2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 112
testRunner.And("select publication list item with title \'Publication2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 113
testRunner.And("mouse hover element of publications list with title \'Publication3\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 114
testRunner.And("select publication list item with title \'Publication3\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 115
testRunner.And("mouse hover element of publications list with title \'Publication1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 116
testRunner.And("select publication list item with title \'Publication1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 117
testRunner.And("mouse hover element of publications list with title \'Publication2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 118
testRunner.And("select publication list item with title \'Publication2\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 119
testRunner.Then("publication list item with title \'Publication1\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 120
testRunner.But("publication list item with title \'Publication2\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "But ");
#line 121
testRunner.And("publication list item with title \'Publication3\' is selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("No publications are selected by default in publications list")]
        public virtual void NoPublicationsAreSelectedByDefaultInPublicationsList()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("No publications are selected by default in publications list", ((string[])(null)));
#line 123
this.ScenarioSetup(scenarioInfo);
#line hidden
            TechTalk.SpecFlow.Table table13 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table13.AddRow(new string[] {
                        "Publication1"});
            table13.AddRow(new string[] {
                        "Publication2"});
            table13.AddRow(new string[] {
                        "Publication3"});
#line 124
testRunner.Given("publications are present in database", ((string)(null)), table13, "Given ");
#line 129
testRunner.When("open page by url \'http://localhost:5656/#/experiences\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 130
testRunner.Then("publication list item with title \'Publication2\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 131
testRunner.And("publication list item with title \'Publication1\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 132
testRunner.And("publication list item with title \'Publication3\' is not selected", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Publications list columns count should depend on screen width")]
        [NUnit.Framework.TestCaseAttribute("640", "1", null)]
        [NUnit.Framework.TestCaseAttribute("800", "2", null)]
        [NUnit.Framework.TestCaseAttribute("1200", "3", null)]
        [NUnit.Framework.TestCaseAttribute("1600", "3", null)]
        public virtual void PublicationsListColumnsCountShouldDependOnScreenWidth(string windowWidth, string columnsCount, string[] exampleTags)
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Publications list columns count should depend on screen width", exampleTags);
#line 135
this.ScenarioSetup(scenarioInfo);
#line hidden
            TechTalk.SpecFlow.Table table14 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table14.AddRow(new string[] {
                        "Publication1"});
            table14.AddRow(new string[] {
                        "Publication2"});
            table14.AddRow(new string[] {
                        "Publication3"});
            table14.AddRow(new string[] {
                        "Publication4"});
            table14.AddRow(new string[] {
                        "Publication5"});
#line 136
testRunner.Given("publications are present in database", ((string)(null)), table14, "Given ");
#line 143
testRunner.When("open page by url \'http://localhost:5656/#/experiences\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 144
testRunner.And(string.Format("browser window width and height is set to {0} and 600", windowWidth), ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 145
testRunner.Then(string.Format("publications list is displayed in {0} columns", columnsCount), ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("All elements of publications list can be made visible using scroll")]
        public virtual void AllElementsOfPublicationsListCanBeMadeVisibleUsingScroll()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("All elements of publications list can be made visible using scroll", ((string[])(null)));
#line 154
this.ScenarioSetup(scenarioInfo);
#line hidden
            TechTalk.SpecFlow.Table table15 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table15.AddRow(new string[] {
                        "Publication1"});
            table15.AddRow(new string[] {
                        "Publication2"});
            table15.AddRow(new string[] {
                        "Publication3"});
            table15.AddRow(new string[] {
                        "Publication4"});
            table15.AddRow(new string[] {
                        "Publication5"});
#line 155
testRunner.Given("publications are present in database", ((string)(null)), table15, "Given ");
#line 162
testRunner.When("open page by url \'http://localhost:5656/#/experiences\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 163
testRunner.And("browser window width and height is set to 600 and 600", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 164
testRunner.And("scroll publication with title \'Publication5\' into the view", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 165
testRunner.Then("element with title \'Publication5\' of publications list is visible", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Actions open and select are enabled if hover item of publications list")]
        [NUnit.Framework.CategoryAttribute("NotFirefox")]
        public virtual void ActionsOpenAndSelectAreEnabledIfHoverItemOfPublicationsList()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Actions open and select are enabled if hover item of publications list", new string[] {
                        "NotFirefox"});
#line 169
this.ScenarioSetup(scenarioInfo);
#line hidden
            TechTalk.SpecFlow.Table table16 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title"});
            table16.AddRow(new string[] {
                        "Publication1"});
            table16.AddRow(new string[] {
                        "Publication2"});
            table16.AddRow(new string[] {
                        "Publication3"});
#line 170
testRunner.Given("publications are present in database", ((string)(null)), table16, "Given ");
#line 175
testRunner.When("open page by url \'http://localhost:5656/#/experiences\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 176
testRunner.And("mouse hover element of publications list with title \'Publication1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 177
testRunner.Then("Action open is enabled true for publications list item with title \'Publication1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 178
testRunner.And("Action select is enabled true for publications list item with title \'Publication1" +
                    "\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 179
testRunner.And("Action build is enabled true for publications list item with title \'Publication1\'" +
                    "", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Open action of publications list item navigates to publication\'s editing page")]
        public virtual void OpenActionOfPublicationsListItemNavigatesToPublicationSEditingPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Open action of publications list item navigates to publication\'s editing page", ((string[])(null)));
#line 182
this.ScenarioSetup(scenarioInfo);
#line hidden
            TechTalk.SpecFlow.Table table17 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table17.AddRow(new string[] {
                        "Publication1",
                        "1"});
#line 183
testRunner.Given("publications are present in database", ((string)(null)), table17, "Given ");
#line 186
testRunner.When("open page by url \'http://localhost:5656/#/experiences\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 187
testRunner.And("mouse hover element of publications list with title \'Publication1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 188
testRunner.And("click open publication list item with title \'Publication1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 189
testRunner.Then("browser navigates to url \'http://localhost:5656/#/experience/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Navigation works using tab navigation to objectives")]
        public virtual void NavigationWorksUsingTabNavigationToObjectives()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Navigation works using tab navigation to objectives", ((string[])(null)));
#line 191
this.ScenarioSetup(scenarioInfo);
#line 192
testRunner.When("open page by url \'http://localhost:5656/#/experiences\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 193
testRunner.And("click on tab objectives link on expiriences list page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 194
testRunner.Then("browser navigates to url \'http://localhost:5656/#/objectives\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Temp")]
        public virtual void Temp()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Temp", ((string[])(null)));
#line 196
this.ScenarioSetup(scenarioInfo);
#line 197
testRunner.When("unzip puckage to tmp", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 198
testRunner.And("open page by url \'http://ctest.corp.ism-ukraine.com/tmp/\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 199
testRunner.And("sleep", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 200
testRunner.Then("browser navigates to url \'http://ctest.corp.ism-ukraine.com/tmp/#/\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
    }
}
#pragma warning restore
#endregion
