using System.Collections.Generic;
using Shop.Entities.Models;

namespace Shop.Repository.Repository
{
    public interface IProductRepository
    {
        List<Product> GetAll();
        Product GetById(int id);
        bool ChangeTopProduct(int id);
        void DeleteProduct(int id);
        void AddNewProduct(string name, double price, string url);
        void AddNewProduct(int id, string name, double price, string url);
    }
}
