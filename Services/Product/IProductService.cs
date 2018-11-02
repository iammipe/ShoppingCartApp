using Shop.ViewModel;

namespace Shop.Services.Product
{
    public interface IProductService
    {
        ProductQuantityViewModel GetAllProductsAndNumberOfItemsInShoppingCart(int productsQuantity);
        ProductQuantityViewModel GetTopProductsAndNumberOfItemsInShoppingCart(int productsQuantity);
        ProductQuantityViewModel GetSearchedProductsAndNumberOfItemsInShoppingCart(int productsQuantity, string searchedData);
    }
}
