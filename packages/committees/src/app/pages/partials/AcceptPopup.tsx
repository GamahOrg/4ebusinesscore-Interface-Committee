import { FC } from "react";
import { useIntl } from "react-intl";
import { Modal, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import React from "react";

type PopupProps = {
  show: boolean;
  handleClose: any;
  id?: number;
};
export const AcceptPopup: FC<PopupProps> = ({ show, handleClose, id }) => {
  const intl = useIntl();

  const showSuccessAlert = () => {
    Swal.fire({
      text: intl.formatMessage({ id: "AcceptedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };

  return (
    <>
      {/* <div className="modal-dialog modal-dialog-centered mw-650px">
        <div className="modal-content">
          <div className="modal-header justify-content-end border-0 pb-0">
            <div
              className="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
              aria-hidden="true"
            >
              <KTSVG
                path="/media/icons/duotune/arrows/arr061.svg"
                className="svg-icon-1"
              />
            </div>
          </div> */}

      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="accept-popup-modal"
      >
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
          className="pb-0 border-bottom-0"
        >
          <div className="card-header mt-3 mt-md-5 d-flex justify-content-center w-100 px-2 px-md-4 border-bottom-0">
            <Row className="justify-content-center mt-3 mt-md-5 mb-4 mb-md-10 w-100">
              <Modal.Title id="contained-modal-title-vcenter" className="w-100">
                <div className="text-center">
                  <h3 className="fs-5 fs-md-3">{intl.formatMessage({ id: "AcceptanceConfirmation" })}</h3>
                </div>
              </Modal.Title>
            </Row>
          </div>
        </Modal.Header>

        <Modal.Body className="pb-0">
          <Row className="justify-content-center mb-3 mb-md-5 w-100">
            <div className="text-center">
              <h5 className="fs-6 fs-md-5">{intl.formatMessage({ id: "AreYouSureToAcceptTheRequest" })}</h5>
            </div>
          </Row>
        </Modal.Body>

        <div className="row w-100 mx-0">
          <div className="col-12 col-sm-10 col-md-8 col-lg-7 mx-auto mb-4 mb-md-12 mt-3 mt-md-5 px-1 px-md-0">
            <div className="outputCard card-diff-toolbar w-100 mt-2 mt-md-3 d-flex justify-content-center">
              <Modal.Footer className="w-100 justify-content-center pb-2 pb-md-0 pt-2 border-top-0 flex-column flex-md-row gap-2 gap-md-0">
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center w-100 gap-2 gap-md-3">
                  <button
                    type="reset"
                    className="btn btn-secondary w-100 w-md-auto"
                    onClick={handleClose}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>

                  <button
                    type="submit"
                    onClick={() => {
                      handleClose();
                      showSuccessAlert();
                    }}
                    className="btn btn-success w-100 w-md-auto"
                  >
                    <span className="indicator-label">{intl.formatMessage({ id: "Acceptance" })}</span>
                    <span className="indicator-progress">
                      {intl.formatMessage({ id: "Acceptance" })}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{" "}
                    </span>
                  </button>
                </div>
              </Modal.Footer>
            </div>
          </div>
        </div>

        {/* </div>
      </div> */}
      </Modal>
    </>
  );
};
