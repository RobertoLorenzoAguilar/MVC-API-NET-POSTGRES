import { Card, Col } from 'antd'
import Meta from 'antd/es/card/Meta'

const Cards = ({url, icon, color, fondo, title, idValue, hidden }) => {
  return <Col
    className="gutter-row"
    xs={{ span: 24 }}
    sm={{ span: 24 }}
    md={{ span: 6 }}
    lg={{ span: 6 }}
    hidden={hidden}
  >
    <Card
      className="link-pointer"
      cover={icon}
      style={{ color: color, backgroundColor: fondo }}

    >
      <Meta title={title} style={{ textAlign: 'center' }}/>
    </Card>
  </Col>
}
export default Cards