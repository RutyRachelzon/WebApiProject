﻿
using Entites;

namespace Service
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> getProducts(string? desc, int? minPrice, int? maxPrice, int?[] categoryIds);
    }
}