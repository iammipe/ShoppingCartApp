using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Shop.Repository.Configuration
{
    public class UserRoleSeed
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserRoleSeed(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }

        public async void Seed()
        {
            if(await _roleManager.FindByNameAsync("Member") == null)
                await _roleManager.CreateAsync(new IdentityRole { Name = "Member" });
            if (await _roleManager.FindByNameAsync("Admin") == null)
                await _roleManager.CreateAsync(new IdentityRole { Name = "Admin" });
            if (await _roleManager.FindByNameAsync("Employee") == null)
                await _roleManager.CreateAsync(new IdentityRole { Name = "Employee" });
        }
    }
}
