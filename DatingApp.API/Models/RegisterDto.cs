using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Models
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
         [Required]
         [StringLength(8,MinimumLength=4,ErrorMessage="bla bla bla error")]
        public string Password { get; set; }
    }
}