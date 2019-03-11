using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using Shop.Mobile.Services;
using System.ComponentModel;
using System.Text.RegularExpressions;

namespace Shop.Mobile.ViewModels
{
    class RegisterNewUserViewModel : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;
        ApiService _service = new ApiService();

        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string RepeatPassword { get; set; }
        public string Message { get; set; }

        public ICommand RegisterCommand 
        {
            get{
                return new Command(async () =>
                {
                    var message = CheckModel();
                    if (message != null)
                    {
                        Message = message;
                        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs("Message"));
                        return;
                    }

                    var response = await _service.RegisterNewUser(Name, Surname, Email, Password, RepeatPassword);
                    if ((int)response.StatusCode == 200)
                        Message = "User is registered successfully";
                    else
                        Message = "Something went wrong. Please try again";
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs("Message"));
                });
            }
        }



        public string CheckModel()
        {
            Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
            Match match = regex.Match(Email);

            if (Password != RepeatPassword)
                return "Passwords do not match";
            else if (Name == "" || Name == null || Surname == "" || Surname == null)
                return "Type in correct name";
            else if (!match.Success)
                return "Type in correct email";
            else
                return null;
        }
    }
}
