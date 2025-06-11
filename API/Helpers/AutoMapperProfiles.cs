using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;
using Microsoft.CodeAnalysis.Differencing;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {

            CreateMap<User, MemberDto>()
                .ForMember(d => d.Age, o => o.MapFrom(s => s.DateOfBirth.CalculateAge()))
                .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain)!.Url));

            CreateMap<Photo, PhotoDto>();

            CreateMap<User, EditDto>();
            CreateMap<EditDto, User>();

            CreateMap<Message, MessageDto>()
                .ForMember(d => d.SenderPhotoUrl, o => o.MapFrom(s => s.Sender.Photos.FirstOrDefault(x => x.IsMain)!.Url))
                .ForMember(d => d.ReciverPhotoUrl, o => o.MapFrom(s => s.Reciver.Photos.FirstOrDefault(x => x.IsMain)!.Url))

                .ForMember(d => d.SenderUsername, o => o.MapFrom(s => s.Sender.UserName))
                .ForMember(d => d.ReciverUsername, o => o.MapFrom(s => s.Reciver.UserName));
        }
    }
}