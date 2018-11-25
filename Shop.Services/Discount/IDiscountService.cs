using Shop.Entities.Models;


namespace Shop.Services.Discounts
{
    interface IDiscountService
    {
        double GetTotalDiscount(ShoppingCart shoppingCart);
    }
}
