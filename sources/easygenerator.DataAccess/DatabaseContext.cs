﻿using easygenerator.DataAccess.Migrations;
using easygenerator.DomainModel.Entities;
using easygenerator.DomainModel.Entities.ACL;
using easygenerator.DomainModel.Entities.Organizations;
using easygenerator.DomainModel.Entities.Questions;
using easygenerator.DomainModel.Entities.Tickets;
using easygenerator.DomainModel.Events;
using easygenerator.Infrastructure;
using easygenerator.Infrastructure.DomainModel;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.Validation;
using System.Diagnostics;

namespace easygenerator.DataAccess
{
    public class DatabaseContext : DbContext, IDataContext, IUnitOfWork
    {
        private readonly IDomainEventPublisher _publisher;

        static DatabaseContext()
        {
            var _ = typeof(System.Data.Entity.SqlServer.SqlProviderServices);

            try
            {
                Database.SetInitializer(new MigrateDatabaseToLatestVersion<DatabaseContext, Configuration>());
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DatabaseContext()
            : this(null)
        {
        }

        public DatabaseContext(IDomainEventPublisher publisher)
            : base("DefaultConnection")
        {
            _publisher = publisher;
            ((IObjectContextAdapter)this).ObjectContext.ObjectMaterialized += (sender, args) => DateTimeObjectMaterializer.Materialize(args.Entity);
        }

        public DbSet<Section> Sections { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<LearningContent> LearningContents { get; set; }
        public DbSet<Template> Templates { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<IPLoginInfo> IPLoginInfos { get; set; }
        public DbSet<UserLoginInfo> UserLoginInfos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<CourseCollaborator> CourseCollaborators { get; set; }
        public DbSet<Onboarding> Onboardings { get; set; }
        public DbSet<LearningPath> LearningPaths { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<ConsumerTool> ConsumerTools { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<SamlIdentityProvider> SamlIdentityProviders { get; set; }
        public DbSet<SamlServiceProvider> SamlServiceProviders { get; set; }

        public IDbSet<T> GetSet<T>() where T : Identifiable
        {
            return Set<T>();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Properties<Guid>().Where(p => p.Name == "Id").Configure(p => p.IsKey());
            modelBuilder.Properties<DateTime>().Where(p => p.Name == "CreatedOn").Configure(p => p.IsRequired());
            modelBuilder.Properties<DateTime>().Where(p => p.Name == "ModifiedOn").Configure(p => p.IsRequired());
            modelBuilder.Properties<string>().Where(p => p.Name == "CreatedBy").Configure(p => p.IsRequired().HasMaxLength(254));
            modelBuilder.Properties<string>().Where(p => p.Name == "ModifiedBy").Configure(p => p.IsRequired().HasMaxLength(254));

            modelBuilder.Entity<LearningPath>().Property(e => e.EntitiesOrder).IsOptional();
            modelBuilder.Entity<LearningPath>().Property(e => e.Title).HasMaxLength(255).IsRequired();
            modelBuilder.Entity<LearningPath>().HasMany(e => e.CoursesCollection).WithMany(e => e.LearningPathCollection).Map(m => m.ToTable("LearningPathCourses"));
            modelBuilder.Entity<LearningPath>().HasMany(e => e.DocumentsCollection).WithMany(e => e.LearningPathCollection).Map(m => m.ToTable("LearningPathDocuments"));
            modelBuilder.Entity<LearningPath>().Property(e => e.PackageUrl).HasMaxLength(255);
            modelBuilder.Entity<LearningPath>().Property(e => e.PublicationUrl).HasMaxLength(255);
            modelBuilder.Entity<LearningPath>().HasMany(e => e.LearningPathCompanies).WithMany(e => e.CompanyLearningPaths).Map(m => m.ToTable("CompanyLearningPaths"));
            modelBuilder.Entity<LearningPath>().HasOptional(e => e.Settings);

            modelBuilder.Entity<LearningPathSettings>().Property(e => e.Data).IsOptional();
            modelBuilder.Entity<LearningPathSettings>().HasRequired(e => e.LearningPath).WithOptional(p => p.Settings).WillCascadeOnDelete(true);

            modelBuilder.Entity<Section>().Property(e => e.Title).HasMaxLength(255).IsRequired();
            modelBuilder.Entity<Section>().Property(e => e.ImageUrl).IsOptional();
            modelBuilder.Entity<Section>().Property(e => e.LearningObjective).HasMaxLength(255).IsOptional();
            modelBuilder.Entity<Section>().Property(e => e.QuestionsOrder).IsOptional();
            modelBuilder.Entity<Section>().HasMany(e => e.QuestionsCollection).WithRequired(e => e.Section);
            modelBuilder.Entity<Section>().HasMany(e => e.RelatedCoursesCollection)
                .WithMany(e => e.RelatedSectionsCollection)
                .Map(m => m.ToTable("CourseSections"));

            modelBuilder.Entity<Document>().Property(e => e.Title).HasMaxLength(255).IsRequired();
            modelBuilder.Entity<Document>().Property(e => e.EmbedCode).IsRequired();
            modelBuilder.Entity<Document>().Property(e => e.DocumentType).IsRequired();
            modelBuilder.Entity<Document>().HasMany(e => e.LearningPathCollection).WithMany(e => e.DocumentsCollection).Map(m => m.ToTable("LearningPathDocuments"));

            modelBuilder.Entity<CourseSaleInfo>().HasKey(e => e.Course_Id);
            modelBuilder.Entity<CourseSaleInfo>().Property(e => e.DocumentId).HasMaxLength(255);

            modelBuilder.Entity<CourseQuestionShortIdsInfo>().HasKey(e => e.Course_Id);
            modelBuilder.Entity<CourseQuestionShortIdsInfo>().Property(e => e.QuestionShortIds).IsOptional();

            modelBuilder.Entity<Course>().Property(e => e.Title).HasMaxLength(255).IsRequired();
            modelBuilder.Entity<Course>().HasRequired(e => e.Template).WithMany(e => e.Courses).WillCascadeOnDelete(false);
            modelBuilder.Entity<Course>().HasMany(e => e.RelatedSectionsCollection).WithMany(e => e.RelatedCoursesCollection).Map(m => m.ToTable("CourseSections"));
            modelBuilder.Entity<Course>().HasMany(e => e.LearningPathCollection).WithMany(e => e.CoursesCollection).Map(m => m.ToTable("LearningPathCourses"));
            modelBuilder.Entity<Course>().HasMany(e => e.TemplateSettings).WithRequired(e => e.Course).WillCascadeOnDelete(true);
            modelBuilder.Entity<Course>().Property(e => e.IntroductionContent).IsMaxLength().IsOptional();
            modelBuilder.Entity<Course>().HasMany(e => e.CommentsCollection).WithRequired(e => e.Course).WillCascadeOnDelete(true);
            modelBuilder.Entity<Course>().Property(e => e.SectionsOrder).IsOptional();
            modelBuilder.Entity<Course>().HasMany(e => e.CollaboratorsCollection).WithRequired(e => e.Course).WillCascadeOnDelete(true);
            modelBuilder.Entity<Course>().Property(e => e.PackageUrl).HasMaxLength(255);
            modelBuilder.Entity<Course>().Property(e => e.ScormPackageUrl).HasMaxLength(255);
            modelBuilder.Entity<Course>().Property(e => e.PublicationUrl).HasMaxLength(255);
            modelBuilder.Entity<Course>().HasMany(e => e.CourseCompanies).WithMany(e => e.CompanyCourses).Map(m => m.ToTable("CompanyCourses"));
            modelBuilder.Entity<Course>().HasRequired(e => e.SaleInfo).WithRequiredPrincipal(e => e.Course).WillCascadeOnDelete(true);
            modelBuilder.Entity<Course>().HasRequired(e => e.QuestionShortIdsInfo).WithRequiredPrincipal(e => e.Course).WillCascadeOnDelete(true);
            modelBuilder.Entity<Course>().HasMany(e => e.PublicationAccessControlListCollection).WithRequired(e => e.Course).WillCascadeOnDelete(true);

            modelBuilder.Entity<CourseAccessControlListEntry>().Property(e => e.UserIdentity).IsRequired().HasMaxLength(254);
            modelBuilder.Entity<CourseAccessControlListEntry>().Property(e => e.UserInvited);
            modelBuilder.Entity<CourseAccessControlListEntry>().HasRequired(e => e.Course);
            modelBuilder.Entity<CourseAccessControlListEntry>().Ignore(e => e.ModifiedBy);
            modelBuilder.Entity<CourseAccessControlListEntry>().Ignore(e => e.ModifiedOn);

            modelBuilder.Entity<CourseCollaborator>().HasRequired(e => e.Course);
            modelBuilder.Entity<CourseCollaborator>().Property(e => e.IsAdmin).IsRequired();
            modelBuilder.Entity<CourseCollaborator>().Property(e => e.Email).IsRequired().HasMaxLength(254);

            modelBuilder.Entity<CourseTemplateSettings>().Property(e => e.Settings);
            modelBuilder.Entity<CourseTemplateSettings>().Property(e => e.ExtraData).IsOptional();
            modelBuilder.Entity<CourseTemplateSettings>().HasRequired(e => e.Course).WithMany().HasForeignKey(p => p.Course_Id);
            modelBuilder.Entity<CourseTemplateSettings>().HasRequired(e => e.Template).WithMany().HasForeignKey(p => p.Template_Id);
            modelBuilder.Entity<CourseTemplateSettings>().Property(e => e.Course_Id)
                .HasColumnAnnotation(IndexAnnotation.AnnotationName, new IndexAnnotation(new[] {
                    new IndexAttribute("IX_Course_Id"),
                    new IndexAttribute("UI_CourseTemplateSettings_Course_Id_Template_Id", 1) { IsUnique = true }
                }));
            modelBuilder.Entity<CourseTemplateSettings>().Property(e => e.Template_Id)
                .HasColumnAnnotation(IndexAnnotation.AnnotationName, new IndexAnnotation(new[]{
                    new IndexAttribute("IX_Template_Id"),
                    new IndexAttribute("UI_CourseTemplateSettings_Course_Id_Template_Id", 2) { IsUnique = true }
                }));
            modelBuilder.Entity<CourseTemplateSettings>().HasOptional(e => e.Theme);

            modelBuilder.Entity<Comment>().HasRequired(e => e.Course);
            modelBuilder.Entity<Comment>().Property(e => e.Text).IsRequired();
            modelBuilder.Entity<Comment>().Property(e => e.CreatedByName).HasMaxLength(255).IsRequired();
            modelBuilder.Entity<Comment>().Property(e => e.Context);

            modelBuilder.Entity<Question>().Property(e => e.Title).HasMaxLength(255).IsRequired();
            modelBuilder.Entity<Question>().HasRequired(e => e.Section);
            modelBuilder.Entity<Question>().HasMany(e => e.LearningContentsCollection).WithRequired(e => e.Question);
            modelBuilder.Entity<Question>().Property(e => e.Feedback.CorrectText).IsMaxLength().IsOptional();
            modelBuilder.Entity<Question>().Property(e => e.Feedback.IncorrectText).IsMaxLength().IsOptional();
            modelBuilder.Entity<Question>().Property(e => e.LearningContentsOrder).IsOptional();
            modelBuilder.Entity<Question>().Property(e => e.VoiceOver).IsOptional();

            modelBuilder.Entity<SurveyQuestion>().Property(e => e.IsSurvey).IsOptional();

            modelBuilder.Entity<Multipleselect>().HasMany(e => e.AnswersCollection).WithRequired(e => e.Question);

            modelBuilder.Entity<QuestionWithBackground>().Property(e => e.Background).IsOptional();

            modelBuilder.Entity<DragAndDropText>().HasMany(e => e.DropspotsCollection).WithRequired(e => e.Question);

            modelBuilder.Entity<Dropspot>().Property(e => e.Text).IsRequired();
            modelBuilder.Entity<Dropspot>().Property(e => e.X).IsRequired();
            modelBuilder.Entity<Dropspot>().Property(e => e.Y).IsRequired();
            modelBuilder.Entity<Dropspot>().HasRequired(e => e.Question);

            modelBuilder.Entity<HotSpot>().HasMany(e => e.HotSpotPolygonsCollection).WithRequired(e => e.Question);

            modelBuilder.Entity<HotSpotPolygon>().Property(e => e.Points).IsRequired();
            modelBuilder.Entity<HotSpotPolygon>().HasRequired(e => e.Question);

            modelBuilder.Entity<TextMatching>().HasMany(e => e.AnswersCollection).WithRequired(e => e.Question);

            modelBuilder.Entity<TextMatchingAnswer>().Property(e => e.Key).IsRequired().HasMaxLength(255);
            modelBuilder.Entity<TextMatchingAnswer>().Property(e => e.Value).IsRequired().HasMaxLength(255);
            modelBuilder.Entity<TextMatchingAnswer>().HasRequired(e => e.Question);

            modelBuilder.Entity<SingleSelectImage>().HasMany(e => e.AnswerCollection).WithRequired(e => e.Question);

            modelBuilder.Entity<SingleSelectImageAnswer>().Property(e => e.Image).IsOptional();
            modelBuilder.Entity<SingleSelectImageAnswer>().Property(e => e.IsCorrect).IsRequired();
            modelBuilder.Entity<SingleSelectImageAnswer>().HasRequired(e => e.Question);

            modelBuilder.Entity<LearningContent>().Property(e => e.Text).IsRequired();
            modelBuilder.Entity<LearningContent>().Property(e => e.Position).IsRequired();
            modelBuilder.Entity<LearningContent>().HasRequired(e => e.Question);

            modelBuilder.Entity<Answer>().Property(e => e.Text).IsRequired();
            modelBuilder.Entity<Answer>().Property(e => e.IsCorrect).IsRequired();
            modelBuilder.Entity<Answer>().HasRequired(e => e.Question);

            modelBuilder.Entity<FillInTheBlanks>().HasMany(e => e.AnswersCollection).WithRequired(e => e.Question);

            modelBuilder.Entity<BlankAnswer>().Property(e => e.Text).IsRequired();
            modelBuilder.Entity<BlankAnswer>().Property(e => e.IsCorrect).IsRequired();
            modelBuilder.Entity<BlankAnswer>().Property(e => e.MatchCase).IsRequired();
            modelBuilder.Entity<BlankAnswer>().Property(e => e.Order).IsRequired();
            modelBuilder.Entity<BlankAnswer>().Property(e => e.GroupId).IsRequired();
            modelBuilder.Entity<BlankAnswer>().HasRequired(e => e.Question);

            modelBuilder.Entity<RankingText>().HasMany(e => e.AnswersCollection).WithRequired(e => e.Question);
            modelBuilder.Entity<RankingText>().Property(e => e.AnswersOrder).IsOptional();

            modelBuilder.Entity<RankingTextAnswer>().Property(e => e.Text).IsRequired();
            modelBuilder.Entity<RankingTextAnswer>().HasRequired(e => e.Question);

            modelBuilder.Entity<User>().Property(e => e.Email).IsRequired().HasMaxLength(254);
            modelBuilder.Entity<User>().Property(e => e.PasswordHash).IsRequired();
            modelBuilder.Entity<User>().Property(e => e.Phone).IsRequired();
            modelBuilder.Entity<User>().Property(e => e.FirstName).IsRequired();
            modelBuilder.Entity<User>().Property(e => e.LastName).IsRequired();
            modelBuilder.Entity<User>().Property(e => e.Country).IsRequired();
            modelBuilder.Entity<User>().Property(e => e.Role).IsOptional();
            modelBuilder.Entity<User>().Property(e => e.Organization).IsOptional();
            modelBuilder.Entity<User>().HasMany(e => e.TicketCollection).WithRequired(e => e.User);
            modelBuilder.Entity<User>().HasMany(e => e.CompaniesCollection).WithMany(e => e.Users).Map(m => m.ToTable("CompanyUsers"));
            modelBuilder.Entity<User>().HasMany(e => e.AllowedSamlServiceProviders).WithMany(e => e.Users).Map(m => m.ToTable("UserSamlSPs"));
            modelBuilder.Entity<User>().HasMany(e => e.LtiUserInfoes).WithRequired(e => e.User).HasForeignKey(e => e.User_Id);
            modelBuilder.Entity<User>().HasMany(e => e.SamlIdPUserInfoes).WithRequired(e => e.User).HasForeignKey(e => e.User_Id);
            modelBuilder.Entity<User>().HasRequired(e => e.LoginInfo).WithRequiredPrincipal(e => e.User).WillCascadeOnDelete();
            modelBuilder.Entity<User>().Map(e => e.ToTable("Users"));

            modelBuilder.Entity<UserLoginInfo>().Property(e => e.Email).IsRequired().HasMaxLength(254).HasColumnAnnotation(IndexAnnotation.AnnotationName, new IndexAnnotation(new[]
            {
                new IndexAttribute("IX_Email") { IsUnique = true }
            }));
            modelBuilder.Entity<UserLoginInfo>().Property(e => e.FailedLoginAttemptsCount).IsRequired();
            modelBuilder.Entity<UserLoginInfo>().Property(e => e.LastFailTime).IsOptional();

            modelBuilder.Entity<IPLoginInfo>().Property(e => e.IP).IsRequired().HasMaxLength(63).HasColumnAnnotation(IndexAnnotation.AnnotationName, new IndexAnnotation(new[]
            {
                new IndexAttribute("IX_IP") { IsUnique = true }
            }));
            modelBuilder.Entity<IPLoginInfo>().Property(e => e.FailedLoginAttemptsCount).IsRequired();
            modelBuilder.Entity<IPLoginInfo>().Property(e => e.LastFailTime).IsOptional();

            modelBuilder.Entity<UserSettings>().Property(e => e.LastReadReleaseNote).IsOptional().HasMaxLength(25);
            modelBuilder.Entity<UserSettings>().Property(e => e.LastPassedSurveyPopup).IsRequired().HasMaxLength(8);
            modelBuilder.Entity<UserSettings>().Property(e => e.IsCreatedThroughLti).IsRequired();
            modelBuilder.Entity<UserSettings>().Property(e => e.IsCreatedThroughSamlIdP).IsRequired();
            modelBuilder.Entity<UserSettings>().Property(e => e.NewEditor).IsOptional();
            modelBuilder.Entity<UserSettings>().Property(e => e.IsSurvicateAnswered).IsOptional();
            modelBuilder.Entity<UserSettings>().Property(e => e.IsNewEditorByDefault).IsRequired();
            modelBuilder.Entity<UserSettings>().Property(e => e.IncludeMediaToPackage).IsRequired();
            modelBuilder.Entity<UserSettings>().Property(e => e.PersonalAccessType).IsOptional();
            modelBuilder.Entity<UserSettings>().Property(e => e.PersonalExpirationDate).IsOptional();
            modelBuilder.Entity<UserSettings>().HasRequired(e => e.User).WithRequiredDependent(p => p.Settings).WillCascadeOnDelete(true);

            modelBuilder.Entity<Ticket>().HasRequired(e => e.User);
            modelBuilder.Entity<Ticket>().Ignore(e => e.CreatedBy);
            modelBuilder.Entity<Ticket>().Ignore(e => e.ModifiedBy);
            modelBuilder.Entity<Ticket>().Ignore(e => e.ModifiedOn);

            modelBuilder.Entity<Template>().Property(e => e.Name).IsRequired().HasMaxLength(255);
            modelBuilder.Entity<Template>().Property(e => e.PreviewUrl).HasMaxLength(255);
            modelBuilder.Entity<Template>().Property(e => e.Order);
            modelBuilder.Entity<Template>().Property(e => e.IsNew);
            modelBuilder.Entity<Template>().Property(e => e.IsDeprecated);
            modelBuilder.Entity<Template>().HasMany(e => e.Courses);
            modelBuilder.Entity<Template>().HasMany(e => e.AccessControlList).WithRequired(e => e.Template).WillCascadeOnDelete(true);

            modelBuilder.Entity<Theme>().Property(e => e.Name).IsRequired().HasMaxLength(255);
            modelBuilder.Entity<Theme>().Property(e => e.Settings);
            modelBuilder.Entity<Theme>().HasRequired(e => e.Template);

            modelBuilder.Entity<TemplateAccessControlListEntry>().Property(e => e.UserIdentity).IsRequired().HasMaxLength(254);
            modelBuilder.Entity<TemplateAccessControlListEntry>().HasRequired(e => e.Template);
            modelBuilder.Entity<TemplateAccessControlListEntry>().Ignore(e => e.CreatedBy);
            modelBuilder.Entity<TemplateAccessControlListEntry>().Ignore(e => e.CreatedOn);
            modelBuilder.Entity<TemplateAccessControlListEntry>().Ignore(e => e.ModifiedBy);
            modelBuilder.Entity<TemplateAccessControlListEntry>().Ignore(e => e.ModifiedOn);

            modelBuilder.Entity<MailNotification>().Property(e => e.Body).IsRequired();
            modelBuilder.Entity<MailNotification>().Property(e => e.Subject).HasMaxLength(254).IsRequired();
            modelBuilder.Entity<MailNotification>().Property(e => e.ToEmailAddresses).HasMaxLength(511).IsRequired();
            modelBuilder.Entity<MailNotification>().Property(e => e.CCEmailAddresses).HasMaxLength(511);
            modelBuilder.Entity<MailNotification>().Property(e => e.BCCEmailAddresses).HasMaxLength(511);
            modelBuilder.Entity<MailNotification>().Property(e => e.FromEmailAddress).HasMaxLength(127).IsRequired();

            modelBuilder.Entity<HttpRequest>().Property(e => e.Url).HasMaxLength(255).IsRequired();
            modelBuilder.Entity<HttpRequest>().Property(e => e.Verb).HasMaxLength(15).IsRequired();
            modelBuilder.Entity<HttpRequest>().Property(e => e.ServiceName).HasMaxLength(127).IsRequired();

            modelBuilder.Entity<ImageFile>().Property(e => e.Title).HasMaxLength(255).IsRequired();

            modelBuilder.Entity<Onboarding>().Property(e => e.CourseCreated).IsRequired();
            modelBuilder.Entity<Onboarding>().Property(e => e.SectionCreated).IsRequired();
            modelBuilder.Entity<Onboarding>().Property(e => e.ContentCreated).IsRequired();
            modelBuilder.Entity<Onboarding>().Property(e => e.CreatedQuestionsCount).IsRequired();
            modelBuilder.Entity<Onboarding>().Property(e => e.CoursePublished).IsRequired();
            modelBuilder.Entity<Onboarding>().Property(e => e.IsClosed).IsRequired();
            modelBuilder.Entity<Onboarding>().Property(e => e.UserEmail).IsRequired().HasMaxLength(254).HasColumnAnnotation(IndexAnnotation.AnnotationName, new IndexAnnotation(new[]{
                    new IndexAttribute("Onboardings_UserEmail") { IsUnique = true }
              }));

            modelBuilder.Entity<DemoCourseInfo>().HasRequired(e => e.DemoCourse);
            modelBuilder.Entity<DemoCourseInfo>().HasOptional(e => e.SourceCourse);


            modelBuilder.Entity<CourseState>().HasRequired(e => e.Course).WithMany().HasForeignKey(e => e.Course_Id);

            modelBuilder.Entity<CourseState>().Property(e => e.Course_Id).HasColumnAnnotation(IndexAnnotation.AnnotationName, new IndexAnnotation(new[]{
                    new IndexAttribute("IX_Course_Id") { IsUnique = true}
              }));

            modelBuilder.Entity<ConsumerTool>().Property(e => e.Title).HasMaxLength(255);
            modelBuilder.Entity<ConsumerTool>().Property(e => e.Domain).HasMaxLength(255);
            modelBuilder.Entity<ConsumerTool>().Property(e => e.Key).IsRequired();
            modelBuilder.Entity<ConsumerTool>().Property(e => e.Secret).IsRequired();
            modelBuilder.Entity<ConsumerTool>().HasMany(e => e.LtiUserInfoes).WithRequired(e => e.ConsumerTool).HasForeignKey(e => e.ConsumerTool_Id);

            modelBuilder.Entity<ConsumerToolSettings>().HasKey(e => new { e.Id });
            modelBuilder.Entity<ConsumerToolSettings>().HasRequired(e => e.ConsumerTool).WithOptional(c => c.Settings).WillCascadeOnDelete(true);
            modelBuilder.Entity<ConsumerToolSettings>().HasOptional(e => e.Company);

            modelBuilder.Entity<LtiUserInfo>().Property(e => e.LtiUserId).HasMaxLength(255).IsOptional()
               .HasColumnAnnotation(IndexAnnotation.AnnotationName, new IndexAnnotation(new[] {
                    new IndexAttribute("IX_LtiUserId"),
                    new IndexAttribute("UI_LtiUserInfo_LtiUserId_User_Id_ConsumerTool_Id", 1) { IsUnique = true }
               }));
            modelBuilder.Entity<LtiUserInfo>().HasRequired(e => e.User).WithMany(e => e.LtiUserInfoes).HasForeignKey(p => p.User_Id).WillCascadeOnDelete(true);
            modelBuilder.Entity<LtiUserInfo>().Property(e => e.User_Id)
               .HasColumnAnnotation(IndexAnnotation.AnnotationName, new IndexAnnotation(new[] {
                    new IndexAttribute("IX_User_Id"),
                    new IndexAttribute("UI_LtiUserInfo_LtiUserId_User_Id_ConsumerTool_Id", 2) { IsUnique = true }
               }));
            modelBuilder.Entity<LtiUserInfo>().HasRequired(e => e.ConsumerTool).WithMany(e => e.LtiUserInfoes).HasForeignKey(p => p.ConsumerTool_Id).WillCascadeOnDelete(true);
            modelBuilder.Entity<LtiUserInfo>().Property(e => e.ConsumerTool_Id)
               .HasColumnAnnotation(IndexAnnotation.AnnotationName, new IndexAnnotation(new[] {
                    new IndexAttribute("IX_ConsumerTool_Id"),
                    new IndexAttribute("UI_LtiUserInfo_LtiUserId_User_Id_ConsumerTool_Id", 3) { IsUnique = true }
               }));

            modelBuilder.Entity<SamlIdentityProvider>().Property(e => e.Name).HasMaxLength(255).IsRequired();
            modelBuilder.Entity<SamlIdentityProvider>().Property(e => e.EntityId).HasMaxLength(511).IsRequired();
            modelBuilder.Entity<SamlIdentityProvider>().Property(e => e.SingleSignOnServiceUrl).HasMaxLength(511).IsRequired();
            modelBuilder.Entity<SamlIdentityProvider>().Property(e => e.SingleLogoutServiceUrl).HasMaxLength(511).IsOptional();
            modelBuilder.Entity<SamlIdentityProvider>().Property(e => e.SingleSignOnServiceBinding).IsRequired();
            modelBuilder.Entity<SamlIdentityProvider>().Property(e => e.SingleLogoutServiceBinding).IsOptional();
            modelBuilder.Entity<SamlIdentityProvider>().Property(e => e.AllowUnsolicitedAuthnResponse).IsRequired();
            modelBuilder.Entity<SamlIdentityProvider>().Property(e => e.MetadataLocation).HasMaxLength(511).IsOptional();
            modelBuilder.Entity<SamlIdentityProvider>().Property(e => e.WantAuthnRequestsSigned).IsRequired();
            modelBuilder.Entity<SamlIdentityProvider>().Property(e => e.SigningCertificate).IsRequired();
            modelBuilder.Entity<SamlIdentityProvider>().HasMany(e => e.SamlIdPUserInfoes).WithRequired(e => e.SamlIdP).HasForeignKey(e => e.SamlIdP_Id);

            modelBuilder.Entity<SamlIdPUserInfo>().HasRequired(e => e.SamlIdP).WithMany(e => e.SamlIdPUserInfoes).HasForeignKey(p => p.SamlIdP_Id).WillCascadeOnDelete(true);
            modelBuilder.Entity<SamlIdPUserInfo>().Property(e => e.SamlIdP_Id)
                .HasColumnAnnotation(IndexAnnotation.AnnotationName, new IndexAnnotation(new[]
                {
                    new IndexAttribute("IX_SamlIdP_Id"),
                    new IndexAttribute("UI_SamlIdPUserInfo_SamlIdP_Id_User_Id", 1) { IsUnique = true }
                }));
            modelBuilder.Entity<SamlIdPUserInfo>().HasRequired(e => e.User).WithMany(e => e.SamlIdPUserInfoes).HasForeignKey(p => p.User_Id).WillCascadeOnDelete(true);
            modelBuilder.Entity<SamlIdPUserInfo>().Property(e => e.User_Id)
               .HasColumnAnnotation(IndexAnnotation.AnnotationName, new IndexAnnotation(new[] {
                    new IndexAttribute("IX_User_Id"),
                    new IndexAttribute("UI_SamlIdPUserInfo_SamlIdP_Id_User_Id", 2) { IsUnique = true }
               }));

            modelBuilder.Entity<SamlServiceProvider>().Property(e => e.AssertionConsumerServiceUrl).IsRequired().HasMaxLength(511)
                .HasColumnAnnotation(IndexAnnotation.AnnotationName, new IndexAnnotation(new[]
                {
                    new IndexAttribute("IX_AscUrl") { IsUnique = true }
                }));
            modelBuilder.Entity<SamlServiceProvider>().Property(e => e.Issuer).IsRequired().HasMaxLength(511);
            modelBuilder.Entity<SamlServiceProvider>().HasMany(e => e.Users).WithMany(e => e.AllowedSamlServiceProviders).Map(m => m.ToTable("UserSamlSPs"));

            modelBuilder.Entity<Company>().Property(e => e.Name).IsRequired();
            modelBuilder.Entity<Company>().Property(e => e.LogoUrl).IsRequired();
            modelBuilder.Entity<Company>().Property(e => e.PublishCourseApiUrl).IsRequired();
            modelBuilder.Entity<Company>().Property(e => e.SecretKey).IsRequired();
            modelBuilder.Entity<Company>().Property(e => e.HideDefaultPublishOptions).IsRequired();
            modelBuilder.Entity<Company>().Property(e => e.Priority).IsRequired();
            modelBuilder.Entity<Company>().HasMany(e => e.Users).WithMany(e => e.CompaniesCollection).Map(m => m.ToTable("CompanyUsers"));
            modelBuilder.Entity<Company>().HasMany(e => e.CompanyCourses).WithMany(e => e.CourseCompanies).Map(m => m.ToTable("CompanyCourses"));
            modelBuilder.Entity<Company>().HasMany(e => e.CompanyLearningPaths).WithMany(e => e.LearningPathCompanies).Map(m => m.ToTable("CompanyLearningPaths"));

            modelBuilder.Entity<Scenario>().Property(e => e.ProjectId);
            modelBuilder.Entity<Scenario>().Property(e => e.EmbedCode);
            modelBuilder.Entity<Scenario>().Property(e => e.EmbedUrl);
            modelBuilder.Entity<Scenario>().Property(e => e.ProjectArchiveUrl);
            modelBuilder.Entity<Scenario>().Property(e => e.MasteryScore);
            modelBuilder.Entity<Scenario>().Map(m => m.ToTable("ScenarioQuestions"));

            modelBuilder.Entity<Organization>().Property(e => e.Title).IsRequired().HasMaxLength(256);
            modelBuilder.Entity<Organization>().Property(e => e.EmailDomains).IsOptional().HasMaxLength(256);
            modelBuilder.Entity<Organization>().HasMany(e => e.UserCollection).WithRequired(e => e.Organization).WillCascadeOnDelete(true);

            modelBuilder.Entity<OrganizationSettings>().HasRequired(e => e.Organization).WithOptional(c => c.Settings).WillCascadeOnDelete(true);
            modelBuilder.Entity<OrganizationSettings>().Property(e => e.AccessType).IsOptional();
            modelBuilder.Entity<OrganizationSettings>().Property(e => e.ExpirationDate).IsOptional();
            modelBuilder.Entity<OrganizationSettings>().HasMany(e => e.TemplateCollection).WithMany(e => e.OrganizationSettingsCollection).Map(m => m.ToTable("OrganizationSettingsTemplates"));

            modelBuilder.Entity<OrganizationUser>().HasRequired(e => e.Organization);
            modelBuilder.Entity<OrganizationUser>().Property(e => e.Email).IsRequired().HasMaxLength(254);
            modelBuilder.Entity<OrganizationUser>().Property(e => e.IsAdmin).IsRequired();
            modelBuilder.Entity<OrganizationUser>().Property(e => e.Status).IsRequired();

            base.OnModelCreating(modelBuilder);
        }

        public void Save()
        {
            SaveChanges();

            foreach (DbEntityEntry entry in ChangeTracker.Entries<EventRaiseable>())
            {
                var entity = entry.Entity as EventRaiseable;
                if (entity == null)
                {
                    continue;
                }

                var @event = entity.DequeueEvent();
                while (@event != null)
                {
                    var method = typeof(IDomainEventPublisher).GetMethod("Publish").MakeGenericMethod(@event.GetType());
                    method.Invoke(_publisher, new object[] { @event });

                    @event = entity.DequeueEvent();
                }
            }
        }

        public override int SaveChanges()
        {
            try
            {
                foreach (DbEntityEntry entry in ChangeTracker.Entries<Entity>())
                {
                    if ((entry.Entity is TextMatchingAnswer) && (entry.Entity as TextMatchingAnswer).Question == null)
                    {
                        entry.State = EntityState.Deleted;
                    }
                    if ((entry.Entity is SingleSelectImageAnswer) && (entry.Entity as SingleSelectImageAnswer).Question == null)
                    {
                        entry.State = EntityState.Deleted;
                    }
                    if ((entry.Entity is Dropspot) && (entry.Entity as Dropspot).Question == null)
                    {
                        entry.State = EntityState.Deleted;
                    }
                    if ((entry.Entity is HotSpotPolygon) && (entry.Entity as HotSpotPolygon).Question == null)
                    {
                        entry.State = EntityState.Deleted;
                    }
                    if ((entry.Entity is Answer) && (entry.Entity as Answer).Question == null)
                    {
                        entry.State = EntityState.Deleted;
                    }
                    if ((entry.Entity is BlankAnswer) && (entry.Entity as BlankAnswer).Question == null)
                    {
                        entry.State = EntityState.Deleted;
                    }
                    if ((entry.Entity is RankingTextAnswer) && (entry.Entity as RankingTextAnswer).Question == null)
                    {
                        entry.State = EntityState.Deleted;
                    }
                    if ((entry.Entity is LearningContent) && (entry.Entity as LearningContent).Question == null)
                    {
                        entry.State = EntityState.Deleted;
                    }
                    if ((entry.Entity is Question) && (entry.Entity as Question).Section == null)
                    {
                        entry.State = EntityState.Deleted;
                    }
                    if ((entry.Entity is Ticket) && (entry.Entity as Ticket).User == null)
                    {
                        entry.State = EntityState.Deleted;
                    }
                    if ((entry.Entity is CourseCollaborator) && (entry.Entity as CourseCollaborator).Course == null)
                    {
                        entry.State = EntityState.Deleted;
                    }
                    if ((entry.Entity is Comment) && (entry.Entity as Comment).Course == null)
                    {
                        entry.State = EntityState.Deleted;
                    }
                    if ((entry.Entity is Theme) && (entry.Entity as Theme).Template == null)
                    {
                        entry.State = EntityState.Deleted;
                    }
                    if ((entry.Entity is OrganizationUser) && (entry.Entity as OrganizationUser).Organization == null)
                    {
                        entry.State = EntityState.Deleted;
                    }
                    if ((entry.Entity is CourseAccessControlListEntry) && (entry.Entity as CourseAccessControlListEntry).Course == null)
                    {
                        entry.State = EntityState.Deleted;
                    }
                }

                return base.SaveChanges();
            }
            catch (DbEntityValidationException exception)
            {
                foreach (var validationErrors in exception.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        Debug.WriteLine("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage);
                    }
                }
                throw;
            }

        }
    }
}
