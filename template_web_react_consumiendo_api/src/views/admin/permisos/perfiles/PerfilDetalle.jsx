import React, { useState, useEffect } from 'react';
import { DefaultLayout } from '../../../../components/layouts';
import { useQuery, useModel, useModels } from '../../../../hooks';
import { Form, Row, Col, Input, Typography, Tree, Divider, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import HttpService from '../../../../services/httpService';
import { respuestas } from '../../../../utilities';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

const PerfilDetalle = () => {

  const history = useNavigate();
  const [form] = Form.useForm();
  const q = useQuery();
  const id = q.get('id');
  const editing = Boolean(id);
  const endPoint = 'coleccion-permiso';

  const [request, setRequest] = React.useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [listaPermisos, setListaPermisos] = useState([]);
  const [arbolPermisos, setArbolPermisos] = useState([]);
  const [ape, setApe] = useState([]); // Arbol de permisos expandido
  const [checkedList, setCheckedList] = useState([]);
  const [modulos, setModulos] = useState([]);

  const onCheckedTree = (checkedList, info) => {
    checkedList = checkedList
      ?.map(item => {
        const val = item.replace("p-", "");
        return val
      })

    let _checkedList = [];
    for (let i = 0, l = listaPermisos.length; i < l; i++) {
      const _permiso = listaPermisos[i];
      if (checkedList.includes(_permiso["id"])) {
        _checkedList.push(_permiso["id"]);
      }
    }

    setCheckedList(_checkedList);
  }

  const requestParams = React.useMemo(() => ({
    name: endPoint,
    id: id,
    expand: 'permisos'
  }), [id])

  const {
    model,
    modelLoading
  } = useModel(request);

  const onFinish = async values => {
    try {
      setSaveLoading(true);

      let body = {
        ...values,
        permisos: checkedList
      }

      if (id) {
        body.id = id;
      }

      console.log(body);

      const res = await HttpService.post('coleccion-permiso', body);
      respuestas(res);
      if (res.status === 200) {
        history(`/administracion/permisos/perfiles`)
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSaveLoading(false)
    }
  }

  const ordenarLista = React.useCallback((a, b) => {
    const nombreA = a.nombre ? a.nombre.normalize('NFD')?.replace(/\p{Diacritic}/gu, "") : a.title.normalize('NFD')?.replace(/\p{Diacritic}/gu, "");
    const nombreB = b.nombre ? b.nombre.normalize('NFD')?.replace(/\p{Diacritic}/gu, "") : b.title.normalize('NFD')?.replace(/\p{Diacritic}/gu, "");

    if (nombreA < nombreB) {
      return -1;
    }

    if (nombreA > nombreB) {
      return 1;
    }

    return 0;
  }, [])

  const getModulos = React.useCallback(async () => {
    const res = await HttpService.get('modulo?limite=100&expand=permisos');
    if (res?.status === 200) {
      setModulos(res.resultado);
    }
  }, []);

  useEffect(() => {
    getModulos();
    return () => setModulos([]);
  }, [getModulos])

  useEffect(() => {
    if (modulos && modulos?.length) {
      let _arbolPermisos = [];
      let _listaPermisos = [];
      let _ape = [];
      let _modulosPermisos = modulos;

      _modulosPermisos.sort((a, b) => ordenarLista(a, b));

      for (let i = 0, l = modulos.length; i < l; i++) {
        let _permisos = modulos[i]["permisos"];
        let _modulos = [];
        for (let j = 0, k = _permisos?.length; j < k; j++) {
          const nPermiso = {
            title: _permisos[j]["nombre"],
            id: _permisos[j]["id"],
            selectable: false,
            key: `p-${_permisos[j]["id"]}`,
          }
          _listaPermisos.push(nPermiso);
          _modulos.push(nPermiso);
        }

        _modulos.sort((a, b) => ordenarLista(a, b));

        const llave = `m-${modulos[i]["id"]}`;
        _ape.push(llave);
        _arbolPermisos.push({
          title: modulos[i]["nombre"],
          key: llave,
          id: modulos[i]["id"],
          children: _modulos
        })
      }

      setApe(_ape);
      setListaPermisos(_listaPermisos);
      setArbolPermisos(_arbolPermisos);
    }
  }, [modulos, ordenarLista])

  useEffect(() => {
    if (editing && model) {
      form.setFieldsValue({
        ...model
      });
      setCheckedList(model?.permisos?.map(i => i.id));
    }
  }, [editing, form, model])

  React.useEffect(() => {
    setRequest(requestParams);
    return () => setRequest({});
  }, [requestParams])

  return (
    <DefaultLayout
      viewLoading={modelLoading}
    >
      <Form
        form={form}
        name='form'
        layout='vertical'
        onFinish={onFinish}
      >
        <Row gutter={10}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <Form.Item name='clave' label='Clave'>
              <Input />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <Form.Item name='nombre' label='Nombre'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={24}>
            <Form.Item name='descripcion' label='Descripción'>
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={24}>
            <Title level={5}>Modulos</Title>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={24}>
            <Tree
              checkable
              defaultExpandedKeys={ape}
              selectable={false}
              checkedKeys={checkedList?.map(i => `p-${i}`)}
              onCheck={onCheckedTree}
              treeData={arbolPermisos}
            />
          </Col>
        </Row>

        <Divider />

        <Row gutter={10}>
          <Col span={6}>
            <Button
              block
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={saveLoading}
            >
              {/* Guardar */}
            </Button>
          </Col>
        </Row>
      </Form>
    </DefaultLayout>
  );
}

export default PerfilDetalle