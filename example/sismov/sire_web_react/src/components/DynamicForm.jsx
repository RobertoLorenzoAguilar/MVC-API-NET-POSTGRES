import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import { RULES } from './constants';
import { SaveOutlined } from '@ant-design/icons';
import PropTypes from "prop-types";

// justify: "start" | "end" | "center" | "space-around" | "space-between"
const DynamicForm = ({
  fields,
  onFinish,
  initialValues = {},
  justify = 'start',
  form,
  buttonText = null,
  loadingButton = null
}) => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinishHandler = async (values) => {
    // Verificar si no se está realizando ya una solicitud de envío
    if (!isSubmitting) {
      // Establecer el estado de envío a true para evitar envíos duplicados
      setIsSubmitting(true);
      // Llamar a la función onFinish pasando los valores proporcionados
      await onFinish(values);
      // Restablecer el estado de envío a false después de que se complete la función onFinish
      setIsSubmitting(false);
    }

  };

  const onTypeInput = (type, options, readOnly) => {
    switch (type) {
      case 'text':
        return <Input readOnly={readOnly} />;
      case 'textarea':
        return <Input.TextArea />;
      case 'password':
        return <Input.Password />;
      case 'number':
        return <Input type="number" />;
      case 'email':
        return <Input type="email" />;
      case 'phone':
        return <Input type="number" />;
      case 'select':
        return <Select
          style={{ width: '100%' }}
          options={options}
          placeholder="Selecciona una opción"
        />;
      default:
        return <Input />;
    }
  }

  return (
    <Form
      form={form}
      onFinish={onFinishHandler}
      layout="vertical"
      initialValues={initialValues}
    >
      <Row gutter={[10, 10]} justify={justify}>
        {fields.map((field) => {
          const { name, label, rules, type, md, render, options, readOnly } = field;
          return (
            <Col
              xs={24}
              md={md}
              key={name}
            >
              <Form.Item
                key={name}
                label={label}
                name={name}
                rules={[
                  ...rules || [],
                  ...(RULES[type] || []),
                ]}
              >
                {
                  type !== 'custom' ? onTypeInput(type, options, readOnly) : render()
                }
              </Form.Item>
            </Col>
          )
        })}
      </Row>
      <Row
        justify="end"
        style={{
          marginTop: 10
        }}
      >
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={loadingButton}
          >
            {buttonText || 'Guardar'}
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

DynamicForm.propTypes = {
  fields: PropTypes.array.isRequired,
  onFinish: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  justify: PropTypes.string,
}

export default DynamicForm;
