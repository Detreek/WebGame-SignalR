using Microsoft.AspNetCore.SignalR;
using WebApplication1.Models;
using WebApplication1.Service;

namespace WebApplication1.Hubs
{
    public class CustomHub : Hub
    {
        private readonly GameService _gameService;
        public CustomHub(GameService gameService)
        {
            _gameService = gameService;
        }

        public override Task OnConnectedAsync()
        {
            var connectionId = Context.ConnectionId;

            _gameService.AddPlayer(connectionId);

            return base.OnConnectedAsync();

        }
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var connectionId = Context.ConnectionId;
            _gameService.RemovePlayer(connectionId);

            return base.OnDisconnectedAsync(exception);
        }
        public async Task OnMove(Vector3d vector)
        {

            _gameService.MoveForward(Context.ConnectionId, vector);
            Console.WriteLine("Вперед");
            

        }
        public Task OnCameraMove(double X, double Y)
        {
            _gameService.CameraMove(Context.ConnectionId, X,Y);
            return Task.CompletedTask;
        }

    }
}
