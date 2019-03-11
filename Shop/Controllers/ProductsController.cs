using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shop.Services.Product;

namespace Shop.Controllers
{
    [Authorize(Roles = "Admin, Employee")]
    public class ProductsController : Controller
    {
        IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [AllowAnonymous]
        public IActionResult Index() => View();

        public IActionResult Edit() => View();

        public bool SetTopProduct(int id) => _productService.SetTopProducts(id);

        public void DeleteProduct(int id) => _productService.DeleteProduct(id);

        public void AddNewProduct(string name, double price, string url) => _productService.AddNewProduct(name, price, url);

        public void EditProduct(int id, string name, double price, string url) => _productService.EditProduct(id, name, price, url);


    }
}
