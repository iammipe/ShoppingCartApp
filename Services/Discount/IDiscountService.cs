using Shop.Models;

namespace Shop.Services.Discounts
{
    interface IDiscountService
    {
        double GetTotalDiscount(ShoppingCart shoppingCart);
    }
}
