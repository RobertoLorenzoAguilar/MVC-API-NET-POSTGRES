import { PlusOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionsButton, Tabla } from "../../components";
import { eliminarRegistro } from "../../utilities";
import { SimpleTableLayout } from "../../components/layouts";

const Listado = ({ endPoint, columnas, ruta }) => {
  const tablaRef = useRef(null);

  const navigate = useNavigate();

  const [buscar, setBuscar] = useState("");

  const btnGroup = [
    {
      onClick: () => navigate(`agregar`),
      props: { disabled: false, type: "primary", block: false },
      text: "Agregar",
      icon: <PlusOutlined />,
    },
  ];

  const columns = [
    {
      width: "5%",
      title: "",
      orden: false,
      render: (_, item) => (
        <ActionsButton
          data={[
            {
              label: "Editar",
              onClick: () => {
                navigate(`detalle?id=${item.id}`);
              },
            },
            {
              label: "Eliminar",
              onClick: () =>
                eliminarRegistro(
                  `${item.descripcion}`,
                  item.id,
                  endPoint,
                  () => {
                    tablaRef.current.refresh();
                  }
                ),
              danger: true,
            },
          ]}
        />
      ),
    },
    ...columnas,
  ];

  const handleSearch = (buscar) => {
    setBuscar(buscar);
  };

  return (
    <SimpleTableLayout
      onSearch={handleSearch}
      btnGroup={{ btnGroup }}
      viewLoading={{
        text: "Cargando...",
        size: "large",
      }}
    >
      <Tabla
        nameURL={endPoint}
        columns={columns}
        innerRef={tablaRef}
        order={"creado-desc"}
        extraParams={{ q: buscar }}
      />
    </SimpleTableLayout>
  );
};

export default Listado;
