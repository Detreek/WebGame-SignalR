using WebApplication1.Models;

namespace WebApplication1.Service
{
    public class GameService
    {
        // Состояние игры
        private readonly object _lock = new();
        public GameState GameState { get; } = new GameState();
        public const int tickRate = 30;
        public void MoveForward(string connectionId)
        {
            lock (_lock)
            {
                var p = GameState.players.Find(x => x.ConnectionId == connectionId);
                p.Pos += new Vector3d(Math.Cos(p.Rot.X), Math.Sin(p.Rot.X), 0) * tickRate * p.Speed;

            }
        }
        public void MoveBackward(string connectionId)
        {
            lock (_lock)
            {
                var p = GameState.players.Find(x => x.ConnectionId == connectionId);
                p.Pos -= new Vector3d(Math.Cos(p.Rot.X), Math.Sin(p.Rot.X), 0) * tickRate * p.Speed;

            }
        }
        public void MoveRight(string connectionId)
        {
            lock (_lock)
            {
                var p = GameState.players.Find(x => x.ConnectionId == connectionId);
                p.Pos += new Vector3d(Math.Cos(p.Rot.X - double.Pi / 2), Math.Sin(p.Rot.X - double.Pi / 2), 0) * tickRate * p.Speed;

            }
        }
        public void MoveLeft(string connectionId)
        {
            lock (_lock)
            {
                var p = GameState.players.Find(x => x.ConnectionId == connectionId);
                p.Pos += new Vector3d(Math.Cos(p.Rot.X + double.Pi / 2), Math.Sin(p.Rot.X + double.Pi / 2), 0)*tickRate * p.Speed; 
                

            }
        }

        public void CameraMove(string connectionId, double X,double Y)
        {
            lock (_lock) 
            {
                var p = GameState.players.Find(x => x.ConnectionId == connectionId);
                p.Rot = new Vector3d(X,Y,0);
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
