import { ChangeEvent, FC, useState } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";

type PopupProps = {
  show: boolean;
  handleClose: any;
  id?: number;
  withReason?: boolean;
  reasonRequired?: boolean;
  onConfirm?: () => void;
  title?: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
  successText?: string;
};
export const RejectPopup: FC<PopupProps> = ({
  show,
  handleClose,
  withReason = false,
  reasonRequired = false,
  onConfirm,
  title,
  text,
  confirmText,
  cancelText,
  successText,
  id,
}) => {
  const intl = useIntl();

  const [reason, setReason] = useState("");
  const [requiredValidation, setRequiredValidation] = useState(false);

  const handleReason = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
    requiredValidation && setRequiredValidation(false);
  };

  const showSuccessAlert = () => {
    onConfirm && onConfirm();
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({
        id: successText ?? "TheRequestWasSuccessfullyRejected",
      }),
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
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        closeButton
        style={{
          alignItems: intl.locale === "ar" ? "flex-start" : "center",
          flexDirection: intl.locale === "en" ? "column-reverse" : "row",
        }}
        className="pb-0 border-bottom-0"
      >
        <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
          <Row className="justify-content-center mt-5 mb-10">
            <Modal.Title id="contained-modal-title-vcenter">
              <div className="text-center">
                <h2>
                  {" "}
                  {intl.formatMessage({ id: title ?? "ConfirmRejection" })}
                </h2>
              </div>
            </Modal.Title>
          </Row>
        </div>
      </Modal.Header>

      <Modal.Body className="pb-0">
        <Row className="justify-content-center mb-5">
          <div className="text-center">
            <h5>
              {intl.formatMessage({
                id: text ?? "AreYouSureToRejectTheRequest",
              })}
            </h5>
          </div>
          {withReason && (
            <div className="mt-8">
              <textarea
                onChange={handleReason}
                value={reason}
                className="form-control pb-10"
                placeholder={intl.formatMessage({ id: "ReasonForRejection" })}
                required={reasonRequired}
              ></textarea>
              {requiredValidation && (
                <div className="message text-danger py-3 px-1">
                  {intl.formatMessage({
                    id: "PleaseWriteTheReasonForRejection",
                  })}
                </div>
              )}
            </div>
          )}
        </Row>
      </Modal.Body>

      <div className="row">
        <div className="col-12 col-lg-7 mx-auto mb-12 mt-5">
          <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
            <Modal.Footer className="w-100 justify-content-center pb-0 pt-2 border-top-0">
              <div className="d-flex justify-content-center align-items-center w-100">
                <button
                  type="reset"
                  className="btn btn-secondary me-3 w-100"
                  onClick={handleClose}
                >
                  {intl.formatMessage({ id: cancelText ?? "Cancel" })}
                </button>

                {id !== 3 && (
                  <button
                    type="submit"
                    onClick={() => {
                      if (reasonRequired && !reason) {
                        setRequiredValidation(true);
                      } else {
                        handleClose();
                        showSuccessAlert();
                      }
                    }}
                    className="btn btn-danger me-5 w-100"
                  >
                    <span className="indicator-label">
                      {intl.formatMessage({ id: confirmText ?? "Reject" })}
                    </span>
                  </button>
                )}
              </div>
            </Modal.Footer>
          </div>
        </div>
      </div>
    </Modal>
  );
};
