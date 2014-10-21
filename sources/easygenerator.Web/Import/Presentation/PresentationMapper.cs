﻿using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Presentation;
using Shape = DocumentFormat.OpenXml.Presentation.Shape;
using Slide = easygenerator.Web.Import.Presentation.Model.Slide;

namespace easygenerator.Web.Import.Presentation
{
    public class PresentationMapper
    {
        public virtual Model.Presentation Map(Stream stream)
        {
            PresentationDocument document = null;
            try
            {
                document = PresentationDocument.Open(stream, false);
                if (document == null)
                {
                    return null;
                }

                var presentation = new Model.Presentation();

                if (document.PresentationPart == null || !document.PresentationPart.SlideParts.Any())
                {
                    return presentation;
                }

                MapSlides(document, presentation);

                return presentation;
            }
            catch
            {
                return null;
            }
            finally
            {
                if (document != null)
                {
                    document.Close();
                    document.Dispose();
                }
            }
        }

        private static void MapSlides(PresentationDocument document, Model.Presentation presentation)
        {
            foreach (var item in document.PresentationPart.Presentation.SlideIdList.Elements<SlideId>())
            {
                var slidePart = document.PresentationPart.GetPartById(item.RelationshipId) as SlidePart;

                if (slidePart == null)
                {
                    continue;
                }

                var slide = new Slide();
                foreach (var shape in slidePart.Slide.Descendants<DocumentFormat.OpenXml.Presentation.Shape>())
                {
                    var text = GetText(shape);
                    var position = ShapePositionReceiver.GetPosition(shape, slidePart);

                    slide.AddShape(new Model.Shape(text, position));
                }
                presentation.Slides.Add(slide);
            }
        }

        private static string GetText(Shape shape)
        {
            var sb = new StringBuilder();
            foreach (var paragraph in shape.Descendants<Paragraph>())
            {
                sb.Append("<p>");
                foreach (var element in paragraph.ChildElements)
                {
                    if (element is Run)
                    {
                        sb.Append(HttpUtility.HtmlEncode(element.InnerText));
                    }
                    if (element is Break)
                    {
                        sb.Append("</p><p>");
                    }
                }
                sb.AppendFormat("</p>");
            }
            return sb.ToString();
        }
    }
}