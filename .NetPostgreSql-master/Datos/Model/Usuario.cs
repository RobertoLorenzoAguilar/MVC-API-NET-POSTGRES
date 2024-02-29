﻿using System;
using System.Collections.Generic;

namespace Dato;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Correo { get; set; } = null!;

    public string? Clave { get; set; }

    public int RolId { get; set; }
}
