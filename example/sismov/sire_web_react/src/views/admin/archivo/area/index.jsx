import Detalle from './Detalle'
import Listado from './Listado'
import { Link } from 'react-router-dom'
import React from 'react'

const endPoint = 'sub-fondo-area'
const url = '/administracion/archivo/sub-fondo-area'
//const expand = 'media'
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
  }]

const SubFondoAreas = () => (<Listado
  endPoint={endPoint}
  //expand={expand}
  url={url}
  orden={orden}
  columnas={columnas}
/>)

const SubFondoAreaDetalle = () => (<Detalle
  endPoint={endPoint}
  //expand={expand}
  url={url}
  orden={orden}
/>)

export { SubFondoAreas, SubFondoAreaDetalle }