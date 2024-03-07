import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Tooltip,
  Typography,
  notification,
} from "antd";
import React, { useState } from "react";
import HttpService from "../../services/httpService";
import {
  CheckCircleFilled,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { respuestas } from "../../utilities";

const Recuperar = () => {
  const [formRecuperar] = Form.useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [esperarToken, setEsperarToken] = useState(false);
  const [cambiarPassword, setCambiarPassword] = useState("cargando");
  const [correo, setCorreo] = useState("");

  const onFinish = async (values) => {
    setLoading(!loading);

    let res;

    try {
      let body = {
        ...values,
      };

      if (cambiarPassword === "valido") {
        let token = formRecuperar.getFieldsValue([
          "n1",
          "n2",
          "n3",
          "n4",
          "n5",
          "n6",
          "n7",
          "n8",
        ]);
        let valoresToken = Object.values(token).join("");
        let tokenEntero = parseInt(valoresToken);

        body.correo = correo;
        body.token = tokenEntero;
        res = await HttpService.postPublico(
          "recuperar-contrasena/cambiar",
          body
        );
        if (res?.status === 200) {
          navigate("/");
        }
      } else {
        res = await HttpService.postPublico(
          "recuperar-contrasena",
          body,
          1,
          false
        );
        if (res?.status === 200) {
          setCorreo(values?.correo);
          setEsperarToken(true);
          setLoading(false);
        } else {
          respuestas(res);
          setLoading(false);
        }
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const validarToken = async () => {
    let token = formRecuperar.getFieldsValue([
      "n1",
      "n2",
      "n3",
      "n4",
      "n5",
      "n6",
      "n7",
      "n8",
    ]);
    let valoresToken = Object.values(token).join("");
    let tokenEntero = parseInt(valoresToken);
    try {
      const res = await HttpService.getPublico(
        `recuperar-contrasena/verificar?token=${tokenEntero}&correo=${correo}`,
        false
      );

      if (res?.status === 200) {
        setCambiarPassword("valido");
      } else {
        setCambiarPassword("fallo");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const passwordValidator = (rule, value, callback) => {
    if (value && value !== formRecuperar.getFieldValue("pwd")) {
      callback("Las contraseñas no coinciden");
    } else {
      callback();
    }
  };

  const tokenIcono = {
    valido: <CheckCircleFilled style={{ color: "#863695" }} />,
    fallo: <CloseCircleOutlined style={{ color: "#f00821" }} />,
    cargando: <LoadingOutlined />,
  };

  return (
    <Card
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          Cambiar contraseña
        </Typography.Title>
      }
      style={{ width: "60vw" }}
    >
      <Form
        form={formRecuperar}
        name="form"
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={[10, 10]} justify="end">
          {correo === "" && (
            <>
              <Col span={24}>
                <Form.Item
                  label={<strong>Correo</strong>}
                  name={"correo"}
                  rules={[
                    { required: true, message: "Este campo es obligatorio" },
                  ]}
                >
                  <Input size="large" placeholder="Ingresar correo." />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Typography.Text type="secondary">
                  Favor de ingresar el correo relacionado a su cuenta utilizado
                  para ingresar al sistema.
                </Typography.Text>
              </Col>
              <Col>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Recuperar
                </Button>
              </Col>
            </>
          )}
          {esperarToken && (
            <>
              <Col span={24}>
                <Row gutter={[10, 10]} justify="center">
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Typography.Title style={{ margin: 0 }} level={4}>
                      Ingrese el Token {tokenIcono[cambiarPassword]}
                    </Typography.Title>
                  </Col>
                  <Col span={1}>
                    <Form.Item name="n1">
                      <Input
                        id="1"
                        size="large"
                        maxLength={1}
                        onChange={(v) => {
                          let valor = v?.target?.value;
                          if (valor && valor !== "") {
                            return document.getElementById("2").focus();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    <Form.Item name="n2">
                      <Input
                        id="2"
                        size="large"
                        maxLength={1}
                        onChange={(v) => {
                          let valor = v?.target?.value;
                          if (valor && valor !== "") {
                            return document.getElementById("3").focus();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    <Form.Item name="n3">
                      <Input
                        id="3"
                        size="large"
                        maxLength={1}
                        onChange={(v) => {
                          let valor = v?.target?.value;
                          if (valor && valor !== "") {
                            return document.getElementById("4").focus();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    <Form.Item name="n4">
                      <Input
                        id="4"
                        size="large"
                        maxLength={1}
                        onChange={(v) => {
                          let valor = v?.target?.value;
                          if (valor && valor !== "") {
                            return document.getElementById("5").focus();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    <Form.Item name="n5">
                      <Input
                        id="5"
                        size="large"
                        maxLength={1}
                        onChange={(v) => {
                          let valor = v?.target?.value;
                          if (valor && valor !== "") {
                            return document.getElementById("6").focus();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    <Form.Item name="n6">
                      <Input
                        id="6"
                        size="large"
                        maxLength={1}
                        onChange={(v) => {
                          let valor = v?.target?.value;
                          if (valor && valor !== "") {
                            return document.getElementById("7").focus();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    <Form.Item name="n7">
                      <Input
                        id="7"
                        size="large"
                        maxLength={1}
                        onChange={(v) => {
                          let valor = v?.target?.value;
                          if (valor && valor !== "") {
                            return document.getElementById("8").focus();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    <Form.Item name="n8">
                      <Input
                        id="8"
                        size="large"
                        maxLength={1}
                        onChange={(v) => {
                          let valor = v?.target?.value;
                          if (valor && valor === "") {
                            return document.getElementById("7").focus();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              {cambiarPassword !== "valido" && (
                <Col>
                  <Button
                    size="large"
                    type="primary"
                    loading={loading}
                    onClick={() => validarToken()}
                  >
                    Confirmar
                  </Button>
                </Col>
              )}
            </>
          )}
          {cambiarPassword === "valido" && (
            <>
              <Col span={24}>
                <Form.Item
                  label={<strong>Nueva Contraseña</strong>}
                  name="pwd"
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
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={<strong>Confirmar Cotraseña</strong>}
                  name="pwdConf"
                  rules={[
                    {
                      validator: passwordValidator,
                      validateTrigger: "onChange",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Confimrar
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Form>
    </Card>
  );
};

export default Recuperar;
