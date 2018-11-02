using Shop.Models;
using System;

namespace Shop.Services
{
    public interface IShoppingCartService
    {
        String AddItem(int id);
        ShoppingCart GetShoppingCart();
        void RemoveItem(int id);
        void UpdateItemQuantity(int id, int quantity);
        int GetNumberOfItemsInTheCart();
        void CalculatePrice();
    }
}
