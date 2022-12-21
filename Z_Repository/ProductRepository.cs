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
        public async Task<IEnumerable<Product>> getProducts()
        {
            var products = await (from product in _KidsClothesContext.Products
                                  select product).ToListAsync();
            return products;
        }
    }
}
