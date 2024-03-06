using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Negocio.Interfaces;

namespace WebContratos.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        IAuh _usuario;

        public AuthController(IAuh _usuario)
        {
            this._usuario = _usuario;
        }


        #region inicio sesion
        [HttpPost]
        [Route("login")]
        public IActionResult Login(string correo, string clave)
        {
            if (!(string.IsNullOrEmpty(correo) && !string.IsNullOrEmpty(clave))) // valida si viene vacia
            {

                //validar si existe el usuario en base de datos
                var usuario = _usuario.GetUsuarioByCredenciales(correo, clave);

                if (usuario != null)
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes("aquí_va_tu_clave_secretaaquí_va_tu_clave_secretaaquí_va_tu_clave_secreta");

                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                       {
                           //new Claim("Scope", "leer:permisos")                       
                       }),
                        Expires = DateTime.UtcNow.AddHours(1),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };


                    //si no es nulo traer el listado de permisos por rol 
                    var lstPermisos = _usuario.GetPermisosModuloByRol(usuario.RolId);
                    // Agregar las nuevas claims basadas en los permisos obtenidos
                    foreach (var permisoModulo in lstPermisos)
                    {
                        tokenDescriptor.Subject.AddClaim(new Claim("Scope", permisoModulo));
                    }


                    //agregar rol id usuario

                    tokenDescriptor.Subject.AddClaim(new Claim("Rol", usuario.RolId.ToString()));

                    //var token = tokenHandler.CreateToken(tokenDescriptor);

                    TokenManager.SetToken(tokenHandler, tokenDescriptor);

                    return Ok(new
                    {
                        token = TokenManager.GetToken()
                    }); ;

                }
                else
                {

                    return BadRequest(); // no existe el usuario
                }

            }
            else
            {

                return BadRequest(); // credenciales vacias
            }
        }
        #endregion
    }

    public static class TokenManager
    {
        private static string _token;

        public static void SetToken(JwtSecurityTokenHandler tokenHandler, SecurityTokenDescriptor tokenDescriptor)
        {
            //var tokenHandler = new JwtSecurityTokenHandler();
            var _securityToken = tokenHandler.CreateToken(tokenDescriptor);
            _token = tokenHandler.WriteToken(_securityToken);
        }

        public static string GetToken()
        {
            return _token;
        }
    }
}
