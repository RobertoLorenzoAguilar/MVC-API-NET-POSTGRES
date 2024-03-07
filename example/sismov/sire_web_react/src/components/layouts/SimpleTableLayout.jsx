import { Col, Row, Input, Divider } from "antd";
import PropTypes from "prop-types";
import DefaultLayout from "./DefaultLayout";
import ButtonGroup from "../ButtonGroup";
import React from "react";

const SimpleTableLayout = ({
  children,
  btnGroup,
  onSearch,
  searchLoading = false,
  customRender,
  viewLoading,
  titulo = null,
}) => {
  const styles = {
    container: {
      background: "#fff",
      borderRadius: 6,
      padding: 10,
    },
    inputSearch: {
      display: "flex",
      alignItems: "center",
    },
  };

  return (
    <>
      {Boolean(onSearch) && !Boolean(customRender) && (
        <div style={styles.container}>
          <Row gutter={10}>
            {titulo && (<Col span={24}>{titulo}</Col>)}
            <Col
              xs={24}
              sm={24}
              md={11}
              lg={7}
              xxl={7}
              style={styles.inputSearch}
            >
              <Input.Search
                enterButton
                onSearch={onSearch}
                loading={searchLoading}
              />
            </Col>
            {Boolean(btnGroup) && (
              <Col xs={24} sm={24} md={13} lg={17} xxl={17}>
                <ButtonGroup data={btnGroup} />
              </Col>
            )}
          </Row>
        </div>
      )}

      {Boolean(customRender) && (
        <div style={styles.container} children={customRender} />
      )}

      <DefaultLayout
        btnGroup={Boolean(onSearch) ? null : btnGroup}
        viewLoading={Boolean(viewLoading) ? viewLoading : null}
        children={children}
      />
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.any.isRequired,
  btnGroup: PropTypes.object,
  onSearch: PropTypes.object,
  searchLoading: PropTypes.bool,
  customRender: PropTypes.element,
};

export default SimpleTableLayout;
