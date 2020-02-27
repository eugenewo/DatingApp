using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.DTO;
using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
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
       private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo, IConfiguration configuration, IMapper mapper)
        {
            _repo = repo;
            _configuration = configuration;
             _mapper = mapper;
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
            var userForToken=_mapper.Map<UserForListDto>(loggedInUser);

            return Ok( new {token=createdUserToken,userForToken});
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