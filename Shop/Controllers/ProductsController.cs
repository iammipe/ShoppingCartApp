using Microsoft.AspNetCore.Mvc;

namespace Shop.Controllers
{
    public class ProductsController : Controller
    {
        public IActionResult Index() => View();
    }
}
