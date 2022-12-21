using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Z_Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        KidsClothesContext _KidsClothesContext;

        public CategoryRepository(KidsClothesContext kidsClothesContext)
        {
            _KidsClothesContext = kidsClothesContext;
        }
        public async Task<IEnumerable<Category>> getCategories()
        {
            var categories = await (from c in _KidsClothesContext.Categories
                                    select c).ToListAsync();
            return categories;
        }
        public async Task<Category> addNewCategory(Category category)
        {
            await _KidsClothesContext.Categories.AddAsync(category);
            await _KidsClothesContext.SaveChangesAsync();
            return category;
        }
    }
}
