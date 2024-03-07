export const QuitarObjetosDuplicados = (array, idPrincipal = 'idMedia') => {
  let hash = {};
  return array.filter(o => hash[o[idPrincipal]] ? false : hash[o[idPrincipal]] = true)
}