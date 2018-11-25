using Shop.Repository.Repository;
using Shop.Entities.DTO;
using System.Linq;

namespace Shop.Services.Product
{
    public class ProductService : IProductService
    {
        private IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository) 
            => _productRepository = productRepository;

        public ProductQuantityDTO GetAllProductsAndNumberOfItemsInShoppingCart(int productsQuantity) 
            => new ProductQuantityDTO
            {
                Products = _productRepository.GetAll().OrderBy(p => p.ID).ToList(),
                NumberOfProductsInShoppingBag = productsQuantity
            };

        public ProductQuantityDTO GetTopProductsAndNumberOfItemsInShoppingCart(int productsQuantity)
            => new ProductQuantityDTO
            {
                Products = _productRepository.GetAll().Where(p => p.IsTopProduct == true).OrderBy(p => p.ID).ToList(),
                NumberOfProductsInShoppingBag = productsQuantity
            };

        public ProductQuantityDTO GetSearchedProductsAndNumberOfItemsInShoppingCart(int productsQuantity, string searchedData)
        {
            if( searchedData == null || searchedData == "")
            {
                return new ProductQuantityDTO
                {
                    Products = _productRepository.GetAll().OrderBy(p => p.ID).ToList(),
                    NumberOfProductsInShoppingBag = productsQuantity
                };
            }
            else
            {
                return new ProductQuantityDTO
                {
                    Products = _productRepository.GetAll().Where(p => p.Name.ToLower().Contains(searchedData)).OrderBy(p => p.ID).ToList(),
                    NumberOfProductsInShoppingBag = productsQuantity
                };
            }
        }
    }
}