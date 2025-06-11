using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.IO;
using System.Text;

namespace LifeSpot
{
    public static class EndpointMapper
    {
        /// <summary>
        /// Маппинг стилей
        /// </summary>
        /// <param name="builder"></param>
        public static void MapCss(this IEndpointRouteBuilder builder)
        {

            var cssFile = new[] { "index.css","StyleSheet.css" };

            foreach (var css in cssFile)
            {
                builder.MapGet($"/Static/CSS/{css}", async context =>
                {
                    var cssPath = Path.Combine(Directory.GetCurrentDirectory(),"Static","CSS",css);

                    var cssText = File.ReadAllTextAsync(cssPath).Result;

                    await context.Response.WriteAsync(cssText);
                });
            }
        }

        /// <summary>
        /// Маппинг картинок
        /// </summary>
        /// <param name="builder"></param>
        public static void MapImg(this IEndpointRouteBuilder builder)
        {
            var imgFile = new[] {"london.jpg","ny.jpg","spb.jpg"};

            foreach(var img in imgFile)
            {
                builder.MapGet($"/Static/Image/{img}", async context =>
                {
                    var imgPath = Path.Combine(Directory.GetCurrentDirectory(),"Static","Image",img);

                    await context.Response.SendFileAsync(imgPath);
                });
            }
        }

        /// <summary>
        /// Маппинг скриптов
        /// </summary>
        /// <param name="builder"></param>
        public static void MapJs(this IEndpointRouteBuilder builder)
        {

            var jsFile = new[] { "script.js", "scriptAbout.js", "testing.js","scriptforslider.js" };

            foreach(var js in jsFile)
            {
                builder.MapGet($"/Static/Scripts/{js}", async context =>
                {
                    var jsPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "Scripts", js);

                    var jsText = File.ReadAllTextAsync(jsPath).Result;

                    await context.Response.WriteAsync(jsText);
                });
            }
        }


        /// <summary>
        /// Маппинг не шардированных странц
        /// </summary>
        /// <param name="builder"></param>
        public static void MapHtml(this IEndpointRouteBuilder builder)
        {
            string footerHtml = GetSharedHtmlViews("footer.html");
            string sideBarHtml = GetSharedHtmlViews("sidebar.html");
            string modalHtml = GetSharedHtmlViews("modalFeedBack.html");
            string feedBack = GetSharedHtmlViews("feedback.html");
            string slider = GetSharedHtmlViews("slider.html");
            builder.MapGet("/", async context =>
            {
                var indexPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "index.html");

                var index = new StringBuilder(await File.ReadAllTextAsync(indexPath))
                .Replace("<!--FOOTER-->", footerHtml)
                .Replace("<!--SIDEBAR-->", sideBarHtml);

                await context.Response.WriteAsync(index.ToString());
            });

            builder.MapGet("/about", async context =>
            {
                var aboutPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "about.html");

                var about = new StringBuilder(await File.ReadAllTextAsync(aboutPath))
                .Replace("<!--FOOTER-->", footerHtml)
                .Replace("<!--MODAL-->", modalHtml)
                .Replace("<!--SIDEBAR-->", sideBarHtml)
                .Replace("<!--FEEDBACK-->", feedBack)
                .Replace("<!--SLIDER-->", slider);

                await context.Response.WriteAsync(about.ToString());
            });

            builder.MapGet("/testing", async context =>
            {
                var testingPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "testing.htnl");

                var testing = new StringBuilder(await File.ReadAllTextAsync(testingPath))
                .Replace("<!--FOOTER-->",footerHtml)
                .Replace("<!--SIDEBAR-->",sideBarHtml);

                await context.Response.WriteAsync(testing.ToString());
            });
  
        }

        public static string GetSharedHtmlViews(string sharedHtml)
        {
            return File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(),"Views","Shared",sharedHtml));
        }
    }
}
