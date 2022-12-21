using Zxcvbn;
namespace Service
{
    public class PasswordService : IPasswordService
    {
        
        public Result checkPassword(string password)
        {
            var result = Zxcvbn.Core.EvaluatePassword(password);
            return result;
        }
    }
}
