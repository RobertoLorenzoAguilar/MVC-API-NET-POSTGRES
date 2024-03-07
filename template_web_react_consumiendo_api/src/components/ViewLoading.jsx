import React from 'react';
import { Spin } from 'antd';

const ViewLoading = ({Titulo = "Cargando..."}) => {
  return(
    <div
      style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#fff',
      }}
    >
      <Spin tip={Titulo}  size="large" />
    </div>
  );
};

export default ViewLoading;