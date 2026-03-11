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
        public Task OnForward()
        {
            _gameService.MoveForward(Context.ConnectionId);
            Console.WriteLine("Вперед");
            return Task.CompletedTask;

        }
        public Task OnBackward()
        {
            _gameService.MoveBackward(Context.ConnectionId);
            Console.WriteLine("Назад");
            return Task.CompletedTask;
        }
        public Task OnRightMove()
        {
            _gameService.MoveRight(Context.ConnectionId);
            Console.WriteLine("Направо");
            return Task.CompletedTask;
        }
        public Task OnLeftMove()
        {
            _gameService.MoveLeft(Context.ConnectionId);
            Console.WriteLine("Налево");
            return Task.CompletedTask;
        }
        public Task OnCameraMove(double X, double Y)
        {
            _gameService.CameraMove(Context.ConnectionId, X,Y);
            return Task.CompletedTask;
        }

    }
}
