using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> SaveAllAsync();
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User?>GetUserByIdAsync(int id);
        Task<User?> GetUserByUsernameAsync(string username);
        Task<IEnumerable<MemberDto?>> GetMembersAsync();
        Task<MemberDto?> GetMemberAsync(string username);
    }
}