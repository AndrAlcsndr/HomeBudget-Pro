using HomeBudget.Domain.Enums;

namespace HomeBudget.Application.DTOs.TransacaoDtos
{
    public class TransacaoDto
    {
        public Guid Id { get; set; }
        public string Categoria { get; set; }
        public string Pessoa { get; set; }

        public string Descricao { get; set; }

        public TipoTransacao Tipo { get; set; }

        public double Receitas { get; set; }
        public double Despesas { get; set; }

    }
}
