namespace WebApplication1.Models
{
    public class Vector3d
    {
        public double X { get; set; } = 0;
        public double Y { get; set; } = 0;
        public double Z { get; set; } = 0;

        public Vector3d(double x, double y, double z)
        {
            X = x;
            Y = y;
            Z = z;
        }
        public Vector3d()
        {

        }
        public static Vector3d operator +(Vector3d v1, Vector3d v2)
        {
            Vector3d vector = new Vector3d(v1.X + v2.X, v1.Y + v2.Y, v1.Z + v2.Z);
            return(vector);
        }
        public static Vector3d operator -(Vector3d v1, Vector3d v2)
        {
            Vector3d vector = new Vector3d( v1.X - v2.X, v1.Y - v2.Y, v1.Z - v2.Z);
            return (vector);
        }
        public static Vector3d operator -(Vector3d v1)
        {
            Vector3d vector = new Vector3d( -v1.X, -v1.Y, -v1.Z);
            return (vector);
        }
        public static Vector3d operator *(Vector3d v1, double num)
        {
            Vector3d vector = new Vector3d( v1.X * num, v1.Y * num, v1.Z * num);
            return (vector);
        }
        public static Vector3d operator /(Vector3d v1, double num)
        {
            Vector3d vector = new Vector3d(v1.X / num, v1.Y / num, v1.Z / num);
            return (vector);
        }
    }
}
