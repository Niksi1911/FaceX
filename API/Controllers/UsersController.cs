using System;
using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")] //  /api/users
[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseAPIController
{

  [HttpGet]
  public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
  {
    var users = await userRepository.GetMembersAsync();
    return Ok(users);
  }

  [HttpGet("{username}")] // /api/users/nikola
  public async Task<ActionResult<MemberDto>> GetUser(string username)
  {
    var user = await userRepository.GetMemberAsync(username);

    if (user == null) return NotFound();

    return user;
  }

  [HttpPut]
  public async Task<ActionResult> UpdateUser(EditDto editDto)
  {
    var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    if (username == null) return BadRequest("No username !");

    var user = await userRepository.GetUserByUsernameAsync(username);

    if (user == null) return BadRequest("Cant find user");

    mapper.Map(editDto, user);

    if (await userRepository.SaveAllAsync()) return NoContent();

    return BadRequest("Failed !");
  }

}
