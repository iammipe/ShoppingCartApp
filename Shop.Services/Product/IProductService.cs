using Shop.Entities.DTO;

namespace Shop.Services.Product
{
    public interface IProductService
    {
        ProductQuantityDTO GetAllProductsAndNumberOfItemsInShoppingCart(int productsQuantity);
        ProductQuantityDTO GetTopProductsAndNumberOfItemsInShoppingCart(int productsQuantity);
        ProductQuantityDTO GetSearchedProductsAndNumberOfItemsInShoppingCart(int productsQuantity, string searchedData);
    }
}
