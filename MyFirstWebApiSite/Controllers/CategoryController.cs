using Microsoft.AspNetCore.Mvc;
using Service;
using System.Text.Json;
using DTO;
using AutoMapper;
using Entites;



// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFirstWebApiSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryService categoryService,IMapper mapper)
        {
            _mapper = mapper;
            _categoryService = categoryService;
        }
        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<IEnumerable<CategoryDTO>> Get()
        {
            IEnumerable<Category> category = await _categoryService.getCategories();
            IEnumerable<CategoryDTO> categoryDTO = _mapper.Map<IEnumerable<Category>, IEnumerable<CategoryDTO>>(category);
            return categoryDTO;
        }

        // POST api/<CategoryController>
        [HttpPost]
        public async Task<ActionResult<Category>> Post([FromBody] Category category)
        {
            Category newCategory = await _categoryService.addNewCategory(category);
            return CreatedAtAction(nameof(Get), new { id = newCategory.CategoryId }, newCategory);
        }
    }
}
