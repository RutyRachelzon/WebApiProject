using Entites;
using Microsoft.Extensions.Logging;
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
        private readonly ILogger<OrderService> _logger;
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        public OrderService(IOrderRepository orderRepository,IProductRepository productRepository,ILogger<OrderService> logger)
        {
            _logger = logger;
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
            if (order.Price < price)
                _logger.LogError("someOne Trying To stole!!!!");
            order.Price = price;
            Order newOrder = await _orderRepository.addNewOrder(order);
            return newOrder;
        }
    }
}
