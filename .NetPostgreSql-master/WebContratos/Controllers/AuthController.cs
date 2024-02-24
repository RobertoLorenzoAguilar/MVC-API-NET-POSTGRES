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




        #region inicio sesion
        [HttpPost]
        [Route("login")]
        public IActionResult Login()
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("aqu�_va_tu_clave_secretaaqu�_va_tu_clave_secretaaqu�_va_tu_clave_secreta");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, "usuario_de_ejemplo")
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
        [Authorize] // Agregamos el atributo [Authorize] para requerir autorizaci�n
        public void Get()
        {
            var rng = new Random();
        }

        //Con este cambio, se requerir� que el cliente proporcione un token de acceso v�lido
        //(o cualquier otro mecanismo de autorizaci�n configurado en tu aplicaci�n) 
        //para poder llamar a este endpoint GET /auth.Si el cliente no proporciona 
        //credenciales v�lidas, recibir� un c�digo de estado de respuesta 401 Unauthorized.
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
