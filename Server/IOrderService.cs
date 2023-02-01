
using Entites;

namespace Service
{
    public interface IOrderService
    {
        Task<Order> addNewOrder(Order order);
    }
}