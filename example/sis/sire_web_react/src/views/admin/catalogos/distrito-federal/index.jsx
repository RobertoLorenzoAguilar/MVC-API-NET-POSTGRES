import { Link } from "react-router-dom";
import Listado from "./Listado";
import Formulario from "./Formulario";

const endPoint = "distrito";
const ruta = "/distrito";

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
];

const DistritoFederal = () => (
  <Listado endPoint={endPoint} columnas={columnas} ruta={ruta} />
);

const DistritoFederalDetalle = () => (
  <Formulario endPoint={endPoint} ruta={ruta} />
);

export { DistritoFederal, DistritoFederalDetalle };
