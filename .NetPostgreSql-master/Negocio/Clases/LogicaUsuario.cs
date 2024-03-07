using Datos.Models;
using Negocios.Interfaces;

namespace Negocio.Clases
{
    public class LogicaUsuario : IUsuario
    {
        private ContratoDbContext db;

        public LogicaUsuario(ContratoDbContext db)
        {
            this.db = db;

        }
        public Usuario GetUsuarioById(int? idUsuario)
        {
            return db.Usuarios.Where(obj => obj.Id == idUsuario).First();

        }
        public List<Usuario> GetUsuarios()
        {
            var lstUsuario = db.Usuarios.ToList();
            return lstUsuario;
        }
        public bool GuardarUsuario(Usuario objUsuario)
        {
            try
            {
                db.Usuarios.Add(objUsuario);
                db.SaveChanges();
                return true; // Si se guarda correctamente, devolvemos true
            }
            catch (Exception ex)
            {
                // Manejar la excepción según sea necesario
                Console.WriteLine($"Error al guardar el usuario: {ex.Message}");
                return false; // Si ocurre un error, devolvemos false
            }
        }
        public bool EliminarUsuario(int idUsuario)  //cambiar a borrado logico
        {
            try
            {
                var objUsuario = db.Usuarios.Where(x => x.Id == idUsuario).First();
                _ = db.Usuarios.Remove(objUsuario);
                db.SaveChanges();
                return true; // Si se guarda correctamente, devolvemos true
            }
            catch (Exception ex)
            {
                // Manejar la excepción según sea necesario
                Console.WriteLine($"Error al eliminar el usuario: {ex.Message}");
                return false; // Si ocurre un error, devolvemos false
            }
        }
    }
}

