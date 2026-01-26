import React, { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
// import { fetchPlatform } from "../../../../app/slices/platform-slice/platform-slice";
import { PlatformRootUrl } from "@4eplatform/shared/apis/system_setting";
import { RootState } from "../../../store/store";

function LoginLogoSide() {
  const intl = useIntl();
  const dispatch = useDispatch();
  let websiteTitle = localStorage.getItem("websiteTitle");
  let websiteDescription = localStorage.getItem("websiteDescription");

  // useEffect(() => {
  //   dispatch(fetchPlatform() as any);
  // }, [dispatch]);

  let platforms:any = useSelector((state: RootState) => {
    return state?.Platform?.data;
  });
  useEffect(() => {
    document.title = platforms?.webTitle;
    let metaDescription = document.querySelector('meta[name="description"]');
    if(metaDescription){
      metaDescription?.setAttribute("content", platforms?.webDescription);
    }
    let websiteLogo = document.querySelector('link[rel="shortcut icon"]');
    if(websiteLogo){
      websiteLogo?.setAttribute(
        "href",
        platforms?.iconTitle != ""
          ? `${PlatformRootUrl}${platforms?.iconTitle}`
          : ""
      );
    }
  }, [platforms]);

  return (
    <Fragment>
      {/* <div className="d-flex flex-column flex-center w-100">
        <div className="text-white fw-bolder text-center mb-7 d-flex align-items-center "> */}
      <div className="d-flex flex-column flex-center w-100">
        <div
          className="start-0 p-3"
          style={{ top: "-293px" }}
        >
          {/* {intl.locale == "ar" ? ( */}
          <img
            alt="Logo"
            src={
              platforms?.logoWebCoverLogin &&
                platforms?.logoWebCoverLogin !== " " &&
                platforms?.logoWebCoverLogin !== "null"
                ? `${PlatformRootUrl}${platforms?.logoWebCoverLogin}`
                // : toAbsoluteUrl("/media/theme-img/logo-login-ar.png")
                :""
            }
            className="logo-default  h-lg-150px h-sm-100 w-100"
          />
          {/* ) : (
            <img
              alt="Logo"
              src={toAbsoluteUrl("/media/theme-img/logo-login-en.png")}
              className="logo-default  h-lg-300px h-sm-100 w-100"
            />
          )} */}
        </div>
        {/*<div className="text-white fw-bolder text-center mb-7   rega-login-text">
          الهيئة العامة للعقار
           </div>*/}
      </div>
    </Fragment>
  );
}

export default LoginLogoSide;
