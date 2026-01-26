import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

interface Iprop {
  id: number;
  name: string;
  dept: string;
  title: string;
  count: string;
  lastUpdate: string;
  lastLogin: string;
  link: string;
  icon: any;
  color: string;
  background: string;
  isShow: boolean;
  getFavouritesList?: any;
  setFavouritesList?: any;
  favorite?: any;
  setFavourite?: any;
  handleHideTable?: any;
  handleFavouriteTable?: any;
}

const WorkspaceTable: FC<Iprop> = ({
  id,
  name,
  dept,
  title,
  count,
  lastUpdate,
  lastLogin,
  link,
  icon,
  color,
  background,
  isShow,
  getFavouritesList,
  setFavouritesList,
  favorite,
  setFavourite,
  handleHideTable,
  handleFavouriteTable,
}) => {
  const intl = useIntl();
  let [hide, setHide] = useState(false);
  const handleInputChange = (id: any) => {
    setFavourite((prevFavorite: any) => {
      return prevFavorite.map((item: any) => {
        if (item.hasOwnProperty(`id${id}`)) {
          return { [`id${id}`]: !item[`id${id}`] };
        }
        return item;
      });
    });
  };

  const [pageSize, setPageSize] = useState(8);
  const [pageNumber, setPageNumber] = useState(1);
  return (
    <>
      {isShow && (
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <div className="me-5 position-relative">
                <div className="symbol symbol-50px">
                  <span
                    className={
                      "symbol-label " +
                      (background === "bg-light-warning"
                        ? "bg-light-warning"
                        : background === "bg-light-primary"
                          ? "bg-light-primary"
                          : background === "bg-light-info"
                            ? "bg-light-info"
                            : background === "bg-light-gblue"
                              ? "bg-light-gblue"
                              : background === "bg-light-success"
                                ? "bg-light-success"
                                : background === "bg-light-danger"
                                  ? "bg-light-danger"
                                  : "")
                    }
                  >
                    <span
                      className={
                        "svg-icon svg-icon-3x " +
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
                                    : "")
                      }
                    >
                      {icon}
                    </span>
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <Link to={link} className="mb-1 text-gray-800 text-hover-info">
                  {title}
                </Link>
                <div className="fw-bold fs-6 text-gray-400">{name}</div>
              </div>
            </div>
          </td>
          <td>{dept}</td>
          <td>{lastUpdate}</td>
          <td>{lastLogin}</td>
          <td className="text-end">
            <Link to={link} className="btn btn-light btn-sm me-2">
              {intl.formatMessage({ id: "Show" })}
            </Link>
            <button
              type="button"
              className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
              data-bs-toggle="dropdown"
              data-bs-placement="bottom-end"
            >
              <span className="svg-icon svg-icon-2">
                <KTSVG path="/media/icons/duotune/general/gen074.svg" />
              </span>
            </button>
            <div className="dropdown-menu dropdown-menu-end w-200px w-md-200px">
              <div className="px-7 py-5">
                <div className="fs-5 text-dark fw-bolder d-flex justify-content-start">
                  {" "}
                  {intl.formatMessage({ id: "Properties" })}
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <div className="p-4">
                <div className="mb-5">
                  <div className="">
                    <label className="form-check form-check-sm form-check-custom form-check-solid">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={favorite[`id${id}`]}
                        onChange={() => handleInputChange(id)}
                      />
                      <span className="form-check-label">
                        {intl.formatMessage({ id: "AddToFavorites" })}
                      </span>
                    </label>
                    <label className="form-check form-check-sm form-check-custom form-check-solid py-2">
                      <input
                        id="indicatorsCardHideInput"
                        className="form-check-input check-danger"
                        type="checkbox"
                        checked={hide}
                        onChange={() => {
                          setHide(!hide);
                        }}
                      />
                      <span className="form-check-label">
                        {intl.formatMessage({ id: "HideFromWorkspace" })}
                      </span>
                    </label>
                  </div>
                </div>
                <div className="mb-5">
                  <label className="form-label fw-bold d-flex justify-content-start">
                    {intl.formatMessage({ id: "Notifications" })}
                  </label>
                  <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid py-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      name="notifications"
                    />
                    <label className="form-check-label">
                      {intl.formatMessage({ id: "Enable" })}{" "}
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="reset"
                    className="btn btn-sm btn-light btn-active-light-primary me-2"
                    data-bs-dismiss="dropdown"
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary"
                    data-bs-dismiss="dropdown"
                    onClick={() => {
                      if (hide && favorite[id][`id${id}`]) {
                        handleHideTable(id);
                        handleFavouriteTable(id);
                        setHide(false);
                      } else if (hide && !favorite[id][`id${id}`]) {
                        handleHideTable(id);
                        setHide(false);
                        if (favorite[`id${id}`]) {
                          setFavouritesList((prevList: any) => {
                            return prevList.map((prevItem: any) =>
                              prevItem.id === id
                                ? {
                                    ...prevItem,
                                    isChecked: !prevItem.isChecked,
                                  }
                                : prevItem
                            );
                          });
                        }
                      } else if (!favorite[id][`id${id}`] && !hide) {
                        setFavouritesList((prevList: any) => {
                          return prevList.map((prevItem: any) =>
                            prevItem.id === id
                              ? {
                                  ...prevItem,
                                  isChecked: !prevItem.isChecked,
                                }
                              : prevItem
                          );
                        });
                      } else if (favorite[id][`id${id}`] && !hide) {
                        handleFavouriteTable(id);
                      } else {
                      }
                    }}
                  >
                    {intl.formatMessage({ id: "Agree" })}
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export { WorkspaceTable };
