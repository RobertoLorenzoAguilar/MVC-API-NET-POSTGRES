using Datos.Models;

namespace Negocio.Interfaces
{
    public interface IModulo
    {
        List<Modulo> GetModulos();
        bool EliminarModulos(int IdModulo);
    }
}
