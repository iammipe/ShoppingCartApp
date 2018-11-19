using System.Collections.Generic;
using Shop.Models;

namespace Shop.ViewModel
{
    public class ProductQuantityViewModel
    {
        public List<Product> Products { get; set; }
        public int NumberOfProductsInShoppingBag { get; set; }

        public ProductQuantityViewModel() => Products = new List<Product>();
    }
}
