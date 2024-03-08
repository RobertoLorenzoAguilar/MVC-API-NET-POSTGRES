using Datos.Models;

namespace Negocios.Interfaces
{
    public interface IUsuario
    {
        Usuario GetUsuarioById(int? IdUsuario);
        List<Usuario> GetUsuarios();
        bool GuardarUsuario(Usuario objUsuario);
        bool EliminarUsuario(int idUsuario);
        bool ActualizarUsuario(Usuario objUsuario);

    }
}
