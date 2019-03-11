using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Shop.Entities.Models;

namespace Shop.Web.Controllers
{

    [Authorize(Roles = "Admin")]
    public class PersonellController : Controller
    {

        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public PersonellController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }
        public IActionResult Index()
        {
            return View();
        }

        public async Task EditRole(string id, string role)
        {
            var user = _userManager.FindByIdAsync(id).Result;
            var oldRole = _userManager.GetRolesAsync(user).Result.FirstOrDefault();

            if(oldRole != role)
            {
                await _userManager.RemoveFromRoleAsync(user, oldRole);
                await _userManager.AddToRoleAsync(user, role);
            }
        }

        public async Task<string> EditUser(string id, string name, string surname, string email )
        {
            var user = _userManager.FindByIdAsync(id).Result;

            user.Name = name;
            user.Surname = surname;
            user.Email = email;
            user.UserName = email;

            await _userManager.UpdateAsync(user);

            return _userManager.GetRolesAsync(user).Result.FirstOrDefault();
        }

        public async Task<string> DeleteUser(string id)
        {
            var user = _userManager.FindByIdAsync(id).Result;
            var role = _userManager.GetRolesAsync(user).Result.FirstOrDefault();

            await _userManager.RemoveFromRoleAsync(user, role);
            await _userManager.DeleteAsync(user);

            return role;
        }
    }
}