import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import React from "react";
import { DeleteMemberFromMeetingPopup } from "../popup/delete-member-from-meeting-popup";
import EditMemberDataForMeetingsPopup from "../popup/committees-review-edit-member-for-meetings-popup.tsx";
type ActionProps = {
  id: Number | string;
  setExternalMembers?: any;
  externalMembers?: any;
};

export const CommitteReviewMembersTableRowActionsForMeetings: FC<ActionProps> = ({ id, setExternalMembers, externalMembers }) => {
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
        <DeleteMemberFromMeetingPopup showDelete={modalDShow} handleCloseDelete={() => setModalDShow(false)} id={id as string} setExternalMembers={setExternalMembers} externalMembers={externalMembers} />
      </div>
      <div
        className="modal fade"
        id="CommitteesReviewEditMemberData"
        aria-hidden="true"
      >
        <EditMemberDataForMeetingsPopup show={modalEShow} handleClose={() => setModalEShow(false)} id={id as string} setExternalMembers={setExternalMembers} externalMembers={externalMembers} />
      </div>
    </>
  );
};
