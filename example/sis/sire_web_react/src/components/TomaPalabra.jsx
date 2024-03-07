import { Card, Col, Image, Row, Typography } from "antd";
import React from "react";

const TomaPalabra = ({ diputado }) => {
  return (
    <Card
      style={{ width: "100%" }}
      bodyStyle={{ padding: 10, backgroundColor: "#f2f2f2" }}
    >
      <Row justify="center" align={"middle"} gutter={[0, 20]}>
        <Col span={12}>
          <Row gutter={[10, 30]}>
            <Col>
              <Typography.Title
                level={1}
                style={{ margin: 0, fontWeight: "bolder" }}
              >
                Diana Karina Barreras Samaniego
              </Typography.Title>
            </Col>
            <Col>
              <Typography.Title
                level={2}
                style={{ margin: 0, fontWeight: "normal" }}
              >
                Diputado Plurinominal
              </Typography.Title>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <Image
                width={"25%"}
                preview={false}
                src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Morena_logo_%28alt%29.svg"
              />
            </Col>
          </Row>
        </Col>
        <Col span={12} style={{ textAlign: "center", display: "grid" }}>
          <div
            style={{
              borderRadius: "100%",
              border: "10px solid black",
              overflow: "hidden",
              height: "15vw",
              width: "15vw",
            }}
          >
            <img
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              alt="amlo"
              src="https://i.pinimg.com/736x/b5/dd/ed/b5dded117881f5189317efa79bd7ff21.jpg"
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default TomaPalabra;
