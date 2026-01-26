import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import React from "react";
import EditMemberDataForEditCommittee from "../../committee-formation/popup/edit-member-data-for-edit-committee";
import { DeleteMemberForEditCommitteePopup } from "../../committee-formation/popup/delete-member-for-edit-committee-popup";
type ActionProps = {
  id: Number | string;
  allMembers?: any;
  setAllMembers?: any;
  setInternalMembers?: any;
  setExternalMembers?: any;
};

export const CommitteReviewMembersTableRowActionsForEdit: FC<ActionProps> = ({ id, allMembers, setAllMembers, setInternalMembers, setExternalMembers }) => {
  const intl = useIntl();

  const [modalEShow, setModalEShow] = useState<boolean>(false);
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  let [selectedId, setSelectedId] = useState<string>("");

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
              <Dropdown.Item className="menu-item" as="button">
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

              <Dropdown.Item className="menu-item" as="button">
                <a
                  className="menu-link px-3 text-danger"
                  onClick={(event) => {
                    event.preventDefault();
                    setSelectedId(id as string);
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
        {selectedId == id ? (
          <>
            {" "}
            <DeleteMemberForEditCommitteePopup handleCloseDelete={() => setModalDShow(false)} id={id as string} setInternalMembers={setInternalMembers} setAllMembers={setAllMembers} setExternalMembers={setExternalMembers} allMembers={allMembers} showDelete={modalDShow} />
          </>
        ) : (
          <></>
        )}
      </div>
      <div
        className="modal fade"
        id="CommitteesReviewEditMemberData"
        aria-hidden="true"
      >
        <EditMemberDataForEditCommittee id={id as string} show={modalEShow} setInternalMembers={setInternalMembers} setAllMembers={setAllMembers} setExternalMembers={setExternalMembers} handleClose={() => setModalEShow(false)} allMembers={allMembers} />
      </div>
    </>
  );
};
