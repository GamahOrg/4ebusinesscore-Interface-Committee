import "./App.css";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import { QueryClient, QueryClientProvider } from "react-query";
import { MetronicI18nProvider } from "./app/i18n/Metronici18n";
import "./app/assets/sass/style.scss";
import "./app/assets/sass/style.react.scss";
import { AppRoutes } from "./app/routing/AppRoutes";
import {
  AuthProvider,
  setupAxios,
  ToolbarProvider,
} from "@npm-react/react-redux-routing";
import { useEffect, useState } from "react";

setupAxios(axios);

Chart.register(...registerables);

const queryClient = new QueryClient();

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("Theme") || "light");

  useEffect(() => {
    if (theme === "light") {
      import(`./app/assets/sass/style${theme === "light" ? "" : "dark"}.scss`)
        // .then(() => {
        //   localStorage.setItem("Theme", "light");
        // })
        .catch((error) => {
          console.error("Error importing SCSS:", error);
        });
    } else {
      import(`./app/assets/sass/style.${theme === "dark" ? "dark" : ""}.scss`)
        // .then(() => {
        //   localStorage.setItem("Theme", "dark");
        // })
        .catch((error) => {
          console.error("Error importing SCSS:", error);
        });
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <MetronicI18nProvider>
        <AuthProvider>
          <ToolbarProvider>
            <div>
              <AppRoutes />
              {/* <GatewayRoutes /> */}
            </div>
          </ToolbarProvider>
        </AuthProvider>
      </MetronicI18nProvider>
    </QueryClientProvider>
  );
}

export default App;
