using System;
using System.Collections.Generic;
using System.Text;
using Shop.Mobile.Models;
using System.Net.Http;
using System.Threading.Tasks;

namespace Shop.Mobile.Services
{
    class ProductService
    {
        public async Task<string> GetAllProducts()
        {
            var httpClient = new HttpClient();
            var response = await httpClient.GetAsync("http://localhost:56394/api/products/getalldata");
            var responseContent = response.Content;
            return responseContent.ReadAsStringAsync().Result;
        }
    }
}
