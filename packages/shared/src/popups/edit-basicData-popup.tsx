import { FC } from "react";
import Swal from "sweetalert2";
import { useIntl } from "react-intl";
import { Modal } from "react-bootstrap";
type PopupProps = {
  showAdd: boolean;
  handleClose: () => void;
};

export const EditBasicDataPopup: FC<PopupProps> = ({
  showAdd,
  handleClose,
}) => {
  const intl = useIntl();

  const showSuccessAlert = () => {
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: "EditedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: { confirmButton: "btn btn-primary" },
    });
  };

  return (
    <Modal centered show={showAdd} onHide={handleClose} size="lg">
      <Modal.Header
        closeButton
        style={{
          alignItems: intl.locale === "ar" ? "flex-start" : "center",
          flexDirection: intl.locale === "en" ? "column-reverse" : "row",
        }}
      >
        <Modal.Title className="w-100 d-flex align-items-center justify-content-center">
          <div className="mb-9 text-center">
            <h3 className="mb-3 w-100 d-flex align-items-center justify-content-center">
              {intl.formatMessage({ id: "EditEntityName" })}
            </h3>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column">
          <form action="/action_page.php">
            <fieldset className="Regafieldset">
              <div className="row mb-5">
                <div className="col-lg-6 mb-2 pt-2 pb-3">
                  <label
                    htmlFor="outputName"
                    className="form-label px-2 fontSz-6"
                  >
                    {intl.formatMessage({ id: "EntityName" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-building special h-100"></i>
                      </span>
                    </div>
                    <input
                      id="outputName"
                      type="text"
                      className="form-control"
                      placeholder={intl.formatMessage({
                        id: "EntityName",
                      })}
                    />
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex pt-12">
          <button
            type="reset"
            className="btn btn-light me-3"
            onClick={() => {
              handleClose();
            }}
          >
            {intl.formatMessage({ id: "Cancel" })}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(event) => {
              event.preventDefault();
              showSuccessAlert();
              handleClose();
            }}
          >
            <span className="indicator-label">
              {" "}
              {intl.formatMessage({ id: "Save" })}
            </span>
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
