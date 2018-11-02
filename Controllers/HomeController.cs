using Microsoft.AspNetCore.Mvc;
using Shop.Services;
using Shop.Services.Product;
using Shop.ViewModel;

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

        public ProductQuantityViewModel GetAllProducts() =>
            _productService.GetAllProductsAndNumberOfItemsInShoppingCart(_shoppingCartService.GetNumberOfItemsInTheCart());


        public ProductQuantityViewModel GetTopProducts() =>
            _productService.GetTopProductsAndNumberOfItemsInShoppingCart(_shoppingCartService.GetNumberOfItemsInTheCart());

        public ProductQuantityViewModel GetSearchedProducts(string userData) =>
            _productService.GetSearchedProductsAndNumberOfItemsInShoppingCart(_shoppingCartService.GetNumberOfItemsInTheCart(), userData);

        public IActionResult Index() => View();
        public IActionResult Products() => View();
        public IActionResult Login() => View();
        public IActionResult Registration() => View();
        public IActionResult Categories() => View();
        
        public IActionResult Test() => View();
    }
}
