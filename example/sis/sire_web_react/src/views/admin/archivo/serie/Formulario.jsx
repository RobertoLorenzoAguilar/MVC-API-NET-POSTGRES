import React, { useState } from 'react'
import { Input, Form, Row, Col, Button, Select, InputNumber } from 'antd'
import HttpService from '../../../../services/httpService'
import { ImageUploader, Select as SelectComponent } from '../../../../components'
import { QuitarSignos, respuestas } from '../../../../utilities'
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export const Formulario = ({ model = null, id, alTerminar, urlApi, url }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { Option } = Select

  const [guardando, setGuardando] = useState(false)
  const [mostrarVS, setMostrarVS] = useState(true)

  const actualizarVigenciaTotal = () => {
    let _total = QuitarSignos(form.getFieldValue('vigenciaAt') || 0) + QuitarSignos(form.getFieldValue('vigenciaAc') || 0)
    //form.setField('vigenciaT', _total)
    form.setFieldValue('vigenciaT', _total)
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

      body.vigenciaAc = values.vigenciaAc + ''
      body.vigenciaAt = values.vigenciaAt + ''
      body.vigenciaT = values.vigenciaT + ''
      body.valoracionPrimaria = values.valoracionPrimaria.toString()
      body.valoracionSecundaria = values.valoracionSecundaria.toString()

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
        ...model,
        valoracionPrimaria: model?.valoracionPrimaria?.split(','),
        valoracionSecundaria: model?.valoracionSecundaria?.split(',')
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
          md={{ span: 12, offset: 0 }}
          lg={{ span: 12, offset: 0 }}
          xxl={{ span: 12, offset: 0 }}
        >
          <Form.Item
            label="Código"
            name="codigo"
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
          xs={{ span: 12, offset: 0 }}
          sm={{ span: 12, offset: 0 }}
          md={{ span: 12, offset: 0 }}
          lg={{ span: 12, offset: 0 }}
          xxl={{ span: 12, offset: 0 }}
        >
          <Form.Item
            label="Título de Serie"
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
          md={{ span: 12, offset: 0 }}
          lg={{ span: 12, offset: 0 }}
          xxl={{ span: 12, offset: 0 }}
        >
          <Form.Item
            label="Descripción de Serie"
            name="descripcion"
          >
            <Input
              size="large"
              placeholder="Descripción"
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
            label="Sección"
            name="idSeccion"
            rules={[{ required: true, message: 'Requerido' }]}
            hasFeedback
          >
            <SelectComponent
              modelsParams={{
                name: 'seccion',
                ordenar: 'titulo-asc'
              }}
              labelProp="titulo"
              valueProp="id"
              allowClear={true}
              size="large"
              autoComplete="off"
              append={[model?.seccion]}
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
            label="Valoración Primaria"
            name="valoracionPrimaria"
            rules={[{ required: true, message: 'Requerido' }]}
          >
            <Select
              size="large"
              mode="multiple"
            >
              <Option value="A">Administrativo</Option>
              <Option value="L">Legal</Option>
              <Option value="CF">Fiscal o Contable</Option>
            </Select>
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
            label="Destino Final"
            name="destinoFinal"
            rules={[{ required: true, message: 'Requerido' }]}
          >
            <Select
              size="large"
              onChange={(val) => {
                setMostrarVS(val === 'D' ? true : false)
              }}
            >
              <Option value="D">(B) Destrucción</Option>
              <Option value="CC">(H) Conservación Completa</Option>
              <Option value="CF">(M) Conservación por Muestreo</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 12, offset: 0 }}
          sm={{ span: 12, offset: 0 }}
          md={{ span: 12, offset: 0 }}
          lg={{ span: 12, offset: 0 }}
          xxl={{ span: 12, offset: 0 }}
          hidden={mostrarVS}
        >
          <Form.Item
            label="Valoración Secundaria"
            name="valoracionSecundaria"
          >
            <Select
              size="large"
              mode="multiple"
              options={[
                { key: 'INFO', value: 'INFO', label: 'Informativo' },
                { key: 'ET', value: 'ET', label: 'Evidencial / Testimonial' },
              ]}
            />
          </Form.Item>
        </Col>

      </Row>


      <Row gutter={{ xs: 10, sm: 10, md: 10, lg: 10 }}>
        <Col
          className="gutter-row"
          xs={24}
          sm={12}
          md={8}
          lg={8}
          xxl={8}
        >
          <Form.Item
            tooltip="Vigencia Archivo de Trámite"
            label="Vigencia Archivo de Trámite"
            name="vigenciaAt"
            rules={[{ required: true, message: 'Requerido' }]}
          >
            <InputNumber
              size="large"
              style={{ width: '100%' }}
              min={1}
              max={99}
              onChange={() => actualizarVigenciaTotal}
            />
          </Form.Item>
        </Col>

        <Col
          className="gutter-row"
          xs={24}
          sm={12}
          md={8}
          lg={8}
          xxl={8}
        >
          <Form.Item
            tooltip="Vigencia Archivo de Concentración"
            label="Vigencia Archivo de Concentración"
            name="vigenciaAc"
            rules={[{ required: true, message: 'Requerido' }]}
          >
            <InputNumber
              size="large"
              style={{ width: '100%' }}
              min={1}
              max={99}
              onChange={() => actualizarVigenciaTotal()}
            />
          </Form.Item>
        </Col>

        <Col
          className="gutter-row"
          xs={24}
          sm={12}
          md={8}
          lg={8}
          xxl={8}
        >
          <Form.Item
            label="Vigencia Total"
            name="vigenciaT"
            rules={[{ required: true, message: 'Requerido' }]}
          >
            <InputNumber
              size="large"
              style={{ width: '100%' }}
              min={1}
              max={99}
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
