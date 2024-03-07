import React from 'react'
import { Upload as AntdUpload } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { respuestas } from '../utilities'
import { useApp } from '../hooks'
import PropTypes from 'prop-types'
import ImgCrop from 'antd-img-crop'

const baseUrl = import.meta.env.VITE_API_URL

const ImageUploader = ({
  endPoint,
  setReferencias,
  setListaArchivos,
  accept = 'image/*',
  listaArchivos,
  maxCount = null,
  onRemove = undefined,
  aspect
}) => {

  const { token } = useApp()

  const [lista, setLista] = React.useState([])

  const props = {
    name: 'archivo',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  }

  const onFinishSubir = ({ fileList, file }) => {

    file.id = file.response.detalle.id
    file.url = file.response.detalle.ruta

    let listaReferencias = []
    let _listaArchivos = []
    fileList.forEach(file => {
      const res = {
        status: file?.xhr?.status,
        mensaje: file?.response?.mensaje
      }
      respuestas(res)
      _listaArchivos.push(file)
      if (file?.id) {
        listaReferencias.push(file)
      } else {
        listaReferencias.push(file?.response?.detalle)
      }
    })
    setListaArchivos(_listaArchivos)
    setReferencias(listaReferencias)
  }

  const onChangeArchivos = (info) => {
    setLista(info.fileList)
    let fileList = info?.fileList
    let l = fileList.length
    let completo = true
    for (let i = 0; i < l; i++) {
      if (!fileList[i]?.id && !fileList[i]?.xhr) {
        completo = false
      }
    }
    if (completo) {
      onFinishSubir(info)
    }
  }

  React.useEffect(() => {
    if (listaArchivos) {
      setLista(listaArchivos)
      return () => setLista([])
    }
  }, [listaArchivos])

  return (
    <ImgCrop
      showGrid
      rotationSlider
      aspectSlider={true}
      showReset
      aspect={aspect}
      modalTitle="Editar Imagen"
      resetText="Reiniciar"
      fillColor="transparent"
    >
      <AntdUpload
        {...props}
        action={`${baseUrl}${endPoint}`}
        multiple={true}
        listType="picture-card"
        fileList={lista}
        onChange={onChangeArchivos}
        accept={accept}
        style={{ width: '100% !importat' }}
        maxCount={maxCount}
        onRemove={onRemove}
      >
        <DownloadOutlined/> Subir Imagen
      </AntdUpload>
    </ImgCrop>
  )
}

ImageUploader.propTypes = {
  endPoint: PropTypes.string.isRequired,
  setReferencias: PropTypes.any.isRequired,
  setListaArchivos: PropTypes.any.isRequired,
  accept: PropTypes.string,
  listaArchivos: PropTypes.array.isRequired
}

export default ImageUploader