const localStorageKey = "usr_jwt";
const baseUrl = import.meta.env.VITE_API_URL;
const baseModule = import.meta.env.VITE_API_MODULE;

const getCurrentToken = async () => {
  try {
    const jwt = localStorage.getItem(localStorageKey);
    if (!jwt) throw new Error("No hay sesión.");
    return jwt;
  } catch (error) {
    console.error("Error getting token:", error.message);
    throw new Error("Error getting token.");
  }
};

const getHeaders = (token) => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
});

const getHeadersWithoutToken = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
});

const handleFetchErrors = async (response) => {
  if (!response.ok) {
    const errorDetails = await response.json().catch(() => ({}));
    console.error("Request failed:", response.status, errorDetails);
    throw new Error("Request failed.");
  }
  return response;
};

const HttpService = {
  get: async (url, auth = true) => {
    let token = null;
    if (auth) token = await getCurrentToken();
    const response = await fetch(baseUrl + baseModule + url, {
      method: "GET",
      headers: auth ? getHeaders(token) : getHeadersWithoutToken(),
    });

    await handleFetchErrors(response);

    let serverResponse = await response.json();

    return {
      isError: false,
      status: response.status,
      resultado: serverResponse?.resultado || serverResponse || null,
      paginacion: serverResponse?.paginacion || null,
      mensaje: serverResponse?.mensaje || null,
    };
  },

  getPublico: async (url, withHandlerError = true) => {
    const response = await fetch(baseUrl + "/publico/" + url, {
      method: "GET",
      headers: getHeadersWithoutToken(),
    });

    if (withHandlerError) await handleFetchErrors(response);

    let serverResponse = await response.json();

    return {
      isError: false,
      status: response.status,
      resultado: serverResponse?.resultado || serverResponse || null,
      paginacion: serverResponse?.paginacion || null,
      mensaje: serverResponse?.mensaje || null,
    };
  },

  post: async (url, data, auth = true, type = 1, withHandlerError = true) => {
    let token = null;
    if (auth) token = await getCurrentToken();
    const response = await fetch(baseUrl + baseModule + url, {
      method: "POST",
      headers: auth ? getHeaders(token) : getHeadersWithoutToken(),
      body: JSON.stringify(data),
    });

    if (withHandlerError) await handleFetchErrors(response);

    let serverResponse = null;
    try {
      if (type === 1) {
        serverResponse = await response.json();
      }
      if (type === 2) {
        serverResponse = await response.blob();
      }
    } catch (error) {
      console.error("Error parsing response:", error.message);
    }

    return {
      isError: false,
      status: response.status,
      errores: serverResponse?.errores || null,
      detalle: serverResponse?.detalle || null,
      mensaje: serverResponse?.mensaje || null,
      response: serverResponse || null,
    };
  },
  put: async (url, data, auth = true, type = 1, withHandlerError = true) => {
    let token = null;
    if (auth) token = await getCurrentToken();
    const response = await fetch(baseUrl + baseModule + url, {
      method: "PUT",
      headers: auth ? getHeaders(token) : getHeadersWithoutToken(),
      body: JSON.stringify(data),
    });

    if (withHandlerError) await handleFetchErrors(response);

    let serverResponse = null;
    try {
      if (type === 1) {
        serverResponse = await response.json();
      }
      if (type === 2) {
        serverResponse = await response.blob();
      }
    } catch (error) {
      console.error("Error parsing response:", error.message);
    }

    return {
      isError: false,
      status: response.status,
      errores: serverResponse?.errores || null,
      detalle: serverResponse?.detalle || null,
      mensaje: serverResponse?.mensaje || null,
      response: serverResponse || null,
    };
  },
  postPublico: async (url, data, type = 1, withHandlerError = true) => {
    const response = await fetch(baseUrl + "/publico/" + url, {
      method: "POST",
      headers: getHeadersWithoutToken(),
      body: JSON.stringify(data),
    });

    if (withHandlerError) await handleFetchErrors(response);

    let serverResponse = null;
    try {
      if (type === 1) {
        serverResponse = await response.json();
      }
      if (type === 2) {
        serverResponse = await response.blob();
      }
    } catch (error) {
      console.error("Error parsing response:", error.message);
    }
    return {
      isError: false,
      status: response.status,
      errores: serverResponse?.errores || null,
      detalle: serverResponse?.detalle || null,
      mensaje: serverResponse?.mensaje || null,
      response: serverResponse || null,
    };
  },

  postFormData: async (url, data, auth = true, type = 1) => {
    let token = null;
    if (auth) token = await getCurrentToken();
    const response = await fetch(baseUrl + baseModule + url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    await handleFetchErrors(response);

    let serverResponse = null;
    try {
      if (type === 1) {
        serverResponse = await response.json();
      }
      if (type === 2) {
        serverResponse = await response.blob();
      }
    } catch (error) {
      console.error("Error parsing response:", error.message);
    }

    return {
      isError: false,
      status: response.status,
      errores: serverResponse?.errores || null,
      detalle: serverResponse?.detalle || null,
      mensaje: serverResponse?.mensaje || null,
      response: response || null,
      resultado: serverResponse?.resultado || serverResponse || null,
    };
  },

  delete: async (url, data, auth = true) => {
    let token = null;
    if (auth) token = await getCurrentToken();
    const response = await fetch(baseUrl + baseModule + url, {
      method: "DELETE",
      headers: auth ? getHeaders(token) : getHeadersWithoutToken(),
      body: JSON.stringify(data),
    });

    await handleFetchErrors(response);

    let serverResponse = await response.json();

    return {
      isError: false,
      status: response.status,
      errores: serverResponse?.errores || null,
      detalle: serverResponse?.detalle || null,
      mensaje: serverResponse?.mensaje || null,
    };
  },
};

export default HttpService;
