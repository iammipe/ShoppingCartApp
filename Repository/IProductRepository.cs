using System.Collections.Generic;
using Shop.Models;

namespace Shop.Repository
{
    public interface IProductRepository
    {
        List<Product> GetAll();
        Product GetById(int id);
    }
}
