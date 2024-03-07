import { useState, useMemo, useEffect } from 'react'
import { DefaultLayout } from '../../../../components/layouts'
import { useQuery, useModel } from '../../../../hooks'
import { Formulario } from './Formulario'

const Detalle = ({ endPoint, expand, url, orden }) => {
  const q = useQuery()
  const id = q.get('id')
  const editando = Boolean(id)

  const [request, setRequest] = useState({})

  console.log(endPoint)
  const requestParams = useMemo(() => ({
    name: endPoint,
    id: id,
    ordenar: orden,
    expand: expand,
  }), [id])

  const {
    model,
    modelLoading
  } = useModel(request)

  useEffect(() => {
    setRequest(requestParams)
    return () => {
      setRequest({})
    }
  }, [requestParams])

  return (
    <DefaultLayout
      viewLoading={{
        text: 'Cargando ...',
        spinning: modelLoading
      }}
    >
      <Formulario
        id={id}
        url={url}
        model={model}
        expand={expand}
        endPoint={endPoint}
        urlApi={endPoint}
        editando={editando}
      />
    </DefaultLayout>
  )
}

export default  Detalle;