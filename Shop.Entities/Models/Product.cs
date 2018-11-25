namespace Shop.Entities.Models
{
    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string ImageURL { get; set; }
        public bool IsTopProduct { get; set; }
    }
}
