using System;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        
        public static int CalculateAge(this DateTime date){
            
            return DateTime.Now.Year-date.Year;
        }
    }
}