using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Dato;
using Negocio.Clases;
using Negocio.Interfaces;
using Negocios.Interfaces;
using Negocios.Clases;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ContratoDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("cadenaSql")));

//Configurar las interfaces para que el controlador las pueda exponer
builder.Services.AddScoped<IModulo, LogicaModulo>();
builder.Services.AddScoped<IUsuario, LogicaUsuario>();
builder.Services.AddScoped<IPermiso, LogicaPermiso>();


//agregar en la documentaci�n la parte 
// Configuraci�n de JWT
var key = Encoding.ASCII.GetBytes("aqu�_va_tu_clave_secretaaqu�_va_tu_clave_secretaaqu�_va_tu_clave_secreta");
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
// Definir pol�ticas de autorizaci�n basadas en �mbitos
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("agregar:modulos", policy => policy.RequireClaim("scope", "agregar:modulos"));
    options.AddPolicy("leer:modulos", policy => policy.RequireClaim("scope", "leer:modulos"));    
    options.AddPolicy("eliminar:modulos", policy => policy.RequireClaim("scope", "eliminar:modulos"));
    options.AddPolicy("actualizar:modulos", policy => policy.RequireClaim("scope", "actualizar:modulos"));
    options.AddPolicy("leer:permisos", policy => policy.RequireClaim("scope", "leer:permisos"));
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
