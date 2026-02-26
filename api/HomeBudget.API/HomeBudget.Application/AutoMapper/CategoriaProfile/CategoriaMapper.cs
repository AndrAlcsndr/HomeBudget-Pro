using AutoMapper;
using HomeBudget.Application.DTOs.CategoriaDtos;
using HomeBudget.Domain.Entities;

namespace HomeBudget.Application.AutoMapper.CategoriaProfile
{
    public class CategoriaProfile : Profile
    {
        public CategoriaProfile() 
        {
            CreateMap<Categoria, CategoriaDto>()
                .ForMember(dest => dest.IdTransacoes, opt => opt.MapFrom(src => src.Transacoes.Select(t => t.Id).ToList()))
                .ReverseMap();

            CreateMap<Categoria, UpdateCategoriaDto>()
              .ReverseMap();

            CreateMap<CreateCategoriaDto, UpdateCategoriaDto>()
              .ReverseMap();
        }

    }
}
