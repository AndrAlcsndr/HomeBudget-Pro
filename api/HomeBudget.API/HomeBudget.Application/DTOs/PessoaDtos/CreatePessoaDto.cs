namespace HomeBudget.Application.DTOs.PessoaDtos
{
    public class CreatePessoaDto
    {
        public Guid Id { get; set; }
        public required string Nome { get; set; }
        public required string Cpf { get; set; }
        public int Idade { get; set; }

    }
}
