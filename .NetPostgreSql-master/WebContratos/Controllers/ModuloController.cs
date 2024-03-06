using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Negocio.Interfaces;

namespace WebContratos.Controllers
{
    public class ModuloController : Controller
    {
        IModulo _modulo;
        public ModuloController(IModulo _modulo)
        {
            this._modulo = _modulo;
        }

        [HttpGet]
        [Route("modulos")]
        [Authorize("leer:modulos")] // Se requiere el ámbito "read:usuarios"
        public IActionResult GetModulos()
        {
            var resultado = _modulo.GetModulos();
            return Ok(new { resultado });
        }
        
        
        [HttpPost]
        [Route("modulos/agregar")]
        [Authorize("agregar:modulos")]
        public IActionResult AgregarModulo()
        {
            var Modulos = _modulo.GetModulos();
            return Ok(new { Modulos });
        }

        [HttpDelete]
        [Route("modulos/eliminar")]
        [Authorize("eliminar:modulos")] 
        public IActionResult EliminarModulo(int IdModulo)
        {
            _modulo.EliminarModulos(IdModulo);
            return Ok();
        }

        [HttpPut]
        [Route("modulos/actualizar")]
        [Authorize("actualizar:modulos")] 
        public IActionResult ActualizarModulo()
        {
            var Modulos = _modulo.GetModulos();
            return Ok(new { Modulos });
        }
    }
}
