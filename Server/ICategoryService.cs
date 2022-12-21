using Z_Repository;

namespace Service
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> getCategories();

        Task<Category> addNewCategory(Category category);
    }
}