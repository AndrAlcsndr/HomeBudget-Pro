using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace HomeBudget.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries =
        [
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        ];

        [HttpGet("test-db")]
        public async Task<IActionResult> TestDb()
        {
            try
            {
                using var connection = new SqlConnection("Server=(localdb)\\MSSQLLocalDB;Database=homeBudgedApp;Trusted_Connection=False;TrustServerCertificate=False;");
                await connection.OpenAsync();
                return Ok("Conectado com sucesso!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao conectar: {ex.Message}");
            }
        }

}
}
