using System;

namespace API.Entities;

public class User
{
  public int Id { get; set; }
  public required string UserName { get; set; }
  public required byte[] PasswordHash { get; set; } 
  public required byte[] PasswordSalt { get; set; } 
  public required string Email { get; set; }
  public DateOnly DateOfBirth { get; set; }
  public  string? Gender { get; set; }
  public string? Country { get; set; }
  public string? City { get; set; }


}
