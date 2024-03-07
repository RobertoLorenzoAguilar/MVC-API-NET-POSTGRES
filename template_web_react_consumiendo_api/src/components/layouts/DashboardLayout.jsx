import React from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Row,
  Col,
  Grid,
  Typography,
  Divider,
} from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../hooks";
import { dashboardRoutes } from "../../routers";
import { Helmet } from "react-helmet-async";
import "./DashboardLayout.css";
import UsuarioHeader from "../UsuarioHeader";

const { Header, Content, Sider, Footer } = Layout;
const rootSubmenuKeys = [""];

const nombrePagina = import.meta.env.VITE_NOMBRE_PAGINA;
const version = import.meta.env.VITE_API_VERSION;

const { useBreakpoint } = Grid;

const DashboardLayout = ({ children }) => {
  // const themeMode = "dark";
  const navigate = useNavigate();
  const location = useLocation();
  const { userLoading, signOut, session, user } = useAuth();

  const [collapsed, setCollapsed] = React.useState(false);
  const [openKeys, setOpenKeys] = React.useState([""]);
  const [selectedKey, setSelectedKey] = React.useState("");
  const [breadcrumbItems, setBreadcrumbItems] = React.useState([]);
  const [titulo, setTitulo] = React.useState("");

  const pantalla = useBreakpoint();

  const dashStyles = {
    logoCollapsed: {
      height: 48,
      margin: 6,
      backgroundSize: "contain",
      backgroundPosition: "center center",
      transition: "opacity 1s ease-in-out",
      backgroundRepeat: "no-repeat",
    },
    logo: {
      height: 65,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      transition: "opacity 1s ease-in-out",
    },
    header: {
      padding: 0,
    },
    trigger: {
      color: "white",
      paddingLeft: 10,
    },
    breadcrumb: {
      display: "flex",
      alignItems: "center",
      marginLeft: 5,
      height: "100%",
    },
    user: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingRight: 10,
    },
    footer: {
      textAlign: "center",
    },
  };

  const items = [
    {
      key: "1",
      label: (
        <>
          <Typography.Text strong>{user?.nombre}</Typography.Text>
          <Divider style={{ margin: 0 }} />
        </>
      ),
    },
    {
      key: "2",
      label: <Link to="/perfil">Configuración del perfil</Link>,
      icon: <SettingOutlined />,
    },
    {
      key: "3",
      danger: true,
      label: "Cerrar sesión",
      icon: <LoginOutlined />,
      onClick: () => signOut(),
    },
  ];

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const sidebarMapper = (route) => {
    // let puedeVer = user?.permisos?.find((permiso) => permiso === route?.ver);
    let puedeVer = true;
    if (puedeVer) {
      if (route.sidebar === "single") {
        return {
          key: route.path,
          icon: route.icon,
          label: route.name,
          onClick: () => {
            setSelectedKey(route.path);
            navigate(route.path);
          },
        };
      } else if (route.sidebar === "collapse") {
        const innerMap = (r) => ({ ...r, path: route.path + r.path });
        const finalKey = "collapse-" + route.path;
        return {
          key: finalKey,
          icon: route.icon,
          label: route.name,
          children: route.routes.map(innerMap).map(sidebarMapper),
        };
      }
    }
    return null;
  };

  React.useEffect(() => {
    const rutasBreadCrumbs = (
      rutasOrig,
      rutaDividida,
      indice = 0,
      ruta = ""
    ) => {
      let rutas = [];
      let path = "";
      if (indice === 0) {
        return rutasBreadCrumbs(rutasOrig, rutaDividida, indice + 1);
      }
      if (indice > rutaDividida.length - 1) {
        return rutas;
      }
      if (rutaDividida.length >= indice + 1 && rutaDividida[indice] !== "") {
        path = rutasOrig?.find(
          (r) => r?.path?.indexOf(rutaDividida[indice]) !== -1
        );
        if (path !== undefined) {
          ruta += path?.path;
          rutas.push({
            name: path?.name,
            to: ruta,
            icon: path?.icon,
          });
        }
        rutas = [
          ...rutas,
          ...rutasBreadCrumbs(path?.routes, rutaDividida, indice + 1, ruta),
        ];
      }
      return rutas;
    };

    let rutas = [
      { name: "Inicio", to: "/", icon: <HomeOutlined /> },
      ...rutasBreadCrumbs(dashboardRoutes, location?.pathname?.split("/")),
    ];

    setTitulo(rutas[rutas?.length - 1]?.name);
    setBreadcrumbItems(rutas);
  }, [location?.pathname]);

  React.useEffect(() => {
    const flatter = (r) =>
      r?.routes
        ? [
            r,
            ...r?.routes
              .map((sub) => ({ ...sub, path: r.path + sub.path }))
              .flatMap(flatter),
          ]
        : r;
    const flatted = dashboardRoutes.flatMap(flatter);
    const paths = flatted.map((r) => r.path);
    const key = paths.find((path) => path === location?.pathname);
    setSelectedKey(key);
    const tmpOpenKeys = flatted
      .filter(
        (r) => r.sidebar === "collapse" && location?.pathname.includes(r.path)
      )
      .map((r) => "collapse-" + r.path);
    setOpenKeys(tmpOpenKeys);
  }, [location]);

  if (!session && userLoading) return null;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Helmet>
        <title>
          {nombrePagina} - {titulo || ""}{" "}
        </title>
      </Helmet>
      <Sider
        style={{ backgroundColor: "#5e636e" }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={200}
      >
        {/* Aquí van los logos. Cambiar Colapsado */}
        <div style={collapsed ? dashStyles.logoCollapsed : dashStyles.logo} />
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={selectedKey}
          items={[
            ...dashboardRoutes.map(sidebarMapper),
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Cerrar sesión",
              onClick: () => signOut(),
            },
          ]}
          className="layout-menu"
        />
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={dashStyles.header}>
          <Row justify={"space-between"}>
            <Col>
              <Row>
                <Col>
                  <Button
                    type="link"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    style={dashStyles.trigger}
                    onClick={() => setCollapsed(!collapsed)}
                  />
                </Col>
                <Col>
                  <Breadcrumb
                    separator={
                      <p style={{ margin: 0, color: "white" }}>{">"}</p>
                    }
                    style={dashStyles.breadcrumb}
                    items={breadcrumbItems?.map((item, index) => ({
                      title: pantalla?.md ? (
                        <Link to={item?.to} style={{ color: "white" }}>
                          {item?.icon}
                          <Typography.Text
                            style={{ marginLeft: 5, color: "white" }}
                          >
                            {item?.name}
                          </Typography.Text>
                        </Link>
                      ) : (
                        <Link to={item?.to}>{item?.icon}</Link>
                      ),
                    }))}
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <UsuarioHeader usuario={user} menu={{ items }} />
            </Col>
          </Row>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: 10,
            minHeight: 280,
          }}
          children={children}
        />
        <br />
        <Footer style={dashStyles.footer}>
          {version} - &copy; Derechos reservados.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
