import { FC } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";

type StopPopupProps = {
  showStop?: any;
  handleCloseStop?: any;
};
export const StopPopup: FC<StopPopupProps> = ({
  showStop,
  handleCloseStop,
}) => {
  const intl = useIntl();
  const showSuccessAlert = () => {
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: "StopedSuccessfully" }),
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
    <div className="modal-dialog modal-dialog-centered mw-650px">
      <Modal centered show={showStop} onHide={handleCloseStop}>
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale === "ar" ? "flex-start" : "center",
            flexDirection: intl.locale === "en" ? "column-reverse" : "row",
          }}
        ></Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center mt-5 mb-20">
            <div className="text-center">
              <h3> {intl.formatMessage({ id: "ConfirmStop" })}</h3>
            </div>
          </Row>
          <Row className="justify-content-center mb-5">
            <div className="text-center">
              <h5>{intl.formatMessage({ id: "AreYouSureToStopThisItem" })}</h5>
            </div>
          </Row>
        </Modal.Body>
        <div className="row">
          <div className="col-12 col-lg-7 mx-auto mb-20 mt-5">
            <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
              <div className="d-flex justify-content-center align-items-center w-100">
                <button
                  type="reset"
                  className="btn btn-secondary me-3 w-100"
                  onClick={handleCloseStop}
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    handleCloseStop();
                    showSuccessAlert();
                  }}
                  data-bs-dismiss="modal"
                  className="  btn btn-danger me-5 w-100 "
                >
                  <span className="indicator-label">
                    {intl.formatMessage({ id: "Stop" })}
                  </span>
                  <span className="indicator-progress">
                    {intl.formatMessage({ id: "Stop" })}
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{" "}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
