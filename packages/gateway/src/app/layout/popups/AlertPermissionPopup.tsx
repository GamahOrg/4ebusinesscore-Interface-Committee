import React from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { FaExclamationCircle } from "react-icons/fa";

type PopupProps = {
  show?: any;
  handleClose?: any;
};

const AlertPermissionPopup: React.FC<PopupProps> = ({ show, handleClose }) => {
  const intl = useIntl();
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
                  <div className="alert alert-warning mb-4" role="alert">
                    {/* <i className="fas fa-exclamation-triangle"></i> */}
                    <FaExclamationCircle style={{ fontSize: "52px" }} />
                  </div>
                  <div className="fw-bolder fs-2 text-black mb-4">
                    {intl.formatMessage({ id: "UnableToAccessService" })}
                  </div>
                  <div className="fw-bolder fs-4 text-muted">
                    {intl.formatMessage({
                      id: "YouWillBeAbleToAccessTheServiceIfAllowedByTheSystem",
                    })}
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

export default AlertPermissionPopup;
