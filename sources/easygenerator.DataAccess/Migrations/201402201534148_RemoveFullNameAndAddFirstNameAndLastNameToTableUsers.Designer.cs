// <auto-generated />
namespace easygenerator.DataAccess.Migrations
{
    using System.CodeDom.Compiler;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Migrations.Infrastructure;
    using System.Resources;
    
    [GeneratedCode("EntityFramework.Migrations", "6.0.2-21211")]
    public sealed partial class RemoveFullNameAndAddFirstNameAndLastNameToTableUsers : IMigrationMetadata
    {
        private readonly ResourceManager Resources = new ResourceManager(typeof(RemoveFullNameAndAddFirstNameAndLastNameToTableUsers));
        
        string IMigrationMetadata.Id
        {
            get { return "201402201534148_RemoveFullNameAndAddFirstNameAndLastNameToTableUsers"; }
        }
        
        string IMigrationMetadata.Source
        {
            get { return null; }
        }
        
        string IMigrationMetadata.Target
        {
            get { return Resources.GetString("Target"); }
        }
    }
}
