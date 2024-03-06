using Datos;
using Datos.Models;
using Microsoft.Extensions.Primitives;

namespace Negocio.Interfaces
{
    public interface IModulo
    {
        List<Modulo> GetModulos();
        void EliminarModulos(int IdModulo);
    }
}
