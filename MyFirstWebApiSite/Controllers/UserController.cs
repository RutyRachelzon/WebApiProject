using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Service;
using Z_Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860


namespace MyFirstWebApiSite.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        // GET api/<UserController>/5
        [HttpGet]
        public async Task<ActionResult<User>> Get([FromQuery] string password,string userName)
        {
           User user= await _userService.getUserById(password, userName);
            if (user!=null)
            {
                return Ok(user);
            }
            return NoContent();
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<ActionResult<User>> Post([FromBody] User user)
        {
            User newUser= await _userService.addNewUser(user);
            return CreatedAtAction(nameof(Get), new { id = newUser.UserId }, newUser);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public Task<User> Put(int id, [FromBody] User user)
        {
            return _userService.updateUser(id, user);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
