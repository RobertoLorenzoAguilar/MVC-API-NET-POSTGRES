import React from 'react'
import PropTypes from 'prop-types'
import { Select as AntdSelect, Tag, Collapse, Divider } from 'antd'
import { useModels } from '../hooks'
import { agregarFaltantes } from '../utilities'
import { PlusOutlined } from '@ant-design/icons'

const { Panel } = Collapse

const Select = ({
  modelsParams,
  labelProp,
  valueProp,
  render,
  append,
  notIn,
  deleteSelected,
  formulario,
  extraParams,
  ...props
}) => {

  const [request, setRequest] = React.useState({})
  const [buscarValue, setBuscarValue] = React.useState('')
  const [timer, setTimer] = React.useState(null)
  const [notInState, setNotIn] = React.useState('')

  const extraParamsMemo = React.useMemo(
    () => ({ q: buscarValue, notIn: notInState, ...extraParams }),
    [buscarValue, extraParams, notInState]
  )

  const requestMemo = React.useMemo(() => ({
    name: modelsParams?.name || '',
    ordenar: modelsParams?.ordenar || 'id-desc',
    limite: modelsParams?.limite || 20,
    expand: modelsParams?.expand || '',
    extraParams: extraParamsMemo,
  }), [extraParamsMemo, modelsParams])

  const Formulario = () => {
    <></>
  }

  const {
    models,
    modelsLoading,
    modelsError
  } = useModels(request)

  const onSearch = (value) => {
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      setBuscarValue(value)
    }, 300)

    setTimer(newTimer)
  }

  const quitarDuplicados = (string) => {
    if (!string) return
    const arr = String(string).split(',') || []
    const sinDuplicados = arr.filter((item, index) => arr.indexOf(item) === index)
    return sinDuplicados.join(',')
  }

  if (!render) {
    render = (value) => value
  }

  if (!append) {
    append = []
  }

  const onDeselect = React.useCallback((labeledValue) => {
    if (!labeledValue && !notIn) return
    setNotIn(lastState => {
      const sinDuplicados = quitarDuplicados(
        lastState?.length
          ? lastState += `,${labeledValue}`
          : labeledValue
      ).split(',')
      return sinDuplicados.filter(f => f !== String(labeledValue)).join(',') || ''
    })
  }, [notIn])

  React.useEffect(() => {
    setRequest(requestMemo)
    return () => {
      setRequest({})
    }
  }, [requestMemo])

  React.useEffect(() => {
    if (notIn) {
      setNotIn(lastState => {
        const sinDuplicados = quitarDuplicados(
          lastState?.length
            ? lastState += `,${notIn}`
            : notIn
        ).split(',')
        return sinDuplicados.join(',') || ''
      })
    }
  }, [notIn])

  React.useEffect(() => {
    if (deleteSelected) {
      onDeselect(deleteSelected)
    }
  }, [deleteSelected, onDeselect])

  if (modelsError) {
    return <Tag color="red">error al obtener información de selector.</Tag>
  }

  return (
    <AntdSelect
      {...props}
      showSearch
      onSearch={onSearch}
      defaultActiveFirstOption={false}
      filterOption={false}
      notFoundContent={null}
      allowClear={true}
      style={{ width: '100%' }}
      loading={modelsLoading}
      options={models?.length > 0 && agregarFaltantes([...models], [...append], valueProp).map(i => ({
        ...i,
        label: render(i[labelProp], i),
        value: i[valueProp],
      }))}
      onDeselect={(labeledValue) => {
        onDeselect(labeledValue)
      }}
      dropdownRender={(optionsm) => (
        formulario ? <> {optionsm}
          <Divider
            style={{
              margin: '8px 0',
            }}
          />
          <Collapse
            bordered={false}
            ghost
            expandIcon=""
            expandIconPosition={'end'}
            className="site-collapse-custom-collapse"
          >
            <Panel key="1" extra={<><PlusOutlined/> Agregar </>}>
              {formulario}
            </Panel>
          </Collapse>
        </> : <>{optionsm}</>
      )}
    />
  )
}

Select.propTypes = {
  modelsParams: PropTypes.object.isRequired,
  labelProp: PropTypes.string.isRequired,
  valueProp: PropTypes.string.isRequired,
  render: PropTypes.func,
  notIn: PropTypes.string,
  onDeselected: PropTypes.func,
  deleteSelected: PropTypes.string,
}

export default Select