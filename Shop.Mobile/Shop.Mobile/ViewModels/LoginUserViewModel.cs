using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Shop.Mobile.Services;
using Shop.Mobile.Views;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;

namespace Shop.Mobile.ViewModels
{
    public class LoginUserViewModel : INotifyPropertyChanged
    {
        ApiService _service = new ApiService();
        public INavigation Navigation { get; set; }
        public event PropertyChangedEventHandler PropertyChanged;
        public LoginUserViewModel(INavigation navigation) => this.Navigation = navigation;

        public string Email { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
        public string Message { get; set; }

        public ICommand LoginCommand
        {
            get
            {
                return new Command(async () =>
                {
                    var loginResponse = await _service.LoginUser(Email, Password);

                   
                    if (loginResponse.IsSuccessStatusCode)
                    {
                        Application.Current.MainPage = new TabbedPage()
                        {
                            Children =
                            {
                                new Products(),
                                new Cart()
                                // add MyProfile
                            }
                        };
                    }
                    else
                    {
                        Message = "Please login with correct data.";
                        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs("Message"));
                    }
                });
            }
        }
    }
}
