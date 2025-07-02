using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MessageRepository(DataContext context, IMapper mapper) : IMessageRepository
    {
        public void AddMessage(Message message)
        {
            context.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            context.Messages.Remove(message);
        }

        public async Task<Message?> GetMessage(int id)
        {
            return await context.Messages.FindAsync(id);

        }

        public async Task<List<MessageDto>> GetMessagesForUser(string username)
        {
            var message = await context.Messages
                .Where(x => x.SenderUsername == username || x.ReciverUsername == username)
                .OrderByDescending(m => m.MessageSent)
                .ProjectTo<MessageDto>(mapper.ConfigurationProvider)
                .ToListAsync();

            return message;
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string reciverUsername)
        {
            var message = await context.Messages
                .Include(x => x.Sender).ThenInclude(x => x.Photos)
                .Include(x => x.Reciver).ThenInclude(x => x.Photos)
                .Where(x =>
                    (x.ReciverUsername == currentUsername && x.SenderUsername == reciverUsername) ||
                    (x.SenderUsername == currentUsername && x.ReciverUsername == reciverUsername))
                .OrderBy(x => x.MessageSent)
                .ToListAsync();

            return mapper.Map<IEnumerable<MessageDto>>(message);

        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}