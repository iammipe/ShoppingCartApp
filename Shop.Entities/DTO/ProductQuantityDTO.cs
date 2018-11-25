using System.Collections.Generic;
using Shop.Entities.Models;

namespace Shop.Entities.DTO
{
    public class ProductQuantityDTO
    {
        public List<Product> Products { get; set; }
        public int NumberOfProductsInShoppingBag { get; set; }

        public ProductQuantityDTO() => Products = new List<Product>();
    }
}

