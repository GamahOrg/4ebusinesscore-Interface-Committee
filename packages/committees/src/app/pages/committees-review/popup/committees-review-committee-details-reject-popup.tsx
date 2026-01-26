import { useIntl } from "react-intl";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import React from "react";

type PopupProps = {
  show: boolean;
  handleClose: any;
};
function CommitteesReviewCommitteeDetailsRejectPopup<PopupProps>({ show, handleClose }) {
  const intl = useIntl();

  const showSuccessAlert = () => {
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: "SentSuccessfully" }),
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
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
    >
      <div className="card card-xl-stretch mb-xl-0">
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
          className="pb-0 border-bottom-0"
        >
          <div className="text-center">
            <Modal.Title id="contained-modal-title-vcenter">
              <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
                <span className="card-label fs-4 my-5">{intl.formatMessage({ id: "RequestReject" })}</span>
                <span className="mt-1 fw-semibold fs-6 text-muted my-5">{intl.formatMessage({ id: "PleaseEnterTheFollowingData" })} </span>
              </h3>
            </Modal.Title>
          </div>
        </Modal.Header>
      </div>

      <div className="tab-content">
        <div className="tab-pane fade active show" id="REGA_table_widget_5_tab_1">
          <form
            noValidate
            className="form outputForm"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Modal.Body className="pb-0 mx-4">
              <div className="row gy-5 pb-4">
                <div className="col-12">
                  <div>
                    <label htmlFor="requestToRejectTheReport" className="mb-3">
                      {intl.formatMessage({ id: "ReasonForRejection" })}
                    </label>
                    <textarea
                      name="requestToRejectTheReport"
                      id="requestToRejectTheReport"
                      placeholder={intl.formatMessage({
                        id: "ReasonForRejection",
                      })}
                      className="form-control form-control-lg form-control-solid min-h-150px"
                    ></textarea>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center pb-5 pt-1 border-top-0">
              <div className="d-flex justify-content-center my-5">
                <button
                  type="reset"
                  onClick={(event) => {
                    event.preventDefault();
                    handleClose();
                  }}
                  className="btn btn-secondary px-15 me-5"
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
                <button
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    handleClose();
                    showSuccessAlert();
                  }}
                  className="btn btn-success px-15 ms-5"
                >
                  {intl.formatMessage({ id: "Send" })}
                </button>
              </div>
            </Modal.Footer>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default CommitteesReviewCommitteeDetailsRejectPopup;
