using AutoMapper;
using HomeBudget.Application.DTOs.CategoriaDtos;
using HomeBudget.Domain.Entities;
using Microsoft.OpenApi;

namespace HomeBudget.Application.AutoMapper.CategoriaProfile
{
    public class CategoriaProfile : Profile
    {
        public CategoriaProfile() 
        {
            CreateMap<Categoria, CategoriaDto>()
            .ForMember(dest => dest.IdTransacoes,
                opt => opt.MapFrom(src => src.Transacoes.Select(t => t.Id).ToList()))
            .ReverseMap()
            .ForMember(dest => dest.Transacoes, opt => opt.Ignore());

            CreateMap<CreateCategoriaDto, Categoria>().ReverseMap();

            CreateMap<CategoriaDto, Categoria>(); CreateMap<Categoria, CategoriaDto>()
                .ForMember(dest => dest.Finalidade,
                opt => opt.MapFrom(src => src.Finalidade.ToString()));

            CreateMap<Categoria, UpdateCategoriaDto>()
              .ReverseMap();

            CreateMap<CreateCategoriaDto, UpdateCategoriaDto>()
              .ReverseMap();
        }

    }
}
