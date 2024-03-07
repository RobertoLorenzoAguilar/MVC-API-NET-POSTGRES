using Datos.Models;

namespace Negocios.Interfaces
{
    public interface IUsuario
    {
        Usuario GetUsuarioById(int? IdUsuario);
        List<Usuario> GetUsuarios();
        bool GuardarUsuario(Usuario objUsuario);
        public bool EliminarUsuario(int idUsuario);
        public bool ActualizarUsuario(Usuario objUsuario);

    }
}
