using System;
using System.Collections.Generic;

namespace WebContratos.Models;

public partial class RolPermisoModulo
{
    public int Id { get; set; }

    public int RolId { get; set; }

    public int PermisoId { get; set; }

    public int ModuloId { get; set; }
}
