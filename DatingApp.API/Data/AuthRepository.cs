

using System;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;

        }

        public async Task<User> Register(RegisterDto data)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(data.Password, out passwordHash, out passwordSalt);

            var user = new User { PasswordSalt = passwordSalt, PasswordHash = passwordHash, Username = data.Username.ToLower() };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
             
           var user= await _context.Users.FirstOrDefaultAsync(u => u.Username==username.ToLower());
           if(user!=null)
                return true;
           return false;
        }

        public async Task<User> Login(LoginDto data)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == data.Username);
            if (user == null)
                return null;

            if (!VerifyPasswordHash(data.Password, user.PasswordHash, user.PasswordSalt))
                return null;


            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {

                var computedPasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedPasswordHash.Length; i++)
                {
                    if (computedPasswordHash[i] != passwordHash[i])
                        return false;
                }
                return true;
            }
        }
    }
}