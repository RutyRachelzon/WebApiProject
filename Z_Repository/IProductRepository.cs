using Entites;

namespace Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> getProducts(string? desc, int? minPrice, int? maxPrice, int?[] categoryIds);
        Task<Product> getProductById(int id);

    }
}