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

        public bool GuardarModulo(Modulo objModulo)
        {
            try
            {
                objModulo.Eliminado = 1;
                db.Modulos.Add(objModulo);

                db.SaveChanges();
                return true; // Si se guarda correctamente, devolvemos true
            }
            catch (Exception ex)
            {
                // Manejar la excepción según sea necesario
                Console.WriteLine($"Error al guardar el modulo: {ex.Message}");
                return false; // Si ocurre un error, devolvemos false
            }
        }
        public bool ActualizarModulo(Modulo objModulo)
        {
            try
            {
                var objModuloActualizar = db.Modulos.Where(x => x.Id == objModulo.Id).First();
                objModuloActualizar.Nombre = objModulo.Nombre;                
                db.SaveChanges();
                return true; // Si se guarda correctamente, devolvemos true
            }
            catch (Exception ex)
            {
                // Manejar la excepción según sea necesario
                Console.WriteLine($"Error al actualizar el modulo: {ex.Message}");
                return false; // Si ocurre un error, devolvemos false
            }
        }

    }
}
