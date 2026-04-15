

using Microsoft.AspNetCore.SignalR;
using WebApplication1.Hubs;
using WebApplication1.Models;

namespace WebApplication1.Service
{
    public class StateService : BackgroundService 
    {
        private readonly IHubContext<CustomHub> _hubContext;
        private readonly GameService _gameService;
        
        public StateService(IHubContext<CustomHub> hubContext, GameService gameService)
        {
            _hubContext = hubContext;
            _gameService = gameService;
        }
        
        
        
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested) 
            {

                await _hubContext.Clients.All.SendAsync("snapshot",_gameService.GameState,stoppingToken);
                await Task.Delay(GameService.tickRate, stoppingToken);
            }
        }
    }

}
