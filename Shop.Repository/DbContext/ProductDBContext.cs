using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Shop.Entities.Models;

namespace Shop.Repository.DbContext
{
    public class ProductDBContext : IdentityDbContext<ApplicationUser>
    {
        public ProductDBContext(DbContextOptions<ProductDBContext> options): base(options) { }
        public DbSet<Product> Products { get; set; }
    }
}
