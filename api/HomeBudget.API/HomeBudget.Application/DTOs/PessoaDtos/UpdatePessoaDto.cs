namespace HomeBudget.Application.DTOs.PessoaDtos
{
    public class UpdatePessoaDto
    {
        public Guid Id { get; set; }
        public required string Nome { get; set; }
        public required string CPF { get; set; }
        public int Idade { get; set; }
        public DateTime DataCriacao { get; set; }
    }
}
