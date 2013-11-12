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
    [NUnit.Framework.DescriptionAttribute("PackageSummaryPage")]
    [NUnit.Framework.CategoryAttribute("PackageListOfObjectives")]
    public partial class PackageSummaryPageFeature
    {
        
        private static TechTalk.SpecFlow.ITestRunner testRunner;
        
#line 1 "PackageSummaryPage.feature"
#line hidden
        
        [NUnit.Framework.TestFixtureSetUpAttribute()]
        public virtual void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "PackageSummaryPage", "As a learner I can unzip downloaded package and open “index” file that is contain" +
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
#line 7
#line 8
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
#line 9
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
#line 13
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
#line 19
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
#line 23
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
#line 28
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
#line 32
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
#line 36
testRunner.Given("answer options related to \'Question12\' of \'Objective11\' are present in database", ((string)(null)), table7, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table8 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table8.AddRow(new string[] {
                        "Explanation11"});
            table8.AddRow(new string[] {
                        "Explanation12"});
#line 40
testRunner.Given("explanations related to \'Question11\' of \'Objective11\' are present in database", ((string)(null)), table8, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table9 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table9.AddRow(new string[] {
                        "Explanation21"});
            table9.AddRow(new string[] {
                        "Explanation22"});
#line 44
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
#line 49
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
#line 53
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
#line 57
testRunner.Given("answer options related to \'Question22\' of \'Objective12\' are present in database", ((string)(null)), table12, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table13 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table13.AddRow(new string[] {
                        "Explanation211"});
            table13.AddRow(new string[] {
                        "Explanation212"});
#line 61
testRunner.Given("explanations related to \'Question21\' of \'Objective12\' are present in database", ((string)(null)), table13, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table14 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table14.AddRow(new string[] {
                        "Explanation221"});
            table14.AddRow(new string[] {
                        "Explanation222"});
#line 65
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
#line 71
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
#line 75
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
#line 79
testRunner.Given("answer options related to \'Question12e2\' of \'Objective21\' are present in database" +
                    "", ((string)(null)), table17, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table18 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table18.AddRow(new string[] {
                        "Explanation11e2"});
            table18.AddRow(new string[] {
                        "Explanation12e2"});
#line 83
testRunner.Given("explanations related to \'Question11e2\' of \'Objective21\' are present in database", ((string)(null)), table18, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table19 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table19.AddRow(new string[] {
                        "Explanation21e2"});
            table19.AddRow(new string[] {
                        "Explanation22e2"});
#line 87
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
#line 92
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
#line 96
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
#line 100
testRunner.Given("answer options related to \'Question22e2\' of \'Objective22\' are present in database" +
                    "", ((string)(null)), table22, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table23 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table23.AddRow(new string[] {
                        "Explanation211e2"});
            table23.AddRow(new string[] {
                        "Explanation212e2"});
#line 104
testRunner.Given("explanations related to \'Question21e2\' of \'Objective22\' are present in database", ((string)(null)), table23, "Given ");
#line hidden
            TechTalk.SpecFlow.Table table24 = new TechTalk.SpecFlow.Table(new string[] {
                        "Explanation"});
            table24.AddRow(new string[] {
                        "Explanation221e2"});
            table24.AddRow(new string[] {
                        "Explanation222e2"});
#line 108
testRunner.Given("explanations related to \'Question22e2\' of \'Objective22\' are present in database", ((string)(null)), table24, "Given ");
#line 112
testRunner.When("open page by url \'http://localhost:5656/signout\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 113
testRunner.And("open page by url \'http://localhost:5656/signin\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 114
testRunner.And("sign in as \'test\' user on sign in page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 115
testRunner.Then("browser navigates to url \'http://localhost:5656/\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 117
testRunner.When("open page by url \'http://localhost:5656/#/experiences\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 118
testRunner.And("mouse hover element of publications list with title \'Experience1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 119
testRunner.And("click build publication list item with title \'Experience1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 120
testRunner.And("sleep 1000 milliseconds", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 121
testRunner.And("refresh page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 122
testRunner.And("mouse hover element of publications list with title \'Experience1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 123
testRunner.And("click download publication list item with title \'Experience1\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 124
testRunner.And("unzip \'00000000000000000000000000000001\' package to \'tmp\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Progress indicators show current progress for experience")]
        public virtual void ProgressIndicatorsShowCurrentProgressForExperience()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Progress indicators show current progress for experience", ((string[])(null)));
#line 126
this.ScenarioSetup(scenarioInfo);
#line 7
this.FeatureBackground();
#line 127
testRunner.When("open page by url \'http://localhost:5656/Templates/tmp\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 128
testRunner.And("toggle expand package objective item with title \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 129
testRunner.And("click package question list item \'Question11\' of \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 130
testRunner.And("click on submit button on package question page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 131
testRunner.And("click on back to objectives link on package feedback page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 132
testRunner.And("toggle expand package objective item with title \'Objective12\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 133
testRunner.And("click package question list item \'Question21\' of \'Objective12\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 134
testRunner.And("click on submit button on package question page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 135
testRunner.And("click on back to objectives link on package feedback page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 136
testRunner.And("click package question list item \'Question22\' of \'Objective12\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 137
testRunner.And("click on submit button on package question page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 138
testRunner.And("click on progress summary link on package feedback page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 139
testRunner.Then("browser navigates to url \'http://localhost:5656/Templates/tmp/#summary\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 140
testRunner.And("overall progress score \'38%\' is shown on package summary page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            TechTalk.SpecFlow.Table table25 = new TechTalk.SpecFlow.Table(new string[] {
                        "Title",
                        "Value",
                        "MeterValue"});
            table25.AddRow(new string[] {
                        "Objective11",
                        "25%",
                        "width: 25%;"});
            table25.AddRow(new string[] {
                        "Objective12",
                        "50%",
                        "width: 50%;"});
#line 141
testRunner.And("objective progress list contains items with data", ((string)(null)), table25, "And ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Back action on package summary page navigates to previous page")]
        public virtual void BackActionOnPackageSummaryPageNavigatesToPreviousPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Back action on package summary page navigates to previous page", ((string[])(null)));
#line 147
this.ScenarioSetup(scenarioInfo);
#line 7
this.FeatureBackground();
#line 149
testRunner.When("open page by url \'http://localhost:5656/Templates/tmp\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 150
testRunner.And("click on progress summary button on package list of objective page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 151
testRunner.And("click on back link on progress summary page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 152
testRunner.Then("browser navigates to url \'http://localhost:5656/Templates/tmp/#\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 154
testRunner.When("toggle expand package objective item with title \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 155
testRunner.And("click package question list item \'Question11\' of \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 156
testRunner.And("click on progress summary link on package question page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 157
testRunner.And("click on back link on progress summary page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 158
testRunner.Then("browser navigates to url \'http://localhost:5656/Templates/tmp/#objective/00000000" +
                    "000000000000000000000001/question/00000000000000000000000000000001\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 160
testRunner.When("click on submit button on package question page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 161
testRunner.And("click on progress summary link on package feedback page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 162
testRunner.And("click on back link on progress summary page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 163
testRunner.Then("browser navigates to url \'http://localhost:5656/Templates/tmp/#objective/00000000" +
                    "000000000000000000000001/question/00000000000000000000000000000001/feedback\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 165
testRunner.When("click on show explanations button on package feedback page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 166
testRunner.And("click on progress summary link on package explanations page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 167
testRunner.And("click on back link on progress summary page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 168
testRunner.Then("browser navigates to url \'http://localhost:5656/Templates/tmp/#objective/00000000" +
                    "000000000000000000000001/question/00000000000000000000000000000001/learningObjec" +
                    "ts\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Thank you message popup appears on finish link click on package summary page")]
        public virtual void ThankYouMessagePopupAppearsOnFinishLinkClickOnPackageSummaryPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Thank you message popup appears on finish link click on package summary page", ((string[])(null)));
#line 171
this.ScenarioSetup(scenarioInfo);
#line 7
this.FeatureBackground();
#line 172
testRunner.When("open page by url \'http://localhost:5656/Templates/tmp\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 173
testRunner.And("click on progress summary button on package list of objective page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 174
testRunner.And("click on finish link on progress summary page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 175
testRunner.Then("thank you popup appears on package summary page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Home link on package summary page navigates to package home page")]
        public virtual void HomeLinkOnPackageSummaryPageNavigatesToPackageHomePage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Home link on package summary page navigates to package home page", ((string[])(null)));
#line 177
this.ScenarioSetup(scenarioInfo);
#line 7
this.FeatureBackground();
#line 178
testRunner.When("open page by url \'http://localhost:5656/Templates/tmp\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 179
testRunner.And("toggle expand package objective item with title \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 180
testRunner.And("click package question list item \'Question11\' of \'Objective11\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 181
testRunner.And("click on progress summary link on package question page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 182
testRunner.And("click on home link on progress summary page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 183
testRunner.Then("browser navigates to url \'http://localhost:5656/Templates/tmp/#\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
    }
}
#pragma warning restore
#endregion
