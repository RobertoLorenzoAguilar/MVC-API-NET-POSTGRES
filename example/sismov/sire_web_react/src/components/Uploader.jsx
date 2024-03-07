import React from "react";
import { Upload as AntdUpload } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { openInNewTab, respuestas } from "../utilities";
import { useApp } from "../hooks";
import PropTypes from "prop-types";

const baseUrl = import.meta.env.VITE_API_URL;
const modulo = import.meta.env.VITE_API_MODULE;

const Uploader = ({
  endPoint,
  setReferencias,
  setListaArchivos,
  accept = "*",
  listaArchivos,
  onRemove = undefined,
  tipoLista = "picture-card",
  estilo,
  ...props
}) => {
  const { token } = useApp();

  const { Dragger } = AntdUpload;

  const [lista, setLista] = React.useState([]);

  const _props = {
    ...props,
    name: "archivo",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const onFinishSubir = ({ fileList }) => {
    let listaReferencias = [];
    let _listaArchivos = [];
    fileList.forEach((file) => {
      const res = {
        status: file?.xhr?.status,
        mensaje: file?.response?.mensaje,
      };
      if (res?.status !== 200) {
        respuestas(res);
      }
      if (file?.id) {
        listaReferencias.push(file);
        _listaArchivos.push(file);
      } else {
        listaReferencias.push(file?.response?.detalle);
        _listaArchivos.push({
          ...file,
          id: file?.response?.detalle?.id,
          url: file?.response?.detalle?.ruta,
          ...file?.response?.detalle,
        });
      }
    });
    setListaArchivos(_listaArchivos);
    setReferencias((prev) => {
      if (prev?.lengt > 0) {
        return [...prev, ...listaReferencias];
      } else {
        return listaReferencias;
      }
    });
  };

  const onChangeArchivos = (info) => {
    setLista(info.fileList);
    let fileList = info?.fileList;
    let l = fileList.length;
    let completo = true;
    for (let i = 0; i < l; i++) {
      if (!fileList[i]?.id /*  && !fileList[i]?.xhr */) {
        completo = false;
      }
    }
    if (!completo) {
      onFinishSubir(info);
    }
  };

  const onDownloadArchivo = (info) => {
    openInNewTab(
      `/v1/media/descarga?id=${
        info?.id ? info?.id : info?.uid
      }&access-token=${token}`
    );
  };

  React.useEffect(() => {
    if (listaArchivos) {
      setLista(listaArchivos);
      return () => setLista([]);
    }
  }, [listaArchivos]);

  return (
    <Dragger
      {..._props}
      action={`${baseUrl}${modulo}${endPoint}`}
      multiple={true}
      listType={tipoLista}
      fileList={lista}
      onChange={onChangeArchivos}
      accept={accept}
      style={estilo ? estilo : { width: "100% !importat", height: "200px" }}
      onPreview={onDownloadArchivo}
      onRemove={onRemove}
    >
      <p className="ant-upload-drag-icon">
        <DownloadOutlined />
      </p>
      <p className="ant-upload-text">Subir Archivo</p>
      {!estilo && (
        <p className="ant-upload-hint">
          Haga clic y seleccione los archivos o arrástelos y suéltelos sobre
          este espacio
        </p>
      )}
    </Dragger>
  );
};

Uploader.propTypes = {
  endPoint: PropTypes.string.isRequired,
  setReferencias: PropTypes.any.isRequired,
  setListaArchivos: PropTypes.any.isRequired,
  accept: PropTypes.string,
  listaArchivos: PropTypes.array.isRequired,
};

export default Uploader;
