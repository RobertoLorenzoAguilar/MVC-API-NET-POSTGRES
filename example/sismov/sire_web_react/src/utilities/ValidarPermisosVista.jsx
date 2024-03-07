import {useAuth} from "../hooks";
/**
 * @ValidarPermisoVista
 * Valida que un usuario tenga permisos nesesarios para entrar en la vista, si no regresa a la ultima pagina visitada
 * @permiso.- es el id del permiso creado en tabla de permisos
 * @permisoExtra.- Trae los isPermiso con los que cuenta el usuario
 */
export const ValidarPermisosVista = (permiso) => {
  const {user} = useAuth();
  if (permiso && user?.permisoExtra && !user?.permisoExtra?.includes(permiso)) {
    window.history.back();
  }
}