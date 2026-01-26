import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

interface WorkspaceToolbarProps {
  title?: string;
  icon?: React.ReactNode;
  setSearchValue: (value: string) => void;
  count?: number;
}
export const WorkspaceToolbar = ({
  title,
  icon,
  setSearchValue,
  count,
}: WorkspaceToolbarProps) => {
  const intl = useIntl();

  return (
    <div
      id="kt_toolbar_container"
      className="container-xxl p-0 d-flex flex-stack flex-wrap p-0"
    >
      <div className="d-flex">
        {icon}
        <div className="page-title d-flex flex-column me-3">
          <h1 className="d-flex text-white fw-bold my-1 fs-3">
            {intl.formatMessage({ id: "Workspace" })}
          </h1>
          <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
            <li className="breadcrumb-item text-white opacity-75">
              <div
                className="text-white"
              >
                {intl.formatMessage({ id: "Home" })}
              </div>
            </li>
            <li className="breadcrumb-item">
              <span className="bullet bg-white opacity-75 w-5px h-2px"></span>
            </li>
            <li className="breadcrumb-item text-white opacity-75">
              {intl.formatMessage({ id: "Workspace" })}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
