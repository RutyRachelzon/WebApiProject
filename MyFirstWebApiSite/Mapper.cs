using AutoMapper;
using DTO;
using Entites;

namespace MyFirstWebApiSite
{
    public class Mapper:Profile
    {
        public Mapper()
        {
            CreateMap<Product, ProductDTO>()
                .ForMember(dest => dest.CategoryName,
                            src => src.MapFrom(p => p.Category.CategoryName)).ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, UserWithOutPasswordDto>().ReverseMap();
            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<OrderItem, OrderItemDTO>().ReverseMap();
            CreateMap<Category, CategoryDTO>().ReverseMap();

        }


    }
}
