import React from 'react';
import PropTypes from "prop-types";
import { Select } from 'antd';
import { useModels } from '../hooks';
import { agregarFaltantes } from '../utilities';

const BeneficiarioSelect = ({ append, valueProp, ...props }) => {

  const [request, setRequest] = React.useState({});
  const [buscarValue, setBuscarValue] = React.useState('');
  const [timer, setTimer] = React.useState(null);

  const extraParamsMemo = React.useMemo(() => ({ buscar: buscarValue }), [buscarValue]);

  const requestMemo = React.useMemo(() => ({
    name: "beneficiario",
    ordenar: "nombre-asc",
    limite: 20,
    extraParams: extraParamsMemo
  }), [extraParamsMemo]);

  const {
    models,
    modelsLoading,
  } = useModels(request);

  const onSearch = (value) => {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      setBuscarValue(value);
    }, 300);

    setTimer(newTimer);
  };

  if (!append) {
    append = [];
  }

  React.useEffect(() => {
    setRequest(requestMemo);
    return () => {
      setRequest({});
    };
  }, [requestMemo]);

  return (
    <Select
      {...props}
      showSearch
      onSearch={onSearch}
      defaultActiveFirstOption={false}
      filterOption={false}
      notFoundContent={null}
      allowClear={true}
      style={{ width: '100%' }}
      loading={modelsLoading}
      options={models.length > 0 && agregarFaltantes([...models], [...append], valueProp).map(i => ({
        ...i,
        label: `${i?.nombre}`,
        value: i?.[valueProp],
      }))}
    />
  )
}

BeneficiarioSelect.propTypes = {
  valueProp: PropTypes.string.isRequired,
  append: PropTypes.array
};

export default BeneficiarioSelect