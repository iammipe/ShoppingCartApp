using System.Collections.Generic;
using System.Linq;
using Shop.Entities.DTO;
using Shop.Entities.Models;
using Shop.Repository.DbContext;

namespace Shop.Repository.Repository
{
    public class ProductRepository : IProductRepository
    {
        private ProductDBContext _context;

        public ProductRepository(ProductDBContext context)
        {
            _context = context;
        }
        /*
        void MockData()
        {
            if (!_context.Products.Any())
            {
                _context.Add(new Product
                {
                    Name = "Explorer",
                    Price = 7700,
                    IsTopProduct = true,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m216570-0001.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "Day-Date 40",
                    Price = 33200,
                    IsTopProduct = true,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m228238-0042.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "Sky-Dweller",
                    Price = 46600,
                    IsTopProduct = true,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m228238-0042.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "DateJust 41",
                    Price = 9000,
                    IsTopProduct = true,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m126334-0014.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "Submariner Date",
                    Price = 12800,
                    IsTopProduct = true,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m116613lb-0005.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "Daytona",
                    Price = 16100,
                    IsTopProduct = true,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m116503-0004.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "King",
                    Price = 5900,
                    IsTopProduct = true,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m116900-0001.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "Sea-Dweller",
                    Price = 10800,
                    IsTopProduct = true,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m126600-0001.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "Cellini Moonphase",
                    Price = 25500,
                    IsTopProduct = true,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m50535-0002.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "Lady DateJust 28",
                    Price = 10600,
                    IsTopProduct = false,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m279173-0011.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "Pearl Master 39",
                    Price = 25700,
                    IsTopProduct = false,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m86285-0001.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "Oyster perpetual 39",
                    Price = 5400,
                    IsTopProduct = false,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m114300-0004.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "GMT Master II",
                    Price = 8800,
                    IsTopProduct = false,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m126710blro-0001.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "GMT Master III",
                    Price = 35000,
                    IsTopProduct = false,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m126715chnr-0001.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "Submariner I",
                    Price = 7000,
                    IsTopProduct = false,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m114060-0002.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "Day Date 36",
                    Price = 22500,
                    IsTopProduct = false,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m118135-0003.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "Yacht Master 40",
                    Price = 23800,
                    IsTopProduct = false,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m116655-0001.png?impolicy=upright-majesty"
                });
                _context.Add(new Product
                {
                    Name = "Cellini Time",
                    Price = 14500,
                    IsTopProduct = false,
                    ImageURL = "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m50509-0016.png?impolicy=upright-majesty"
                });
                _context.SaveChanges();
            }
        }
        */
        public List<Product> GetAll() => _context.Products.ToList();

        public Product GetById(int id) => _context.Products.FirstOrDefault(p => p.ID == id);

        public bool ChangeTopProduct(int id)
        {
            var isTopProduct = _context.Products.FirstOrDefault(p => p.ID == id).IsTopProduct;
            isTopProduct = !isTopProduct;
            _context.Products.FirstOrDefault(p => p.ID == id).IsTopProduct = isTopProduct;
            _context.SaveChanges();
            return isTopProduct;
        }

        public void DeleteProduct(int id)
        {
            var deletedProduct = _context.Products.FirstOrDefault(p => p.ID == id);
            _context.Remove(deletedProduct);
            _context.SaveChanges();
        }

        public void AddNewProduct(string name, double price, string url)
        {
            Product newProduct = new Product
            {
                Name = name,
                Price = price,
                ImageURL = url,
                IsTopProduct = false
            };

            _context.Add(newProduct);
            _context.SaveChanges();

        }

        public void AddNewProduct(int id, string name, double price, string url)
        {
            var editedProduct = _context.Products.FirstOrDefault(p => p.ID == id);
            editedProduct.Name = name;
            editedProduct.Price = price;
            editedProduct.ImageURL = url;

            _context.SaveChanges();
        }
    }
}