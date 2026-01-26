import { Route, Routes } from "react-router";
import { NotificationsDetails } from "./app/pages/notifications/notifications-details";
import { Provider } from "react-redux";
import store from "./app/store/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/notifications-details"
          element={<NotificationsDetails />}
        />
      </Routes>
    </Provider>
  );
}

export default App;
