using AutoMapper;
using DTO;
using Microsoft.AspNetCore.Mvc;
using Service;
using Z_Repository;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFirstWebApiSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductController(IProductService productService,IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }
        // GET: api/<ProductController>
        [HttpGet]
        public async Task<IEnumerable<ProductDTO>> Get([FromQuery]string? name, [FromQuery] int? minPrice, [FromQuery] int? maxPrice, [FromQuery] int?[] categoryIds)
        {

            IEnumerable<Product> products= await _productService.getProducts(name,minPrice,maxPrice,categoryIds);
            IEnumerable<ProductDTO> productsDTO = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductDTO>>(products);
            return productsDTO;

        }

        
        [HttpPost]
        public  void Post([FromBody] Product product)
        {
        //    Product newProduct = await _productService.addNewProduct(product);
        //    return CreatedAtAction(nameof(Get), new { id = newProduct.ProductId }, newProduct);
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
