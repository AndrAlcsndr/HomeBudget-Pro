using HomeBudget.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HomeBudget.Infra
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {}

       
    }
}
