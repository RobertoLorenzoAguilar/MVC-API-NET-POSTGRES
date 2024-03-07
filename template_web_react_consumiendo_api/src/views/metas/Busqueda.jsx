import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Row, Select, Typography } from "antd";
import dayjs from "dayjs";
import { Form, useNavigate } from "react-router-dom";

const Busqueda = ({ form, onSearch }) => {
  const navigate = useNavigate();

  const { Title } = Typography;

  const onFinish = (values) => {
    let params = {
      ...values,
      fechaSesion: values?.fechaSesion
        ? dayjs(values?.fechaSesion)
            ?.startOf("day")
            ?.format("YYYY-MM-DD HH:mm:ss")
        : "",
    };
    onSearch && onSearch(params);
  };

  return (
    <Form form={form} name="form" layout="vertical" onFinish={onFinish}>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Row gutter={[10, 10]} justify={"space-between"}>
            <Col>
              <Title level={3} style={{ margin: "0px" }}>
                Sesiones
              </Title>
            </Col>
            <Col>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => navigate("agregar")}
              >
                Crear Sesión
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24} md={4}>
          <Form.Item name={"fechaSesion"} label={"Fecha"}>
            <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
          </Form.Item>
        </Col>
        <Col span={24} md={4}>
          <Form.Item name={"idPeriodo"} label={"Fecha"}>
            <Select
              modelsParams={{
                name: "periodo",
                ordenar: "descripcion-asc",
              }}
              valueProp={"id"}
              labelProp={"descripcion"}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={4}>
          <Form.Item name={"idComision"} label={"Fecha"}>
            <Select
              modelsParams={{
                name: "comision",
                ordenar: "descripcion-asc",
              }}
              valueProp={"id"}
              labelProp={"descripcion"}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={4}>
          <Form.Item name={"idSala"} label={"Fecha"}>
            <Select
              modelsParams={{
                name: "sala",
                ordenar: "descripcion-asc",
              }}
              valueProp={"id"}
              labelProp={"descripcion"}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={4}>
          <Form.Item name={"idTipoSesion"} label={"Fecha"}>
            <Select
              modelsParams={{
                name: "tipo-sesion",
                ordenar: "descripcion-asc",
              }}
              valueProp={"id"}
              labelProp={"descripcion"}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="&nbsp;">
            <Button htmlType="submit" icon={<SearchOutlined />}>
              Buscar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Busqueda;
