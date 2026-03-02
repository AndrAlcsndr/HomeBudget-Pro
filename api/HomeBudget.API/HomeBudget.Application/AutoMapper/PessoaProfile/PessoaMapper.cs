using AutoMapper;
using HomeBudget.Application.DTOs.PessoaDtos;
using HomeBudget.Domain.Entities;

namespace HomeBudget.Application.AutoMapper.PessoaProfile
{
    public class PessoaProfile : Profile
    {
        public PessoaProfile()
        {
            // Entity -> DTO
            CreateMap<Pessoa, PessoaDto>().ReverseMap();

            // DTO -> Entity (Create)
            CreateMap<CreatePessoaDto, Pessoa>()
                .ForMember(dest => dest.DataCriacao, opt => opt.Ignore())
                .ForMember(dest => dest.DataModificacao, opt => opt.Ignore())
                .ForMember(dest => dest._transacoes, opt => opt.Ignore());

            // Entity -> CreateDto 
            CreateMap<Pessoa, CreatePessoaDto>();

            // UpdateDto <- -> CreateDto
            CreateMap<UpdatePessoaDto, CreatePessoaDto>().ReverseMap();

            // UpdateDto  -> EntityDto
            CreateMap<UpdatePessoaDto, Pessoa>().ReverseMap();
        }
    }
}