using System.Collections.Generic;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUsers()
        {

            var usersSrc = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(usersSrc);

            foreach (var user in users)
            {

                byte[] PasswordHash, PasswordSalt;
                CreatePasswordHash("password",out PasswordHash,out PasswordSalt);
                user.Username=user.Username.ToLower();
                user.PasswordHash=PasswordHash;
                user.PasswordSalt=PasswordSalt;

                _context.Users.Add(user);
            }
            _context.SaveChanges();

        }


        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

    }





}