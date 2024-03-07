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
  }  
];

const Reportes = () => (
  <Listado endPoint={endPoint} columnas={columnas} ruta={ruta} />
);

const ReportesDetalle = () => <Formulario endPoint={endPoint} ruta={ruta} />;

export { Reportes, ReportesDetalle };
