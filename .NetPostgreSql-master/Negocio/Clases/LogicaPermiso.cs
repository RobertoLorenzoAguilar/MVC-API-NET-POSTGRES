using Dato;
using Dato.Model;
using Negocio.Interfaces;

namespace Negocio.Clases
{
    public class LogicaPermiso : IPermiso
    {
        private ContratoDbContext db;

        public LogicaPermiso(ContratoDbContext db)
        {
            this.db = db;

        }

        public List<Permiso> GetPermisos()
        {
            return db.Permisos.ToList();

        }
    }
}
