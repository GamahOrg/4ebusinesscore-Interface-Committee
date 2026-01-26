import { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import Swal from "sweetalert2";
import React from "react";
// import { fetchEmloyeeManagement } from "../../redux/features/SLA/employeManagementSlice";
const EN_LANG = "en";
type PopupProps = {
  show: boolean;
  handleClose: any;
  employeeId?: string;
  setEmployeeId?: any;
  setEmployeeName?: any;
};
export const EmployeeHierarchyPopup: FC<PopupProps> = ({ show, handleClose, employeeId, setEmployeeId, setEmployeeName }) => {
  const intl = useIntl();
  let showSuccessAlert = () => {
    Swal.fire({
      text: intl.formatMessage({ id: "AddedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };
  const handleRadioChange = (item: any) => {
    setEmployeeId(item?.userId);
    setEmployeeName(item?.userNmae);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <div className="card">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "center",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
            className="pb-0 border-bottom-0"
          >
            <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
              <Modal.Title id="contained-modal-title-vcenter">
                <h3 className="card-title flex-column align-items-center">
                  <span className="card-label fw-bolder fs-3 mb-2 d-flex justify-content-center w-100">
                    {intl.formatMessage({
                      id: "OrganizationalChart",
                    })}
                  </span>
                  <span className="mt-1 fw-semibold fs-5 text-muted">
                    {intl.formatMessage({
                      id: "YouCanSeeTheEmployeesAndManagersInTheOrganization",
                    })}
                  </span>
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>

          <Modal.Body className="pb-0 mx-4">
            <div className="d-flex justify-content-center align-items-center">
              <form className="w-400px position-relative mb-5" autoComplete="off">
                <span className="svg-icon svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y">
                  <KTSVG path="/media/icons/duotune/general/gen114_search.svg" className="pe-5" />
                </span>
                <input
                  type="text"
                  className="form-control form-control-solid px-15"
                  name="search"
                  value=""
                  placeholder={intl.formatMessage({
                    id: "SearchWithEmployeeName",
                  })}
                />
              </form>
            </div>
            <div className="row my-4">
              <div className="col-12">
                <div className="mb-2 pt-2 pb-3 custom_tree"></div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center pb-5 pt-3 border-top-0">
            <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
              <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                <div className="d-flex justify-content-center align-items-center w-50">
                  <div
                    // data-bs-dismiss="modal"
                    onClick={handleClose}
                    className="btn btn-secondary mx-1 text-center w-100"
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </div>
                  <button
                    // data-bs-dismiss="modal"
                    className="btn btn-success mx-1 text-center w-100"
                    style={{ border: "none" }}
                    type="submit"
                    // onClick={(event) => {
                    //   event.preventDefault();
                    //   showSuccessAlert();
                    // }}
                    onClick={() => {
                      handleClose();
                      showSuccessAlert();
                    }}
                  >
                    {intl.formatMessage({ id: "Add" })}
                  </button>
                </div>
              </div>
            </div>
          </Modal.Footer>
        </div>
        {/* </div>
      </div> */}
      </Modal>
    </>
  );
};
