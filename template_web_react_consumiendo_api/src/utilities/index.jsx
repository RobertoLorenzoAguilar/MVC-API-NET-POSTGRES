import { NON_DIGIT } from '../constants'
import { Modal, notification } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import httpService from '../services/httpService'
import React from 'react'
import { estatusExpediente } from './estatusExpediente'
import { inventarioConcentracion } from './inventarioConcentracion'
import { reporteExpediente } from './reporteExpediente'
import { obtenerExtensionImagen } from './obtenerExtencionImagen'
import { ValidarPermisosVista } from './ValidarPermisosVista'
import { RenderEstatusSolicitudPrimaria } from './RenderEstatusSolicitudPrimaria'
import { QuitarObjetosDuplicados } from './QuitarObjetosDuplicados'
import { InformacionArchivos } from './InformacionArchivos'
import { QuitarSignos } from './QuitarSignos'

const baseUrl = import.meta.env.VITE_API_URL

export const abrirArchivo = (url) => {
  if (url) {
    const a = document.createElement('a')
    a.target = '_blank'
    a.href = url
    a.click()
  }
  return null
}

const openInNewTab = (ruta) => {
  window.open(`${baseUrl}${ruta}`, '_blank', 'noopener,noreferrer')
}

const capitalizeFirst = (string) => {
  const split = string.split('-')
  let palabraUnida = ''
  split.forEach((s) => {
    palabraUnida = palabraUnida + s.charAt(0).toUpperCase() + s.slice(1)
  })
  return palabraUnida
}

const propertyAccesor = (rootObj, accesor = '') => {
  if (!rootObj) return ''
  const properties = accesor.split('.')
  let tmp = rootObj
  properties.forEach((prop) => (tmp = tmp[prop]))
  return tmp.toString()
}

const serialDateToJSDate = serial => {
  const step = new Date().getTimezoneOffset() <= 0 ? 25567 + 2 : 25567 + 1
  const utc_days = Math.floor(serial - step)
  const utc_value = utc_days * 86400
  const date_info = new Date(utc_value * 1000)
  const fractional_day = serial - Math.floor(serial) + 0.0000001
  let total_seconds = Math.floor(86400 * fractional_day)
  const seconds = total_seconds % 60
  total_seconds -= seconds
  const hours = Math.floor(total_seconds / (60 * 60))
  const minutes = Math.floor(total_seconds / 60) % 60
  return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds)
}

const validateName = (name) => {
  let re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
  return re.test(name)
}

const validateNumber = (number) => {
  const intValue = number.toString().replace(NON_DIGIT, '')
  return !isNaN(intValue)
}

const agregarFaltantes = (data, newData, campo) => {
  let ids = data.map(item => item[campo])
  let aux = [...data]
  for (let i in newData) {
    let modelo = newData[i]
    if (!modelo) {
      continue
    }
    const indice = ids.indexOf(modelo[campo])
    if (modelo && indice === -1) {
      aux.push(modelo)
    } else {
      aux[indice] = modelo
    }
  }
  return aux
}

const eliminarRegistro = (nombre, id, url, alTerminar) => {
  if (!id) return
  Modal.confirm({
    title: 'Eliminar',
    content: `¿Está seguro de eliminar "${nombre}"?`,
    icon: <DeleteOutlined style={{ color: '#ff0000' }}/>,
    okText: 'Eliminar',
    okButtonProps: {
      type: 'danger',
    },
    cancelText: 'Cancelar',
    onOk: async () => {
      try {
        const res = await httpService.delete(url, { id: id })
        if (res && res.status === 200) {
          notification.success({
            message: 'Éxito',
            description: res?.mensaje
          })
          alTerminar && alTerminar()
        } else if (res?.status === 400) {
          notification.error({
            message: 'Atención',
            description: res?.mensaje,
          })
        }
      } catch (error) {
        console.log(error)
        notification.error({
          message: 'Error',
          description: error,
        })
        return 'error'
      }
    },
  })
}

const respuestas = (res) => {

  let estatus = false

  if (!res) return 'Error en respuesta'

  if ((res?.status >= 400 && res?.status < 499)) {
    if(res?.errores !== null){
      const errores = Object.values(res?.errores)
      notification.error({
        message: 'Atención',
        description: errores.map((e, i) => <React.Fragment key={`${i}-error`}><span>- {e}</span><br/></React.Fragment>),
        placement: 'bottomRight'
      })
      estatus = false
    }else{
      notification.error({
        message: 'Atención',
        description: res?.mensaje ? res?.mensaje : 'Hubo un problema del lado del servidor.',
        placement: 'bottomRight'
      })
      estatus = false  
    }
  } else if (res?.status >= 500) {
    notification.error({
      message: 'Atención',
      description: 'Hubo un problema del lado del servidor.',
      placement: 'bottomRight'
    })
    estatus = false
  } else if (res?.status >= 200 && res?.status < 299) {
    notification.success({
      message: '¡Éxito!',
      description: `${res?.mensaje}`,
      placement: 'bottomRight'
    })
    estatus = true
  }

  return estatus
}

const generateDefaultChartOptions = (chartType = 'pie', options = {}, callback) => ({
  chart: {
    type: chartType,
    inverted: options.inverted || false,
    options3d: {
      enabled: chartType === 'pie',
      alpha: 45,
      beta: 0,
    },
    height: options.chartHeight || null,
  },
  colors: options?.colores || ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
  credits: {
    enabled: false,
  },
  title: {
    text: options?.titulo || 'TITULO POR DEFAULT',
  },
  plotOptions: {
    [chartType]: {
      innerSize: 100,
      depth: 45,
      events: {
        click: typeof callback === 'function' ? callback : () => {},
      },
      series: {
        stacking: 'normal'
      }
    },
  },
  series: [
    {
      name: options?.nombre || 'NOMBRE DE LA COLECCION DE DATOS',
      data: options?.datos || [],
    },
  ],
  subtitle: {
    text: options?.subtitulo || 'SUBTITULO POR DEFAULT',
  },
  ...options?.options
})

const lastPathName = () => {
  const url = window.location.pathname
  return {
    lastPath: url.split('/').pop(), // cambiar por pathname
    beforePath: url.split('/')[url.split('/').length - 2]
  }
}

const quitarSignos = (values) => {
  let _values = values
  if (typeof values === 'string')
    _values = values.replaceAll('$', '').replaceAll(',', '')

  return parseFloat(_values)
}

function makeKey (length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function eliminarObjeto (arr, key) {
  const obj = arr.findIndex((obj) => obj.key === key)
  if (obj > -1) {
    arr.splice(obj, 1)
  }
  return arr
}

const isEllipsis = (columns, key) => {
  const obtenerColumna = columns.find(column => column.key === key)
  return Boolean(obtenerColumna && obtenerColumna?.ellipsis)
}

const getRandomUid = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

const renderTotal = (array, prop) => {
  if (prop?.length > 0 && array?.length > 0) {
    const total = array.reduce((acc, curr) => acc + Number(curr[prop]), 0)
    return Number(total) > 0
      ? Number(total).toFixed(2)
      : (0).toFixed(2)
  }
  return (0).toFixed(2)
}

const FormatoPesos = (number = 0) => {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g
  const rep = '$1,'
  return number?.toString().replace(exp, rep)
}

const ValidarRfc = (item) => {
  let re = /^[A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]$/
  let validado = item.match(re)

  if (!validado)
    return false
  else
    return true
}

const ValidarTelefono = (item) => {
  let re = /^[0-9]{10}$/
  let validado = item.match(re)

  if (!validado)
    return false
  else
    return true
}

const ValidarCorreo = (item) => {
  let re = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
  let validado = item.match(re)

  if (!validado)
    return false
  else
    return true
}

const GetMesTexto = (number, corto = false) => {
  let mes = ''
  let mesCorto = ''
  let numero = parseInt(number)

  if (numero === 1) {
    mes = 'Enero'
    mesCorto = 'Ene'
  }
  if (numero === 2) {
    mes = 'Febrero'
    mesCorto = 'Feb'
  }
  if (numero === 3) {
    mes = 'Marzo'
    mesCorto = 'Mar'
  }
  if (numero === 4) {
    mes = 'Abril'
    mesCorto = 'Abr'
  }
  if (numero === 5) {
    mes = 'Mayo'
    mesCorto = 'May'
  }
  if (numero === 6) {
    mes = 'Junio'
    mesCorto = 'Jun'
  }
  if (numero === 7) {
    mes = 'Julio'
    mesCorto = 'Jul'
  }
  if (numero === 8) {
    mes = 'Agosto'
    mesCorto = 'Ago'
  }
  if (numero === 9) {
    mes = 'Septiembre'
    mesCorto = 'Sep'
  }
  if (numero === 10) {
    mes = 'Octubre'
    mesCorto = 'Oct'
  }
  if (numero === 11) {
    mes = 'Noviembre'
    mesCorto = 'Nov'
  }
  if (numero === 12) {
    mes = 'Diciembre'
    mesCorto = 'Dic'
  }

  if (corto)
    return mesCorto
  else
    return mes
}

const formatearMoneda = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format

export {
  agregarFaltantes,
  capitalizeFirst,
  propertyAccesor,
  serialDateToJSDate,
  validateName,
  validateNumber,
  QuitarObjetosDuplicados,
  eliminarRegistro,
  generateDefaultChartOptions,
  respuestas,
  lastPathName,
  makeKey,
  eliminarObjeto,
  openInNewTab,
  quitarSignos,
  isEllipsis,
  getRandomUid,
  renderTotal,
  FormatoPesos,
  ValidarRfc,
  InformacionArchivos,
  ValidarTelefono,
  ValidarCorreo,
  estatusExpediente,
  inventarioConcentracion,
  obtenerExtensionImagen,
  RenderEstatusSolicitudPrimaria,
  reporteExpediente,
  GetMesTexto,
  QuitarSignos,
  ValidarPermisosVista,
  formatearMoneda,
}