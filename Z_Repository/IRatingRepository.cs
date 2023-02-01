using Entities;

namespace Repository
{
    public interface IRatingRepository
    {
        Task<Rating> addRequest(Rating RatingDetails);
    }
}