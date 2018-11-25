using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Shop.Entities.ViewModel;
using Shop.Entities.Models;

namespace Shop.Controllers
{
    public class RegisterController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public RegisterController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public IActionResult Index() => View();

        public async Task<IActionResult> NewUser(RegisterNewUserViewModel vm)
        {
            if (ModelState.IsValid)
            {
                var newUser = new ApplicationUser { UserName = vm.Email, Email = vm.Email, Name = vm.Name, Surname = vm.Surname };
                var result = await _userManager.CreateAsync(newUser, vm.Password);

                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(newUser, false);
                }
                else
                {
                    foreach( var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }

            return Content("task completed");
        }
    }
}
