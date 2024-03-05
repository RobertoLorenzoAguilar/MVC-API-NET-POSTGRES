using Dato.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Negocios.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using static Negocios.Clases.LogicaPermiso;

namespace WebContratos.Controllers
{
    public class PermisoController : Controller
    {

        IPermiso _permiso;
        public PermisoController(IPermiso _permiso)
        {
            this._permiso = _permiso;
        }

        [HttpGet]
        [Route("permisos/rol")]
        [Authorize("leer:permisos")] // Asegúrate de que el middleware de autenticación esté configurado correctamente para procesar este atributo.
        public IActionResult GetPermisosByRol()
        {
            
            var token = TokenManager.GetToken();

            // Deserializar el JSON en un objeto TokenData
            // Decodificar el token JWT
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

            // Obtener el valor del rol
            int IdRol = Convert.ToInt32(jsonToken.Claims.First(claim => claim.Type == "Rol").Value);
            
            var PermisosRol = _permiso.GetPermisosByRol(IdRol); // Llama al método para obtener los permisos por rol
            

            return Ok(PermisosRol); // Devuelve una respuesta Ok con la lista de permisos y roles
        }
    }
}
