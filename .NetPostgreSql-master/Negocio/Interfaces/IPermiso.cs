using Dato.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.Interfaces
{
    internal interface IPermiso
    {
        List<Permiso> GetPermisos();
    }
}
