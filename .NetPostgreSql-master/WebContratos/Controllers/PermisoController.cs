using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Negocio.Interfaces;

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
        [Route("permisos")]
        [Authorize("leer:permisos")] // Se requiere el ámbito "read:usuarios"
        public IActionResult GetPermisos()
        {
            var permisos = _permiso.GetPermisos();
            return Ok(new { permisos });
        }
        
        
        [HttpPost]
        [Route("permisos/agregar")]
        [Authorize("agregar:permisos")] // Se requiere el ámbito "eliminar:usuarios"
        public IActionResult AgregarPermiso()
        {
            var permisos = _permiso.GetPermisos();
            return Ok(new { permisos });
        }

        [HttpDelete]
        [Route("permisos/eliminar")]
        [Authorize("eliminar:permisos")] // Se requiere el ámbito "eliminar:usuarios"
        public IActionResult EliminarPermiso()
        {
            var permisos = _permiso.GetPermisos();
            return Ok(new { permisos });
        }
    }
}
