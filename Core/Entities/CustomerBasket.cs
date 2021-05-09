﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public  class CustomerBasket
    {
        public CustomerBasket(string id)
        {
            Id = id;
        }
        public CustomerBasket()
        {

        }
        public string Id { get; set; }
        public List<BaseketItem> Items { get; set; } = new List<BaseketItem>();
    }
}