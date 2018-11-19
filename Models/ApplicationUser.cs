using Microsoft.AspNetCore.Identity;

namespace Shop.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}
