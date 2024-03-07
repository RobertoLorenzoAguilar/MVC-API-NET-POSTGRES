import React, { useState, useEffect } from "react";
import { DefaultLayout } from "../../../components/layouts";
import { useModel, useQuery } from "../../../hooks";
import Formulario from "./Formulario";

const UsuarioDetalle = () => {
  const endPoint = "usuario";
  const q = useQuery();
  const id = q.get("id");
  const editing = Boolean(id);

  const [request, setRequest] = useState({});
  const [guardando, setGuardando] = useState(false);

  const requestParams = React.useMemo(
    () => ({
      name: endPoint,
      expand:
        "permisos",
      id: id,
    }),
    [id]
  );

  const { model, modelLoading } = useModel(request);

  useEffect(() => {
    if (editing) {
      setRequest(requestParams);
      return () => setRequest({});
    }
  }, [editing, requestParams]);

  return (
    <DefaultLayout
      viewLoading={{
        text: "Guardando...",
        size: "large",
        spinning: guardando || modelLoading,
      }}
    >
      <Formulario
        setGuardando={setGuardando}
        endPoint={endPoint}
        model={model}
        editing={editing}
        id={id}
      />
    </DefaultLayout>
  );
};

export default UsuarioDetalle;
