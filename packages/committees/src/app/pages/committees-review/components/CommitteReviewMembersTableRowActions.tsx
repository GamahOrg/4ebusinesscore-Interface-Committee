import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "../../partials/DeletePopup";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import CommitteesReviewEditMemberData from "../popup/committees-review-edit-member-data";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import React from "react";
type ActionProps = {
  id: Number;
};

export const CommitteReviewMembersTableRowActions: FC<ActionProps> = ({ id }) => {
  const intl = useIntl();

  const [modalEShow, setModalEShow] = useState<boolean>(false);
  const [modalDShow, setModalDShow] = useState<boolean>(false);

  return (
    <>
      <div className="card-toolbar text-center">
        <Dropdown as={ButtonGroup}>
          <div className="me-n3">
            <Dropdown.Toggle
              id="dropdown-custom-2"
              split
              variant="none"
              className="btn btn-sm btn-icon btn-light"
            >
              <i className="bi bi-three-dots fs-2"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu
            >
              <Dropdown.Item className="menu-item">
                <a
                  onClick={(event) => {
                    event.preventDefault();
                    setModalEShow(true);
                  }}
                  className="menu-link px-3 text-primary"
                >
                  <span className="svg-icon svg-icon-3 mx-2">
                    <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                  </span>{" "}
                  {intl.formatMessage({ id: "Edit" })}
                </a>
              </Dropdown.Item>

              <Dropdown.Item className="menu-item">
                <a
                  className="menu-link px-3 text-danger"
                  onClick={(event) => {
                    event.preventDefault();
                    setModalDShow(true);
                  }}
                >
                  <span className="svg-icon svg-icon-3 mx-2">
                    <KTSVG path="/media/icons/duotune/general/gen088.svg" />
                  </span>{" "}
                  {intl.formatMessage({ id: "Delete" })}
                </a>
              </Dropdown.Item>
            </Dropdown.Menu>
          </div>
        </Dropdown>
      </div>
      <div className="modal fade" aria-hidden="true">
        <DeletePopup showDelete={modalDShow} handleCloseDelete={() => setModalDShow(false)} />
      </div>
      <div
        className="modal fade"
        id="CommitteesReviewEditMemberData"
        aria-hidden="true"
      >
        <CommitteesReviewEditMemberData show={modalEShow} handleClose={() => setModalEShow(false)} />
      </div>
    </>
  );
};
