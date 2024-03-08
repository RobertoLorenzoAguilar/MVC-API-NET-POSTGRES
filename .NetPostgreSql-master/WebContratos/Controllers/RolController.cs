using Datos.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Negocios.Interfaces;

namespace WebContratos.Controllers
{
    public class RolController : Controller
    {

        IRol _Rol;

        public RolController(IRol _Rol)
        {
            this._Rol = _Rol;
        }
        [HttpGet]
        [Route("rol")]
        [Authorize("leer:roles")] // Se requiere el ámbito "read:Rols"
        public IActionResult GetRols()
        {
            var resultado = _Rol.GetRols();
            return Ok(new { resultado });
        }

        [HttpPost]
        [Route("Rols/AgregarRol")]
        [Authorize("agregar:roles")]
        public IActionResult AgregarRol([FromBody] RolPermisoModulo Rol)
        {
            var resultado = _Rol.GuardarRol(Rol);
            return Ok(new { resultado });
        }

        [HttpPut]
        [Route("Rols/ActualizarUsuario")]
        [Authorize("actualizar:roles")]
        public IActionResult ActualizarRol([FromBody] RolPermisoModulo Rol)
        {
            var resultado = _Rol.ActualizarRol(Rol);
            return Ok(new { resultado });
        }

        [HttpDelete]
        [Route("Rols/eliminar")]
        [Authorize("eliminar:roles")]
        public IActionResult EliminarRol([FromBody] RolPermisoModulo Rol)
        {
            var resultado = _Rol.EliminarRol(Rol.Id);
            return Ok(new { resultado });
        }
    }
}
