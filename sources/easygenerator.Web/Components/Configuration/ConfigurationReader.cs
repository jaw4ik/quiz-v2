﻿using System.Configuration;

namespace easygenerator.Web.Components.Configuration
{
    public class ConfigurationReader
    {
        public virtual FileStorageConfigurationSection FileStorageConfiguration
        {
            get
            {
                return ConfigurationManager.GetSection("FileStorage") as FileStorageConfigurationSection;
            }
        }

        public virtual MailSenderConfigurationSection MailSenderConfiguration
        {
            get
            {
                return ConfigurationManager.GetSection("mailSender") as MailSenderConfigurationSection;
            }
        }

        public virtual int PasswordRecoveryExpirationInterval
        {
            get
            {
                return int.Parse(ConfigurationManager.AppSettings["PasswordRecoveryTicketExpirationInterval"]);
            }
        }

        public virtual MailChimpConfigurationSection MailChimpConfiguration
        {
            get
            {
                return ConfigurationManager.GetSection("mailChimp") as MailChimpConfigurationSection;
            }
        }

        public virtual int TrialStarterPlanPeriod
        {
            get
            {
                return int.Parse(ConfigurationManager.AppSettings["TrialStarterPlanPeriod"]);
            }
        }

    }
}