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

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseRouting();

            app.UseEndpoints(enpoints => 
            {
                enpoints.MapJs();
                enpoints.MapCss();
                enpoints.MapHtml();
                enpoints.MapImg();
            });
        }
    }
}
