using System;
using System.Collections.Generic;

namespace Datos.Models;

public partial class Modulo
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<RolPermisoModulo> RolPermisoModulos { get; set; } = new List<RolPermisoModulo>();
}
