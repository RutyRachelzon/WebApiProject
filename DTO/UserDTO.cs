using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class UserDTO
    {
        public int UserId { get; set; }
        [EmailAddress(ErrorMessage = "The user name have to be email address.")]
        public string UserName { get; set; } = null!;
        [MinLength(8,ErrorMessage = "the password should contain at least 8 chars"),MaxLength(8, ErrorMessage = "the password should contain at least 8 chars")]
        public string Password { get; set; } = null!;
        [MinLength(2,ErrorMessage = "first name should contain at least 2 letters")]
        public string FirstName { get; set; } = null!;
        [MinLength(2, ErrorMessage = "last name should contain at least 2 letters")]
        public string LastName { get; set; } = null!;
    }
}
