import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Spin,
  Row,
  Col,
  Card,
  Image,
  Typography,
} from "antd";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";

const SignInStyles = {
  container: {
    background: "#fff",
    backdropFilter: "blur(50px)",
    boxShadow: "0 2px 10px 2px rgb(0 0 0 / 10%)",
    borderRadius: 6,
    padding: "16px 20px 20px 20px",
  },
  logoContainer: {
    textAlign: "center",
    marginBottom: 20,
    // hacer que se vea mas pequeño
    "& img": {
      width: 200,
    },
  },
};

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const reglas = {
  correo: [
    {
      type: "email",
    },
  ],
  clave: [
    {
      min: 6,
    },
  ],
};

const Ingresar = () => {
  const [form] = Form.useForm();

  const { signIn, sessionLoading, email } = useAuth();
  const navigate = useNavigate();
  const onFinish = (values) => {
    const { correo, clave } = values;
    signIn(correo, clave);
  };

  useEffect(() => {
    if (email) {
      form.setFieldValue("correo", email);
    }
  }, [email, form]);

  if (sessionLoading) return null;

  return (
    <Row gutter={[10, 10]}>
      <Col span={24}>
        <Card>
          <Spin indicator={antIcon} spinning={sessionLoading}>
            <Form
              form={form}
              name="normal_login"
              className="login-form"
              layout="vertical"
              initialValues={{
                remember: false,
              }}
              onFinish={onFinish}
            >
              <Row gutter={[10, 10]} justify={"center"}>
                <Col>
                  <Typography.Title style={{ fontWeight: "bolder" }}>
                    SISEMOV
                  </Typography.Title>
                </Col>
              </Row>
              <Row gutter={[10, 10]}>
                <Col span={24}>
                  <Form.Item name="correo" label="Correo electrónico">
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="correo@ejemplo.com"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="clave"
                    label="Contraseña"
                    rules={reglas.clave}
                    extra={
                      <Button
                        type="link"
                        block
                        className="login-form-button"
                        style={{ padding: 0, textAlign: "right" }}
                        onClick={() => navigate("/recuperar-contrasena")}
                      >
                        ¿Olvidaste tu contraseña?
                      </Button>
                    }
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="new-password"
                      autoComplete="off"
                      autoCorrect="off"
                      placeholder="Contraseña"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      className="login-form-button"
                    >
                      Ingresar
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
      </Col>
    </Row>
  );
};

export default Ingresar;
