import { FC } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

type DeletePopupProps = {
  id?: Number;
  handleDelete?: (id?: Number, additionalData?: {}) => void;
  additionalData?: {};
  showDelete?: any;
  handleCloseDelete?: any;
};

export const DeletePopup: FC<DeletePopupProps> = ({
  showDelete,
  handleCloseDelete,
  id = 0,
  handleDelete = null,
  additionalData = {},
}) => {
  const intl = useIntl();
  let theme = localStorage.getItem("Theme");


  return (
    <div className="modal-dialog modal-dialog-centered ">
      <Modal
        centered
        show={showDelete}
        onHide={handleCloseDelete}
        className={!showDelete ? "inert" : ""}
      >
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale === "ar" ? "flex-start" : "flex-end",
            flexDirection: intl.locale === "en" ? "column-reverse" : "row",
          }}
        >
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center my-5 pb-4">
            <div className="text-center">
              <h3> {intl.formatMessage({ id: "ConfirmDeletion" })}</h3>
            </div>
          </Row>

          <Row className="justify-content-center mb-5">
            <div className="text-center">
              <h5>
                {intl.formatMessage({ id: "AreYouSureToDeleteThisItem" })}
              </h5>
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
                    onClick={handleCloseDelete}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <div
                    onClick={() => {
                      handleCloseDelete();
                      if (handleDelete) {
                        handleDelete(id, additionalData);
                      }
                    }}
                    className="  btn btn-danger me-5 w-100 "
                  >
                    <span className="indicator-label">
                      {intl.formatMessage({ id: "Delete" })}
                    </span>
                    <span className="indicator-progress">
                      {intl.formatMessage({ id: "Deleting" })}
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
