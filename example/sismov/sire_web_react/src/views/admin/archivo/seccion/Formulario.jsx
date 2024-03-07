import React, { useState } from 'react'
import { Input, Form, Row, Col, Button, Switch, Select } from 'antd'
import HttpService from '../../../../services/httpService'
import { respuestas } from '../../../../utilities'
import { SaveOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { SECCIONES_TIPO } from './index'
import TextArea from 'antd/es/input/TextArea'

export const Formulario = ({ model = null, id, alTerminar, urlApi, url }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { Option } = Select

  const [guardando, setGuardando] = useState(false)
  const [estatus, setEstatus] = useState(false)

  const onFinish = async (values) => {

    try {

      let body = { ...values }
      if (model && model?.id) {
        body.id = model?.id
      }

      const res = await HttpService.post(`${urlApi}/guardar`, body)
      if (respuestas(res)) {
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

      let body = {
        ...values,
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

      <Row gutter={{ xs: 10, sm: 10, md: 10, lg: 10 }}>

        <Col
          className="gutter-row"
          xs={{ span: 12, offset: 0 }}
          sm={{ span: 12, offset: 0 }}
          md={{ span:12, offset: 0 }}
          lg={{ span: 12, offset: 0 }}
          xxl={{ span: 12, offset: 0 }}
        >
          <Form.Item
            label="Código"
            name="codigo"
            rules={[{ required: true, message: 'Requerido' }]}
          >
            <Input
              placeholder="Escribir código"
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 12, offset: 0 }}
          sm={{ span: 12, offset: 0 }}
          md={{ span: 12, offset: 0 }}
          lg={{ span: 12, offset: 0 }}
          xxl={{ span: 12, offset: 0 }}
        >
          <Form.Item
            label="Título de la Sección"
            name="titulo"
            rules={[{ required: true, message: 'Requerido' }]}
          >
            <Input
              placeholder="Escribir Título"
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 24, offset: 0 }}
          xxl={{ span: 24, offset: 0 }}
        >
          <Form.Item
            label="Descripción"
            name="descripcion"
            rules={[{ required: true, message: 'Requerido' }]}
          >
            <TextArea
              placeholder="Escribir Descripción"
              autoComplete="off"
            />
          </Form.Item>
        </Col>


        <Col
          className="gutter-row"
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 12, offset: 0 }}
          lg={{ span: 12, offset: 0 }}
        >
          <Form.Item
            label="Estatus"
            hasFeedback
          >
            <Switch
              checkedChildren="Activo"
              unCheckedChildren="Inactivo"
              checked={estatus}
              onChange={(value) => {
                setEstatus(value)
              }}/>
          </Form.Item>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 12, offset: 0 }}
          lg={{ span: 12, offset: 0 }}
        >
          <Form.Item
            label="Tipo"
            name="tipo"
            rules={[{ required: true, message: 'Requerido' }]}
            hasFeedback
          >
            <Select
              placeholder="Seleccionar tipo"
              style={{ width: '100%' }}
            >
              {SECCIONES_TIPO && Object.keys(SECCIONES_TIPO).map((item, index) => (
                <Option key={index} value={item}>{item}</Option>
              ))}
            </Select>
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
