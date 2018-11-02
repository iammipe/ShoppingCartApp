using Shop.Models;
using System.Collections.Generic;

namespace Shop.ViewModel
{
    public class ProductQuantityViewModel
    {
        public List<Product> Products { get; set; }
        public int NumberOfProductsInShoppingBag { get; set; }

        public ProductQuantityViewModel() => Products = new List<Product>();
    }
}
