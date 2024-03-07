import React, { useEffect, useState } from "react";
import {  
  Form,
  Row,
  Col,
  Input,
  Button,
  message,
  Divider,  
  notification,  
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import httpService from "../../../services/httpService";
import { respuestas } from "../../../utilities";
import { useNavigate } from "react-router-dom";
import { useAuth} from "../../../hooks";
import { Select } from "../../../components";


const Formulario = ({ setGuardando, endPoint, model, editing, id }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();  
  const { user } = useAuth();

  //Estados
  const [saveLoading, setSaveLoading] = useState(false);
  

  //Permisos
  const [checkedList, setCheckedList] = useState([]);

  
  const onFinish = async (values) => {
    try {
      const { clave1, clave, rol } = values;

      setSaveLoading(true);
      setGuardando(true);
      let body = {
        ...values        
      };

      if (!editing) {
        if (clave1 !== clave) {
          message.error("Las contraseñas no coinciden.");
          return;
        }

        if (user?.rol !== "admin" && rol === "admin") {
          notification.info({
            message: "Atención",
            description: "No puede asignar el rol de Administrador",
          });
          return;
        }

        body.pwd = clave1 ? clave1 : "";

        delete body.clave1;
        delete body.clave;
        
      } else {
        if (clave1 && clave) {
          if (clave1 !== clave) {
            message.error("Las contraseñas no coinciden.");
            return;
          }
        }

        if (user?.rol !== "admin" && rol === "admin") {
          notification.info({
            message: "Atención",
            description: "No puede asignar el rol de Super Administrador",
          });
          return;
        }

        body = {
          ...values,
          id: id ? id : "",
          pwd: clave1 ? clave1 : ""          
        };
        delete body.clave1;
        delete body.clave;

      }

      const res = await httpService.post(endPoint, body);
      respuestas(res);
      if (res?.status === 200) {
        navigate(`/administracion/usuarios`);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSaveLoading(false);
      setGuardando(false);
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

  useEffect(() => {
    if (editing && model) {
      form.setFieldsValue({
        ...model,
        clave: "",
        unidadesAdministrativas: model?.unidadAdministrativaUsuarios,
      });
      setCheckedList(model?.permisos?.map((i) => i));
    }
  }, [editing, form, model]);

const modelParams = {
    roles: {
      name: 'rol'
    },
  };


  return (
    <Form
      form={form}
      name="form"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={[16, 0]}>
        <Col span={24} md={12}>
          <Form.Item
            name="nombre"
            label="Nombre"
            rules={[
              {
                required: true,
                message: "Por favor ingresar nombre de Usuario",
              },
            ]}
          >
            <Input autocomplete="one-time-code" />
          </Form.Item>
        </Col>        
        <Col span={24} md={12}>
          <Form.Item
            label="Correo Electronico"
            name="correo"
            rules={[{ required: true, message: "Por favor escriba su correo" }]}
          >
            <Input autocomplete="one-time-code" disabled={editing} />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item
            label="Rol"
            name="rolId"
            rules={[{ required: true, message: "Por favor Seleccionar Rol" }]}
          >

            <Select
              placeholder="Seleccione un Rol"
              allowClear={true}
              modelsParams={modelParams.roles}
              labelProp="nombre"
              valueProp="id"
              render={(_, row) => `${row.id} - ${row.nombre}`}
            />
            
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item
            label="Teléfono"
            name="telefono"
            rules={[
              {
                required: true,
                message: "Es necesario ingresar un número telefónico",
              },
              // solo numeros
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || /^[0-9]*$/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Solo se permiten números"));
                },
              }),
              // maximo 10 caracteres minimo 10
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value.length === 10) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("El teléfono debe tener 10 dígitos")
                  );
                },
              }),
            ]}
          >
            <Input autocomplete="one-time-code" maxLength={10} />
          </Form.Item>
        </Col>
      </Row>
      {!editing && (
        <Row gutter={[16, 0]}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <Form.Item
              label="Contraseña"
              name="clave1"
              rules={[
                { required: true, message: "Por favor ingresar Contraseña" },
              ]}
            >
              <Input
                type="password"
                autocomplete="one-time-code"
                visibilitytoggle="false"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <Form.Item
              label="Confirmar Contraseña"
              name="clave"
              rules={[
                { required: true, message: "Por favor ingresar Contraseña" },
              ]}
            >
              <Input
                type="password"
                autocomplete="one-time-code"
                visibilitytoggle="false"
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Divider />     

      {editing && (
        <>
          <Divider />
          <h3>Cambiar la contraseña</h3>
          <p
            style={{
              color: "#777",
              marginBottom: "20px",
              marginTop: "-10px",
            }}
          >
            Si no desea cambiar la contraseña, deje los campos en blanco.
          </p>

          <Row gutter={[16, 0]}>            
            <Col span={24} md={12}>
              <Form.Item label="Contraseña" name="clave1">
                <Input.Password
                  autocomplete="one-time-code"
                  visibilitytoggle="false"
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
            >
              <Form.Item label="Confirmar Contraseña" name="clave">
                <Input.Password
                  autocomplete="one-time-code"
                  visibilitytoggle="false"
                />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}

      <Divider />

      <Row gutter={[16, 0]}>
        <Col span={6}>
          <Form.Item>
            <Button
              icon={<SaveOutlined />}
              type="primary"
              block
              size="large"
              htmlType="submit"
              loading={saveLoading}
            >
              Guardar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Formulario;
