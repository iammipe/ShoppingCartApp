using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Shop.Entities.Models;

namespace Shop.Web.Controllers
{
    public class UsersController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public List<ApplicationUser> GetMemberUsers()
        {
            return _userManager.GetUsersInRoleAsync("Member").Result.ToList();
        }

        public List<ApplicationUser> GetEmployeeUsers()
        {
            return _userManager.GetUsersInRoleAsync("Employee").Result.ToList();
        }

        public List<ApplicationUser> GetAdminUsers()
        {
            return _userManager.GetUsersInRoleAsync("Admin").Result.ToList();
        }

        public string CurrentUserRoleIsLoggedInAsync()
        {
            if( User.Identity.IsAuthenticated)
            {
                var user = _userManager.GetUserAsync(HttpContext.User);
                return _userManager.GetRolesAsync(user.Result).Result.FirstOrDefault();
            }
            else
            {
                return "Unauthorize";
            }
        }
    }
}