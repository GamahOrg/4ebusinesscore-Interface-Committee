import React, { FC, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import EditMemberData from "../popup/edit-member-data";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { DeleteMemberPopup } from "../popup/delete-member-popup";

type ActionProps = {
  id: Number | string;
  setInternalMembers?: any;
  setExternalMembers?: any;
  setAllMembers?: any;
  externalMemberId?: string;
  internalMemberId?: string;
  allMembers?: any;
};

export const Actions: FC<ActionProps> = ({
  id,
  setAllMembers,
  setExternalMembers,
  setInternalMembers,
  externalMemberId,
  internalMemberId,
  allMembers,
}) => {
  const intl = useIntl();
  const [modalEShow, setModalEShow] = useState<boolean>(false);
  const [modalDShow, setModalDShow] = useState<boolean>(false);

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
          <Dropdown.Item as="button">
            <div
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
            </div>
          </Dropdown.Item>

          <Dropdown.Item as="button">
            <div
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
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="modal fade" aria-hidden="true">
        <DeleteMemberPopup
          showDelete={modalDShow}
          handleCloseDelete={() => setModalDShow(false)}
          id={id as string}
          setInternalMembers={setInternalMembers}
          setAllMembers={setAllMembers}
          setExternalMembers={setExternalMembers}
          allMembers={allMembers}
        />
      </div>
      <div
        className="modal fade"
        id="EditMemberData"
        aria-hidden="true"
      >
        <EditMemberData
          id={id as string}
          show={modalEShow}
          setInternalMembers={setInternalMembers}
          setAllMembers={setAllMembers}
          setExternalMembers={setExternalMembers}
          handleClose={() => setModalEShow(false)}
          externalMemberId={externalMemberId}
          internalMemberId={internalMemberId}
          allMembers={allMembers}
        />
      </div>
    </>
  );
};
