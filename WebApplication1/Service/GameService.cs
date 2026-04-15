using WebApplication1.Models;

namespace WebApplication1.Service
{
    public class GameService
    {
        // Состояние игры
        private readonly object _lock = new();
        public GameState GameState { get; } = new GameState();
        public const int tickRate = 30;
        public void MoveForward(string connectionId, Vector3d vector)
        {
            lock (_lock)
            {
                var p = GameState.players.Find(x => x.ConnectionId == connectionId);
                p.Pos +=  vector.Normalize() * tickRate * p.Speed;

            }
        }
        public void CameraMove(string connectionId, double X,double Y)
        {
            lock (_lock) 
            {
                var p = GameState.players.Find(x => x.ConnectionId == connectionId);
                p.AngleX = X; p.AngleY = Y;
            }
        }

        public void AddPlayer(string connectionId)
        {
            Player player = new Player();
            player.ConnectionId = connectionId;

            lock (_lock) 
            {
                
                GameState.players.Add(player);
            }
        }
        public void RemovePlayer(string connectionId)
        {

            lock (_lock) 
            {
               var player =  GameState.players.Find(x =>  x.ConnectionId == connectionId);
               GameState.players.Remove(player);
            }
            
        }

    }
}
