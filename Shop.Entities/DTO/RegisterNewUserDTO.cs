using System;
using System.Collections.Generic;
using System.Text;

namespace Shop.Entities.DTO
{
    public class RegisterNewUserDTO
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string RepeatPassword { get; set; }
    }
}
