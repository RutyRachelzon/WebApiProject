
using Entites;

namespace Service
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> getProducts(string? desc, decimal? minPrice, decimal? maxPrice, int?[] categoryIds);
    }
}