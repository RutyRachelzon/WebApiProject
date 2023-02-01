using Entities;

namespace Service
{
    public interface IRatingService
    {
        Task<Rating> addRequest(Rating rating);
    }
}