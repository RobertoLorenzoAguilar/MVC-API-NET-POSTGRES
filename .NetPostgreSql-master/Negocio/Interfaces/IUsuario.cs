using Dato;

namespace Negocio.Interfaces
{
    public interface IUsuario
    {
        Usuario GetUsuarioById(int IdUsuario);
        List<Usuario> GetUsuarios();
        bool GuardarUsuario(Usuario objUsuario);

    }
}
