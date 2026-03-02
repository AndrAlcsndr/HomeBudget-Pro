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
            CreateMap<Transacao, TransacaoDto>()
                //Mapeamento do nome da pessoa presente na transação
             .ForMember(d => d.Pessoa, opt => opt.MapFrom(s => s.Pessoa!.Nome))
             //Mapeamento do nome da categoria presente na transação
             .ForMember(d => d.Categoria, opt => opt.MapFrom(s => s.Categoria!.Nome))
             .ReverseMap()
             //Ignorar os itens quando for mapear Dto -> Entity
             .ForMember(d => d.Pessoa, opt => opt.Ignore())
             .ForMember(d => d.Categoria, opt => opt.Ignore());

            // DTO -> Entity (Create)
            CreateMap<CreateTransacaoDto, Transacao>()
                .ForMember(dest => dest.DataCriacao, opt => opt.Ignore())
                .ForMember(dest => dest.DataModificacao, opt => opt.Ignore())
                .ForMember(dest => dest.Pessoa, opt => opt.Ignore())
                .ForMember(dest => dest.Categoria, opt => opt.Ignore());

            // Entity -> CreateDto 
            CreateMap<Transacao, CreateTransacaoDto>();

            // UpdateDto <- -> CreateDto
            CreateMap<CreateTransacaoDto, TransacaoDto>()
            .ForMember(d => d.Categoria, opt => opt.Ignore())
            .ForMember(d => d.Pessoa, opt => opt.Ignore())

            // Somatórios normalmente são calculados depois
            .ForMember(d => d.SomaReceitas, opt => opt.MapFrom(s => s.Receitas))
            .ForMember(d => d.SomaDespesas, opt => opt.MapFrom(s => s.Despesas))

            // Saldo pode ser calculado aqui
            .ForMember(d => d.Saldo,
                opt => opt.MapFrom(s => s.Receitas - s.Despesas))
            .ForMember(d => d.DataCriacao, opt => opt.Ignore())
            .ForMember(d => d.DataModificacao, opt => opt.Ignore());

            // UpdateDto  -> EntityDto
            CreateMap<UpdateTransacaoDto, Transacao>().ReverseMap();
        }
    }
}
