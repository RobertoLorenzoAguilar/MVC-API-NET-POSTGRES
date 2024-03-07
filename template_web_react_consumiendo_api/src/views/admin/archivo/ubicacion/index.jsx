import Detalle from './Detalle'
import Listado from './Listado'
import { Link } from 'react-router-dom'
import React from 'react'
import { Formulario } from './Formulario'

const endPoint = 'ubicacion'
const url = '/administracion/archivo/ubicacion'
const expand = 'media'
const orden = 'id-desc'

const columnas = [
  {
    title: 'Nombre',
    index: 'titulo',
    key: 'titulo',
    dataIndex: 'titulo',
    render: (_, item) =>
      <Link to={`${url}/detalle?id=${item?.id}`} style={{ color: 'black' }}>
        {item?.titulo}
      </Link>
  },
  {
    title: 'Descripción',
    index: 'descripcion',
    key: 'descripcion',
    dataIndex: 'nombre',
    render: (_, item) =>
      <Link to={`${url}/detalle?id=${item?.id}`} style={{ color: 'black' }}>
        {item?.descripcion}
      </Link>
  },
  {
    title: 'Tipo Expediente',
    index: 'tipoExpediente',
    key: 'tipoExpediente',
    dataIndex: 'tipoExpediente',
    render: (_, item) =>
      <Link to={`${url}/detalle?id=${item?.id}`} style={{ color: 'black' }}>
        {item?.tipoExpediente}
      </Link>
  }]

const Ubicaciones = () => (<Listado
  endPoint={endPoint}
  expand={expand}
  url={url}
  orden={orden}
  columnas={columnas}
/>)

const UbicacionDetalle = () => (<Detalle
  endPoint={endPoint}
  expand={expand}
  url={url}
  orden={orden}
/>)

const UbicacionFormulario = ({ input = true, setItem, subFondoAreaForm, tipoExpediente }) => (<Formulario
  endPoint={endPoint}
  expand={expand}
  url={url}
  orden={orden}
  setItem={setItem}
  subFondoAreaForm={subFondoAreaForm}
  tipoExpediente={tipoExpediente}
/>)

export { Ubicaciones, UbicacionDetalle, UbicacionFormulario }