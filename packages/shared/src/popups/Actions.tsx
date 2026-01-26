import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { Link } from "react-router-dom";
import { DeletePopup } from "./DeletePopup";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";

interface IAction {
  id?: string | number;
  isDelete: boolean;
  show: { isShow: boolean; link: string };
  edit: { isEdit: boolean; link: string };
}

export const Actions: FC<IAction> = ({ show, edit, isDelete }) => {
  const intl = useIntl();
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          split
          variant="none"
          className=" p-0 text-center"
          id="dropdown-custom-2"
        >
          <i className="bi bi-three-dots fs-2" style={{ color: "#7e8299" }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {show.isShow && (
            <Dropdown.Item as="button">
              <Link to={show.link} className="menu-link px-3 text-dark">
                <i className="fa-solid fa-eye mx-2"></i>
                {intl.formatMessage({ id: "Show" })}
              </Link>
            </Dropdown.Item>
          )}

          {edit.isEdit && (
            <Dropdown.Item as="button">
              <Link to={edit.link} className="menu-link px-3 text-primary">
                <span className="svg-icon svg-icon-3 mx-2">
                  <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                </span>
                {intl.formatMessage({ id: "Edit" })}
              </Link>
            </Dropdown.Item>
          )}

          {isDelete && (
            <Dropdown.Item as="button">
              <span
                onClick={() => setShowDelete(true)}
                className="menu-link px-3 text-danger"
              >
                <span className="svg-icon svg-icon-3 mx-2">
                  <KTSVG path="/media/icons/duotune/general/gen088.svg" />
                </span>
                {intl.formatMessage({ id: "Delete" })}
              </span>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      <div className="modal fade" aria-hidden="true">
        <DeletePopup
          showDelete={showDelete}
          handleCloseDelete={() => setShowDelete(false)}
        />
      </div>
    </>
  );
};
