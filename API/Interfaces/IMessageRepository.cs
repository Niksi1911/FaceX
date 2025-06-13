
using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IMessageRepository
{
    void AddMessage(Message message);
    void DeleteMessage(Message message);
    Task<Message?> GetMessage(int id);
    Task<bool> SaveAllAsync();
    Task<List<MessageDto>> GetMessagesForUser(string username);
    Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string reciverUsername);



}

