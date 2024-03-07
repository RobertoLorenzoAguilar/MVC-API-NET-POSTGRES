import React from "react";

//Íconos de Ant Design
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  FolderOpenOutlined,
  ControlOutlined,
  DatabaseOutlined,
  LockOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
//Íconos de Ant Design

//iconos de React Icons
//iconos de React Icons

import { NoEncontrado, NoAutorizado } from "../views/error";
import { Inicio } from "../views/inicio";
import { Usuarios, UsuarioDetalle } from "../views/admin/usuarios";
import { Perfil } from "../views/perfil";
import { Modulos } from "../views/admin/permisos/modulos";
import { Permisos } from "../views/admin/permisos/permisos";
import { Perfiles, PerfilDetalle } from "../views/admin/permisos/perfiles";
import { Seccion, SeccionDetalle } from "../views/admin/catalogos/seccion";
import {
  DistritoLocal,
  DistritoLocalDetalle,
} from "../views/admin/catalogos/distrito-local";
import {
  DistritoFederal,
  DistritoFederalDetalle,
} from "../views/admin/catalogos/distrito-federal";
import { Simpatizante, SimpatizanteDetalle } from "../views/simpatizante";

/* CATÁLOGOS */

const singOutRoute = () => {
  return "Cargando...";
};

const sharedRoutes = [
  {
    path: "/no-autorizado",
    element: NoAutorizado,
  },
  {
    path: "/salir",
    icon: LogoutOutlined,
    element: singOutRoute,
  },
  {
    path: "*",
    element: Inicio,
  },
];

const dashboardRoutes = [
  {
    layout: "dashboard",
    path: "/",
    name: "Inicio",
    icon: <HomeOutlined />,
    sidebar: "single",
    ver: "MENU-VER",
    element: Inicio,
  },
  {
    layout: "dashboard",
    path: "/perfil",
    name: "Perfil",
    icon: <UserOutlined />,
    sidebar: "none",
    element: Perfil,
  },
  {
    layout: "dashboard",
    path: "/perfil",
    name: "Perfil",
    icon: <UserOutlined />,
    sidebar: "none",
    element: Perfil,
  },
  {
    layout: "dashboard",
    path: "/simpatizantes",
    name: "Simpatizantes",
    icon: <UserOutlined />,
    sidebar: "single",
    ver: "MENU-VER",
    routes: [
      {
        path: "/",
        element: Simpatizante,
      },
      {
        path: "/agregar",
        element: SimpatizanteDetalle,
      },
      {
        path: "/editar",
        element: SimpatizanteDetalle,
      },
    ],
  },
  {
    layout: "dashboard",
    path: "/administracion",
    name: "Administración",
    icon: <SettingOutlined />,
    sidebar: "collapse",
    ver: "MENU-VER",
    routes: [
      {
        layout: "dashboard",
        path: "/usuarios",
        name: "Usuarios",
        icon: <UserOutlined />,
        sidebar: "single",
        ver: "MENU-VER",
        routes: [
          {
            path: "/",
            element: Usuarios,
          },
          {
            path: "/agregar",
            element: UsuarioDetalle,
          },
          {
            path: "/editar",
            element: UsuarioDetalle,
          },
        ],
      },
      {
        layout: "dashboard",
        path: "/permisos",
        name: "Permisos",
        icon: <ControlOutlined />,
        sidebar: "collapse",
        ver: "MENU-VER",
        routes: [
          {
            layout: "dashboard",
            path: "/modulos",
            name: "Módulos",
            icon: <DatabaseOutlined />,
            sidebar: "single",
            ver: "MENU-VER",
            routes: [
              {
                path: "/",
                element: Modulos,
              },
            ],
          },
          {
            layout: "dashboard",
            path: "/permisos",
            name: "Permisos",
            icon: <LockOutlined />,
            sidebar: "single",
            ver: "MENU-VER",
            routes: [
              {
                path: "/",
                element: Permisos,
              },
            ],
          },
          {
            layout: "dashboard",
            path: "/perfiles",
            name: "Perfiles",
            icon: <UsergroupAddOutlined />,
            sidebar: "single",
            ver: "MENU-VER",
            routes: [
              {
                path: "/",
                name: "Perfiles",
                element: Perfiles,
              },
              {
                path: "/agregar",
                name: "Agregar un Perfil",
                element: PerfilDetalle,
              },
              {
                path: "/editar",
                name: "Editar un Perfil",
                element: PerfilDetalle,
              },
            ],
          },
        ],
      },
      {
        layout: "dashboard",
        path: "/catalogos",
        name: "Catálogos",
        icon: <FolderOpenOutlined />,
        sidebar: "collapse",
        ver: "MENU-VER",
        routes: [
          {
            layout: "dashboard",
            path: "/secciones",
            name: "Seccion",
            sidebar: "single",
            ver: "MENU-VER",
            routes: [
              {
                path: "/",
                element: Seccion,
              },
              {
                path: "/agregar",
                name: "Agregar",
                element: SeccionDetalle,
              },
              {
                name: "Editar",
                path: "/detalle",
                element: SeccionDetalle,
              },
            ],
          },
          {
            layout: "dashboard",
            path: "/distritos-locales",
            name: "Distritos Locales",
            sidebar: "single",
            ver: "MENU-VER",
            routes: [
              {
                path: "/",
                element: DistritoLocal,
              },
              {
                path: "/agregar",
                name: "Agregar",
                element: DistritoLocalDetalle,
              },
              {
                name: "Editar",
                path: "/detalle",
                element: DistritoLocalDetalle,
              },
            ],
          },
          {
            layout: "dashboard",
            path: "/distritos-federales",
            name: "Distritos Federales",
            sidebar: "single",
            ver: "MENU-VER",
            routes: [
              {
                path: "/",
                element: DistritoFederal,
              },
              {
                path: "/agregar",
                name: "Agregar",
                element: DistritoFederalDetalle,
              },
              {
                name: "Editar",
                path: "/detalle",
                element: DistritoFederalDetalle,
              },
            ],
          },
        ],
      },
    ],
  },
  ...sharedRoutes,
];

const publicRoutes = [...sharedRoutes];

export { dashboardRoutes, publicRoutes };
