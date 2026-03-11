namespace WebApplication1.Models
{
    public class Player : Entity
    {
        public int Hp { get; set; }
        public bool IsAlive { get; set; }
        public double Speed { get; set; } = 30;

        public string ConnectionId { get; set; }
        
        
    }
}
