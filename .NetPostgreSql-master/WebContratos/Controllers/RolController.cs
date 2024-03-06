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
        [HttpGet]
        [Route("Rols/GetRolsId")]
        [Authorize("leer:Rolsbyid")] // Se requiere el ámbito "read:Rols"
        public IActionResult GetRolsId()
        {
            var resultado = _Rol.GetRols();
            return Ok(new { resultado });
        }


        [HttpPost]
        [Route("Rols/AgregarRol")]
        [Authorize("agregar:Rols")]
        public IActionResult AgregarRol([FromBody] Rol Rol)
        {
            //var Modulos = _Rol.GetModulos();
            var resultado = _Rol.GuardarRol(Rol);
            return Ok(new { resultado });
        }
    }
}
