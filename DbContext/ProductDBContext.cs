using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Shop.Models;

namespace Shop.Data
{
    public class ProductDBContext : IdentityDbContext<ApplicationUser>
    {
        public ProductDBContext(DbContextOptions<ProductDBContext> options): base(options) { }
        public DbSet<Product> Products { get; set; }
    }
}
