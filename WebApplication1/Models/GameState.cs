namespace WebApplication1.Models
{
    public class GameState
    {
        public List<Player> players { get; set; }
        public GameState() 
        {
            players = new List<Player>();
        }
    } // snapshot
}
