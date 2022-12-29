using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Z_Repository
{
    public class ProductRepository : IProductRepository
    {
        KidsClothesContext _KidsClothesContext;

        public ProductRepository(KidsClothesContext kidsClothesContext)
        {
            _KidsClothesContext = kidsClothesContext;
        }
        public async Task<IEnumerable<Product>> getProducts(string? name,int? minPrice,int? maxPrice, int?[] categoryIds)
        {
            var query = _KidsClothesContext.Products.Where(product =>
            (name == null ? (true) : (product.ProductName.Contains(name)))
            && ((minPrice == null) ? (true) : (product.Price >= minPrice))
            && ((maxPrice == null) ? (true) : (product.Price <= maxPrice))
            && ((categoryIds.Length == 0) ? (true) : (categoryIds.Contains(product.CategoryId))))
                .OrderBy(product => product.Price);
            List<Product> products = await query.ToListAsync();
            return products;
        }
    }
}
