using Microsoft.AspNetCore.Mvc;
using Service;
using DTO;
using Entites;
using AutoMapper;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFirstWebApiSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrderController(IOrderService orderService,IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }
        // GET: api/<OrderController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // POST api/<OrderController>
        [HttpPost]
        public async Task<ActionResult<OrderDTO>> Post([FromBody] OrderDTO order)
        {
            Order newOrder = _mapper.Map<OrderDTO, Order>(order);
            Order afterOrder = await _orderService.addNewOrder(newOrder);
            OrderDTO newOrderDto = _mapper.Map<Order, OrderDTO>(afterOrder);
            return CreatedAtAction(nameof(Get), new { id = newOrder.UserId }, newOrderDto);
        }
    }
}
