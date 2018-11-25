using System.Collections.Generic;
using Shop.Entities.DTO;

namespace Shop.Entities.Models
{
    public class ShoppingCart
    {
        public List<ShoppingCartItemDTO> ShoppingCartItems { get; set; }
        public double PriceWithoutDiscount { get; set; }
        public double Discount { get; set; }
        public double Total { get; set; }

        public ShoppingCart() => ShoppingCartItems = new List<ShoppingCartItemDTO>();
    }
}
