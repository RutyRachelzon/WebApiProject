namespace Z_Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> getProducts();
    }
}