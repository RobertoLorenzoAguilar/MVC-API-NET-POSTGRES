using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Datos;
using Negocio.Clases;
using Negocio.Interfaces;
using Negocios.Interfaces;
using Negocios.Clases;
using Datos.Models;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ContratoDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("cadenaSql")));

//Configurar las interfaces para que el controlador las pueda exponer
builder.Services.AddScoped<IModulo, LogicaModulo>();
builder.Services.AddScoped<IAuh, LogicaAuh>();
builder.Services.AddScoped<IUsuario, LogicaUsuario>();
builder.Services.AddScoped<IPermiso, LogicaPermiso>();
builder.Services.AddScoped<IRol, LogicaRol>();


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
    //Ordenar alfabeticamente
    #region Modulo modulos
    options.AddPolicy("agregar:modulos", policy => policy.RequireClaim("scope", "agregar:modulos"));
    options.AddPolicy("leer:modulos", policy => policy.RequireClaim("scope", "leer:modulos"));
    options.AddPolicy("eliminar:modulos", policy => policy.RequireClaim("scope", "eliminar:modulos"));
    options.AddPolicy("actualizar:modulos", policy => policy.RequireClaim("scope", "actualizar:modulos"));
    #endregion Modulo modulos

    #region Modulo permisos  
    options.AddPolicy("leer:permisos", policy => policy.RequireClaim("scope", "leer:permisos"));
    options.AddPolicy("eliminar:modulos", policy => policy.RequireClaim("scope", "eliminar:modulos"));
    #endregion Modulo permisos

    #region Modulo usuarios
    options.AddPolicy("leer:roles", policy => policy.RequireClaim("scope", "leer:roles"));
    #endregion Modulo usuarios

    #region Modulo usuarios
    options.AddPolicy("leer:usuarios", policy => policy.RequireClaim("scope", "leer:usuarios"));
    options.AddPolicy("agregar:usuarios", policy => policy.RequireClaim("scope", "agregar:usuarios"));
    options.AddPolicy("eliminar:usuarios", policy => policy.RequireClaim("scope", "eliminar:usuarios"));
    options.AddPolicy("actualizar:usuarios", policy => policy.RequireClaim("scope", "actualizar:usuarios"));
    #endregion Modulo usuarios
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
