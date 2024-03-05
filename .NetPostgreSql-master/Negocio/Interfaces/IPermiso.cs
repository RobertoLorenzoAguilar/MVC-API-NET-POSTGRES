using Dato.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Negocios.Clases.LogicaPermiso;

namespace Negocios.Interfaces
{
    public interface IPermiso
    {
        List<Permiso> GetPermisos();

        List<PermisoRolPair> GetPermisosByRol(int IdRol);
    }
}
