
using Microsoft.AspNetCore.SignalR;
using WebApplication1.Hubs;
using WebApplication1.Service;

namespace WebApplication1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add SignalR services
            builder.Services.AddSignalR();
            builder.Services.AddSingleton<GameService>();
            builder.Services.AddHostedService<StateService>();
            
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()    // Разрешить любой домен (http, https, localhost)
                          .AllowAnyMethod()    // Разрешить любой HTTP метод (GET, POST, etc.)
                          .AllowAnyHeader();   // Разрешить любые заголовки
                });
            });

            var app = builder.Build();
            app.UseCors("AllowAll");
            
            // Map the hub endpoint
            app.MapHub<CustomHub>("/chathub");
            
            app.Run();
        }
    }
}
