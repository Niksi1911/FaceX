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
public class UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService) : BaseAPIController
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

  [HttpPost("add-photo")]
  public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
  {
    var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (username == null) return BadRequest("No username !");

    var user = await userRepository.GetUserByUsernameAsync(username);
    if (user == null) return BadRequest("Cant find user");

    var result = await photoService.AddPhotoAsync(file);

    if (result.Error != null) return BadRequest(result.Error.Message);

    var photo = new Photo
    {
      Url = result.SecureUrl.AbsoluteUri,
      PublicId = result.PublicId
    };

    user.Photos.Add(photo);

    if (await userRepository.SaveAllAsync()) return
      CreatedAtAction(nameof(GetUser), new { username = user.UserName }, mapper.Map<PhotoDto>(photo));

    return BadRequest("Problem while adding photo");
  }

  [HttpPut("set-main-photo/{photoId:int}")]
  public async Task<ActionResult> SetMainPhoto(int photoId)
  {
    var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (username == null) return BadRequest("No username !");

    var user = await userRepository.GetUserByUsernameAsync(username);
    if (user == null) return BadRequest("Cant find user");

    var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

    if (photo == null || photo.IsMain) return BadRequest("Cant use this as Main");

    var currentPhoto = user.Photos.FirstOrDefault(x => x.IsMain);
    if (currentPhoto == null) return BadRequest("no main photo ");
    currentPhoto.IsMain = false;
    photo.IsMain = true;

    if (await userRepository.SaveAllAsync()) return NoContent();
    return BadRequest("Problem while setting main photo");
  }

  [HttpDelete("delete-photo/{photoId:int}")]
  public async Task<ActionResult> DeleteMainPhoto(int photoId)
  {
    var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (username == null) return BadRequest("No username !");

    var user = await userRepository.GetUserByUsernameAsync(username);
    if (user == null) return BadRequest("Cant find user");

    var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);
    if (photo == null || photo.IsMain) return BadRequest("This photo cant be deleted");

    if (photo.PublicId != null)
    {
      var result = await photoService.DeletePhotoAsync(photo.PublicId);
      if (result.Error != null) return BadRequest(result.Error.Message);
    }

    user.Photos.Remove(photo);

    if (await userRepository.SaveAllAsync()) return Ok();
    return BadRequest("Problem while deleting main photo");

  }
  

}
