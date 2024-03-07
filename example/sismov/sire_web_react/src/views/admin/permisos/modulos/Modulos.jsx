import React, { useState } from "react";
import { SimpleTableLayout } from "../../../../components/layouts";
import { Tabla, ActionsButton } from "../../../../components";
import { Modal, Form, Row, Col, Input, Button, message, Divider } from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { eliminarRegistro } from "../../../../utilities";
import HttpService from "../../../../services/httpService";
import { respuestas } from "../../../../utilities";

const Modulos = () => {
  let tablaRef = React.useRef();
  const endPoint = "modulo";

  const [form] = Form.useForm();

  const [buscarValue, setBuscarValue] = useState("");
  const [open, setOpen] = useState(false);
  const [modelValue, setModelValue] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);

  const btnGroup = [
    {
      id: 1,
      onClick: () => {
        setOpen(true);
        setModelValue({});
        form.resetFields();
      },
      props: { disabled: false, type: "primary" },
      text: "Nuevo",
      icon: <PlusOutlined />,
    },
  ];

  const columns = [
    {
      title: "Acciones",
      key: "id",
      dataIndex: "id",
      width: 100,
      align: "center",
      render: (_, item) => (
        <ActionsButton
          options={[
            {
              name: "Editar",
              onClick: () => {
                setOpen(true);
                setModelValue(item);
                form.setFieldsValue({ ...item });
              },
            },
            {
              name: "Eliminar",
              onClick: () => {
                eliminarRegistro(item?.nombre, item?.id, endPoint, () => {
                  tablaRef?.current?.refresh();
                });
              },
              danger: true,
            },
          ]}
        />
      ),
    },
    {
      title: "Clave",
      key: "id",
      dataIndex: "id",
      ellipsis: true,
      render: (_, item) => (
        <Link
          style={{ color: "black" }}
          to="#"
          onClick={() => {
            setOpen(true);
            setModelValue(item);
            form.setFieldsValue({ ...item });
          }}
        >
          {item?.id}
        </Link>
      ),
    },
    {
      title: "Nombre",
      key: "nombre",
      dataIndex: "nombre",
      ellipsis: true,
      render: (_, item) => (
        <Link
          style={{ color: "black" }}
          to="#"
          onClick={() => {
            setOpen(true);
            setModelValue(item);
            form.setFieldsValue({ ...item });
          }}
        >
          {item?.nombre}
        </Link>
      ),
    },
  ];

  const onSearch = (search) => {
    setBuscarValue(search);
  };

  const onFinish = async (values) => {
    try {
      setSaveLoading(true);

      let body = {
        ...values,
      };

      const res = await HttpService.post("modulo", body);
      respuestas(res);
      if (res.status === 200) {
        setOpen(false);
        setModelValue({});
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSaveLoading(false);
    }
  };

  const onFinishFailed = ({ values, errorFields, outOfDate }) => {
    message.warning({
      content: "Verifica que todos los campos estén correctos.",
      style: {
        marginTop: "10vh",
      },
    });
  };

  return (
    <SimpleTableLayout
      onSearch={onSearch}
      btnGroup={{ btnGroup }}
      children={
        <>
          <Tabla
            innerRef={tablaRef}
            nameURL={endPoint}
            extraParams={{ buscar: buscarValue }}
            columns={columns}
          />
          <Modal
            open={open}
            title={
              modelValue?.id
                ? `Editar Módulo ${modelValue?.nombre}`
                : "Agregar Módulo"
            }
            onOk={() => setOpen(false)}
            onCancel={() => {
              setOpen(false);
              setModelValue({});
              form.resetFields();
            }}
            footer={false}
            width="50vw"
          >
            <Form
              form={form}
              name="form"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Row gutter={10}>
                <Col span={24}>
                  <Form.Item
                    name="id"
                    label="Clave"
                    rules={[
                      {
                        required: true,
                        message: "Ingrese una clave.",
                      },
                    ]}
                  >
                    <Input autoComplete="off" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={24}>
                  <Form.Item name="nombre" label="Nombre">
                    <Input autoComplete="off" />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Row gutter={10} justify="end">
                <Col span={6}>
                  <Form.Item>
                    <Button
                      block
                      onClick={() => {
                        setOpen(false);
                        setModelValue({});
                        form.resetFields();
                      }}
                    >
                      Cancelar
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={9}>
                  <Form.Item>
                    <Button
                      icon={<SaveOutlined />}
                      type="primary"
                      block
                      htmlType="submit"
                      loading={saveLoading}
                    >
                      Guardar
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
        </>
      }
    />
  );
};

export default Modulos;
