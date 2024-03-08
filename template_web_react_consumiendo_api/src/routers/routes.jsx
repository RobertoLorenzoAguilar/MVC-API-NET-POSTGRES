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
import { Reportes, ReportesDetalle } from "../views/admin/catalogos/seccion";
import { Metas, MetasDetalle } from "../views/metas";

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
  // {
  //   layout: "dashboard",
  //   path: "/simpatizantes",
  //   name: "Metas",
  //   icon: <UserOutlined />,
  //   sidebar: "single",
  //   ver: "MENU-VER",
  //   routes: [
  //     {
  //       path: "/",
  //       element: Metas,
  //     },
  //     {
  //       path: "/agregar",
  //       element: MetasDetalle,
  //     },
  //     {
  //       path: "/editar",
  //       element: MetasDetalle,
  //     },
  //   ],
  // },
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
        name: "Perfiles",
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
            name: "roles",
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
          // {
          //   layout: "dashboard",
          //   path: "/perfiles",
          //   name: "Perfiles",
          //   icon: <UsergroupAddOutlined />,
          //   sidebar: "single",
          //   ver: "MENU-VER",
          //   routes: [
          //     {
          //       path: "/",
          //       name: "Perfiles",
          //       element: Perfiles,
          //     },
          //     {
          //       path: "/agregar",
          //       name: "Agregar un Perfil",
          //       element: PerfilDetalle,
          //     },
          //     {
          //       path: "/editar",
          //       name: "Editar un Perfil",
          //       element: PerfilDetalle,
          //     },
          //   ],
          // },
        ],
      },
      // {
      //   layout: "dashboard",
      //   path: "/catalogos",
      //   name: "Catálogos",
      //   icon: <FolderOpenOutlined />,
      //   sidebar: "collapse",
      //   ver: "MENU-VER",
      //   routes: [
      //     {
      //       layout: "dashboard",
      //       path: "/secciones",
      //       name: "Mis Reportes",
      //       sidebar: "single",
      //       ver: "MENU-VER",
      //       routes: [
      //         {
      //           path: "/",
      //           element: Reportes,
      //         },
      //         {
      //           path: "/agregar",
      //           name: "Agregar",
      //           element: ReportesDetalle,
      //         },
      //         {
      //           name: "Editar",
      //           path: "/detalle",
      //           element: ReportesDetalle,
      //         },
      //       ],
      //     },
      //     {
      //       layout: "dashboard",
      //       path: "/seccionesTest",
      //       name: "Otra",
      //       sidebar: "single",
      //       ver: "MENU-VER",
      //       routes: [
      //         {
      //           path: "/",
      //           element: Reportes,
      //         },
      //         {
      //           path: "/agregar",
      //           name: "Agregar",
      //           element: ReportesDetalle,
      //         },
      //         {
      //           name: "Editar",
      //           path: "/detalle",
      //           element: ReportesDetalle,
      //         },
      //       ],
      //     }          
      //   ],
      // },
    ],
  },
  ...sharedRoutes,
];

const publicRoutes = [...sharedRoutes];

export { dashboardRoutes, publicRoutes };
