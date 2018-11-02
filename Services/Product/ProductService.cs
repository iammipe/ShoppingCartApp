using Shop.Repository;
using Shop.ViewModel;
using System.Linq;

namespace Shop.Services.Product
{
    public class ProductService : IProductService
    {
        private IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository) 
            => _productRepository = productRepository;

        public ProductQuantityViewModel GetAllProductsAndNumberOfItemsInShoppingCart(int productsQuantity) 
            => new ProductQuantityViewModel
            {
                Products = _productRepository.GetAll().OrderBy(p => p.ID).ToList(),
                NumberOfProductsInShoppingBag = productsQuantity
            };

        public ProductQuantityViewModel GetTopProductsAndNumberOfItemsInShoppingCart(int productsQuantity)
            => new ProductQuantityViewModel
            {
                Products = _productRepository.GetAll().Where(p => p.IsTopProduct == true).OrderBy(p => p.ID).ToList(),
                NumberOfProductsInShoppingBag = productsQuantity
            };

        public ProductQuantityViewModel GetSearchedProductsAndNumberOfItemsInShoppingCart(int productsQuantity, string searchedData)
        {
            if( searchedData == null || searchedData == "")
            {
                return new ProductQuantityViewModel
                {
                    Products = _productRepository.GetAll().OrderBy(p => p.ID).ToList(),
                    NumberOfProductsInShoppingBag = productsQuantity
                };
            }
            else
            {
                return new ProductQuantityViewModel
                {
                    Products = _productRepository.GetAll().Where(p => p.Name.ToLower().Contains(searchedData)).OrderBy(p => p.ID).ToList(),
                    NumberOfProductsInShoppingBag = productsQuantity
                };
            }
        }
    }
}