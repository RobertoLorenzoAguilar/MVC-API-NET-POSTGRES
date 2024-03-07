using Datos.Models;

namespace Negocio.Interfaces
{
    public interface IAuh
    {
        Usuario GetUsuarioById(int IdUsuario);

        Usuario GetUsuarioByCredenciales(string correo, string clave);

        List<string> GetPermisosModuloByRol(int? IdRol);        

    }
}
