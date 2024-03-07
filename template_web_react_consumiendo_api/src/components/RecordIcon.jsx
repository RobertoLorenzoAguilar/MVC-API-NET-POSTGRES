import React from "react";
import { BsRecordCircle } from "react-icons/bs";

const RecordIcon = () => {
  const estiloLuminoso = {
    backgroundColor: "#ff4d4f",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    boxShadow: "0 0 10px #ff4d4f",
    animation: "pulsate 2s infinite",
    margin: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  };
  return (
    <div style={estiloLuminoso} size={"small"}>
      <BsRecordCircle />
    </div>
  );
};

export default RecordIcon;
