using System;
using System.Collections.Generic;
using System.Text;

namespace Shop.Mobile.Models
{
    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string ImageURL { get; set; }
        public bool IsTopProduct { get; set; }
    }
}
