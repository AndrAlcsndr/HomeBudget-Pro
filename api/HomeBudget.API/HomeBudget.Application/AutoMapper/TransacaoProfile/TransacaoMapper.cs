using AutoMapper;
using HomeBudget.Application.DTOs.PessoaDtos;
using HomeBudget.Application.DTOs.TransacaoDtos;
using HomeBudget.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HomeBudget.Application.AutoMapper.TransacaoProfile
{
    public class TransacaoProfile : Profile
    {
        public TransacaoProfile()
        {
            // Entity -> DTO
            CreateMap<Transacao, TransacaoDto>().ReverseMap();

            // DTO -> Entity (Create)
            CreateMap<CreateTransacaoDto, Transacao>()
                .ForMember(dest => dest.DataCriacao, opt => opt.Ignore())
                .ForMember(dest => dest.DataModificacao, opt => opt.Ignore())
                .ForMember(dest => dest.Pessoa, opt => opt.Ignore())
                .ForMember(dest => dest.Categoria, opt => opt.Ignore());

            // Entity -> CreateDto 
            CreateMap<Transacao, CreateTransacaoDto>();

            // UpdateDto <- -> CreateDto
            CreateMap<UpdateTransacaoDto, CreateTransacaoDto>().ReverseMap();

            // UpdateDto  -> EntityDto
            CreateMap<UpdateTransacaoDto, Transacao>().ReverseMap();
        }
    }
}
