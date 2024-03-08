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
        public bool EliminarRol(int idRol)  //cambiar a borrado logico
        {
            try
            {
                var objRol = db.RolPermisoModulos.Where(x => x.Id == idRol).First();
                _ = db.RolPermisoModulos.Remove(objRol);
                db.SaveChanges();
                return true; // Si se guarda correctamente, devolvemos true
            }
            catch (Exception ex)
            {
                // Manejar la excepción según sea necesario
                Console.WriteLine($"Error al eliminar el rol: {ex.Message}");
                return false; // Si ocurre un error, devolvemos false
            }
        }

        public bool ActualizarRol(RolPermisoModulo objRol)
        {
            try
            {
                var objUsuarioActualizar = db.RolPermisoModulos.Where(x => x.Id == objRol.Id).First();
                objUsuarioActualizar.PermisoId = objRol.PermisoId;
                objUsuarioActualizar.ModuloId = objRol.ModuloId;
                objUsuarioActualizar.RolId = objRol.RolId;
                //objUsuarioActualizar.descripcion = objRol.descripcion;
                db.SaveChanges();
                return true; // Si se guarda correctamente, devolvemos true
            }
            catch (Exception ex)
            {
                // Manejar la excepción según sea necesario
                Console.WriteLine($"Error al actualizar el usuario: {ex.Message}");
                return false; // Si ocurre un error, devolvemos false
            }
        }
    }
}

