using HomeBudget.Domain.Enums;

namespace HomeBudget.Application.DTOs.CategoriaDtos
{
    public class CategoriaRequestDto
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public TipoCategoria Finalidade { get; set; }
        public DateTime DataCriacaoModificacao { get; set; }
    }
}
