import {QuitarObjetosDuplicados} from "./QuitarObjetosDuplicados";

const baseUrl = import.meta.env.VITE_API_URL

export const InformacionArchivos = (archivo, info, setInfo, tipo, token) => {
  if (!archivo)
    return;
  const _baseUrl = baseUrl.replace("v1/", "");

  let _info = info;

  if (!info.includes(archivo?.idMedia))
    _info.push({
      idMedia: archivo?.idMedia,
      name: archivo?.descripcion,
      uid: archivo?.uuid,
      url: `${_baseUrl}/v1/descarga/documento?uuid=${archivo?.uuid}&access-token=${token}&t=exp`,
      status: "done",
      thumbUrl: `${archivo?.ruta}`,
      tipo: tipo
    });

  setInfo( QuitarObjetosDuplicados(_info))
}