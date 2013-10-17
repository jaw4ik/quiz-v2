﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace easygenerator.Web.Components.Configuration
{
    public class MailTemplate : ConfigurationElement
    {
        [ConfigurationProperty("name", IsRequired = true)]
        public string Name
        {
            get { return (string)base["name"]; }
            set { base["name"] = value; }
        }

        [ConfigurationProperty("from", IsRequired = true)]
        public string From
        {
            get { return (string)base["from"]; }
            set { base["from"] = value; }
        }

        [ConfigurationProperty("to", IsRequired = true)]
        public string To
        {
            get { return (string)base["to"]; }
            set { base["to"] = value; }
        }

        [ConfigurationProperty("subject", IsRequired = true)]
        public string Subject
        {
            get { return (string)base["subject"]; }
            set { base["subject"] = value; }
        }

        [ConfigurationProperty("cc", IsRequired = false)]
        public string Cc
        {
            get { return (string)base["cc"]; }
            set { base["cc"] = value; }
        }

        [ConfigurationProperty("bcc", IsRequired = false)]
        public string Bcc
        {
            get { return (string)base["bcc"]; }
            set { base["bcc"] = value; }
        }

        [ConfigurationProperty("viewPath", IsRequired = false)]
        public string ViewPath
        {
            get { return (string)base["viewPath"]; }
            set { base["viewPath"] = value; }
        }
    }
}
