using Dato;
using Dato.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.Interfaces
{
    public interface IUsuario
    {
        Usuario GetUsuarioById(int IdUsuario);

        Usuario GetUsuarioByCredenciales(string correo, string clave);

        List<string> GetPermisosModuloByRol(int IdRol);

    }
}
