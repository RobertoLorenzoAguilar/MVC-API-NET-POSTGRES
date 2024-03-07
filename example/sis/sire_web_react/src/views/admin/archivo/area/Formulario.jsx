import React, { useState } from 'react'
import { Input, Form, Row, Col, Button, InputNumber, Divider } from 'antd'
import HttpService from '../../../../services/httpService'
import { ImageUploader } from '../../../../components'
import { respuestas } from '../../../../utilities'
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import { useNavigate } from 'react-router-dom'

export const Formulario = ({ model = null, id, alTerminar, urlApi, url }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [guardando, setGuardando] = useState(false)
  const [arregloMedia, setArregloMedia] = useState([])
  const [listaArchivos, setListaArchivos] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      }

    } catch (error) {
      console.log(error)
    }

  }

  const handleFinish = async (values) => {

    try {
      setGuardando(true)
      let body = { ...values, }

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

  React.useEffect(() => {
    if (model || model !== null) {
      form.setFieldsValue({
        ...model
      })
    } else {
      form.resetFields()
    }
  }, [form, model])

  return (<Form
      layout="vertical"
      form={form}
      onFinish={handleFinish}
    >

      {/* Código del área | Nombre del área | Fondo  */}
      <Row gutter={10}>
        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xxl={{ span: 12 }}
        >
          <Form.Item
            label="Código"
            name="codigo"
            rules={[{ required: true, message: 'Requerido' }]}
          >
            <Input
              size="large"
              placeholder="Código"
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xxl={{ span: 12 }}
        >
          <Form.Item
            label="Nombre"
            name="titulo"
            rules={[{ required: true, message: 'Requerido' }]}
          >
            <Input
              size="large"
              placeholder="Nombre"
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xxl={{ span: 24 }}
        >
          <Form.Item
            label="Descripción"
            name="descripcion"
          >
            <TextArea
              size="large"
              autoComplete="off"
            />
          </Form.Item>
        </Col>

      </Row>

      <Divider/>

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
