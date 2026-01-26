import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { DeletePopup } from "@4eplatform/task-management/src/app/pages/system-tools/tasks-tool/popup/DeleteTask";
import React from "react";
import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

type ActionProps = {
  id?: Number;
  cancelFunc?: any;
};

export const HierararchyActions: FC<ActionProps> = ({ id, cancelFunc }) => {
  const [modalDShow, setModalDShow] = useState<boolean>(false);

  const intl = useIntl();
  let navigate = useNavigate();
  return (
    <>
      <div className="card-toolbar text-center">
        <div className="me-n3">
          <button
            className="btn btn-sm btn-icon btn-light"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
          >
            <i className="bi bi-three-dots fs-2"></i>
          </button>
          <div
            className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-100px py-3"
            data-kt-menu="true"
          >
            <div className="menu-item px-2">
              <a
                data-bs-dismiss="modal"
                onClick={() => {
                  cancelFunc();
                  navigate(`/track-requests-tools/${id}/details`);
                }}
                className="menu-link px-3 text-dark"
              >
                <i className="fa-solid fa-eye mx-2"></i>
                {intl.formatMessage({ id: "Show" })}
              </a>
            </div>

            <div className="menu-item px-2">
              <a
                data-bs-dismiss="modal"
                onClick={() => {
                  cancelFunc();
                  navigate(`/edit-track-requests-tools/${id}`);
                }}
                className="menu-link px-3 text-primary"
              >
                <span className="svg-icon svg-icon-3 mx-2">
                  <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                </span>{" "}
                {intl.formatMessage({ id: "Edit" })}
              </a>
            </div>

            <div
              className="menu-item px-2"
              data-bs-dismiss="modal"
            >
              <a
                onClick={(event) => {
                  event.preventDefault();
                  setModalDShow(true);
                }}
                className="menu-link px-3 text-danger"

              >
                <span className="svg-icon svg-icon-3 mx-2">
                  <KTSVG path="/media/icons/duotune/general/gen088.svg" />
                </span>{" "}
                {intl.formatMessage({ id: "Delete" })}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="Rega_modal_Delete" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={() => setModalDShow(false)}
          showDelete={modalDShow}
        />
      </div>
    </>
  );
};
