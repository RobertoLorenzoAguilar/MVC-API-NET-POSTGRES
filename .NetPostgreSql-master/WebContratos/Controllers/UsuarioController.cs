using Datos.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Negocios.Interfaces;

namespace WebContratos.Controllers
{
    public class UsuarioController : Controller
    {

        IUsuario _usuario;

        public UsuarioController(IUsuario _usuario)
        {
            this._usuario = _usuario;
        }
        [HttpGet]
        [Route("usuarios")]
        [Authorize("leer:usuarios")] // Se requiere el ámbito "read:usuarios"
        public IActionResult GetUsuarios()
        {
            var resultado = _usuario.GetUsuarios();
            return Ok(new { resultado });
        }

        [HttpPost]
        [Route("usuarios/AgregarUsuario")]
        [Authorize("agregar:usuarios")]
        public IActionResult AgregarUsuario([FromBody] Usuario usuario)
        {
            //var Modulos = _usuario.GetModulos();
            var resultado = _usuario.GuardarUsuario(usuario);
            return Ok(new { resultado });
        }

        [HttpDelete]
        [Route("usuarios/eliminar")]
        [Authorize("eliminar:usuarios")]
        public IActionResult EliminarUsuario([FromBody] Usuario usuario)
        {
            //var Modulos = _usuario.GetModulos();
            var resultado = _usuario.EliminarUsuario(usuario.Id);
            return Ok(new { resultado });
        }        
    }
}
