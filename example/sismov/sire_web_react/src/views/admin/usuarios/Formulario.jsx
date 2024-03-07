import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  Select as AntdSelect,
  Form,
  Row,
  Col,
  Input,
  Button,
  message,
  Divider,
  Typography,
  notification,
  Tree,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import httpService from "../../../services/httpService";
import { respuestas } from "../../../utilities";
import { useNavigate } from "react-router-dom";
import { useAuth, useModel, useModels } from "../../../hooks";
import { Select } from "../../../components";
import { emptyRequest } from "../../../constants/requests";

const { Option } = AntdSelect;

const Formulario = ({ setGuardando, endPoint, model, editing, id }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { Title } = Typography;
  const { user } = useAuth();

  //Estados
  const [saveLoading, setSaveLoading] = useState(false);
  const [idPerfil, setIdPerfil] = useState(null); // Estado de id parar perfil de permisos
  const [ape, setApe] = useState([]); // Arbol de permisos expandido

  //Permisos
  const [checkedList, setCheckedList] = useState([]);
  const [listaPermisos, setListaPermisos] = useState([]);
  const [arbolPermisos, setArbolPermisos] = useState([]);
  const [perfilRequest, setPerfilRequest] = useState({}); // Petición para perfil de permisos
  const [modulos, setModulos] = useState([]); // Estado petición módulos permisos

  const [listaCheckSolicitud, setListaCheckSolicitud] = useState([]);
  const [listaCheckRecurso, setListaCheckRecurso] = useState([]);
  // const [aee, setAee] = useState([]); //Arbol estatus expandido

  // Parámetros de perfil de permisos
  const perfilesParams = useMemo(
    () => ({
      name: "coleccion-permiso",
      id: idPerfil,
      expand: "permisos",
    }),
    [idPerfil]
  );

  // Perfil de permisos
  const { model: perfilPermiso } = useModel(perfilRequest);

  const onCheckedTree = useCallback(
    (checkedList, info) => {
      checkedList = checkedList.map((item) => {
        const val = item?.replace("p-", "");
        return val;
      });

      let _checkedList = [];
      for (let i = 0, l = listaPermisos.length; i < l; i++) {
        const _permiso = listaPermisos[i];
        if (checkedList.includes(_permiso["id"])) {
          _checkedList.push(_permiso["id"]);
        }
      }

      setCheckedList(_checkedList);
    },
    [listaPermisos]
  );

  const onFinish = async (values) => {
    try {
      const { clave1, clave, rol } = values;

      setSaveLoading(true);
      setGuardando(true);
      let body = {
        ...values,
        permisos: checkedList,
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

        if (listaCheckSolicitud || listaCheckRecurso) {
          body.permisoEstatus = [...listaCheckSolicitud, ...listaCheckRecurso];
        }
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
          pwd: clave1 ? clave1 : "",
          permisos: checkedList,
        };
        delete body.clave1;
        delete body.clave;

        if (listaCheckSolicitud || listaCheckRecurso) {
          body.permisoEstatus = [...listaCheckSolicitud, ...listaCheckRecurso];
        }
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

  const ordenarLista = useCallback((a, b) => {
    const nombreA = a.nombre
      ? a.nombre?.normalize("NFD")?.replace(/\p{Diacritic}/gu, "")
      : a.title?.normalize("NFD")?.replace(/\p{Diacritic}/gu, "");
    const nombreB = b.nombre
      ? b.nombre?.normalize("NFD")?.replace(/\p{Diacritic}/gu, "")
      : b.title?.normalize("NFD")?.replace(/\p{Diacritic}/gu, "");

    if (nombreA < nombreB) {
      return -1;
    }

    if (nombreA > nombreB) {
      return 1;
    }

    return 0;
  }, []);

  const getModulos = React.useCallback(async () => {
    const res = await httpService.get("modulo?limite=100&expand=permisos");
    if (res?.status === 200) {
      setModulos(res.resultado);
    }
  }, []);

  useEffect(() => {
    if (perfilPermiso) {
      onCheckedTree([]);
      let permisos = [];
      for (let i = 0, l = perfilPermiso?.permisos?.length; i < l; i++) {
        permisos.push(
          `m-${perfilPermiso?.permisos[i]?.idModulo}`,
          `p-${perfilPermiso?.permisos[i]?.id}`
        );
      }
      onCheckedTree(permisos);
    }
  }, [onCheckedTree, perfilPermiso]);

  useEffect(() => {
    getModulos();
    return () => setModulos([]);
  }, [getModulos]);

  /**
   * useEffect para hacer petición de un perfil
   * dependiendo de la selección
   */
  useEffect(() => {
    setPerfilRequest(perfilesParams);
    return () => setPerfilRequest({});
  }, [perfilesParams]);

  useEffect(() => {
    if (modulos && modulos?.length) {
      let _arbolPermisos = [];
      let _listaPermisos = [];
      let _ape = [];
      let _modulosPermisos = modulos;

      _modulosPermisos.sort((a, b) => ordenarLista(a, b));

      for (let i = 0, l = _modulosPermisos.length; i < l; i++) {
        let _permisos = _modulosPermisos[i]["permisos"];
        let _modulos = [];
        for (let j = 0, k = _permisos?.length; j < k; j++) {
          let nPermiso = {
            title: `${_permisos[j]["nombre"]} (${_permisos[j]["id"]})`,
            id: _permisos[j]["id"],
            selectable: false,
            key: `p-${_permisos[j]["id"]}`,
          };
          _listaPermisos.push(nPermiso);
          _modulos.push(nPermiso);
        }

        _modulos.sort((a, b) => ordenarLista(a, b));

        const llave = `m-${modulos[i]["id"]}`;
        _ape.push(llave);
        if (modulos[i]?.id === "ADMN" && user?.rol !== "Super Administrador")
          continue;
        _arbolPermisos.push({
          title: modulos[i]["nombre"],
          key: llave,
          id: modulos[i]["id"],
          children: _modulos,
        });
      }

      setApe(_ape);
      setListaPermisos(_listaPermisos);
      setArbolPermisos(_arbolPermisos);
    }
  }, [modulos, ordenarLista, user?.rol]);

  useEffect(() => {
    if (model?.estatusPermiso) {
      let permisosMarcadosS = [];
      let permisosMarcadosRR = [];
      let estatus = model?.estatusPermiso;

      estatus.forEach((permiso) => {
        if (permiso?.estatus?.tipo === "S") {
          permisosMarcadosS.push(permiso.idEstatus);
        } else {
          permisosMarcadosRR.push(permiso.idEstatus);
        }
      });

      setListaCheckSolicitud(permisosMarcadosS);
      setListaCheckRecurso(permisosMarcadosRR);
    }
  }, [model]);

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
        {/* <Col span={24} md={12}>
          <Form.Item
            name="usuario"
            label="Usuario"
            rules={[
              { required: true, message: "Por favor ingresar el usuario" },
            ]}
          >
            <Input autocomplete="one-time-code" />
          </Form.Item>
        </Col> */}
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
            name="rol"
            rules={[{ required: true, message: "Por favor Seleccionar Rol" }]}
          >
            <AntdSelect>
              <Option value={"admin"}>Super Administrador</Option>
              <Option value={"unidadAdministrativa"}>
                Unidad Administrativa
              </Option>
              <Option value={"usuario"}>Usuario</Option>
            </AntdSelect>
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
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Title level={5}>Permisos</Title>
        </Col>
        <Col span={12} md={8}>
          <Form.Item name="idPerfil">
            <Select
              modelsParams={{
                name: "coleccion-permiso",
                limite: 20,
                ordenar: "nombre-asc",
              }}
              labelProp="nombre"
              valueProp="id"
              placeholder="Seleccione un Perfíl de permisos"
              render={(_, row) => `${row?.clave} - ${row?.nombre}`}
              onSelect={(v) => setIdPerfil(v)}
            />
          </Form.Item>
        </Col>
        <Col span={24}></Col>
        <Col span={24} md={8}>
          <Typography.Title style={{ margin: 0 }} level={5}>
            Permisos del Sistema
          </Typography.Title>
          <Tree
            checkable
            defaultExpandedKeys={ape}
            checkedKeys={checkedList?.map((i) => `p-${i}`)}
            onCheck={onCheckedTree}
            treeData={arbolPermisos}
          />
        </Col>
      </Row>

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
            {/* <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
            >
              <Form.Item label="Contraseña Actual" name="claveActual">
                <Input.Password
                  autocomplete="one-time-code"
                  visibilitytoggle="false"
                />
              </Form.Item>
            </Col> */}
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
