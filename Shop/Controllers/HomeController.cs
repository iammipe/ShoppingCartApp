using Microsoft.AspNetCore.Mvc;
using Shop.Services.Product;
using Shop.Entities.ViewModel;
using Shop.Services;
using Shop.Entities.DTO;

namespace Shop.Controllers
{
    public class HomeController : Controller
    {
        IProductService _productService;
        IShoppingCartService _shoppingCartService;

        public HomeController(IProductService productService, IShoppingCartService shoppingCartService)
        {
            _productService = productService;
            _shoppingCartService = shoppingCartService;
        }

        public ProductQuantityDTO GetAllProducts() =>
            _productService.GetAllProductsAndNumberOfItemsInShoppingCart(_shoppingCartService.GetNumberOfItemsInTheCart());


        public ProductQuantityDTO GetTopProducts() =>
            _productService.GetTopProductsAndNumberOfItemsInShoppingCart(_shoppingCartService.GetNumberOfItemsInTheCart());

        public ProductQuantityDTO GetSearchedProducts(string userData) =>
            _productService.GetSearchedProductsAndNumberOfItemsInShoppingCart(_shoppingCartService.GetNumberOfItemsInTheCart(), userData);

        public IActionResult Index() => View();
    }
}
