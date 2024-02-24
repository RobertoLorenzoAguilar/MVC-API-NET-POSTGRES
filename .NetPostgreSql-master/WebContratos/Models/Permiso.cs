using System;
using System.Collections.Generic;

namespace WebContratos.Models;

public partial class Permiso
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }
}
