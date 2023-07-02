using Entites;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Service
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
       public async Task<IEnumerable<Product>> getProducts(string? name, decimal? minPrice, decimal? maxPrice, int?[] categoryIds)
        {
            return await _productRepository.getProducts(name,minPrice,maxPrice,categoryIds);
        }
    }
}