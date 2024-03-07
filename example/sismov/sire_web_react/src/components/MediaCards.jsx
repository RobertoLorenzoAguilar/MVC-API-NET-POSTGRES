import React from 'react';
import { BsFiletypeTxt, BsFiletypeXml } from 'react-icons/bs';
import { GrDocument } from 'react-icons/gr';
import { ImFilePdf } from 'react-icons/im';
import { SiMicrosoftexcel, SiMicrosoftpowerpoint, SiMicrosoftword } from 'react-icons/si';
import { Col, Card, Row } from 'antd';

const MediaCards = ({
  lista
}) => {

  const miniaturaAdjunto = React.useCallback((archivo) => {
    let tipo = archivo?.mimetype;

    if (tipo?.indexOf('image') >= 0) {
      return <img src={archivo?.ruta} alt='Archivo Adjunto' height='40px' />
    } else if (tipo?.indexOf('sheet') >= 0) {
      return <SiMicrosoftexcel style={{ fontSize: '50px', color: '#2EB275' }} />
    } else if (tipo?.indexOf('word') >= 0) {
      return <SiMicrosoftword style={{ fontSize: '50px', color: '#1755B3' }} />
    } else if (tipo?.indexOf('pdf') >= 0) {
      return <ImFilePdf style={{ fontSize: '50px', color: '#FF4343' }} />
    } else if (tipo?.indexOf('presentation') >= 0) {
      return <SiMicrosoftpowerpoint style={{ fontSize: '50px', color: '#B7472A' }} />
    } else if (tipo?.indexOf('xml') >= 0) {
      return <BsFiletypeXml style={{ fontSize: '50px', color: '#863695' }} />
    } else if (tipo?.indexOf('text') >= 0) {
      return <BsFiletypeTxt style={{ fontSize: '50px' }} />
    } else {
      return <GrDocument style={{ fontSize: '50px', color: '#863695' }} />
    }
  }, [])

  return (
    <Row gutter={[10, 10]}>
      {lista?.map((item, index) => (
        <Col
          key={index}
          xs={24}
          sm={24}
          md={12}
          lg={6}
        >
          <Card
            bordered
            style={{
              width: '100%'
            }}
          >
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Row gutter={[10, 10]}>
                  <Col span={6}>
                    {miniaturaAdjunto(item)}
                  </Col>
                  <Col span={18}>
                    <div
                      style={{
                        wordWrap: 'break-word'
                      }}
                    >
                      <a href={item?.ruta} target='blank'>{item?.nombre}</a>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default MediaCards