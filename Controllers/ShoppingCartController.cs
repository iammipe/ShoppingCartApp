using Microsoft.AspNetCore.Mvc;
using Shop.Models;
using Shop.Services;

namespace Shop.Controllers
{
    public class ShoppingCartController : Controller
    {
        IShoppingCartService _shoppingCartService;

        public ShoppingCartController(IShoppingCartService _services) => this._shoppingCartService = _services;

        public IActionResult Index() => View();

        public ShoppingCart GetShoppingCart() => _shoppingCartService.GetShoppingCart();

        public string AddToCart(int id) => _shoppingCartService.AddItem(id);

        public void RemoveFromCart(int id) => _shoppingCartService.RemoveItem(id);

        public void UpdateItemQuantity(int id, int quantity) => _shoppingCartService.UpdateItemQuantity(id, quantity);
    }
}
