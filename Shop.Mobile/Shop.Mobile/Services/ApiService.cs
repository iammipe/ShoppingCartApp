using Newtonsoft.Json;
using Shop.Mobile.ViewModels;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Shop.Mobile.Services
{
    class ApiService
    {
        public async Task<HttpResponseMessage> RegisterNewUser(string name, string surname, string email, string password, string repeatPassword)
        {
            var client = new HttpClient();

            var model = new RegisterNewUserViewModel
            {
                Name = name,
                Surname = surname,
                Email = email,
                Password = password,
                RepeatPassword = repeatPassword
            };

            var json = JsonConvert.SerializeObject(model);

            HttpContent content = new StringContent(json);
            content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");
            var response = await client.PostAsync("http://localhost:56394/api/account/register", content);

            return response;
        }

        public async Task<HttpResponseMessage> LoginUser(string email, string password)
        {
            var client = new HttpClient();

            var keyValuePairs = new Dictionary<string, string>
            {
                { "Email", email },
                { "Password", password },
                { "grant_type", "password" }
            };

            var content = new FormUrlEncodedContent(keyValuePairs);

            Debug.WriteLine("Mislav pezo debug");
            var response = await client.PostAsync("http://localhost:56394/api/Account/Login", content);

            Debug.WriteLine(response);
            return response;

        }
    }
}
