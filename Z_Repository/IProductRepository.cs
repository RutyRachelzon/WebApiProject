namespace Z_Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> getProducts(string? desc, int? minPrice, int? maxPrice, int?[] categoryIds);
    }
}