/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from "react";
import { Languages } from "./Languages";
import { useIntl } from "react-intl";
import { useUser } from "../../../providers/user-provider";
import { setWorkspaceKey } from "@4eplatform/shared/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { fetchUserLogin } from "../../../features/user/user-login-slice";

type MenuProps = {
  show?: any;
  handleShow?: any;
};
const HeaderUserMenu: FC<MenuProps> = ({ show, handleShow }) => {
  let { logoutUser } = useUser();
  const isDev = (window as any)._env_?.NODE_ENV === "development";

  const intl = useIntl();
  let [active, setActive] = useState(false);
  let navigate = useNavigate();

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserLogin("") as any).then((res: any) => {
      localStorage.setItem("userId", res?.payload?.result?.id);
      localStorage.setItem("userInfo", JSON.stringify(res?.payload?.result));
    });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("Theme")) {
      setActive(false);
    } else {
      setActive(localStorage.getItem("Theme") == "dark" ? true : false);
    }
  }, [localStorage.getItem("Theme")]);

  let count = useSelector((state: RootState) => {
    return state?.requests?.requestCount;
  });

  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
      data-kt-menu="true"
    >
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="d-flex flex-column">
            <a
              href="#"
              className="fw-bold text-muted text-hover-primary fs-7"
            ></a>
          </div>
        </div>
      </div>

      <div className="menu-item px-5">
        <div
          onClick={() => {
            setWorkspaceKey(89);
            window.open(
              (window as any)._env_?.REACT_APP_Base_Url + "/user-profile",
              "_self",
            );
          }}
          className="menu-link px-5"
        >
          {intl.formatMessage({ id: "MyProfile" })}
        </div>

        <div
          className="menu-link px-5 gap-1"
          onClick={() => {
            setWorkspaceKey(89);
            window.open(
              (window as any)._env_?.REACT_APP_Base_Url +
                "/user-profile/requests",
              "_self",
            );
          }}
        >
          <span className="menu-text">
            {" "}
            {intl.formatMessage({ id: "MyTickets" })}
          </span>
          <span className="menu-badge">
            <span className="badge badge-light-danger badge-circle fw-bolder fs-7 mx-2">
              {count?.totalCountRequestInstances
                ? count?.totalCountRequestInstances
                : 0}
            </span>
          </span>
        </div>
      </div>

      <Languages />

      <div className="menu-item px-5 dropDown__nav">
        <a
          onClick={async () => {
            localStorage.removeItem("bg_theme");
            localStorage.removeItem("temporaryWebsiteCover");
            localStorage.removeItem("websiteCover");
            localStorage.removeItem("userId");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("Theme");
            localStorage.removeItem("selectedLang");
            localStorage.removeItem("i18nConfig");
            localStorage.removeItem("i18nextLng");
            localStorage.removeItem("token");
            localStorage.removeItem("changedTemporary");
            localStorage.removeItem("session_handling_in_progress");

            logoutUser();
            window.location.reload();
            localStorage.setItem("hasSeenPopup", "false");
            isDev && navigate("/auth/login");
          }}
          className="menu-link px-5 dropDown__nav"
          role="button"
          href="#"
        >
          {intl.formatMessage({ id: "SignOut" })}
        </a>
      </div>
    </div>
  );
};

export { HeaderUserMenu };
