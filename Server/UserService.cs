using Entites;
using Repository;
namespace Service

{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        public async Task<User> getUserById(string password, string userName)
        {
            User user = await _userRepository.getUserById(password, userName);
            return user;
        }

        public async Task<User> addNewUser(User user)
        {
            string password =  user.Password;
            User newUser = await _userRepository.addNewUser(user);
            return newUser;
        }
        public Task<User> updateUser(int id, User user)
        {
           return _userRepository.updateUser(id, user);
        }
    }
}