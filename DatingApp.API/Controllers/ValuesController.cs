using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DatingApp.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _dbCtx;

        public ValuesController(DataContext dbCtx)
        {
           _dbCtx = dbCtx;

        }

        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            var values= await _dbCtx.Values.ToListAsync();
            return Ok(values);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<string>> GetValue(int id)
        {
            var value=await _dbCtx.Values.FirstOrDefaultAsync(v => v.Id==id);
             return Ok(value);
        }



    }
}
