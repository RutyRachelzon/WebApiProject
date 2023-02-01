using Entites;

namespace Repository
{
    public interface IOrderRepository
    {
        Task<Order> addNewOrder(Order order);
    }
}