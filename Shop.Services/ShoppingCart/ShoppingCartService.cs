using Shop.Repository.Repository;
using Microsoft.AspNetCore.Http;
using Shop.Services.Discounts;
using Shop.Entities.Models;
using Shop.Entities.DTO;
using Shop.Extensions;
using System.Linq;
using System;

namespace Shop.Services
{
    public class ShoppingCartService : IShoppingCartService
    {
        private IProductRepository _productsRepo;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private ShoppingCart _shoppingCart;
        private const string _shoppingCartKey = "Shopping_Cart";

        public ShoppingCartService(IProductRepository productRepository, IHttpContextAccessor httpContextAccessor)
        {
            _productsRepo = productRepository;
            _httpContextAccessor = httpContextAccessor;

            _shoppingCart = _httpContextAccessor.HttpContext.Session.GetObjectFromJson<ShoppingCart>(_shoppingCartKey);
        }

        public ShoppingCart GetShoppingCart() => _shoppingCart;

        public int GetNumberOfItemsInTheCart()
        {
            return _shoppingCart.ShoppingCartItems.Count();
        }

        public string AddItem(int id)
        {
            var shoppingCartItem = GetShoppingCartItem(id);
            if (shoppingCartItem != null)
            {
                shoppingCartItem.Quantity++;
            }
            else
            {
                shoppingCartItem = ShoppingCartItemDTO.Create(
                    _productsRepo.GetById(id),
                    1
                );
                _shoppingCart.ShoppingCartItems.Add(shoppingCartItem);
            }
            CalculatePrice();
            SaveShoppingCartToSession();
            return shoppingCartItem.Product.Name;
        }

        public void RemoveItem(int id)
        {
            var itemToRemove = GetShoppingCartItem(id);
            if (itemToRemove == null) return;
            _shoppingCart.ShoppingCartItems.Remove(itemToRemove);
            CalculatePrice();
            SaveShoppingCartToSession();
        }

        public void UpdateItemQuantity (int id, int quantity)
        {
            var itemToUpdate = GetShoppingCartItem(id);
            if (itemToUpdate == null) return;
            itemToUpdate.Quantity = quantity;
            CalculatePrice();
            SaveShoppingCartToSession();
        }

        private void SaveShoppingCartToSession()
        {
            _httpContextAccessor.HttpContext.Session.SetObjectAsJson<ShoppingCart>(_shoppingCartKey, _shoppingCart);
        }

        public void CalculatePrice()
        {
            CalculatePriceWithoutDiscount();
            CalculateDiscount();
            CalculateTotal();
        }

        private ShoppingCartItemDTO GetShoppingCartItem(int id)
            => _shoppingCart.ShoppingCartItems.FirstOrDefault(p => p.Product.ID == id);

        private void CalculateDiscount()
            => _shoppingCart.Discount = new DiscountsService().GetTotalDiscount(_shoppingCart);

        private void CalculateTotal()
            => _shoppingCart.Total = Math.Round(_shoppingCart.PriceWithoutDiscount - _shoppingCart.Discount, 2);

        private void CalculatePriceWithoutDiscount()
        {
            double priceWithoutDiscount = 0.00;

            foreach(var item in _shoppingCart.ShoppingCartItems)
            {
                priceWithoutDiscount += item.Quantity * item.Product.Price;
            }

            _shoppingCart.PriceWithoutDiscount = Math.Round(priceWithoutDiscount, 2);
        }
    }
}
