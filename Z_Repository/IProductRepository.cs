using Entites;

namespace Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> getProducts(string? desc, decimal? minPrice, decimal? maxPrice, int?[] categoryIds);
        Task<Product> getProductById(int id);

    }
}