/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { useLayout } from "../core";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { PlatformRootUrl } from "@4eplatform/shared/apis/system_setting";

const Footer: FC = () => {
  const intl = useIntl();
  const { classes } = useLayout();

  const getLocalStorageTheme = () => {
    if (localStorage?.getItem("Theme")) {
      return localStorage?.getItem("Theme");
    }
    return;
  };

  let platforms = useSelector((state: RootState) => {
    return state?.Platform?.data;
  });

  return (
    <div className="footer py-4 d-flex flex-lg-column" id="kt_footer">
      {/* begin::Container */}
      <div
        className={`${classes.footerContainer} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        {/* begin::Copyright */}
        <div className="text-dark order-2 order-md-1">
          <a
            href="https://rega.gov.sa/"
            target="_blank"
            className="text-gray-800 text-hover-primary"
          >
            {intl.locale === "ar"
              ? platforms?.footerDescriptionAr
              : platforms?.footerDescriptionEn}{" "}
          </a>
          <span className="text-muted fw-bold me-2">
            &copy; {new Date().getFullYear()}{" "}
          </span>
        </div>
        <div className="text-dark order-2 order-md-1">
          <img
            alt="Logo"
            src={
              getLocalStorageTheme() === "dark"
                ? `${PlatformRootUrl}${platforms?.footerLogoDarkMode}`
                : `${PlatformRootUrl}${platforms?.footerLogo}`
            }
            className=" h-lg-45px h-md-50px h-sm-50px h-35px"
          />
        </div>
      </div>
      {/* end::Container */}
    </div>
  );
};

export { Footer };
