using Dato;
using Dato.Model;
using Microsoft.Extensions.Primitives;

namespace Negocio.Interfaces
{
    public interface IModulo
    {
        List<Modulo> GetModulos();
        void EliminarModulos(int IdModulo);
    }
}
