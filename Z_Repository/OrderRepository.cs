using Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class OrderRepository : IOrderRepository
    {
        KidsClothesContext _KidsClothesContext;
        public OrderRepository(KidsClothesContext kidsClothesContext)
        {
            _KidsClothesContext = kidsClothesContext;
        }
        public async Task<Order> addNewOrder(Order order)
        {
            await _KidsClothesContext.Orders.AddAsync(order);
            await _KidsClothesContext.SaveChangesAsync();
            return order;
        }
    }
}
