import React from 'react';
import PropTypes  from 'prop-types';
import { Form, Row, Col, Input } from 'antd';
import { Select, ButtonGroup } from '../../../../components';

const BuscarComponente = ({ btnGroup, formBuscar }) => {

  const modelParams = {
    modulos: {
      name: 'modulos',
      limite: -1,
      ordenar: 'nombre-asc'
    },
  };

  return (
    <Form
      form={formBuscar}
      layout='vertical'
    >
      <Row gutter={10}>
        <Col span={8}>
          <Form.Item label='Buscar' name='buscar'>
            <Input placeholder='Escribir...'/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Seleccione un módulo' name='idModulo'>
          <Select 
              placeholder="Seleccione un módulo"
              allowClear={true}
              modelsParams={modelParams.modulos}
              labelProp="nombre" 
              valueProp="id"
              render={(_, row) => `${row.id} - ${row.nombre}`}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="&nbsp;">
            <ButtonGroup
              data={btnGroup}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

BuscarComponente.propTypes = {
  btnGroup: PropTypes.object,
  formBuscar: PropTypes.any.isRequired
}

export default BuscarComponente