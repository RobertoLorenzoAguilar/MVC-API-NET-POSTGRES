import React from 'react'
import DashboardChart from './DashboardChart'

const endPoint = 'categoria-producto'
const url = '/expediente'
const expand = ''
const orden = 'id-desc'


const Dashboard = () => (<DashboardChart
  endPoint={endPoint}
  expand={expand}
  url={url}
  orden={orden}
/>)

export { Dashboard }