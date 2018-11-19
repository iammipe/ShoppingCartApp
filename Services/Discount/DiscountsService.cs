using System.Linq;
using Shop.Models;
using Shop.Enums;
using System;

namespace Shop.Services.Discounts
{
    public class DiscountsService : IDiscountService
    {
        private const int REQUIREDNUMBEROFDAYTONATORECEIVEAFREEONE = 4;
        private const double PERCENTAGEDISCOUNTONEXPLORER = 0.5;
        private const int REQUIREDNUMBEROFKINGSTOGETDISCOUNTONEXPLORER = 2;

        private double totalDiscount = 0;

        public DiscountsService() { }

        public double GetTotalDiscount(ShoppingCart shoppingCart)
        {
            GetExplorerDiscount(shoppingCart);
            GetDaytonaDiscount(shoppingCart);

            return Math.Round(totalDiscount, 2); 
        }

        private void GetDaytonaDiscount(ShoppingCart shoppingCart)
        {
            var daytonaProductItem = shoppingCart.ShoppingCartItems
                .FirstOrDefault(item => item.Product.Name == ProductType.Daytona.ToString());
            if (daytonaProductItem != null)
                totalDiscount += GetFreeDaytonaCount(daytonaProductItem.Quantity) * daytonaProductItem.Product.Price;
        }

        private void GetExplorerDiscount(ShoppingCart shoppingCart)
        {
            var kingProductItem = shoppingCart.ShoppingCartItems
                .FirstOrDefault(item => item.Product.Name == ProductType.King.ToString());
            var explorerProductItem = shoppingCart.ShoppingCartItems
                .FirstOrDefault(item => item.Product.Name == ProductType.Explorer.ToString());
            if (kingProductItem == null || explorerProductItem == null) return;

            if (GetNumberOfExplorerForDiscount(kingProductItem.Quantity) > explorerProductItem.Quantity)
                totalDiscount += explorerProductItem.Quantity * explorerProductItem.Product.Price * PERCENTAGEDISCOUNTONEXPLORER;
            else
                totalDiscount += GetNumberOfExplorerForDiscount(kingProductItem.Quantity) * explorerProductItem.Product.Price * PERCENTAGEDISCOUNTONEXPLORER;
        }

        private int GetFreeDaytonaCount(int daytonaQuantityInCart) 
            => daytonaQuantityInCart / REQUIREDNUMBEROFDAYTONATORECEIVEAFREEONE;

        private int GetNumberOfExplorerForDiscount(int kingQuantityInCart) 
            => kingQuantityInCart / REQUIREDNUMBEROFKINGSTOGETDISCOUNTONEXPLORER;
    }
}
