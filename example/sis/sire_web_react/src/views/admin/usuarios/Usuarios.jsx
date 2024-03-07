import React, { useRef, useState } from "react";
import { Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Tabla } from "../../../components";
import { SimpleTableLayout } from "../../../components/layouts";
import { ActionsButton } from "../../../components";
import { lastPathName, eliminarRegistro, isEllipsis } from "../../../utilities";
import { Link, useNavigate } from "react-router-dom";

const Usuarios = () => {
  const endPoint = "usuario";
  let tablaRef = useRef(null);
  const navigate = useNavigate();
  const { lastPath } = lastPathName();
  const [buscarParams, setBuscarParams] = useState("");

  const onSearch = (value) => {
    setBuscarParams(value);
  };
  console.log(buscarParams);

  const botones = [
    {
      onClick: () => navigate(`/administracion/usuarios/agregar`),
      props: { disabled: false, type: "primary", block: false },
      text: "Nuevo",
      icon: <PlusOutlined />,
    },
  ];

  const linkText = (value, row, key) => (
    <Link
      to={`/administracion/usuarios/editar?id=${row.id}`}
      style={{ color: "black" }}
    >
      {isEllipsis(columns, key) ? (
        <Tooltip title={value}>{value}</Tooltip>
      ) : (
        value
      )}
    </Link>
  );

  const columns = [
    {
      title: "Acciones",
      key: "id",
      dataIndex: "id",
      width: 100,
      align: "center",
      render: (_, item) => (
        <ActionsButton
          data={[
            {
              label: "Editar",
              onClick: () =>
                navigate(`/administracion/usuarios/editar?id=${item.id}`),
            },
            {
              label: "Eliminar",
              onClick: () => {
                eliminarRegistro(item?.nombre, item?.id, endPoint, () =>
                  tablaRef?.current?.refresh()
                );
              },
              danger: true,
            },
          ]}
        />
      ),
    },
    {
      title: "Nombre",
      key: "nombre",
      dataIndex: "nombre",
      render: linkText,
    },
    {
      title: "Corrreo",
      key: "correo",
      dataIndex: "correo",
      render: linkText,
    },
  ];

  return (
    <SimpleTableLayout
      onSearch={onSearch}
      btnGroup={{
        btnGroup: botones,
      }}
    >
      <Tabla
        columns={columns}
        nameURL={endPoint}
        extraParams={{ q: buscarParams }}
        scroll={{ x: "30vw" }}
      />
    </SimpleTableLayout>
  );
};

export default Usuarios;
