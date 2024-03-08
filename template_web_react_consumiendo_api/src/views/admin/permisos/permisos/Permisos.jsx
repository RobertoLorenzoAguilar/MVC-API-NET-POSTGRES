import React, { useState } from "react";
import { SimpleTableLayout } from "../../../../components/layouts";
import { Tabla, ActionsButton, Select } from "../../../../components";
import { Modal, Form, Row, Col, Input, Button, message } from "antd";
import {
  SearchOutlined,
  ClearOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { eliminarRegistro } from "../../../../utilities";
import HttpService from "../../../../services/httpService";
import { respuestas } from "../../../../utilities";
import BuscarComponente from "./BuscarComponente";

const Permisos = () => {
  let tablaRef = React.useRef();
  const endPoint = "permisos/rol";

  const [form] = Form.useForm();
  const [formBuscar] = Form.useForm();

  const { TextArea } = Input;

  const [buscarParams, setBuscarParams] = useState({});
  const [open, setOpen] = useState(false);
  const [modelValue, setModelValue] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);

  const btnGroup = [
    {
      id: 1,
      onClick: () => onSearch(),
      props: { disabled: false, type: "default", block: true },
      text: "Buscar",
      icon: <SearchOutlined />,
    },
    {
      id: 2,
      onClick: () => {
        setBuscarParams({});
        formBuscar.resetFields();
      },
      props: { disabled: false, type: "dashed", block: true },
      text: "Limpiar",
      icon: <ClearOutlined />,
    },
    {
      id: 3,
      onClick: () => {
        setOpen(true);
        setModelValue({});
        form.resetFields();
      },
      props: { disabled: false, type: "primary", block: true },
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
          data={[
            {
              label: "Editar",
              onClick: () => {
                setOpen(true);
                setModelValue(item);
                form.setFieldsValue({ ...item });
              }
            },
            {
              label: "Eliminar",
              onClick: () => {
                eliminarRegistro(item?.nombre, item?.id, "rols/eliminar", () =>
                  tablaRef?.current?.refresh()
                );
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
      key: "permiso",
      dataIndex: "permiso",
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
          {item?.permiso}
        </Link>
      ),
    },
    {
      title: "Módulo",
      key: "modulo",
      dataIndex: "modulo",
      ellipsis: true,
      render: (_, item) => (
        <Link
          to="#"
          style={{ color: "black" }}
          onClick={() => {
            setOpen(true);
            setModelValue(item);
            form.setFieldsValue({ ...item });
          }}
        >
          {item?.modulo}
        </Link>
      ),
    },
    {
      title: "ROL",
      key: "descripcion",
      dataIndex: "descripcion",
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
          {item?.descripcion}
        </Link>
      ),
    },
  ];

  const onSearch = () => {
    const { buscar, idModulo } = formBuscar.getFieldsValue();
    let params = { ...buscarParams };

    if (buscar) {
      params.buscar = buscar;
    }

    if (idModulo) {
      params.idModulo = idModulo;
    }

    setBuscarParams(params);
  };

  const onFinish = async (values) => {
    try {
      setSaveLoading(true);

      let body = {
        ...values,
      };

      body.claveOld = modelValue?.id;

      const res = await HttpService.post('Rols/AgregarRol', body);
      respuestas(res);
      if (res.status === 200) {
        setOpen(false);
        setModelValue({});
        form.resetFields();
        tablaRef?.current?.refresh();
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

  //para asignar leer modulos al Select
  const modelParams = {
    modulos: {
      name: 'modulos'
    },
  };

  //para asignar leer permisos al Select
  const modelParamsPermiso = {
    permisos: {
      name: 'permisos'
    },
  };

  //para asignar leer roles al Select
  const modelParamsRoles = {
    roles: {
      name: 'rol'
    },
  };

  return (
    <SimpleTableLayout
      customRender={
        <BuscarComponente
          formBuscar={formBuscar}
          btnGroup={{
            btnGroup,
            flex: { justifyContent: "start", flexDirection: "row" },
          }}
        />
      }
    >
      <>
        <Tabla
          innerRef={tablaRef}
          nameURL={endPoint}
          // expand="modulo"
          extraParams={buscarParams}
          columns={columns}
        />
        <Modal
          open={open}
          title={
            modelValue?.id
              ? `Editar Permiso ${modelValue?.nombre}`
              : "Agregar Permiso"
          }
          onOk={() => setOpen(false)}
          onCancel={() => {
            setOpen(false);
            setModelValue({});
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
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
              >


                <Form.Item name="rolid" label="Rol">
                  <Select
                    placeholder="Seleccione un rol"
                    allowClear={true}
                    modelsParams={modelParamsRoles.roles}
                    labelProp="nombre"
                    valueProp="id"
                    render={(_, row) => `${row.id} - ${row.nombre}`}
                  />

                </Form.Item>
                <Form.Item name="permisoid" label="Permiso">
                  <Select
                    placeholder="Seleccione un permiso"
                    allowClear={true}
                    modelsParams={modelParamsPermiso.permisos}
                    labelProp="nombre"
                    valueProp="id"
                    render={(_, row) => `${row.id} - ${row.nombre}`}
                  />

                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
              >
                <Form.Item name="moduloid" label="Módulo">
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
            </Row>
            {/* <Row gutter={10}>
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
                  <Input rows={2} />
                </Form.Item>
              </Col>
            </Row> */}
            <Row gutter={10}>
              <Col span={24}>
                <Form.Item name="descripcion" label="Descripción">
                  <TextArea autoComplete="off" />
                </Form.Item>
              </Col>
            </Row>
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
    </SimpleTableLayout >
  );
};

export default Permisos;
