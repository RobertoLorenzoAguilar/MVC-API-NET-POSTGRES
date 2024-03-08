using Datos.Models;

namespace Negocios.Interfaces
{
    public interface IRol
    {
        Rol GetRolById(int? IdRol);
        List<Rol> GetRols();
        bool GuardarRol(RolPermisoModulo objRol);

    }
}
