using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet]
        [Route("auth")]
        public void Get()
        {
            var rng = new Random();
        }

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
