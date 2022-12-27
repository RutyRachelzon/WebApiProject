using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Z_Repository
{
    public partial class User
    {
        public User()
        {
            Orders = new HashSet<Order>();
        }

        public int UserId { get; set; }
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;

        [JsonIgnore]
        public virtual ICollection<Order>? Orders { get; set; }
    }
}
