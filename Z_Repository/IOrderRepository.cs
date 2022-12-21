namespace Z_Repository
{
    public interface IOrderRepository
    {
        Task<Order> addNewOrder(Order order);
    }
}