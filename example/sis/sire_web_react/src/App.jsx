import React from "react";
import { ConfigProvider } from "antd";
import { HelmetProvider } from "react-helmet-async";
import { AppProvider, AuthProvider, AlertProvider } from "./hooks";
import { AppRouting } from "./routers";
import esES from "antd/lib/locale/es_ES";
import 'dayjs/locale/es-mx'

function App() {
  return (
    <ConfigProvider
      locale={esES}
      theme={{
        components: {
          Layout: {
            headerBg: "#732d2d",
            headerColor: "#ffffff",
          },
          Menu: {
            itemSelectedColor: "rgb(255, 255, 255)",
            itemHoverBg: "rgba(255, 255, 255, 0.06)",
            itemBg: "#732d2d",
            itemColor: "rgb(255, 255, 255)",
            itemHoverColor: "rgb(255, 255, 255)",
          },
        },
        token: {
          colorPrimary: "#732d2d",
          borderRadius: 5,
        },
      }}
    >
      <HelmetProvider>
        <AppProvider>
          <AlertProvider>
            <AuthProvider>
              <AppRouting />
            </AuthProvider>
          </AlertProvider>
        </AppProvider>
      </HelmetProvider>
    </ConfigProvider>
  );
}

export default App;
