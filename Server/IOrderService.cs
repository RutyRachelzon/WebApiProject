using Z_Repository;

namespace Service
{
    public interface IOrderService
    {
        Task<Order> addNewOrder(Order order);
    }
}