using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository(DataContext context) : IUserRepository
    {
        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await context.Users
            
            .Include(x =>x.Photos)
            .SingleOrDefaultAsync(x => x.Id==id);
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await context.Users
            .Include(x =>x.Photos) 
            .SingleOrDefaultAsync(x=>x.UserName ==username);
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await context.Users
            .Include(x =>x.Photos) 
            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() >0;
        }

    }
}