import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";

interface Iprop {
  id: any;
  title: string;
  link: string;
  icon: any;
  color: string;
  transition: string;
}

const PmoSystemTools: FC<Iprop> = ({
  id,
  title,
  link,
  icon,
  transition,
  color,
}) => {
  const intl = useIntl();
  return (
    <div id={id} className="d-flex flex-column me-2 me-lg-5">
      <Link
        to={link}
        className={
          "text-gray-600 fw-bold fs-6 fs-lg-4 mb-1 " +
          (transition === "text-hover-warning"
            ? "text-hover-warning"
            : transition === "text-hover-primary"
            ? "text-hover-primary"
            : transition === "text-hover-info"
            ? "text-hover-info"
            : transition === "text-hover-gblue"
            ? "text-hover-gblue"
            : transition === "text-hover-success"
            ? "text-hover-success"
            : transition === "text-hover-danger"
            ? "text-hover-danger"
            : "")
        }
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
        {intl.formatMessage({ id: title })}
      </Link>
    </div>
  );
};

export { PmoSystemTools };
