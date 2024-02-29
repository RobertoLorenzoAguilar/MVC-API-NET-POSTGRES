using Dato;
using Dato.Model;
using Microsoft.Extensions.Primitives;

namespace Negocio.Interfaces
{
    public interface IPermiso
    {
        List<Permiso> GetPermisos();
    }
}
