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
            // Mapping Categoria -> CategoriaDto
            CreateMap<Categoria, CategoriaDto>()
            .ForMember(dest => dest.IdTransacoes,
                opt => opt.MapFrom(src => src.Transacoes.Select(t => t.Id).ToList()))
            .ReverseMap()
            .ForMember(dest => dest.Transacoes, opt => opt.Ignore());

            // Mapping CreateCategoriaDto <- -> Categoria
            CreateMap<CreateCategoriaDto, Categoria>().ReverseMap();

            // Mapping CategoriaDto  -> Categoria
            CreateMap<CategoriaDto, Categoria>(); CreateMap<Categoria, CategoriaDto>()
                .ForMember(dest => dest.Finalidade,
                opt => opt.MapFrom(src => src.Finalidade.ToString()));

            // Mapping Categoria <- -> UpdateCategoriaDto
            CreateMap<Categoria, UpdateCategoriaDto>()
              .ReverseMap();

            // Mapping CreateCategoriaDto <- -> UpdateCategoriaDto
            CreateMap<CreateCategoriaDto, UpdateCategoriaDto>()
              .ReverseMap();
        }

    }
}
