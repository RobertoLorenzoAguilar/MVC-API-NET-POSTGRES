import { useState, useMemo, useEffect } from 'react'
import { DefaultLayout } from '../../components/layouts'
import { useQuery, useModel } from '../../hooks'
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import { Col, Divider, Row } from 'antd';

const generateDefaultChartOptions = (chartType = "pie", options = {}, callback) => ({
  chart: {
    type: chartType,
    inverted: options.inverted || false,
    options3d: {
      enabled: chartType === "pie",
      alpha: 45,
      beta: 0,
    },
    height: options.chartHeight || null,
  },
  colors: options?.colores || ["#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
  credits: {
    enabled: false,
  },
  title: {
    text: options?.titulo || "",
  },
  plotOptions: {
    [chartType]: {
      innerSize: 100,
      depth: 45,
      events: {
        click: typeof callback === "function" ? callback : () => { },
      },
    },
  },
  series: [
    {
      name: options?.nombre || "NOMBRE DE LA COLECCION DE DATOS",
      data: options?.datos || [],
    },
  ],
  subtitle: {
    text: options?.subtitulo || "SUBTITULO POR DEFAULT",
  },
  ...options?.options
});

const DashboardChart = ({ endPoint, expand, url, orden }) => {
  const q = useQuery()
  const id = q.get('id')
  const editando = Boolean(id)

  const [request, setRequest] = useState({})

  const requestParams = useMemo(() => ({
    name: endPoint,
    id: id,
    ordenar: orden,
    expand: expand,
  }), [endPoint, expand, id, orden])

  const {
    model,
    modelLoading
  } = useModel(request)

  const chartOptionsPie = generateDefaultChartOptions(
    "pie",
    {
      colores: ["#127d67", "#0d233a", "#8bbc21"],
      titulo: "Ausentismo",
      subtitulo: "",
      nombre: "Asuntos",
      datos: [
        {
          name: "Hermosillo",
          y: 50,
        },
        {
          name: "Obregón",
          y: 14,
        },
        {
          name: "SLRC",
          y: 6,
        },
      ],
    },
    // callbackExample
  );

  const chartOptionsLine = generateDefaultChartOptions(
    "line",
    {
      colores: ["#127d67", "#0d233a", "#8bbc21"],
      titulo: "Promedio Académico",
      subtitulo: "",
      nombre: "Hermosillo I",
      datos: [
        {
          name: "Hermosillo",
          y: 50,
        },
        {
          name: "Obregón",
          y: 14,
        },
        {
          name: "SLRC",
          y: 6,
        },
      ],
      options: {
        yAxis: {
          title: {
            text: 'Calificación'
          }
        }
      }
    },
    // callbackExample
  );

  const chartOptionsBar = generateDefaultChartOptions(
    "bar",
    {
      colores: ["#127d67", "#0d233a", "#8bbc21"],
      titulo: "Servicios Escolares",
      subtitulo: "Total: 32",
      nombre: "Asuntos Pendientes",
      datos: [
        {
          name: "Hermosillo",
          y: 50,
        },
        {
          name: "Obregón",
          y: 14,
        },
        {
          name: "SLRC",
          y: 6,
        },
      ],
    },
    // callbackExample
  );

  const chartOptionsColumn = generateDefaultChartOptions(
    "column",
    {
      colores: ["#127d67", "#0d233a", "#8bbc21"],
      titulo: "Ingresos por Plantel",
      subtitulo: "Total: 32",
      nombre: "Asuntos",
      datos: [
        {
          name: "Hermosillo",
          y: 50,
        },
        {
          name: "Obregón",
          y: 14,
        },
        {
          name: "SLRC",
          y: 6,
        },
      ],
      options: {
        xAxis: {
          categories: [
            'Hermosillo I',
            'Obregón',
            'SLRC'
          ]
        }
      }
    },
    // callbackExample
  );

  HighchartsExporting(Highcharts);

  useEffect(() => {
    setRequest(requestParams)
    return () => {
      setRequest({})
    }
  }, [requestParams])

  return (
    <DefaultLayout
      viewLoading={{
        text: 'Cargando ...',
        spinning: modelLoading
      }}
    >
      <Row>
        <Col span={12}>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptionsPie}
            constructorType={"chart"}
          />
        </Col>
        <Col span={12}>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptionsLine}
            constructorType={"chart"}
          />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12}>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptionsBar}
            constructorType={"chart"}
          />
        </Col>
        <Col span={12}>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptionsColumn}
            constructorType={"chart"}
          />
        </Col>
      </Row>
    </DefaultLayout>
  )
}

export default  DashboardChart;