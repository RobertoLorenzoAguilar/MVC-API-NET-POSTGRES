import { useEffect, useMemo, useState } from "react";
import { useModel, useQuery } from "../../hooks";
import { emptyRequest } from "../../constants/requests";
import { useNavigate } from "react-router-dom";
import HttpService from "../../services/httpService";
import { respuestas } from "../../utilities";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select as SelectAnt,
} from "antd";
import { DefaultLayout } from "../../components/layouts";
import { Select } from "../../components";
import { SaveOutlined } from "@ant-design/icons";
import Typography from "antd/es/typography/Typography";

const Formulario = ({ endPoint, ruta }) => {
  const q = useQuery();
  const id = q.get("id");
  const editando = Boolean(id);

  const [request, setRequest] = useState(emptyRequest);

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const requestParams = useMemo(
    () => ({
      name: endPoint,
      id: id,
    }),
    [id, endPoint]
  );

  const { model, modelLoading } = useModel(request);

  const onFinish = async (values) => {
    try {
      let body = {
        ...values,
      };

      if (model && editando) {
        body.id = model?.id;
      }

      const res = await HttpService.post(`${endPoint}`, body);
      if (respuestas(res)) {
        form.resetFields();
        navigate("/administracion/catalogos/distrito");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setRequest(requestParams);
    return () => {
      setRequest({});
    };
  }, [requestParams]);

  useEffect(() => {
    if (model && editando) {
      form.setFieldsValue(model);
    }
  }, [model, editando, form]);

  return (
    <DefaultLayout
      viewLoading={{
        spinning: modelLoading,
      }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col span={8}>
            <Form.Item name={"idDistrito"} label={"Distrito"}>
              <Select />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={"idSeccion"} label={"Sección"}>
              <Select />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={"tipoSimpatizante"} label={"Tipo de Simpatizante"}>
              <SelectAnt
                options={[
                  { value: "Coordinador", label: "Coordinador" },
                  { value: "Movilizador", label: "Movilizador" },
                  { value: "Votante", label: "Votante" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={"nombre"} label={"Nombre"}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={"primerApellido"} label={"Primer Apellido"}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={"segundoApellido"} label={"Segundo Apellido"}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={"ocupacion"} label={"Ocupación"}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={"direccion"} label={"Dirección"}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={"numeroDomicilio"} label={"Número de domicilio"}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={"colonia"} label={"Colonia"}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={"codigoPostal"} label={"Código Postal"}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={"correo"} label={"Correo electrónico"}>
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="primary" icon={<SaveOutlined />}>
                Guardar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DefaultLayout>
  );
};

export default Formulario;
