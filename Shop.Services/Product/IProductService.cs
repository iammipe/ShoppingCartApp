using Shop.Entities.DTO;
using System.Collections.Generic;

namespace Shop.Services.Product
{
    public interface IProductService
    {
        ProductQuantityDTO GetAllProductsAndNumberOfItemsInShoppingCart(int productsQuantity);
        ProductQuantityDTO GetTopProductsAndNumberOfItemsInShoppingCart(int productsQuantity);
        ProductQuantityDTO GetSearchedProductsAndNumberOfItemsInShoppingCart(int productsQuantity, string searchedData);
        List<Shop.Entities.Models.Product> GetAllProducts();
        bool SetTopProducts(int id);
        void DeleteProduct(int id);
        void AddNewProduct(string name, double price, string url);
        void EditProduct(int id, string name, double price, string url);
    }
}
