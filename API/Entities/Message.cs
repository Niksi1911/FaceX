using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public required string SenderUsername { get; set; }
        public required string ReciverUsername { get; set; }
        public required string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; } = DateTime.UtcNow;
        public bool SenderDeleted { get; set; }
        public bool ReciverDeleted { get; set; }

        //Navigation properties

        public int SenderId { get; set; }
        public User Sender { get; set; } = null!;
        public int ReciverId { get; set; }
        public User Reciver { get; set; } = null!;

    }
}