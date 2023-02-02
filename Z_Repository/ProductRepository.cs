using Entites;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class ProductRepository : IProductRepository
    {
        KidsClothesContext _KidsClothesContext;

        public ProductRepository(KidsClothesContext kidsClothesContext)
        {
            _KidsClothesContext = kidsClothesContext;
        }
        public async Task<IEnumerable<Product>> getProducts(string? name,decimal? minPrice,decimal? maxPrice, int?[] categoryIds)
        {
            var query = _KidsClothesContext.Products.Where(product =>
            (name == null ? (true) : (product.ProductName.Contains(name)))
            && ((minPrice == null) ? (true) : (product.Price >= minPrice))
            && ((maxPrice == null) ? (true) : (product.Price <= maxPrice))
            && ((categoryIds.Length == 0) ? (true) : (categoryIds.Contains(product.CategoryId))))
                .OrderBy(product => product.Price)
                .Include(p => p.Category);
            List<Product> products = await query.ToListAsync();
            return products;
        }

        public async Task<Product> getProductById(int id)
        {
            var products = (from product in _KidsClothesContext.Products
                        where product.ProductId == id
                        select product).ToArray<Product>();
            return products.FirstOrDefault();
        }
    }
}
