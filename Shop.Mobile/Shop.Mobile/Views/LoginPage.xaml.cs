using Newtonsoft.Json.Linq;
using Shop.Mobile.Services;
using Shop.Mobile.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Shop.Mobile.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class LoginPage : ContentPage
	{

		public LoginPage ()
		{
			InitializeComponent ();
            BindingContext = new LoginUserViewModel(Navigation);
        }

        private void Login_Clicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new RegisterPage());
        }
    }
}