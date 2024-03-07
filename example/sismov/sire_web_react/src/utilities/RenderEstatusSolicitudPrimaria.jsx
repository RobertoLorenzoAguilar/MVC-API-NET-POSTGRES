import {CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Tag} from "antd";


export const RenderEstatusSolicitudPrimaria = ({item, style = {fontSize: 13}}) => {

  if (!item) return "error";

  let color = "";
  let icon = "";

  if (item === "NUEVO") {
    icon = <ClockCircleOutlined/>;
    color = "default";
  } else if (item === "ENVIADO") {
    icon = <ClockCircleOutlined/>;
    color = "default";
  } else if (item === "APROBADO") {
    icon = <CheckCircleOutlined/>;
    color = "success";
  } else if (item === "RECHAZADO") {
    icon = <CloseCircleOutlined/>;
    color = "error";
  }

  return (
    <Tag icon={icon} color={color} style={style}>
      {item}
    </Tag>
  )
};