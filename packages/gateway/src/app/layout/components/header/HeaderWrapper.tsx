/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import { useEffect, useState } from "react";
import { KTSVG } from "../../../helpers";
import { useLayout } from "../../core";
import { Header } from "./Header";
import { DefaultTitle } from "./page-title/DefaultTitle";
import { Topbar } from "./Topbar";

export function HeaderWrapper() {
  const { config, classes, attributes } = useLayout();
  const { header, aside } = config;
  const [show, setShow] = useState(false);
  const [isSideBar, setIsSideBar] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsSideBar(false);
        document.body.classList.remove("aside-enabled");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id="kt_header"
      className={clsx(
        "header",
        classes.header.join(" "),
        "align-items-stretch",
      )}
      {...attributes.headerMenu}
    >
      <div className="container-xxl d-flex align-items-center">
        {aside.display && (
          <div
            className="d-flex align-items-center d-lg-none ms-n3 me-1"
            title="Show aside menu"
          ></div>
        )}

        <div
          className="d-flex topbar align-items-center d-lg-none ms-n2 me-3"
          title="Show aside menu"
        >
          <div
            className="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
            id="kt_header_menu_mobile_toggle"
            onClick={() => {
              setIsSideBar((prev) => !prev);
            }}
          >
            <KTSVG
              path="/media/icons/duotune/abstract/abs015.svg"
              className="svg-icon-2x"
            />
          </div>
        </div>

        <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
          {header.left === "menu" && (
            <div className="d-flex align-items-stretch" id="kt_header_nav">
              <Header show={show} isSideBar={isSideBar} />
            </div>
          )}

          {header.left === "page-title" && (
            <div className="d-flex align-items-center" id="kt_header_nav">
              <DefaultTitle />
            </div>
          )}

          <div className="d-flex align-items-stretch flex-shrink-0">
            <Topbar show={show} handleShow={() => setShow(!show)} />
          </div>
        </div>
      </div>
    </div>
  );
}
