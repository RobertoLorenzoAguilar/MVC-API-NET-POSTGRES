using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Negocio.Interfaces;

namespace WebContratos.Controllers
{
    public class ModuloController : Controller
    {
        IModulo _Modulo;
        public ModuloController(IModulo _Modulo)
        {
            this._Modulo = _Modulo;
        }

        [HttpGet]
        [Route("modulos")]
        [Authorize("leer:modulos")] // Se requiere el ámbito "read:usuarios"
        public IActionResult GetModulos()
        {
            var Modulos = _Modulo.GetModulos();
            return Ok(new { Modulos });
        }
        
        
        [HttpPost]
        [Route("modulos/agregar")]
        [Authorize("agregar:modulos")] // Se requiere el ámbito "eliminar:usuarios"
        public IActionResult AgregarModulo()
        {
            var Modulos = _Modulo.GetModulos();
            return Ok(new { Modulos });
        }

        [HttpDelete]
        [Route("modulos/eliminar")]
        [Authorize("eliminar:modulos")] // Se requiere el ámbito "eliminar:usuarios"
        public IActionResult EliminarModulo(int IdModulo)
        {
            _Modulo.EliminarModulos(IdModulo);
            return Ok();
        }

        [HttpPut]
        [Route("modulos/actualizar")]
        [Authorize("actualizar:modulos")] // Se requiere el ámbito "eliminar:usuarios"
        public IActionResult ActualizarModulo()
        {
            var Modulos = _Modulo.GetModulos();
            return Ok(new { Modulos });
        }
    }
}
