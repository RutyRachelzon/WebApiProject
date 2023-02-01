using Entites;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Service
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        public OrderService(IOrderRepository orderRepository,IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
        }
        public async Task<Order> addNewOrder(Order order)
        {
            decimal price = 0;
            foreach (var product in order.OrderItems)
            {
                Product productFromDB = await _productRepository.getProductById(product.ProductId);
                price += productFromDB.Price * product.Quantity;
            }
            order.Price = price;
            Order newOrder = await _orderRepository.addNewOrder(order);
            return newOrder;
        }
    }
}
