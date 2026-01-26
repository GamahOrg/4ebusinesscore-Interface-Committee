import { FC } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";

type HidePopupProps = {
  id?: number;
  handleHide?: (id: number, additionalData: {}) => void;
  additionalData?: {};
  showHide?: any;
  handleCloseHide?: any;
};

export const HidePopup: FC<HidePopupProps> = ({
  showHide,
  handleCloseHide,
  id = 0,
  handleHide = null,
  additionalData = {},
}) => {
  const intl = useIntl();
  const showSuccessAlert = () => {
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: "HidedSuccessfully" }),
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
    <div className="modal-dialog modal-dialog-centered ">
      <Modal centered show={showHide} onHide={handleCloseHide}>
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale === "ar" ? "flex-start" : "center",
            flexDirection: intl.locale === "en" ? "column-reverse" : "row",
          }}
        >
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center my-5 pb-4">
            <div className="text-center">
              <h3> {intl.formatMessage({ id: "ConfirmInvisibility" })}</h3>
            </div>
          </Row>

          <Row className="justify-content-center mb-5">
            <div className="text-center">
              <h5>{intl.formatMessage({ id: "AreYouSureToHideThisItem" })}</h5>
            </div>
          </Row>
        </Modal.Body>

        <Modal.Footer className="justify-content-center py-2">
          <div className="row">
            <div className="col-12 col-lg-7 mx-auto my-2 pb-2">
              <div className="outputCard card-diff-toolbar w-100 d-flex justify-content-center">
                <div className="d-flex justify-content-center align-items-center w-100">
                  <button
                    type="reset"
                    className="btn btn-secondary me-3 w-100"
                    onClick={handleCloseHide}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <div
                    onClick={() => {
                      handleCloseHide();
                      showSuccessAlert();
                      if (handleHide) {
                        handleHide(id, additionalData);
                      }
                    }}
                    className="  btn btn-danger me-5 w-100 "
                  >
                    <span className="indicator-label">
                      {intl.formatMessage({ id: "Hide" })}
                    </span>
                    <span className="indicator-progress">
                      {intl.formatMessage({ id: "Hiding" })}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
