namespace Z_Repository
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> getCategories();

        Task<Category> addNewCategory(Category category);
    }
}