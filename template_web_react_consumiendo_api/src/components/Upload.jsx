import React, {useEffect, useState} from 'react'
import {Modal, Upload as UploadAntd} from 'antd'
import {useApp, useAuth} from "../hooks";
import {ExclamationCircleOutlined, UploadOutlined} from "@ant-design/icons";
import StatusResponse from "../services/statusResponse";
import {Respuestas} from "../utilities";

const baseUrl = import.meta.env.VITE_API_URL
const _baseUrl = baseUrl.replace("v1/", "")

const Upload = ({
                  action,
                  onChange,
                  fileList,
                  listType,
                  className,
                  accept = ".xml, .pdf, .png, .jpg, .doc, .xls, .docx, .xlsx",
                  text,
                  onRemove,
                  loading,
                  setLoading,
                  showDownloadIcon = true,
                  showPreviewIcon = true,
                  showRemoveIcon = true,
                  onRefresh,
                }) => {

  const {token} = useApp();
  const {confirm} = Modal;

  const [listaArchivos, setListaArchivos] = useState([]);

  const props = {
    name: 'file',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };


  const onRemoveFile = async (file) => {
    let body = {...file};
    let _listaArchivos = listaArchivos

    if (!file.idMedia)
      body = {...file?.response?.detalle}

    confirm({
      title: `¿Estás seguro de eliminar el Archivo ${file.name}?`,
      icon: <ExclamationCircleOutlined/>,
      okText: 'Si, Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          const res = await StatusResponse.post('media/eliminar-archivo', body);
          if (Respuestas(res)) {
            _listaArchivos.filter(item => item?.idMedia !== res?.response?.detalle?.idMedia)
            setListaArchivos(_listaArchivos)
            onRefresh && onRefresh()
          }
        } catch (e) {
          console.log('Error al guardar: ', e);
        } finally {
        }
      },
      onCancel() {
        setListaArchivos(_listaArchivos);
        onRefresh && onRefresh()
      },
    });
  }

  useEffect(() => {
    if (fileList) {
      if (setLoading) {
        if (fileList?.filter(item => item.status === 'done').length !== listaArchivos?.filter(item => item.status === 'done').length) {
          let _loading = loading - 1
          setLoading(_loading)
        }
      }
      setListaArchivos([...fileList])
    }
  }, [setLoading, fileList,])


  return (
    <UploadAntd
      {...props}
      action={action || _baseUrl + '/v1/media/guardar'}
      onChange={onChange}
      multiple={true}
      fileList={listaArchivos}
      onRemove={onRemove === false ? false : onRemoveFile}
      accept={accept}
      listType={listType}
      className={className}
      beforeUpload={(file) => {
        const isLt2M = file.size;
        if (isLt2M > 80000000) {
          Respuestas('error', 'Archivo demasiado grande');
          return false;
        }
      }}
      showUploadList={{
        showPreviewIcon: showPreviewIcon,
        showRemoveIcon: showRemoveIcon,
        showDownloadIcon: showDownloadIcon,
      }}
      percent={(e)=>{console.log(e)}}
      openFileDialogOnClick={true}
      style={{width: "100%"}}
    >
      {text}
    </UploadAntd>
  )
}

export default Upload