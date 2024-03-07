using Datos.Models;
using Negocio.Interfaces;
using Negocios.Interfaces;

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
            return db.Modulos.Where(x=> x.Eliminado == 1).ToList();

        }

        public bool EliminarModulos(int IdModulo)
        {
            try
            {
                var objModulo = db.Modulos.Where(x => x.Id == IdModulo).First();
                objModulo.Eliminado = 0;  //eliminado logico                
                db.SaveChanges();
                return true; // Si se guarda correctamente, devolvemos true
            }
            catch (Exception ex)
            {
                // Manejar la excepción según sea necesario
                Console.WriteLine($"Error al eliminar el modulo: {ex.Message}");
                return false; // Si ocurre un error, devolvemos false
            }
        }


    }
}
