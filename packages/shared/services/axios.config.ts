import { getToken, getWorkspaceKey } from "@4eplatform/shared/index";
import axios, { AxiosRequestHeaders } from "axios";
import Swal from "sweetalert2";
import { SystemLang } from "@4eplatform/shared/assets/Lang";
import autoLogout from "./../services/LogoutTimer";
const createAxiosInstance = (baseURL: string) => {
  const App_Key = "SECRET-FRONT-15251-KEY-HEADER";

  const instance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "X-APP-KEY": App_Key,
      "Accept-Language": SystemLang() === "en" ? "en-us" : "ar",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders;
      }
      config.headers["workspaceKey"] = getWorkspaceKey() ?? 0;
      autoLogout(28800);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const statusCode = error?.response?.status;
      let isLangAraic = SystemLang() == "ar";
      if (statusCode === 401) {
        // ✅ Write the flag immediately to avoid race condition
        localStorage.setItem("hasSeenPopup", "true");

        if (localStorage.getItem("hasSeenPopup") !== "true") {
          Swal.fire({
            title: isLangAraic ? "لقد انتهت صلاحيه الدخول" : "Session Expired",
            text: isLangAraic ? "من فضلك أعد تسجبل الدخول" : "Please Relogin",
            icon: "warning",
            showConfirmButton: false,
          });
        }

        localStorage.setItem("user", "");
        localStorage.setItem("hasSeenPopup", "false");
        localStorage.removeItem("userId");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        localStorage.removeItem("changedTemporary");

        setTimeout(() => {
          (window as any)._env_?.NODE_ENV !== "production"
            ? (window.location.href = "/committee/auth/login")
            : (window.location.href =
                (window as any)._env_?.REACT_APP_Base_Url ?? "/");
        }, 2000);

        if (localStorage.getItem("hasSeenPopup") === "true") return;
      } else if (statusCode === 403) {
        Swal.fire({
          title: isLangAraic
            ? "ليس لديك صلاحيه وصول للصفحه الحاليه"
            : "You Have No Permmision For Current Page",
          icon: "warning",
          showConfirmButton: false,
        });
      } else if (statusCode === 400) {
        // Swal.fire({
        //   // title: isLangAraic
        //   //   ? "بعض الحقول مطلوبه"
        //   //   : "Some fields are required",
        //   title:"Bad Request",
        //   icon: "warning",
        //   showConfirmButton: false,
        // });
      } else if (statusCode === 413) {
        Swal.fire({
          title: isLangAraic
            ? "حجم البيانات المرسله كبير جدا"
            : "Data Size Is Too Large",
          icon: "error",
          showConfirmButton: false,
        });
      } else {
        return Promise.reject(error);
      }
      return Promise.resolve(error.response);
    }
  );

  return instance;
};

export default createAxiosInstance;
