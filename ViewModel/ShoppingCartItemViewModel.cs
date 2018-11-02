using Shop.Models;

namespace Shop.ViewModel
{
    public class ShoppingCartItemViewModel
    {
        public Product Product { get; set; }
        public int Quantity { get; set; }

        public static ShoppingCartItemViewModel Create(Product product, int quantity) => new ShoppingCartItemViewModel
        {
            Product = product,
            Quantity = quantity
        };
    }
}
