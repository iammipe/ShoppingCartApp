using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using System;

namespace Shop.Extensions
{
    public static class SessionExtensions
    {
        public static void SetObjectAsJson<T>(this ISession session, string key, object value)
        {
            session.SetString(key, JsonConvert.SerializeObject(value));
        }

        public static T GetObjectFromJson<T>(this ISession session, string key)
        {
            var value = session.GetString(key);
            return value == null ? Activator.CreateInstance<T>() : JsonConvert.DeserializeObject<T>(value);
        }
    }
}
