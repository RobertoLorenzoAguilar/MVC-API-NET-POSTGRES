export const obtenerExtensionImagen = (path) => {
  const ext = path.split('.').pop();
  return ext.toLowerCase();
}