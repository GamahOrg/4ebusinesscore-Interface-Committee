import React from "react";
import { Modal, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";

type PopupProps = {
  show: boolean;
  withActions?: boolean;
  type?: string;
  handleClose: any;
  title?: string;
  size?: "sm" | "lg" | "xl" | undefined;
  children?: React.ReactNode;
};
const PopUp = ({
  show,
  handleClose,
  title,
  type = "add",
  size,
  withActions = true,
  children,
}: PopupProps) => {
  const intl = useIntl();

  const showSuccessAlert = () => {
    let mess =
      type === "add"
        ? "AddedSuccessfully"
        : type === "edit"
        ? "EditedSuccessfully"
        : "DeletedSuccessfully";
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: mess }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    }).then(() => {
      handleClose();
    });
  };
  return (
    <Modal size={size} show={show} onHide={handleClose} centered>
      {title && (
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale === "ar" ? "flex-start" : "center",
            flexDirection: intl.locale === "en" ? "column-reverse" : "row",
          }}
          className="pb-0 border-bottom-0"
        >
          <div className="card-header d-flex justify-content-center w-100 px-4 border-bottom-0 bg-transparent">
            <Row className="justify-content-center mt-5 ">
              <Modal.Title id="contained-modal-title-vcenter">
                <div className="text-center">
                  <h3 className="fw-bolder">
                    {" "}
                    {intl.formatMessage({ id: title })}
                  </h3>
                </div>
              </Modal.Title>
            </Row>
          </div>
        </Modal.Header>
      )}
      <Modal.Body className="pb-0">
        <Row className="justify-content-center mb-5">{children}</Row>
      </Modal.Body>
      {withActions && (
        <Modal.Footer>
          <div className="row">
            <div className="col-12 col-lg-7 mx-auto mb-12">
              <div className="outputCard card-diff-toolbar w-100 d-flex justify-content-center">
                <Modal.Footer className="w-100 justify-content-center pb-0 pt-2 border-top-0">
                  <div className="d-flex justify-content-center align-items-center w-100">
                    <button
                      type="reset"
                      className="btn btn-secondary me-5 w-100"
                      onClick={handleClose}
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </button>

                    <button
                      type="submit"
                      onClick={() => {
                        showSuccessAlert();
                      }}
                      className={`btn me-5 w-100 ${
                        type === "edit"
                          ? "btn-primary"
                          : type === "add"
                          ? "btn-success"
                          : "btn-danger"
                      } `}
                    >
                      {type === "add" && intl.formatMessage({ id: "ADD" })}
                      {type === "edit" && intl.formatMessage({ id: "Edit" })}
                      {type === "delete" &&
                        intl.formatMessage({ id: "Delete" })}
                    </button>
                  </div>
                </Modal.Footer>
              </div>
            </div>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default PopUp;
