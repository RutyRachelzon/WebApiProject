using Entites;

namespace Service
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> getCategories();

        Task<Category> addNewCategory(Category category);
    }
}