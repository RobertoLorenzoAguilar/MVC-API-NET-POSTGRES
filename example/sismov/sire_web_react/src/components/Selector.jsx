import React from 'react'
import PropTypes from "prop-types";
import { Select as AntdSelect, Tag } from 'antd'
import { useModels } from '../hooks';
import { agregarFaltantes } from '../utilities';

const Selector = ({ 
  modelsParams, 
  labelProp, 
  valueProp, 
  render, 
  append, 
  deleteSelected,
  extraParams,
  onChange,
  labelInValue = false,
  filtered = [],
  tagOptions,
  ...props 
}) => {

  const [request, setRequest] = React.useState({});
  const [buscarValue, setBuscarValue] = React.useState('');
  const [timer, setTimer] = React.useState(null);
  const [selected, setSelected] = React.useState([...filtered]);

  const extraParamsMemo = React.useMemo(() => ({ buscar: buscarValue, ...extraParams  }),
    [buscarValue, extraParams]
  );

  const requestMemo = React.useMemo(() => ({
    name: modelsParams?.name || "",
    ordenar: modelsParams?.ordenar || "id-desc",
    limite: modelsParams?.limite || 20,
    expand: modelsParams?.expand || "",
    extraParams: extraParamsMemo,
  }), [extraParamsMemo, modelsParams]);

  const {
    models: modelsData,
    modelsLoading: modelsDataLoading,
    modelsError
  } = useModels(request);

  const onSearch = (value) => {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      setBuscarValue(value);
    }, 300);

    setTimer(newTimer);
  };

  if(!render) {
    render = (value) => value;
  }

  if (!append) {
    append = [];
  }

  const _onChange = (_, option) => {
    setSelected(ultimoEstado => agregarFaltantes(ultimoEstado, option, "id"));
  }

  
  const options = React.useMemo(() => {
    let aux = agregarFaltantes([...modelsData], [...append], valueProp);
    aux = aux.filter(item => !selected.find(i => item.id === i.id));
    return aux;
  }, [append, modelsData, selected, valueProp]);

  let _options = []

  if (tagOptions) {
    for (let i = 10; i < 36; i++) {
      _options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
      });
    }
  }
  
  React.useEffect(() => {
    setRequest(requestMemo);
    return () => {
      setRequest({});
    };
  }, [requestMemo]);

  React.useEffect(() => {
    if(onChange) {
      onChange && onChange(selected);
    }
  }, [selected, onChange]);

  if(modelsError) {
    return <Tag color='red'>error al obtener información de selector.</Tag>
  }

  return (
    <AntdSelect
      {...props}
      labelInValue={labelInValue}
      mode="multiple"
      showSearch
      onSearch={onSearch}
      defaultActiveFirstOption={false}
      filterOption={false}
      notFoundContent={null}
      allowClear={true}
      style={{ width: '100%' }}
      loading={modelsDataLoading}
      onChange={_onChange}
      onClear={() => setSelected([])}
      options={ options.map(i => ({
        ...i,
        label: render(i[labelProp], i),
        value: i[valueProp],
      }))}
      onDeselect={(v) => {
        setSelected(ls => ls.filter(i => i.id !== v.value))
      }}
    />
  )
}

Selector.propTypes = {
  modelsParams: PropTypes.object.isRequired,
  labelProp: PropTypes.string.isRequired,
  valueProp: PropTypes.string.isRequired,
  render: PropTypes.func,
  notIn: PropTypes.string,
  onDeselected: PropTypes.func,
  deleteSelected: PropTypes.string,
  filtered: PropTypes.array,
};

export default Selector