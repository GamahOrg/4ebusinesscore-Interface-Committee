import { FC } from "react";
import { useIntl } from "react-intl";
import { Modal, Row } from "react-bootstrap";

type PopupProps = {
  show: boolean;
  handleClose: any;
  submitHandler?: any;
  isLoading?: any;
};
export const AddPopup: FC<PopupProps> = ({
  show,
  isLoading = false,
  handleClose,
  submitHandler = () => {},
}) => {
  const intl = useIntl();

  return (
    <>
      {/* <div className="modal-dialog modal-dialog-centered mw-650px">
        <div className="modal-content"> */}
      <Modal
        show={show}
        onHide={handleClose}
        // size="lg"
        // aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          // className="flex-column-reverse"
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
          className="pb-0 border-bottom-0"
          // className="align-items-start"
        >
          <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
            <Row className="justify-content-center mt-5 mb-10">
              <Modal.Title id="contained-modal-title-vcenter">
                <div className="text-center">
                  <h3 className="title-h3">
                    {" "}
                    {intl.formatMessage({ id: "AddConfirmation" })}
                  </h3>
                </div>
              </Modal.Title>
            </Row>
          </div>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Row className="justify-content-center mb-5">
            <div className="text-center">
              <h5>{intl.formatMessage({ id: "AreYouSureToAdd" })}</h5>
            </div>
          </Row>
        </Modal.Body>

        <div className="row">
          <div className="col-12 col-lg-7 mx-auto mb-12 mt-5">
            <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
              <Modal.Footer className="w-100 justify-content-center pb-0 pt-2 border-top-0">
                <div className="d-flex justify-content-center align-items-center w-100">
                  <button
                    type="reset"
                    className="btn btn-secondary me-5 w-100"
                    // data-bs-dismiss="modal"
                    // aria-hidden="true"
                    onClick={handleClose}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  {!isLoading ? (
                    <button
                      type="submit"
                      onClick={() => {
                        submitHandler();
                        handleClose();
                      }}
                      // data-bs-dismiss="modal"
                      className="btn btn-success me-5 w-100 "
                    >
                      <span className="indicator-label">
                        {" "}
                        {intl.formatMessage({ id: "ADD" })}
                      </span>
                      <span className="indicator-progress">
                        {intl.formatMessage({ id: "ADD" })}
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{" "}
                      </span>
                    </button>
                  ) : (
                    <button className="btn btn-success me-5 w-100 ">
                      <span className="indicator-label">
                        {" "}
                        {intl.formatMessage({ id: "Processing" })}...
                      </span>
                    </button>
                  )}
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
