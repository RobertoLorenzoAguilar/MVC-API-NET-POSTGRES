using Datos.Models;

namespace Negocios.Interfaces
{
    public interface IRol
    {
        Rol GetRolById(int? IdRol);
        List<Rol> GetRols();
        bool GuardarRol(RolPermisoModulo objRol);
        bool ActualizarRol( RolPermisoModulo Rol);
        bool EliminarRol(int idRol);
    }
}
