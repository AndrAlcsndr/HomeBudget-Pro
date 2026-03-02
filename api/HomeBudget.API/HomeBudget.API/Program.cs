using HomeBudget.Application.AutoMapper.CategoriaProfile;
using HomeBudget.Application.AutoMapper.PessoaProfile;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Application.Interfaces;
using HomeBudget.Application.Services;
using HomeBudget.Domain.Interfaces;
using HomeBudget.Infra;
using HomeBudget.Infra.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));


builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile<CategoriaProfile>();
    cfg.AddProfile<PessoaProfile>();
});

builder.Services.AddCors(options =>
{
    //Liberação dos endpoints para o frontend
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});


builder.Services.AddScoped<IPessoaRepository<PagedRequest> ,PessoaRepository>();
builder.Services.AddScoped<ICategoriaRepository<PagedRequest> ,CategoriaRepository>();
builder.Services.AddScoped<ITransacaoRepository ,TransacaoRepository>();

// Services (App)
builder.Services.AddScoped<IPessoaAppService, PessoaAppService>();
builder.Services.AddScoped<ICategoriaAppService, CategoriaAppService>();
builder.Services.AddScoped<ITransacaoAppService, TransacaoAppService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();