import Swal from "sweetalert2";
import { SystemLang } from "@4eplatform/shared/assets/Lang";

let timer: ReturnType<typeof setTimeout>;

const autoLogout = (timeoutInSeconds: number) => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    let isLangAraic = SystemLang() == "ar";

    if (localStorage.getItem("hasSeenPopup") !== "true") {
      Swal.fire({
        title: isLangAraic ? "لقد انتهت فتره صلاحيه الدخول" : "Session Expired",
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
    localStorage.removeItem("bg_theme");
    localStorage.removeItem("temporaryWebsiteCover");
    localStorage.removeItem("websiteCover");
    localStorage.removeItem("Theme");
    localStorage.removeItem("selectedLang");
    localStorage.removeItem("i18nConfig");
    localStorage.removeItem("i18nextLng");

    setTimeout(() => {
      (window as any)._env_?.NODE_ENV !== "production"
        ? (window.location.href = "/committee/auth/login")
        : (window.location.href =
            (window as any)._env_?.REACT_APP_Base_Url ?? "/");
    }, 2000);

    if (localStorage.getItem("hasSeenPopup") === "true") return;
  }, timeoutInSeconds * 1000);
};

export default autoLogout;
