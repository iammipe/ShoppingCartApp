using System.Collections.Generic;
using Shop.Entities.Models;

namespace Shop.Repository.Repository
{
    public interface IProductRepository
    {
        List<Product> GetAll();
        Product GetById(int id);
    }
}
