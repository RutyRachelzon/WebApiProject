namespace Z_Repository
{
    public interface IUserRepository
    {
        Task<User> addNewUser(User user);
        Task<User> getUserById(string password, string userName);
        Task<User> updateUser(int id, User user);
    }
}