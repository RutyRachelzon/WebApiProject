using System.Text.Json;
namespace Z_Repository
{
    public class UserRepository : IUserRepository
    {
        KidsClothesContext _KidsClothesContext;
        public UserRepository(KidsClothesContext kidsClothesContext)
        {
            _KidsClothesContext = kidsClothesContext;
        }
        public async Task<User> getUserById(string password, string userName)
        {
            var list = (from user in _KidsClothesContext.Users
                        where user.Password == password && user.UserName == userName
                        select user).ToArray<User>();
            return list.FirstOrDefault();
        }

        public async Task<User> addNewUser(User user)
        {
             await _KidsClothesContext.Users.AddAsync(user);
            await _KidsClothesContext.SaveChangesAsync();
            return user;
        }
        public async Task<User> updateUser(int id, User user)
        {
            var userToUpdate = await _KidsClothesContext.Users.FindAsync(id);
            if (userToUpdate == null)
            {
                return null;
            }
            _KidsClothesContext.Entry(userToUpdate).CurrentValues.SetValues(user);
            await _KidsClothesContext.SaveChangesAsync();
            return user;
        }
    }
}
