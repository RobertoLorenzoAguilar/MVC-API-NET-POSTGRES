using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Dato;
using Negocio.Clases;
using Negocio.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ContratoDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("cadenaSql")));

//Configurar las interfaces para que el controlador las pueda usar
builder.Services.AddScoped<IPermiso, LogicaPermiso>();
builder.Services.AddScoped<IUsuario, LogicaUsuario>();


//agregar en la documentación la parte 
// Configuración de JWT
var key = Encoding.ASCII.GetBytes("aquí_va_tu_clave_secretaaquí_va_tu_clave_secretaaquí_va_tu_clave_secreta");
builder.Services.AddAuthentication(auth =>
{
    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});
// Definir políticas de autorización basadas en ámbitos
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("agregar:permisos", policy => policy.RequireClaim("scope", "agregar:permisos"));
    options.AddPolicy("leer:permisos", policy => policy.RequireClaim("scope", "leer:permisos"));    
    options.AddPolicy("eliminar:permisos", policy => policy.RequireClaim("scope", "eliminar:permisos"));
});
// final JWT

//politicas de dominio
builder.Services.AddCors(options =>
{
    options.AddPolicy("PoliticaCliente",
        policy =>
        {
            policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    //politicas de dominio
    app.UseCors("PoliticaCliente");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
