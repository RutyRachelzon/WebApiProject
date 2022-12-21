using System;
using System.Collections.Generic;

namespace Z_Repository
{
    public partial class Product
    {
        public Product()
        {
            OrderItems = new HashSet<OrderItem>();
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; } = null!;
        public int CategoryId { get; set; }
        public decimal Price { get; set; }
        public string Desc { get; set; } = null!;
        public string Image { get; set; } = null!;

        public virtual Category? Category { get; set; } = null!;
        public virtual ICollection<OrderItem>? OrderItems { get; set; }
    }
}
