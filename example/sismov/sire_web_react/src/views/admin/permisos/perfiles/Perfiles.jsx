import React from "react";
import { SimpleTableLayout } from "../../../../components/layouts";
import { Tabla, ActionsButton } from "../../../../components";
import { useNavigate, Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { eliminarRegistro, isEllipsis } from "../../../../utilities";
import { Tooltip } from "antd";

const Perfiles = () => {
  let tablaRef = React.useRef();
  const endPoint = "coleccion-permiso";
  const history = useNavigate();

  const [buscarValue, setBuscarValue] = React.useState("");

  const btnGroup = [
    {
      id: 1,
      onClick: () => history(`/administracion/permisos/perfiles/agregar`),
      props: { disabled: false, type: "primary" },
      text: "Nuevo",
      icon: <PlusOutlined />,
    },
  ];

  const textLink = (value, key) => (
    <Link
      style={{ color: "black" }}
      to={`/administracion/permisos/perfiles/editar?id=${key?.id}`}
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
      width: 50,
      align: "center",
      render: (_, item) => (
        <ActionsButton
          options={[
            {
              name: "Editar",
              onClick: () =>
                history(
                  `/administracion/permisos/perfiles/editar?id=${item?.id}`
                ),
            },
            {
              name: "Eliminar",
              onClick: () => {
                eliminarRegistro(item?.nombre, item?.id, endPoint, () => {
                  tablaRef?.current?.refresh();
                });
              },
              danger: true,
            },
          ]}
        />
      ),
    },
    {
      title: "Clave",
      key: "clave",
      dataIndex: "clave",
      ellipsis: true,
      render: textLink,
      width: "100px",
    },
    {
      title: "Nombre",
      key: "nombre",
      dataIndex: "nombre",
      ellipsis: true,
      render: textLink,
      width: "100px",
    },
    {
      title: "Descripción",
      key: "descripcion",
      dataIndex: "descripcion",
      ellipsis: true,
      render: textLink,
      width: "200px",
    },
  ];

  const onSearch = (search) => {
    setBuscarValue(search);
  };

  return (
    <SimpleTableLayout
      onSearch={onSearch}
      btnGroup={{ btnGroup }}
      children={
        <Tabla
          innerRef={tablaRef}
          nameURL={endPoint}
          extraParams={{ buscar: buscarValue }}
          columns={columns}
        />
      }
    />
  );
};

export default Perfiles;
