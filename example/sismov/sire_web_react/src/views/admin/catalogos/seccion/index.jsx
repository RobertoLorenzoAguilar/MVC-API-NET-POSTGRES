import { Link } from "react-router-dom";
import Listado from "./Listado";
import Formulario from "./Formulario";

const endPoint = "seccion";
const ruta = "/secciones";

const columnas = [
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
    title: "Descripción",
    index: "descripcion",
    key: "descripcion",
    dataIndex: "descripcion",
    render: (dato, registro) => (
      <Link to={`detalle?id=${registro?.id}`}>{dato}</Link>
    ),
  },
  {
    title: "Distrito",
    index: "distrito",
    key: "distrito",
    dataIndex: "distrito",
    render: (dato, registro) => (
      <Link to={`detalle?id=${registro?.id}`}>{dato}</Link>
    ),
  },
  {
    title: "Meta",
    index: "meta",
    key: "meta",
    dataIndex: "meta",
    render: (dato, registro) => (
      <Link to={`detalle?id=${registro?.id}`}>{dato}</Link>
    ),
  },
  {
    title: "Lista Nominal",
    index: "listaNominal",
    key: "listaNominal",
    dataIndex: "listaNominal",
    render: (dato, registro) => (
      <Link to={`detalle?id=${registro?.id}`}>{dato}</Link>
    ),
  },
];

const Seccion = () => (
  <Listado endPoint={endPoint} columnas={columnas} ruta={ruta} />
);

const SeccionDetalle = () => <Formulario endPoint={endPoint} ruta={ruta} />;

export { Seccion, SeccionDetalle };
