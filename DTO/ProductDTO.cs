namespace DTO
{
    public class ProductDTO
    {
         public int ProductId { get; set; }
        public string ProductName { get; set; } = null!;
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal Price { get; set; }
        public string Desc { get; set; } = null!;
        public string Image { get; set; } = null!;


    }
}
