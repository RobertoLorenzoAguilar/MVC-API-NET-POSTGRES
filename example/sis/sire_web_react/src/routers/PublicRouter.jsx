import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthLayout } from "../components/layouts";
import { Ingresar, Recuperar, Registrar } from "../views/auth";
import { NoEncontrado } from "../views/error";

const PublicRouter = () => {
  return (
    <AuthLayout>
      <Routes>
        <Route path="/" element={<Ingresar />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/recuperar-contrasena" element={<Recuperar />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </AuthLayout>
  );
};

export default PublicRouter;
