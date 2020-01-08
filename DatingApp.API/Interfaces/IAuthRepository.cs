using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Interfaces
{
    public interface IAuthRepository
    {
           Task<User> Register(RegisterDto data);
           Task<User> Login(LoginDto data);
           Task<bool> UserExists(string username);
    }
}