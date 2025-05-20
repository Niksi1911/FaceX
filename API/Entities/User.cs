using System;
using API.Extensions;

namespace API.Entities;

public class User
{
  public int Id { get; set; }
  public required string UserName { get; set; }
  public  byte[] PasswordHash { get; set; } = [];
  public  byte[] PasswordSalt { get; set; } = [];
  public required string Email { get; set; }
  public string? Description { get; set; }
  public DateOnly DateOfBirth { get; set; }
  public  string? Gender { get; set; }
  public string? Country { get; set; }
  public string? City { get; set; }
  public List <Photo> Photos { get;set; } = [];

}
