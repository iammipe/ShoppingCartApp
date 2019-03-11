using Shop.Repository.Repository;
using Shop.Entities.DTO;
using Shop.Entities.Models;
using System.Linq;
using System.Collections.Generic;

namespace Shop.Services.Product
{
    public class ProductService : IProductService
    {
        private IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository) 
            => _productRepository = productRepository;

        public List<Shop.Entities.Models.Product> GetAllProducts() => _productRepository.GetAll();

        public ProductQuantityDTO GetAllProductsAndNumberOfItemsInShoppingCart(int productsQuantity) 
            => new ProductQuantityDTO
            {
                Products = _productRepository.GetAll().OrderBy(p => p.Name).ToList(),
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

        public bool SetTopProducts(int id)
        {
            return _productRepository.ChangeTopProduct(id);
        }

        public void DeleteProduct(int id)
        {
            _productRepository.DeleteProduct(id);
        }

        public void AddNewProduct(string name, double price, string url)
        {
            _productRepository.AddNewProduct(name, price, url);
        }

        public void EditProduct(int id, string name, double price, string url)
        {
            _productRepository.AddNewProduct(id, name, price, url);
        }
    }
}