using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Shop.Repository.DbContext;
using Shop.Services.Product;
using Shop.Entities.Models;
using Microsoft.AspNetCore.Authorization;

namespace Shop.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        IProductService _productService;

        public ProductsController(IProductService productService) => _productService = productService;
        
        [HttpGet]
        [Route("GetAllData")]
        public List<Product> GetAllData() => _productService.GetAllProducts();
    }
}
