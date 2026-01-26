import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { I18nProvider } from "../app/i18n/i18nProvider";
import { LayoutProvider, LayoutSplashScreen } from "../app/layout/core";
import { MasterInit } from "../app/layout/MasterInit";
import { AuthInit } from "./modules/auth";
import "react-circular-progressbar/dist/styles.css";
import SystemsProvider from "./providers/systems-provider";
import { UserProvider } from "@npm-react/react-redux-routing";
import ToolBoxProvider from "./providers/tool-box-provider";
import DepartmentsEntityProvider from "./providers/departments-entity-provider";
import { Provider } from "react-redux";
import store from "./store/store";
const App = () => {
  const I18N_CONFIG_KEY =
    (window as any)._env_?.REACT_APP_I18N_CONFIG_KEY || "i18nConfig";
  if (localStorage.getItem("i18nConfig") == null) {
    localStorage.setItem(
      I18N_CONFIG_KEY,
      JSON.stringify({ selectedLang: "ar" })
    );
    localStorage.setItem("selectedLang", "Ar");
    window.location.reload();
  }
  useEffect(() => {
    const userLanguage = navigator.language.split("-")[0];
    document.documentElement.lang = userLanguage;
  }, []);

  return (
    <Provider store={store}>
      <Suspense fallback={<LayoutSplashScreen />}>
        <I18nProvider>
          <UserProvider>
            <SystemsProvider>
              <ToolBoxProvider>
                <DepartmentsEntityProvider>
                  <LayoutProvider>
                    <AuthInit>
                      <Outlet />
                      <MasterInit />
                    </AuthInit>
                  </LayoutProvider>
                </DepartmentsEntityProvider>
              </ToolBoxProvider>
            </SystemsProvider>
          </UserProvider>
        </I18nProvider>
      </Suspense>
    </Provider>
  );
};

export { App };
