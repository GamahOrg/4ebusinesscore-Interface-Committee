import clsx from "clsx";
import React, { FC } from "react";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { useLayout } from "../../core";
import { DefaultTitle } from "../header/page-title/DefaultTitle";

const Toolbar1: FC = () => {
  const { classes } = useLayout();

  return (
    <div className="toolbar py-5 py-lg-15" id="kt_toolbar">
      <div id="kt_toolbar_container" className={clsx(classes.toolbarContainer.join(" "), "d-flex flex-stack")}>
        <DefaultTitle />
        <div className="d-flex align-items-center py-1">
          <div className="me-4">
            <a href="#" className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-primary fw-bolder" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">
              <KTSVG path="/media/icons/duotune/general/gen031.svg" className="svg-icon-5 svg-icon-gray-500 me-1" />
              Filter
            </a>
          </div>
          <a href="#" className="btn btn-bg-white btn-active-color-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_create_app" id="kt_toolbar_primary_button">
            Create
          </a>
        </div>
      </div>
    </div>
  );
};

export { Toolbar1 };
