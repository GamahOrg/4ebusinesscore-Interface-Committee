import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { CiCircleCheck } from "react-icons/ci";
import { useNavigate } from "react-router";

type PopupProps = {
  show?: any;
  handleClose?: any;
};

const RedirectLoginPopup: React.FC<PopupProps> = ({ show, handleClose }) => {
  const intl = useIntl();
  let navigate=useNavigate()
  return (
    <>
      {/* <div className="modal-dialog modal-dialog-centered"> */}
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <div className="card">
          <div className="mx-5"></div>
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "center",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
          >
            <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 mt-10">
              <Modal.Title>
                <div className="d-flex align-items-center flex-column">
                  <div className="alert alert-success mb-4" role="alert">
                    {/* <i className="fas fa-exclamation-triangle"></i> */}
                    <CiCircleCheck style={{ fontSize: "52px" }} />
                  </div>
                  <div className="fw-bolder fs-2 text-black mb-4">
                    {intl.formatMessage({ id: "YourRequestHasBeenSuccessfullyAccepted" })}
                  </div>
                  <div className="fw-bolder fs-4 text-muted">
                    {intl.formatMessage({
                      id: "PleaseLogInAgainToContinueYourActivity",
                    })}
                  </div>
                  <div className="btn btn-primary mt-6 d-flex align-items-center justify-content-center " style={{color:"white"}} onClick={()=>{navigate("/anonymous-workspace")}}>
                     {intl.formatMessage({id:"ReturnToHomePage"})}
                  </div>
                </div>
              </Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body></Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default RedirectLoginPopup;