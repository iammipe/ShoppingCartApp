using Shop.Mobile.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;

namespace Shop.Mobile.ViewModels
{
    class ProductsViewModel
    {
        ProductService _service = new ProductService();

        public int ID { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string ImageURL { get; set; }

        public ICommand GetProductsCommand
        {
            get
            {
                return new Command(async () =>
                {
                    var allProducts = await _service.GetAllProducts();
                });
            }
        }
    }
}
