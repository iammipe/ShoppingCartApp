using Shop.Entities.Models;

namespace Shop.Entities.DTO
{
    public class ShoppingCartItemDTO
    {
        public Product Product { get; set; }
        public int Quantity { get; set; }

        public static ShoppingCartItemDTO Create(Product product, int quantity) => new ShoppingCartItemDTO
        {
            Product = product,
            Quantity = quantity
        };
    }
}
