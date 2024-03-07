import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Image, Row } from "antd";

const TarjetaDiputado = ({ diputado }) => {
  return (
    <Card bodyStyle={{ padding: 6 }}>
      <Row>
        <Col flex={1}>
          <Avatar
            icon={<UserOutlined />}
            shape="square"
            style={{ width: "8vw", height: "7.5vw" }}
            src={
              diputado?.foto ||
              "https://congresoson-votaciones.web.app/logo_sqr.png"
            }
          />
          <div
            style={{
              zIndex: 1,
              position: "absolute",
              left: 0,
              bottom: 0,
            }}
          >
            <Image
              style={{ objectFit: "cover", borderRadius: 10 }}
              preview={false}
              width={"3vw"}
              src={
                diputado?.fraccion?.foto ||
                "https://congresoson-votaciones.web.app/logo_sqr.png"
              }
            />
          </div>
        </Col>
        <Col flex={2}>2</Col>
      </Row>
    </Card>
  );
};

export default TarjetaDiputado;
