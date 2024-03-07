using Datos.Models;

namespace Negocio.Interfaces
{
    public interface IModulo
    {
        List<Modulo> GetModulos();
        void EliminarModulos(int IdModulo);
    }
}
