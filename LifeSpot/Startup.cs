using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.IO;
using System.Text;

namespace LifeSpot
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseRouting();

            // Загружаем отдельные элементы для вставки в шаблон: боковое меню и футер
            string footerHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "footer.html"));
            string sideBarHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "sideBar.html"));
            string modalHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "modalFeedBack.html"));
            string feedbackHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "feedBack.html"));

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/Static/Scripts/scriptAbout.js", async context =>
                {
                    var scriptPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "Scripts", "scriptAbout.js");
                    var script = await File.ReadAllTextAsync(scriptPath);
                    await context.Response.WriteAsync(script);
                });

                endpoints.MapGet("/Static/Scripts/testingJs.js", async context =>
                {
                    var scriptPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "Scripts", "testingJs.js");
                    var script = await File.ReadAllTextAsync(scriptPath);
                    await context.Response.WriteAsync(script);
                });

                endpoints.MapGet("/Static/Scripts/script.js", async context =>
                {
                    var scriptPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "Scripts", "script.js");
                    var script = await File.ReadAllTextAsync(scriptPath);
                    await context.Response.WriteAsync(script);
                });

                endpoints.MapGet("/Static/CSS/index.css", async context =>
                {
                    var cssPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "CSS", "index.css");
                    var script = await File.ReadAllTextAsync(cssPath);
                    await context.Response.WriteAsync(script);
                });
                endpoints.MapGet("/", async context =>
                {
                    var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "index.html");

                    // Загружаем шаблон страницы, вставляя в него элементы
                    var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                        .Replace("<!--SIDEBAR-->", sideBarHtml)
                        .Replace("<!--FOOTER-->", footerHtml);

                    await context.Response.WriteAsync(html.ToString());
                });

                endpoints.MapGet("/testing", async context =>
                {
                    var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "testing.html");

                    // Загружаем шаблон страницы, вставляя в него элементы
                    var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                        .Replace("<!--SIDEBAR-->", sideBarHtml)
                        .Replace("<!--FOOTER-->", footerHtml);

                    await context.Response.WriteAsync(html.ToString());
                });

                endpoints.MapGet("/about", async context =>
                {
                    var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "about.html");

                    // Загружаем шаблон страницы, вставляя в него элементы
                    var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                        .Replace("<!--FEEDBACK-->",feedbackHtml)
                        .Replace("<!--MODAL-->", modalHtml)
                        .Replace("<!--SIDEBAR-->", sideBarHtml)
                        .Replace("<!--FOOTER-->", footerHtml);

                    await context.Response.WriteAsync(html.ToString());
                });

            });
        }
    }
}
