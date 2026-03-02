namespace HomeBudget.Application.DTOs.PessoaDtos
{
    public class PessoaDto
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public int Idade { get; set; }
        public DateTime DataCriacao { get; set; }
    }
}
