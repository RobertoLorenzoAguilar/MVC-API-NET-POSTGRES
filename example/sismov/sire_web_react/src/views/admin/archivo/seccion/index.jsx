import Detalle from './Detalle'
import Listado from './Listado'
import { Link } from 'react-router-dom'
import React from 'react'

const endPoint = 'seccion'
const url = '/administracion/archivo/seccion'
const expand = 'media'
const orden = 'id-desc'

const columnas = [
  {
    title: 'Código',
    index: 'codigo',
    key: 'codigo',
    dataIndex: 'codigo',
    render: (_, item) =>
      <Link to={`${url}/detalle?id=${item?.id}`} style={{ color: 'black' }}>
        {item?.codigo}
      </Link>
  },
  {
    title: 'Tipo',
    index: 'tipo',
    key: 'tipo',
    dataIndex: 'tipo',
    render: (_, item) =>
      <Link to={`${url}/detalle?id=${item?.id}`} style={{ color: 'black' }}>
        {item?.tipo}
      </Link>
  },
  {
    title: 'Nombre',
    index: 'titulo',
    key: 'titulo',
    dataIndex: 'nombre',
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
  }]

const SECCIONES_TIPO = {
  'COMUNES': 'SECCIONES COMUNES',
  'SUSTANTIVAS': 'SECCIONES SUSTANTIVAS',
}

const Secciones = () => (<Listado
  endPoint={endPoint}
  expand={expand}
  url={url}
  orden={orden}
  columnas={columnas}
/>)

const SeccionDetalle = () => (<Detalle
  endPoint={endPoint}
  expand={expand}
  url={url}
  orden={orden}
/>)

export { Secciones, SeccionDetalle, SECCIONES_TIPO }