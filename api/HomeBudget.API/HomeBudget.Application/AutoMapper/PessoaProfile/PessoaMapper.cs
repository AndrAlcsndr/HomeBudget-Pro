using AutoMapper;
using HomeBudget.Application.DTOs.CategoriaDtos;
using HomeBudget.Application.DTOs.PessoaDtos;
using HomeBudget.Domain.Entities;

namespace HomeBudget.Application.AutoMapper.PessoaProfile
{
    public class PessoaProfile : Profile
    {
        public PessoaProfile() 
        {
            CreateMap<Pessoa, PessoaDto>();
                
        }
    }
}
