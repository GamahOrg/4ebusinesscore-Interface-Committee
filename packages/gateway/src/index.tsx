import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CustomErrorBoundry from "./app/routing/CustomErrorBoundry";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <CustomErrorBoundry>
    <App />
  </CustomErrorBoundry>,
);

reportWebVitals();
