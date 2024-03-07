using System;
using System.Collections.Generic;

namespace Datos.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Correo { get; set; } = null!;

    public string? Pwd { get; set; }
    
    public string? Telefono { get; set; }

    public int? RolId { get; set; }

    public virtual Rol? Rol { get; set; }
}
