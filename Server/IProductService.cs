using Z_Repository;

namespace Service
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> getProducts();
    }
}