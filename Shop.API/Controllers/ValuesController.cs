using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Shop.API.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        [HttpGet]
        [Route("Index")]
        public IEnumerable<string> Index()
        {
            return new string[] { "value1", "value2" };
        }

        public IActionResult Main()
        {
            return View();
        }
    }
}