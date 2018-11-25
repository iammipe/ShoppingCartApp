using Microsoft.AspNetCore.Mvc;
using Shop.Services;
using Shop.Entities.Models;
using Microsoft.AspNetCore.Authorization;

namespace Shop.Controllers
{
    [Authorize]
    public class CartController : Controller
    {
        IShoppingCartService _shoppingCartService;

        public CartController(IShoppingCartService _services) => this._shoppingCartService = _services;

        public IActionResult Index() => View();

        public ShoppingCart GetShoppingCart() => _shoppingCartService.GetShoppingCart();

        public string AddToCart(int id) => _shoppingCartService.AddItem(id);

        public void RemoveFromCart(int id) => _shoppingCartService.RemoveItem(id);

        public void UpdateItemQuantity(int id, int quantity) => _shoppingCartService.UpdateItemQuantity(id, quantity);
    }
}