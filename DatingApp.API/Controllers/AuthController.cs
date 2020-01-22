using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private IAuthRepository _repo;
        private IConfiguration _configuration;

        public AuthController(IAuthRepository repo, IConfiguration configuration)
        {
            _repo = repo;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {

            if (await _repo.UserExists(registerDto.Username))
                return BadRequest("user already exists");

            var createdUser = await _repo.Register(registerDto);

            return StatusCode(201);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {

            if ( await _repo.UserExists(loginDto.Username.ToLower())!=true)
                return Unauthorized();

            var loggedInUser = await _repo.Login(loginDto);
            var createdUserToken=generateJWT_Token(loggedInUser);

            return Ok( new {token=createdUserToken});
        }

        private string generateJWT_Token(User loggedInUser)
        {
            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier,loggedInUser.Id.ToString()),
            new Claim(ClaimTypes.Name,loggedInUser.Username),
            };


            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }

    }




}