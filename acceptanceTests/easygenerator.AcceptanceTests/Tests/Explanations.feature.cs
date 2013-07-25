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
    [NUnit.Framework.DescriptionAttribute("Explanations")]
    [NUnit.Framework.CategoryAttribute("Explanations")]
    public partial class ExplanationsFeature
    {
        
        private static TechTalk.SpecFlow.ITestRunner testRunner;
        
#line 1 "Explanations.feature"
#line hidden
        
        [NUnit.Framework.TestFixtureSetUpAttribute()]
        public virtual void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "Explanations", "As an author I can Add Explanation, so I can divide needed content into more than" +
                    " one solid part.\r\n  As an author I can Delete Explanation, so I do not keep not " +
                    "needed parts of content.", ProgrammingLanguage.CSharp, new string[] {
                        "Explanations"});
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
                        "Objective1",
                        "1"});
#line 7
testRunner.Given("objectives are present in database", ((string)(null)), table1, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table2 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Id"});
            table2.AddRow(new string[] {
                        "Question11",
                        "1"});
#line 10
testRunner.Given("questions related to \'Objective1\' are present in database", ((string)(null)), table2, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table3 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table3.AddRow(new string[] {
                        "Explanation11"});
            table3.AddRow(new string[] {
                        "Explanation12"});
            table3.AddRow(new string[] {
                        "Explanation13"});
#line 13
testRunner.Given("explanations related to \'Question11\' of \'Objective1\' are present in database", ((string)(null)), table3, "Given ");
#line hidden
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("New explanation could be added by entering new explanation text")]
        public virtual void NewExplanationCouldBeAddedByEnteringNewExplanationText()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("New explanation could be added by entering new explanation text", ((string[])(null)));
#line 19
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 20
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 21
testRunner.And("input text \'Explanation14\' into new explanation text field", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 22
testRunner.And("click on collapse answer options", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            TechTalk.SpecFlow.Table table4 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table4.AddRow(new string[] {
                        "Explanation11"});
            table4.AddRow(new string[] {
                        "Explanation12"});
            table4.AddRow(new string[] {
                        "Explanation13"});
            table4.AddRow(new string[] {
                        "Explanation14"});
#line 23
testRunner.Then("explanations list contains only items with data", ((string)(null)), table4, "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Explanation text could be edited")]
        public virtual void ExplanationTextCouldBeEdited()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Explanation text could be edited", ((string[])(null)));
#line 30
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 31
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 32
testRunner.And("input text \'Explanation14\' into explanation text field \'Explanation12\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 33
testRunner.And("click on collapse answer options", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            TechTalk.SpecFlow.Table table5 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table5.AddRow(new string[] {
                        "Explanation11"});
            table5.AddRow(new string[] {
                        "Explanation14"});
            table5.AddRow(new string[] {
                        "Explanation13"});
#line 34
testRunner.Then("explanations list contains only items with data", ((string)(null)), table5, "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Explanation could be deleted")]
        public virtual void ExplanationCouldBeDeleted()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Explanation could be deleted", ((string[])(null)));
#line 40
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 41
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 42
testRunner.And("mouse hover element of explanation with text \'Explanation12\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 43
testRunner.And("click on delete explanation \'Explanation12\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 44
testRunner.And("mouse hover element of explanation with text \'Explanation11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 45
testRunner.And("click on delete explanation \'Explanation11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            TechTalk.SpecFlow.Table table6 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table6.AddRow(new string[] {
                        "Explanation13"});
#line 46
testRunner.Then("explanations list contains only items with data", ((string)(null)), table6, "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Explanation can\'t be saved with empty text")]
        public virtual void ExplanationCanTBeSavedWithEmptyText()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Explanation can\'t be saved with empty text", ((string[])(null)));
#line 50
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 51
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 52
testRunner.And("input text \' \' into new explanation text field", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 53
testRunner.And("click on collapse answer options", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            TechTalk.SpecFlow.Table table7 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table7.AddRow(new string[] {
                        "Explanation11"});
            table7.AddRow(new string[] {
                        "Explanation12"});
            table7.AddRow(new string[] {
                        "Explanation13"});
#line 54
testRunner.Then("explanations list contains only items with data", ((string)(null)), table7, "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Changes to explanation data are not lost when user go out from current question p" +
            "age")]
        public virtual void ChangesToExplanationDataAreNotLostWhenUserGoOutFromCurrentQuestionPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Changes to explanation data are not lost when user go out from current question p" +
                    "age", ((string[])(null)));
#line 60
this.ScenarioSetup(scenarioInfo);
#line 6
this.FeatureBackground();
#line 61
testRunner.When("open page by url \'http://localhost:5656/#/objective/1/question/1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 62
testRunner.And("input text \'Explanation14\' into explanation text field \'Explanation12\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 63
testRunner.And("click on back to objective", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 64
testRunner.And("mouse hover element of questions list with title \'Question11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 65
testRunner.And("click on open question with title \'Question11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            TechTalk.SpecFlow.Table table8 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table8.AddRow(new string[] {
                        "Explanation11"});
            table8.AddRow(new string[] {
                        "Explanation14"});
            table8.AddRow(new string[] {
                        "Explanation13"});
#line 66
testRunner.Then("explanations list contains only items with data", ((string)(null)), table8, "Then ");
#line hidden
            this.ScenarioCleanup();
        }
    }
}
#pragma warning restore
#endregion
