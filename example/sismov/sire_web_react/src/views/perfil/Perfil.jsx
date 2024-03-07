import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form, Button, Card, Avatar, Divider, Upload } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, EditOutlined } from '@ant-design/icons';
import { ViewLoading } from '../../components';
import { useAuth, useModel } from "../../hooks";
import HttpService from '../../services/httpService';
import { DefaultLayout } from '../../components/layouts';
import { respuestas } from '../../utilities';
import { Link } from 'react-router-dom';
import { emptyRequest } from '../../constants/requests';

const Perfil = () => {

  const { user } = useAuth();
  const [form] = Form.useForm();
  const [guardando, setGuardando] = useState(false);
  const [referencias, setReferencias] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [request, setRequest] = useState(emptyRequest);

  const {
    model,
    refreshModel
  } = useModel({
    name: 'usuario',
    id: user?.id,
    expand: 'usuarioMedia.media'
  })

  const sujetoObligadoParams = React.useMemo(() => ({
    name: 'sujeto-obligado',
    id: user?.idSujetoObligado
  }), [user?.idSujetoObligado])

  const {
    model: sujetoObligado,
  } = useModel(request)

  const fotoPerfil = React.useMemo(() => (
    <img
      src={model?.usuarioMedia?.[0]?.media?.ruta}
      width="200"
      alt={user?.nombre}
    />
  ), [model?.usuarioMedia, user?.nombre])

  const reglas = {
    correo: [{ type: "email" }],
    nombre: [{ message: "Favor de ingresar su Nombre.", type: "string" }],
    clave: [
      {
        min: 6,
        message: "La contraseña debe tener minimo 6 caracteres.",
        type: "string",
      },
    ],
    confirmarClave: [
      {
        message: "Confirma tu contraseña.",
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("clave") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("Las contraseñas no coinciden."));
        },
      }),
    ],
  };

  const onChangeArchivos = async ({ fileList: newFileList }) => {
    console.log(newFileList)
    // setListaArchivos(newFileList)

    const formData = new FormData();
    const largo = newFileList?.length

    if (largo > 0) {
      for (let i = 0; i < largo; i++) {
        formData.append("archivo", newFileList[i].originFileObj)
        const res1 = await HttpService.postFormData('subir-archivo', formData);
        respuestas(res1)
        if (res1?.status === 400 && res1?.errores === null) {
          respuestas(res1);
        } else if (res1?.status === 200) {
          setReferencias(res1?.detalle);
        }
      }
    }
  }

  const subirArchivos = async () => {
    try {
      setSaveLoading(true);

      let body = {
        foto: referencias
      }

      const res = await HttpService.post('usuario/cambiar-foto', body);
      console.log(res)
      respuestas(res);
      if (res.status === 200) {
        console.log('entra')
        refreshModel()
      }
    }
    catch (e) {
      console.log(e)
    } finally {
      setSaveLoading(false);
    }
  }

  const onFinish = async (values) => {
    try {
      setGuardando(true);

      let body = {
        ...values,
        idUsuario: user.id
      }

      console.log(body)

      const resp = await HttpService.post("usuario/cambiar-clave", body);
      respuestas(resp);
      if (resp.status === 200) {
        form.resetFields();
      }
    } catch (error) {
      console.log('error en Perfil.js: ', error);
    } finally {
      setGuardando(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    form.setFieldsValue({
      nombre: user.nombre,
      correo: user.correo,
    });
  }, [form, user]);

  useEffect(() => {
    if (user?.idSujetoObligado) {
      setRequest(sujetoObligadoParams)
      return () => {
        setRequest(emptyRequest)
      }
    }
  }, [sujetoObligadoParams, user?.idSujetoObligado])

  if (!user) return <ViewLoading />;


  return (
    <DefaultLayout>
      <Row gutter={10} justify='center'>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
        >
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div>
                {model?.usuarioMedia?.length > 0 ? (
                  <>
                    {fotoPerfil}
                  </>
                ) : (
                  <Avatar src={<img src="/assets/usuario.png" width="200" alt="Perfil" />} />
                )}
              </div>
              <div>
                <Upload
                  beforeUpload={() => false}
                  listType="picture-circle"
                  multiple={false}
                  fileList={[]}
                  onChange={onChangeArchivos}
                >
                  <Link to='#' onClick={(e) => e.preventDefault()}>
                    <EditOutlined /> Cambiar Imagen
                  </Link>
                </Upload>
              </div>
              <div /* style={{ paddingLeft: '20px' }} */>
                <h2>{user.nombre}</h2>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'end' }}>
              <div>
                <Button
                  disabled={Object.keys(referencias).length === 0}
                  onClick={() => subirArchivos()}
                  loading={saveLoading}
                >
                  Subir y Actualizar
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <br />
      <Row gutter={10} justify='center'>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
        >
          <Card>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size={50} icon={<UserOutlined />} />
              <div style={{ marginLeft: '10px' }}>
                <span>
                  Usuario: {user?.usuario} - <span style={{ color: 'blue' }}>{user?.nombre}</span>
                </span>
              </div>
            </div>
            <Divider />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size={50} icon={<MailOutlined />} />
              <div style={{ marginLeft: '10px' }}>
                <span>
                  Correo: {user?.correo}
                </span>
              </div>
            </div>
            <Divider />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size={50} icon={<PhoneOutlined />} />
              <div style={{ marginLeft: '10px' }}>
                <span>
                  Teléfono: {user?.telefono ? user?.telefono : '---'}
                </span>
              </div>
            </div>
            <Divider />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size={50} icon={<LockOutlined />} />
              <div style={{ marginLeft: '10px' }}>
                <span>
                  Rol: {user?.rol ? user?.rol : '---'}
                </span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <br />
      {user?.unidadResponsableUsuarios?.length > 0 && (
        <Row gutter={10} justify='center'>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <Card title="Unidades Responsables">
              <ul>
                {user?.unidadResponsableUsuarios.map((item, index) => (
                  // <li key={index}>{`${<strong><p>{item?.unidadResponsable.clave}</p></strong>} - ${item?.unidadResponsable.nombre}`}</li>
                  <li key={index}><strong>{item?.unidadResponsable.clave}</strong>{` - ${item?.unidadResponsable.nombre}`}</li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>
      )}
      <br />
      <Row gutter={10} justify='center'>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
        >
          <Card title="Cambiar contraseña">
            <Form onFinish={onFinish} form={form} layout="vertical" name="form">
              <Form.Item name="claveActual" label="Contraseña Actual" rules={reglas.clave}>
                <Input.Password autocomplete="one-time-code" />
              </Form.Item>

              <Form.Item name="clave" label="Nueva Contraseña" rules={reglas.clave}>
                <Input.Password autocomplete="one-time-code" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirmar Contraseña"
                dependencies={["clave"]}
                rules={reglas.confirmarClave}
              >
                <Input.Password autocomplete="one-time-code" />
              </Form.Item>
              <Divider />
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={guardando}>
                  Guardar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default Perfil;