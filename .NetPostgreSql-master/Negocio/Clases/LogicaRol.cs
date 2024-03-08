using Datos.Models;
using Negocios.Interfaces;

namespace Negocio.Clases
{
    public class LogicaRol : IRol
    {
        private ContratoDbContext db;

        public LogicaRol(ContratoDbContext db)
        {
            this.db = db;

        }
        public Rol GetRolById(int? idRol)
        {
            return db.Rols.Where(obj => obj.Id == idRol).First();

        }
        public List<Rol> GetRols()
        {
            var lstRol = db.Rols.ToList();
            return lstRol;
        }
        public bool GuardarRol(RolPermisoModulo objRol)
        {
            try
            {   
                db.RolPermisoModulos.Add(objRol);
                db.SaveChanges();
                return true; // Si se guarda correctamente, devolvemos true
            }
            catch (Exception ex)
            {
                // Manejar la excepción según sea necesario
                Console.WriteLine($"Error al guardar el Rol: {ex.Message}");
                return false; // Si ocurre un error, devolvemos false
            }
        }
    }
}

