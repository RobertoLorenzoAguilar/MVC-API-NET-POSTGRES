﻿using Datos.Models;
using static Negocios.Clases.LogicaPermiso;

namespace Negocios.Interfaces
{
    public interface IPermiso
    {
        List<Permiso> GetPermisos();
        List<PermisoRolPair> GetPermisosByRol();
        List<PermisoRolPair> GetPermisosByRolUser(int IdRol);
    }
}
