import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import { SimpleTableLayout } from '../../../../components/layouts'
import { Tabla, ActionsButton } from '../../../../components'
import { eliminarRegistro, } from '../../../../utilities'

const Listado = ({ endPoint, expand, url, columnas }) => {

  const tablaRef = React.useRef(null)

  const navigate = useNavigate()

  const [reqModelo, setReqModelo] = useState({})
  const [buscar, setBuscar] = useState('')

  const btnGroup = [
    {
      onClick: () => navigate('detalle'),
      props: { disabled: false, type: 'primary', block: false },
      text: 'Agregar',
      icon: <PlusOutlined/>,
    }
  ]

  const columns = [
    {
      width: '5%',
      title: '',
      render: (_, item) =>
        <ActionsButton
          data={[
            {
              label: 'Editar',
              onClick: () => {
                setReqModelo(item)
                navigate(`detalle?id=${item.id}`)
              }
            },
            {
              label: 'Eliminar',
              onClick: () => eliminarRegistro(`${item.nombre}`, item.id, endPoint, () => {
                tablaRef.current.refresh()
              }),
              danger: true
            },
          ]}
        />
    },
    ...columnas
  ]

  const handleSearch = (buscar) => {
    setBuscar(buscar)
  }

  return (
    <SimpleTableLayout
      onSearch={handleSearch}
      btnGroup={
        { btnGroup }
      }
    >
      <Tabla
        nameURL={endPoint}
        columns={columns}
        innerRef={tablaRef}

      />
    </SimpleTableLayout>
  )
}

export default Listado