using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateMessageDto
    {
        public required string ReciverUsername { get; set; }
        public required string Content { get; set; }
    }
}