import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Tooltip, Typography, Grid } from "antd";
import React from "react";

const { useBreakpoint } = Grid;

const UsuarioHeader = ({ usuario, menu }) => {
  const pantalla = useBreakpoint();

  const formatoNombre = (nombre) => {
    let nombreCompleto = nombre?.split(" ");
    if (nombreCompleto?.length > 2) {
      return `${nombreCompleto[0]} ${nombreCompleto[1]}`;
    } else {
      return nombre;
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "end", padding: 12 }}>
      {pantalla?.lg && (
        <Tooltip title={usuario?.correo}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "2px",
              justifyContent: "center",
            }}
          >
            <Typography.Text
              strong
              style={{ textAlign: "end", color: "white" }}
            >
              {formatoNombre(usuario?.nombre)}
            </Typography.Text>
            {pantalla?.xl && (
              <Typography.Text type="secondary" style={{color:'lightgray'}}>
                {usuario?.correo}
              </Typography.Text>
            )}
          </div>
        </Tooltip>
      )}
      <Dropdown menu={menu}>
        <Avatar style={{ margin: 2 }} size={"large"} icon={<UserOutlined />} />
      </Dropdown>
    </div>
  );
};

export default UsuarioHeader;
