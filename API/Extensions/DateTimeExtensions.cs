namespace API.Extensions;

public static class DateTimeExtensions
{
    public static int CalculateAge(this DateOnly dateOfBirth)
    {

        var today = DateOnly.FromDateTime(DateTime.Now);

        var age = today.Year - dateOfBirth.Year;

        
        if (dateOfBirth.Month > today.Month ||
           (dateOfBirth.Month == today.Month && dateOfBirth.Day > today.Day))
        {
            age--;
        }



        return age;
    }


}
