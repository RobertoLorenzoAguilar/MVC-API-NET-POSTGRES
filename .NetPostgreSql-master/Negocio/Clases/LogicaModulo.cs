using Datos;
using Datos.Models;
using Negocio.Interfaces;

namespace Negocio.Clases
{
    public class LogicaModulo : IModulo
    {
        private ContratoDbContext db;

        public LogicaModulo(ContratoDbContext db)
        {
            this.db = db;

        }

        public List<Modulo> GetModulos()
        {
            return db.Modulos.ToList();

        }

        public void EliminarModulos(int IdModulo)
        {
            Modulo obj = db.Modulos.Where(x => x.Id == IdModulo).First();
            db.Modulos.Remove(obj);
            var objEliminado = db.SaveChanges();
        }


    }
}
