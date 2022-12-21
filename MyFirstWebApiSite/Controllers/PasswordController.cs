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
 
        // GET: api/<Password>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<Password>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<Password>
        [HttpPost]
        public int Post([FromBody] string password)
        {
            var result= _passwordService.checkPassword(password);
            return result.Score;
        }

        // PUT api/<Password>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Password>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
