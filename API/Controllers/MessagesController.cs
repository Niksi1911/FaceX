using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    public class MessagesController(IMessageRepository messageRepository,IUserRepository userRepository,IMapper mapper) : BaseAPIController
    {
        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessageDto(CreateMessageDto createMessageDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (username == createMessageDto.ReciverUsername.ToLower())
                return BadRequest("You cant message yourslef !");

            if (username == null) return BadRequest("No username");


            var sender = await userRepository.GetUserByUsernameAsync(username);
            if (sender == null) return BadRequest("No Sender");

            var reciver = await userRepository.GetUserByUsernameAsync(createMessageDto.ReciverUsername);
            if (reciver == null) return BadRequest("No Reciver");

            var message = new Message
            {
                Sender = sender,
                Reciver = reciver,
                SenderUsername = sender.UserName,
                ReciverUsername = reciver.UserName,
                Content = createMessageDto.Content
            };

            messageRepository.AddMessage(message);

            if (await messageRepository.SaveAllAsync()) return Ok(mapper.Map<MessageDto>(message));

            return BadRequest("Failed to save message");
            
        
        }
    }
}