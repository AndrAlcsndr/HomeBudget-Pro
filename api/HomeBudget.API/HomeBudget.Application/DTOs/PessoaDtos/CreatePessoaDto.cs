namespace HomeBudget.Application.DTOs.PessoaDtos
{
    public class CreatePessoaDto
    {
        public required string Nome { get; set; }
        public required string Cpf { get; set; }
        public int Idade { get; set; }

    }
}
