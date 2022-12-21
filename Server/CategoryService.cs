using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Z_Repository;
namespace Service
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        public async Task<IEnumerable<Category>> getCategories()
        {
            return await _categoryRepository.getCategories();
           
        }
        public async Task<Category> addNewCategory(Category category)
        {
            Category newCategory = await _categoryRepository.addNewCategory(category);
            return newCategory;
        }
    }
}
