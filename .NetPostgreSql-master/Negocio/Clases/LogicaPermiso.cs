using Datos.Models;
using Negocios.Interfaces;

namespace Negocios.Clases
{
    public class LogicaPermiso:IPermiso
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


        public class PermisoRolPair
        {
            public required int Id { get; set; }
            public required string Permiso { get; set; }
            public required string Modulo { get; set; }
            public required string rol { get; set; }
            
        }



        public List<PermisoRolPair> GetPermisosByRol(int IdRol) // para todos los rooles quitar el argumento por que oslo traera los del rol logueado
        {
            var resultado = (from rpm in db.RolPermisoModulos
                             join p in db.Permisos on rpm.PermisoId equals p.Id
                             join m in db.Modulos on rpm.ModuloId equals m.Id
                             join r in db.Rols on rpm.RolId equals r.Id //posiblemente solo se ocupe por integridad
                             //where rpm.RolId == IdRol
                             select new PermisoRolPair { Id = rpm.Id , Permiso = p.Nombre, Modulo =  m.Nombre , rol = r.Nombre}).ToList();

            return resultado;
        }
    }
}
