
using System;
using Microsoft.AspNetCore.Http;


namespace DatingApp.API.DTO
{
    public class PhotoForReturnDTO
    { public int Id { get; set; }
        public string Url { get; set; }
        public DateTime DateAdded { get; set; }
  public bool IsMain { get; set; }
        public PhotoForReturnDTO()
        {
            DateAdded = DateTime.Now;
        }
    }
}