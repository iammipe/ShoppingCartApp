using System;
using System.Collections.Generic;
using System.Text;

namespace Shop.Mobile.ViewModels
{
    public class LoginTokenViewModel
    {
        public string token { get; set; }
        public string expiration { get; set; }
        public string email { get; set; }
    }
}
