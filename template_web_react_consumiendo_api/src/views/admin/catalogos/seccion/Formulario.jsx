import React, { useEffect, useMemo, useState } from "react";
import { useModel, useQuery } from "../../../../hooks";
import { emptyRequest } from "../../../../constants/requests";
import { DefaultLayout } from "../../../../components/layouts";
import { DynamicForm } from "../../../../components";
import { Form, Input } from "antd";
import HttpService from "../../../../services/httpService";
import { respuestas } from "../../../../utilities";
import { useNavigate } from "react-router-dom";

const Formulario = ({ endPoint, ruta }) => {
  const q = useQuery();
  const id = q.get("id");
  const editando = Boolean(id);

  const [request, setRequest] = useState(emptyRequest);

  const [foto, setFoto] = useState(null);

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const requestParams = useMemo(
    () => ({
      name: endPoint,
      id: id,
    }),
    [id, endPoint]
  );

  const { model, modelLoading } = useModel(request);

  const onFinish = async (values) => {
    try {
      let body = {
        ...values,
      };

      if (foto) {
        body.foto = foto?.ruta;
      }

      if (model && editando) {
        body.id = model?.id;
      }

      const res = await HttpService.post(`${endPoint}`, body);
      if (respuestas(res)) {
        form.resetFields();
        navigate("/administracion/catalogos/agente");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fields = [
    {
      name: "idAgente",
      label: "Agente",
      type: "select",
      md: 12,
      rules: [
        {
          required: true,
          message: "Es necesario agregar una clave",
        },
      ],
    },
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      md: 12,
      rules: [
        {
          required: true,
          message: "Es necesario agregar un Nombre",
        },
      ],
    },
    {
      name: "descripcion",
      label: "Descripción",
      type: "custom",
      md: 24,
      rules: [
        {
          required: true,
          message: "Es necesario agregar un Nombre",
        },
      ],
      render: () => (
        <Input.TextArea style={{ resize: "none", height: "100" }} />
      ),
    },
    {
      name: "meta",
      label: "Meta",
      type: "text",
      md: 12,
      rules: [
        {
          required: true,
          message: "Es necesario agregar un Nombre",
        },
      ],
    },
    {
      name: "lista",
      label: "Lista",
      type: "text",
      md: 12,
      rules: [
        {
          required: true,
          message: "Es necesario agregar un Nombre",
        },
      ],
    },
  ];

  useEffect(() => {
    setRequest(requestParams);
    return () => {
      setRequest({});
    };
  }, [requestParams]);

  useEffect(() => {
    if (model && editando) {
      form.setFieldsValue(model);
    }

    if (model?.foto) {
      setFoto({ ruta: model?.foto });
    }
  }, [model, editando, form]);

  return (
    <DefaultLayout
      viewLoading={{
        spinning: modelLoading,
      }}
    >
      <DynamicForm onFinish={onFinish} fields={fields} form={form} />
    </DefaultLayout>
  );
};

export default Formulario;
