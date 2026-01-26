import clsx from "clsx";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import { WorkspaceDropdown } from "./WorkspaceDropdown";
import { Fragment, useEffect, useRef, useState } from "react";
import { setWorkspaceKey } from "@4eplatform/shared/index";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

type MenuProps = {
  show?: any;
  isSideBar?: boolean;
};
export function MenuInner<MenuProps>({ show }: any) {
  const intl = useIntl();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [showSolutions, setShowSolutions] = useState<boolean>(false);
  let location = useLocation();
  const dropdownRef: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  let platforms = useSelector((state: RootState) => {
    return state?.Platform?.data;
  });

  return (
    <>
      {platforms?.mainSettingHeaders &&
        platforms?.mainSettingHeaders?.length > 0 &&
        platforms?.mainSettingHeaders?.map((header, index: number) => (
          <Fragment key={index}>
            {index === 0 && (
              <div className="menu-item me-lg-1">
                {" "}
                <Link
                  to={{ pathname: header.url }}
                  className="menu-link py-3"
                  onClick={() => {
                    setShowDropDown(false);
                    setShowSolutions(false);
                  }}
                >
                  <span className="menu-title">
                    {intl.locale === "ar" ? header.nameAr : header.nameEn}
                  </span>
                </Link>
              </div>
            )}
            {index === 1 && !header.isHide && (
              <>
                <div
                  className={clsx(
                    `menu-item-special me-lg-1 ${show ? "d-block" : "d-none"}`,
                  )}
                >
                  {location.pathname == "/anonymous-workspace" ? (
                    <>
                      <a
                        onClick={() => {
                          setModalShow(true);
                        }}
                      >
                        <span className="menu-title">
                          {intl.locale === "ar" ? header.nameAr : header.nameEn}
                        </span>
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        className={clsx("menu-link py-3")}
                        data-kt-menu-trigger={show ? "click" : ""}
                        data-kt-menu-attach="parent"
                        data-kt-menu-placement="bottom-end"
                        data-kt-menu-flip="bottom"
                      >
                        <span className="menu-title">
                          {intl.locale === "ar" ? header.nameAr : header.nameEn}
                        </span>
                      </a>
                    </>
                  )}
                  <WorkspaceDropdown />
                </div>
              </>
            )}

            {index > 2 && !header.isHide && (
              <div className="menu-item me-lg-1">
                <a
                  href={process.env.REACT_APP_Base_Url + header?.url}
                  className="menu-link py-3"
                  onClick={() => {
                    if (header.workspaceKey !== 0)
                      setWorkspaceKey(header.workspaceKey);
                    setShowDropDown(false);
                    localStorage.setItem(
                      "cardName",
                      JSON.stringify({
                        nameAr: header.url.includes("organization-profile")
                          ? "عرض التعريف بالهيئة"
                          : header.nameAr,
                        nameEn: header.url.includes("organization-profile")
                          ? "View Definition the authority"
                          : header.nameEn,
                      }),
                    );
                  }}
                >
                  <span className="menu-title">
                    {intl.locale === "ar" ? header.nameAr : header.nameEn}
                  </span>
                </a>
              </div>
            )}
          </Fragment>
        ))}
    </>
  );
}
