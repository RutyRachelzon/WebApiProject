using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Entites
{
    public partial class Order
    {
        public Order()
        {
            OrderItems = new HashSet<OrderItem>();
        }

        public int OrderId { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
        public int UserId { get; set; }

        public virtual User? User { get; set; } = null!;
        
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
