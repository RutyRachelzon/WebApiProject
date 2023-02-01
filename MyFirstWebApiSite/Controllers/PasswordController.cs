using Microsoft.AspNetCore.Mvc;
using Service;
using Zxcvbn;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFirstWebApiSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private readonly IPasswordService _passwordService;

        public PasswordController(IPasswordService IPasswordService)
        {
            _passwordService = IPasswordService;

        }

        // POST api/<Password>
        [HttpPost]
        public int Post([FromBody] string password)
        {
            var result= _passwordService.checkPassword(password);
            return result.Score;
        }
    }
}
