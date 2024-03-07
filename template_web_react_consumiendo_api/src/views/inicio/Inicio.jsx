import React from "react";
import { Row, Typography } from "antd";
import { DefaultLayout } from "../../components/layouts";

const Inicio = () => {

  const { Title } = Typography;

  return (
    <DefaultLayout>
      <Row gutter={10}>
        <Title level={3}>
        </Title>
      </Row>
    </DefaultLayout>
  );
};

export default Inicio;