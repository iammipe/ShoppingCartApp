using Microsoft.AspNetCore.Mvc;

namespace Shop.Controllers
{
    public class ErrorsController : Controller
    {
        public IActionResult Index() => View();
    }
}
