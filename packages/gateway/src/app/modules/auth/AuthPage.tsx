/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useIntl } from "react-intl";
// import { Registration } from "./components/Registration";
import { ForgotPassword } from "./components/ForgotPassword";
import { Login } from "./components/Login";
import { ConfirmSignup } from "./components/ConfirmSignup";
import { toAbsoluteUrl } from "../../../app/helpers";
import { useLang } from "../../i18n/Metronici18n";
import axios from "axios";
import { PlatformModel } from "../../models/platform/platform-model";
import { fetchPlatform } from "../../features/platform-settings/platformSettings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { PlatformRootUrl } from "@4eplatform/shared/apis/system_setting";

const AuthLayout = () => {
  const intl = useIntl();
  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  const lang = useLang();
  // let platFormRootUrl=`${(window as any)._env_?.REACT_APP_API_Base_Url}/5196`
  // let [platformsettings,setPlatformSettings]=useState<PlatformModel>(new PlatformModel("","","","","","","",new Date(),new Date()))
  // useEffect(()=>{
  //   axios.get(`${(window as any)._env_?.REACT_APP_API_Base_Url}/5196/api/platformSettings/getPlatformSettingsMainInfo`)
  //     .then(response => {
  //       setPlatformSettings(response?.data);
  //       localStorage.setItem("websiteTitle",response?.data?.webTitle)
  //       localStorage.setItem("websiteDescription",response?.data?.webDescription)
  //     })
  // },[])

  useEffect(() => {
    if (lang === "ar") {
      //require('../../assets/sass/core/layout/ar/_base_ar.scss')
      // @ts-ignore
      require("../../assets/sass/core/layout/ar/_base_ar.scss");
      require("../../assets/sass/core/layout/Theme/_theme_style.scss");
    } else if (lang === "en") {
      require("../../assets/sass/core/layout/Theme/_theme_style.scss");
    }
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchPlatform({
        subSystemId: "2a91709a-c08b-464d-8906-ae84a82d53f9",
      }) as any
    );
  }, [dispatch]);

  let platforms = useSelector((state: RootState) => {
    return state?.Platform?.data;
  });

  return (
    <div className="auth-bg bgi-size-cover h-100 bgi-attachment-fixed bgi-position-center">
      {/* begin::Content */}
      <div
        className={`flex-column flex-column-fluid ${
          (platforms?.signInMode === 0 ||
            platforms?.signInMode == null ||
            platforms?.signInMode == undefined) &&
          "w-100 h-100 "
        } login-page`}
      >
        {/* begin::Wrapper */}
        <div
          className={`rounded ${
            (platforms?.signInMode === 0 ||
              platforms?.signInMode == null ||
              platforms?.signInMode == undefined) &&
            "w-100 h-100 "
          } `}
        >
          <Outlet />
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
    </div>
  );
};

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      {/* <Route path="registration" element={<Registration />} /> */}
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="ConfirmSignup" element={<ConfirmSignup />} />
      <Route index element={<Login />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Route>
  </Routes>
);

export default AuthPage;
