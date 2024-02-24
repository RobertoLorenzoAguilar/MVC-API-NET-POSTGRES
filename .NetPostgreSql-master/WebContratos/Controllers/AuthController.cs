using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebContratos.Models;

namespace WebContratos.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {       

        private static ContratoDbContext? _contexAuth;
        public AuthController(ContratoDbContext context)
        {
            _contexAuth = context;
        }

        [HttpGet]
        [Route("usuarios")]
        [Authorize("read:usuarios")] // Se requiere el ámbito "read:usuarios"
        public IActionResult GetUsuarios()
        {
            // Lógica para obtener y devolver la lista de usuarios
            return Ok(new { usuarios = ObtenerListaUsuarios() });
        }

        private string[] ObtenerListaUsuarios()
        {
            // Simulación de la obtención de usuarios desde una base de datos u otro origen
            return new string[] { "Usuario1", "Usuario2", "Usuario3" };
        }


        #region inicio sesion
        [HttpPost]
        [Route("login")]
        public IActionResult Login()
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("aquí_va_tu_clave_secretaaquí_va_tu_clave_secretaaquí_va_tu_clave_secreta");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, "usuario_de_ejemplo"),
                //new Claim("Scope", "read:usuarios")
                new Claim("Scope", "read:usuariosw")
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }

        [HttpGet]
        [Route("auth")]
        [Authorize] // Agregamos el atributo [Authorize] para requerir autorización
        public void Get()
        {
            var rng = new Random();
        }

        //Con este cambio, se requerirá que el cliente proporcione un token de acceso válido
        //(o cualquier otro mecanismo de autorización configurado en tu aplicación) 
        //para poder llamar a este endpoint GET /auth.Si el cliente no proporciona 
        //credenciales válidas, recibirá un código de estado de respuesta 401 Unauthorized.
        #endregion

        [HttpGet]
        [Route("permiso")]
        public async Task<ActionResult<IEnumerable<Permiso>>> GetPermisos()
        {
            return await _contexAuth.Permisos.ToListAsync();
        }

        #region  Seccion modulos solo para prueba

        [HttpGet]
        [Route("GetModulos")]
        //[Route("modulo")]
        public async Task<ActionResult<IEnumerable<Modulo>>> GetModulos()
        {
            return await _contexAuth.Modulos.ToListAsync();
        }
        #endregion

    }
}
