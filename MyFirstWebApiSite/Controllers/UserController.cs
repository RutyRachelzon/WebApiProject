using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Service;
using DTO;
using AutoMapper;
using Entites;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860


namespace MyFirstWebApiSite.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<UserController> _logger;
        private readonly IMapper _mapper;


        public UserController(IUserService userService, ILogger<UserController> logger, IMapper mapper)
        {
            _userService = userService;
            _logger = logger;
            _mapper = mapper;
        }
        // GET api/<UserController>/5
        [HttpGet]
        public async Task<ActionResult<UserDTO>> Get([FromQuery] string password,string userName)
        {
            int zero = 0;

            _logger.LogInformation("userName " + userName + " trying login");

            //int num = 100 / zero;
            User user= await _userService.getUserById(password, userName);
            if (user!=null)
            {            
                UserDTO userDTO = _mapper.Map<User, UserDTO>(user);
                return Ok(userDTO);
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
    }
}
