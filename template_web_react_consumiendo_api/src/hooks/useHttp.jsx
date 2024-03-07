import React from "react";
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import httpCodes from "../constants/httpStatusCodes";
import { respuestas } from "../utilities";

const baseUrl = import.meta.env.VITE_API_URL;
const baseModule = import.meta.env.VITE_API_MODULE;
const baseModulePdf = import.meta.env.VITE_API_MODULE_PDF;
const baseModuleExcel = import.meta.env.VITE_API_MODULE_EXCEL;
const baseModuleWord = import.meta.env.VITE_API_MODULE_WORD;
const baseModulePublico = import.meta.env.VITE_API_MODULE_PUBLIC;
const localStorageKey = "usr_jwt";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const makeHeaders = (token) =>
  token
    ? {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`,
      }
    : defaultHeaders;

const paramsToQuery = (params) =>
  Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
    )
    .join("&");

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export function useHttp({
  req = "GET",
  url = null,
  params = null,
  body = null,
  alert = false,
}) {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const refresh = React.useCallback(
    async (showAlert, inlineParams = {}) => {
      try {
        if (!url || !params) {
          setResponse(null);
          setError(null);
          setLoading(true);
          return;
        }
        let modulo;
        switch (params.modulo) {
          case "pdf":
            modulo = baseModulePdf;
            break;
          case "excel":
            modulo = baseModuleExcel;
            break;
          case "word":
            modulo = baseModuleWord;
            break;
          case "publico":
            modulo = baseModulePublico;
            break;
          default:
            modulo = baseModule;
            break;
        }
        if (inlineParams.isCargando === false) {
          setLoading(() => false);
        } else {
          setLoading(() => true);
        }
        const jwt = localStorage.getItem(localStorageKey);
        let fetchReq = {
          method: req,
          headers: makeHeaders(jwt),
        };
        if (body) {
          fetchReq = { ...fetchReq, body: JSON.stringify(body) };
        }
        const paramsFinal = { ...params, ...inlineParams };
        const str = `${baseUrl}${modulo}${url}${
          params && Object.keys(paramsFinal).length > 0
            ? `?${paramsToQuery(paramsFinal)}`
            : "" 
        }`;
        const httpRes = await fetch(str, fetchReq);
        const resBody = await httpRes.json();
        switch (httpRes.status) {
          case httpCodes.OK:
            setResponse(resBody);
            setError(null);
            alert &&
              showAlert({
                severity: "success",
                message: resBody.mensaje
                  ? capitalize(resBody.mensaje)
                  : "Solicitud completada correctamente!",
              });
            break;
          case httpCodes.BAD_REQUEST:
            window["scrollTo"]({ top: 0, behavior: "smooth" });
            setError(resBody.errores);
            alert &&
              showAlert({
                severity: "warning",
                message: resBody.mensaje
                  ? capitalize(resBody.mensaje)
                  : "Datos erróneos o inválidos.",
              });
            break;
          case httpCodes.FORBIDDEN:
          case httpCodes.UNAUTHORIZED:
            window["scrollTo"]({ top: 0, behavior: "smooth" });
            setError(resBody.errores);
            alert &&
              showAlert({
                severity: "warning",
                message: resBody.mensaje
                  ? capitalize(resBody.mensaje)
                  : "Datos erróneos o inválidos.",
              });
            // redirect('/no-autorizado')
            navigate("/no-autorizado");
            break;
          case httpCodes.INTERNAL_SERVER_ERROR:
          default:
            alert &&
              showAlert({
                severity: "error",
                message: resBody.mensaje
                  ? capitalize(resBody.mensaje)
                  : "Ocurrió un error en el servidor.",
              });
        }

        if (str.includes("login"))
          if (httpRes?.status >= 200 && httpRes?.status < 399)
            respuestas({
              mensaje: resBody?.message || resBody.mensaje,
              status: httpRes.status,
            });
          else
            respuestas({
              errores: { mensaje: resBody?.message || resBody.mensaje },
              status: httpRes.status,
            });
      } catch (error) {
        alert &&
          showAlert({
            severity: "error",
            message: "No se pudo establecer conexión con el servidor.",
          });
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [alert, body, navigate, params, req, url]
  );

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      refresh(showAlert);
    }
    return () => {
      mounted = false;
    };
  }, [refresh, showAlert]);

  return React.useMemo(
    () => [response, loading, error, refresh],
    [response, loading, error, refresh]
  );
}
