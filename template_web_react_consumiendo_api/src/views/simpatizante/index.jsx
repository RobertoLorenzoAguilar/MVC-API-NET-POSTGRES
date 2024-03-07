import { Link } from "react-router-dom";
import Listado from "./Listado";
import Formulario from "./Formulario";

const endPoint = "metas";
const ruta = "/metas";

const columnas = [
  {
    title: "Clave",
    index: "clave",
    key: "clave",
    dataIndex: "clave",
    render: (dato, registro) => (
      <Link to={`detalle?id=${registro?.id}`}>{dato}</Link>
    ),
  },
  {
    title: "Nombre",
    index: "nombre",
    key: "nombre",
    dataIndex: "nombre",
    render: (dato, registro) => (
      <Link to={`detalle?id=${registro?.id}`}>{dato}</Link>
    ),
  },
  {
    title: "Apellidos",
    index: "apellido",
    key: "apellido",
    dataIndex: "apellido",
    render: (dato, registro) => (
      <Link to={`detalle?id=${registro?.id}`}>{dato}</Link>
    ),
  },
  {
    title: "Colonia",
    index: "colonia",
    key: "colonia",
    dataIndex: "colonia",
    render: (dato, registro) => (
      <Link to={`detalle?id=${registro?.id}`}>{dato}</Link>
    ),
  },
  {
    title: "Dirección",
    index: "direccion",
    key: "direccion",
    dataIndex: "direccion",
    render: (dato, registro) => (
      <Link to={`detalle?id=${registro?.id}`}>{dato}</Link>
    ),
  },
  {
    title: "Teléfono",
    index: "telefono",
    key: "telefono",
    dataIndex: "telefono",
    render: (dato, registro) => (
      <Link to={`detalle?id=${registro?.id}`}>{dato}</Link>
    ),
  },
];

const Metas = () => (
  <Listado endPoint={endPoint} columnas={columnas} ruta={ruta} />
);

const MetasDetalle = () => (
  <Formulario endPoint={endPoint} ruta={ruta} />
);

export { Metas, MetasDetalle };
