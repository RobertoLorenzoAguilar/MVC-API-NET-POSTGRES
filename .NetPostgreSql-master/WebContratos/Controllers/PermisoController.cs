using Datos.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Negocios.Interfaces;
using System.IdentityModel.Tokens.Jwt;

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

            var resultado = _permiso.GetPermisosByRol(); // Llama al método para obtener los permisos por rol


            return Ok(new { resultado }); // Devuelve una respuesta Ok con la lista de permisos y roles
        }


        [HttpGet]
        [Route("permisos/GetPermisosByRolUsuarioActual")]
        [Authorize("leer:permisos")] // Asegúrate de que el middleware de autenticación esté configurado correctamente para procesar este atributo.
        public IActionResult GetPermisosByRolUsuarioActual()
        {

            var token = TokenManager.GetToken(); //validacion para cuando el token llega vacio

            // Deserializar el JSON en un objeto TokenData
            // Decodificar el token JWT
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

            // Obtener el valor del rol
            int IdRol = Convert.ToInt32(jsonToken.Claims.First(claim => claim.Type == "Rol").Value);

            var resultado = _permiso.GetPermisosByRolUser(IdRol); // Llama al método para obtener los permisos por rol


            return Ok(new { resultado }); // Devuelve una respuesta Ok con la lista de permisos y roles
        }


        [HttpGet]
        [Route("permisos")]
        [Authorize("leer:permisos")] // Se requiere el ámbito "read:usuarios"
        public IActionResult GetPermisos()
        {
            var resultado = _permiso.GetPermisos();
            return Ok(new { resultado });

        }
    }
}
