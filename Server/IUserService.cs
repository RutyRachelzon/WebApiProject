
using Entites;

namespace Service
{
    public interface IUserService
    {
        Task<User> addNewUser(User user);
        Task<User> getUserById(string password, string userName);
        Task<User> updateUser(int id, User user);
    }
}