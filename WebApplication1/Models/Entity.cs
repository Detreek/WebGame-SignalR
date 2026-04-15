namespace WebApplication1.Models
{
    public class Entity
    {
        public int Id { get; private set; }
        public string Name { get; set; }
        private List<HitBox> hitBoxes;

        public Vector3d Pos { get; set; } = new Vector3d();
        
        public double AngleX { get; set; }
        public double AngleY { get; set; }


    }
    
}
