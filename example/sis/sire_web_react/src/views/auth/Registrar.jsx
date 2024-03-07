import React, { useState } from "react";
import {
  Input,
  Form,
  Row,
  Col,
  Button,
  Divider,
  notification,
  message,
  Tooltip,
} from "antd";
import { respuestas } from "../../utilities";
import { SaveOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import HttpService from "../../services/httpService";
import { useAuth } from "../../hooks";

export const Registrar = () => {
  const { signIn } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [guardando, setGuardando] = useState(false);

  const onFinish = async (values) => {
    let body = { ...values };
    body.clave = body.pwd;
    delete body.pwd;
    delete body.pwdConf;

    setGuardando(true);

    const res = await HttpService.post(
      `iniciar-sesion/registrar`,
      body,
      false,
      1,
      false
    );
    if (res?.status === 200) {
      respuestas(res);
      signIn(res?.detalle?.correo, body?.clave);
      navigate(-1);
      setGuardando(false);
    } else {
      if (res?.mensaje?.length > 0) {
        setGuardando(false);
        notification.error({
          message: "Error",
          description: res?.mensaje,
        });
      }
    }
  };

  const passwordValidator = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("pwd")) {
      callback("Las contraseñas no coinciden");
    } else {
      callback();
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        backdropFilter: "blur(50px)",
        boxShadow: "0 2px 10px 2px rgb(0 0 0 / 10%)",
        borderRadius: 6,
        padding: "16px 20px 20px 20px",
      }}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row>
          <Col span={24}>
            {/* Logo */}
            <Row justify="space-between">
              <Col>
                <img
                  src="/logo.png"
                  alt="Logo"
                  style={{
                    width: 200,
                  }}
                />
              </Col>
            </Row>
            <br />
            {/* Titutlo de la página */}
            <Title level={3} style={{ margin: 0 }}>
              Registrar
            </Title>
            <Divider style={{ margin: "10px 0" }} />
          </Col>
          <br />
        </Row>
        <Row gutter={[10, 10]} justify="center">
          <Col span={23}>
            <Form.Item
              name="correo"
              label="Correo Electrónico"
              rules={[{ required: true, message: "Este campo es obligatorio" }]}
            >
              <Input
                onBlur={() => console.log("Salió del campo")}
                placeholder="Ingresa el nombre de Usuario"
                autocomplete="one-time-code"
              />
            </Form.Item>
          </Col>
          <Col span={23}>
            <Form.Item
              name="pwd"
              label="Contraseña"
              rules={[
                {
                  required: true,
                  message: "Este campo es obligatorio",
                },
                {
                  pattern: /^(?=.*[#$%])(?=.*\d)(?=.*[A-Z]).{8,}$/,
                  message: (
                    <Row gutter={[10, 10]} style={{ marginTop: 4 }}>
                      <Col>
                        <p style={{ margin: 0 }}>
                          El patrón de la contraseña es poco seguro, click
                          para ver un ejemplo:
                        </p>
                      </Col>
                      <Col>
                        <Tooltip
                          trigger={"click"}
                          title="Debe contener al menos 8 caracteres, un caracter especial ($#%), un número y al menos una mayúscula: Ej3mpl0#"
                        >
                          <Button
                            icon="i"
                            shape="circle"
                            size="small"
                            type="primary"
                          />
                        </Tooltip>
                      </Col>
                    </Row>
                  ),
                },
              ]}
            >
              <Input.Password autocomplete="one-time-code" />
            </Form.Item>
          </Col>
          <Col span={23}>
            <Form.Item
              name="pwdConf"
              label="Confirmar Contraseña"
              rules={[
                { validator: passwordValidator, validateTrigger: "onChange" },
              ]}
            >
              <Input.Password autocomplete="one-time-code" />
            </Form.Item>
          </Col>
          <Col span={23}>
            <Form.Item name="nombre" label="Nombre">
              <Input placeholder="Ingresa el nombre" />
            </Form.Item>
          </Col>
          <Col span={23}>
            <Form.Item
              name="telefono"
              label="Teléfono"
              rules={[
                { pattern: /^[0-9]+$/, message: "Solo números" },
                { min: 10, max: 10, message: "Sólo 10 caracteres" },
              ]}
            >
              <Input placeholder="Ingresa el teléfono" />
            </Form.Item>
          </Col>
          <Col span={23}>
            <Row gutter={[10, 10]} justify={"space-between"}>
              <Col>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    navigate(-1);
                  }}
                  style={{
                    backgroundColor: "#6f2fa0ff",
                  }}
                  icon={<LeftOutlined />}
                >
                  Volver
                </Button>
              </Col>
              <Col>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    icon={<SaveOutlined />}
                    loading={guardando}
                  >
                    Guardar
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
