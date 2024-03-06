using Dato;
using Dato.Model;
using Microsoft.EntityFrameworkCore;
using Negocio.Interfaces;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Negocio.Clases
{
    public class LogicaUsuario : IUsuario
    {
        private ContratoDbContext db;

        public LogicaUsuario(ContratoDbContext db)
        {
            this.db = db;

        }
        public Usuario GetUsuarioById(int idUsuario)
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
                objUsuario.RolId = 1;
                //objUsuario.Id = 2;
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
    }
}

