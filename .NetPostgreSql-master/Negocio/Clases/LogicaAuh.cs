using Datos.Models;
using Negocio.Interfaces;

namespace Negocio.Clases
{
    public class LogicaAuh :  IAuh
    {
        private ContratoDbContext db;

        public LogicaAuh(ContratoDbContext db)
        {
            this.db = db;

        }
        public Usuario GetUsuarioById(int idUsuario)
        {
            return db.Usuarios.Where(obj => obj.Id == idUsuario).First();

        }

        public Usuario GetUsuarioByCredenciales(string correo, string clave)
        {

            var test = db.Usuarios.ToList();
            return db.Usuarios.Where(obj => obj.Correo == correo && obj.Pwd == clave).FirstOrDefault();

        }


        public List<string> GetPermisosModuloByRol(int? idRol)
        {
            //codigo en entity
            //select permiso.nombre, modulo.nombre from rol_permiso_modulo
            //inner join permiso on rol_permiso_modulo.permiso_id = permiso.id
            //inner join  modulo on rol_permiso_modulo.modulo_id = modulo.id
            //where rol_id = 1


            //SELECT CONCAT(permiso.nombre, ':', modulo.nombre) AS resultado_concatenado
            //FROM rol_permiso_modulo
            //INNER JOIN permiso ON rol_permiso_modulo.permiso_id = permiso.id
            //INNER JOIN modulo ON rol_permiso_modulo.modulo_id = modulo.id
            //WHERE rol_id = 1;
            // Dentro de algún método en tu aplicación
            var resultado = from rpm in db.RolPermisoModulos
                            join p in db.Permisos on rpm.PermisoId equals p.Id
                            join m in db.Modulos on rpm.ModuloId equals m.Id
                            where rpm.RolId == idRol
                            select p.Nombre + ":" + m.Nombre;

            // Convertir el resultado a una lista de strings
            return resultado.ToList();
        }


        List<Usuario> GetUsuarios()
        {
            var lstUsuario = db.Usuarios.ToList();
            return lstUsuario;
        }
    }

}

