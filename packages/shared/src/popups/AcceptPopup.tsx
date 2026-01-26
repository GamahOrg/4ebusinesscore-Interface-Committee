import { ChangeEvent, FC, useState } from "react";
import { useIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

type PopupProps = {
  show: boolean;
  handleClose: () => void;
  withReason?: boolean;
  reasonRequired?: boolean;
  onConfirm?: () => void;
  title?: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
  successText?: string;
};

export const AcceptPopup: FC<PopupProps> = ({
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
}) => {
  const intl = useIntl();
  const [reason, setReason] = useState("");
  const [requiredValidation, setRequiredValidation] = useState(false);

  const handleReasonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
    if (requiredValidation) setRequiredValidation(false);
  };

  const showSuccessAlert = () => {
    if (onConfirm) onConfirm();
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: successText || "AcceptedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: { confirmButton: "btn btn-primary" },
    });
  };

  const handleConfirm = () => {
    if (reasonRequired && !reason) {
      setRequiredValidation(true);
      return;
    }
    handleClose();
    showSuccessAlert();
  };

  const formatMessage = (id: string = "", defaultMessage: string) =>
    intl.formatMessage({ id: id || defaultMessage });

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="pb-0 border-bottom-0">
        <div className="w-100 text-center">
          <h2>{formatMessage(title, "AcceptanceConfirmation")}</h2>
        </div>
      </Modal.Header>

      <Modal.Body className="pb-0 text-center">
        <h5>{formatMessage(text, "AreYouSureToAcceptTheRequest")}</h5>
        {withReason && (
          <div className="mt-3">
            <textarea
              onChange={handleReasonChange}
              value={reason}
              className="form-control"
              placeholder={intl.formatMessage({ id: "AcceptanceReason" })}
              required={reasonRequired}
            />
            {requiredValidation && (
              <div className="text-danger mt-2">
                {intl.formatMessage({ id: "PleaseWriteTheReason" })}
              </div>
            )}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-center border-top-0">
        <button
          type="button"
          className="btn btn-secondary me-3"
          onClick={handleClose}
        >
          {formatMessage(cancelText, "Cancel")}
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleConfirm}
        >
          {formatMessage(confirmText, "Acceptance")}
        </button>
      </Modal.Footer>
    </Modal>
  );
};
