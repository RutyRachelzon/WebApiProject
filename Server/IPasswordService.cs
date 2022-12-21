using Zxcvbn;

namespace Service
{
    public interface IPasswordService
    {
        Result checkPassword(string password);
    }
}