using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class OrderDTO
    {

        public int OrderId { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
        public int UserId { get; set; }
        public IEnumerable<OrderItemDTO> OrderItems { get; set; }
    }
}
