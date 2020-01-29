
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;



namespace DatingApp.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    // [Authorize]
    public class UsersController: ControllerBase
    {
         private readonly IDatingRepository _repo;
         private readonly IMapper _mapper;

        public UsersController(IDatingRepository repo,IMapper mapper)
        {
            _repo=repo;
            _mapper=mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers(){
            
           var users= await _repo.GetUsers(); 
           var usersDto=_mapper.Map<IEnumerable<UserForListDto>>(users);
           return Ok(usersDto);        

        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id){
            
           var user= await _repo.GetUser(id);
           var userDto=_mapper.Map<UserDetailsDto>(user);
           return Ok(userDto);        

        }

    }
}