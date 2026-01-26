import React, { FC } from "react";
import { Link } from "react-router-dom";

interface Iprop {
  id: any;
  title: string;
  link: string;
  icon: any;
  color: string;
}

const PmoMyTools: FC<Iprop> = ({ id, title, link, icon, color }) => (
  <div id={id} className="d-flex align-items-center mb-7">
    <div className="d-flex flex-stack flex-grow-1 me-5 ms-lg-6">
      <div className="d-flex flex-column me-2 me-lg-5">
        <Link
          to={link}
          className="text-gray-600 text-hover-primary fw-bold fs-6 fs-lg-4 mb-1"
        >
          <span
            className={
              "svg-icon svg-icon-2x me-5 " +
              (color === "svg-icon-warning"
                ? "svg-icon-warning"
                : color === "svg-icon-primary"
                ? "svg-icon-primary"
                : color === "svg-icon-info"
                ? "svg-icon-info"
                : color === "svg-icon-gblue"
                ? "svg-icon-gblue"
                : color === "svg-icon-success"
                ? "svg-icon-success"
                : color === "svg-icon-danger"
                ? "svg-icon-danger"
                : "") +
              (color === "text-warning"
                ? "text-warning"
                : color === "text-primary"
                ? "text-primary"
                : color === "text-info"
                ? "text-info"
                : color === "text-gblue"
                ? "text-gblue"
                : color === "text-success"
                ? "text-success"
                : color === "text-danger"
                ? "text-danger"
                : "")
            }
          >
            {icon}
          </span>
          {title}
        </Link>
      </div>
      <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-lg">
        <input
          id="missionsCardShowItemInput"
          className="form-check-input widget-9-check xCheckBg"
          type="checkbox"
          value="1"
          checked={true}
        />
      </div>
    </div>
  </div>
);

export { PmoMyTools };
