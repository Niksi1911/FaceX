using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MessageDto
    {
        public int Id { get; set; }

        public required int SenderId { get; set; }
        public required string SenderUsername { get; set; }
        public required string SenderPhotoUrl { get; set; }

        public required int ReciverId { get; set; }
        public required string ReciverUsername { get; set; }
        public required string ReciverPhotoUrl { get; set; }

        public required string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }
    
    }
}