import React, { useEffect, useState } from 'react'
import { Input, Form, Row, Col, Button, Select } from 'antd'
import HttpService from '../../../../services/httpService'
import { ImageUploader, Select as SelectComponent } from '../../../../components'
import { respuestas } from '../../../../utilities'
import { SaveOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export const Formulario = ({
  model = null,
  id, alTerminar,
  urlApi,
  url,
  input = false,
  setItem,
  subFondoAreaForm,
  tipoExpediente
}) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [guardando, setGuardando] = useState(false)
  const [arregloMedia, setArregloMedia] = useState([])
  const [listaArchivos, setListaArchivos] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [appendArea, setAppendArea] = useState([])

  const areas = {
    name: 'sub-fondo-area',
    ordenar: 'id-desc',
  }

  const onFinish = async (values) => {

    try {

      let body = { ...values }
      if (model && model?.id) {
        body.id = model?.id
      }

      const res = await HttpService.post(`${urlApi}/guardar`, body)
      if (respuestas(res)) {
        setIsModalOpen(false)
        form.resetFields()

        alTerminar && alTerminar()
        navigate(url)
      }

    } catch (error) {
      console.log(error)
    }

  }

  const handleFinish = async (values) => {

    try {
      setGuardando(true)

      console.log(arregloMedia)

      let body = {
        ...values,
        imagen: arregloMedia,
      }

      if (id) {
        body.id = id
      }

      const res = await HttpService.post(`${urlApi}/guardar`, body)
      if (respuestas(res)) {
        navigate(url)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setGuardando(false)
    }

  }

  useEffect(() => {
    if (model || model !== null) {
      form.setFieldsValue({
        ...model
      })
      setAppendArea(model?.subFondoArea)
    } else {
      form.resetFields()
    }
  }, [form, model])

  useEffect(() => {
    if (subFondoAreaForm) {
      console.log(subFondoAreaForm)
      form.setFieldValue('idSubFondoArea', subFondoAreaForm?.id)
      setAppendArea(subFondoAreaForm)
    }
  }, [subFondoAreaForm])

  useEffect(() => {
    if (subFondoAreaForm) {
      form.setFieldValue('tipoExpediente', tipoExpediente)
    }
  }, [tipoExpediente])

  return (<Form
      layout="vertical"
      form={form}
      onFinish={handleFinish}
    >
      <Row gutter={{ xs: 10, sm: 10, md: 10, lg: 10 }}>

        <Col
          className="gutter-row"
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 24, offset: 0 }}
          xxl={{ span: 24, offset: 0 }}
        >
          <Form.Item
            label="Área archivo"
            name="idSubFondoArea"
          >
            <SelectComponent
              size="large"
              modelsParams={areas}
              labelProp="titulo"
              valueProp="id"
              idModel="id"
              placeholder="Selecciona una opción"
              append={[...appendArea]}
              render={(_, row) => `${row.codigo} - ${row.titulo}`}
            />
          </Form.Item>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: input ? 24 : 12, offset: 0 }}
          lg={{ span: input ? 24 : 12, offset: 0 }}
          xxl={{ span: input ? 24 : 12, offset: 0 }}
        >
          <Form.Item
            label="Ubicación"
            name="titulo"
            rules={[{ required: true, message: 'Requerido' }]}
          >
            <Input
              size="large"
              placeholder="Escribir Título"
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: input ? 24 : 12, offset: 0 }}
          lg={{ span: input ? 24 : 12, offset: 0 }}
          xxl={{ span: input ? 24 : 12, offset: 0 }}
        >
          <Form.Item
            label="Descripción"
            name="descripcion"
            rules={[{ required: true, message: 'Requerido' }]}
          >
            <Input
              size="large"
              placeholder="Escribir código"
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: input ? 24 : 12, offset: 0 }}
          lg={{ span: input ? 24 : 12, offset: 0 }}
          xxl={{ span: input ? 24 : 12, offset: 0 }}
          hidden={input}
        >
          <Form.Item
            label="Tipo de Expediente"
            name="tipoExpediente"
          >
            <Select
              size="large"
              placeholder="Seleccione"
              autoComplete="off"
              options={[
                { label: 'Trámite', value: 'TRAMITE' },
                { label: 'Concentración', value: 'CONCENTRACION' },
                { label: 'Historico', value: 'HISTORICO' },
                { label: 'Baja', value: 'BAJA' },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <br/>

      <Row justify="end">
        <Col xs={24} lg={6}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              icon={<SaveOutlined/>}
              loading={guardando}
            >
              Guardar
            </Button>
          </Form.Item>
        </Col>
      </Row>

    </Form>
  )

}
