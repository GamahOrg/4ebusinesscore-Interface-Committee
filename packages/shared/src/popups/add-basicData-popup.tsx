import { FC, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useIntl } from "react-intl";
import { Modal, Row } from "react-bootstrap";
type PopupProps = {
  showAdd: boolean;
  handleClose: () => void;
  setnewEntity: any;
};

export const AddBasicDataPopup: FC<PopupProps> = ({
  showAdd,
  handleClose,
  setnewEntity,
}) => {
  const intl = useIntl();

  const showSuccessAlert = () => {
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: "AddedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };
  const [entityName, setEntityName] = useState<string>("");
  useEffect(() => {
  }, [entityName]);

  return (
    <Modal centered show={showAdd} onHide={handleClose} size="lg">
      <Modal.Header
        closeButton
        style={{
          alignItems: intl.locale === "ar" ? "flex-start" : "center",
          flexDirection: intl.locale === "en" ? "column-reverse" : "row",
        }}
        className="pb-0 border-bottom-0"
      >
        <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0 bg-transparent">
          <Row className="justify-content-center mt-5 mb-10">
            <Modal.Title id="contained-modal-title-vcenter">
              <div className="text-center">
                <h3> {intl.formatMessage({ id: "AddEntityName" })}</h3>
              </div>
            </Modal.Title>
          </Row>
        </div>
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
                      onChange={(e) => setEntityName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </Modal.Body>

      <div className="row">
        <div className="col-12 col-lg-7 mx-auto mb-12 mt-5">
          <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
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
                  onClick={(event) => {
                    event.preventDefault();

                    handleClose();
                    showSuccessAlert();
                    setnewEntity(entityName);
                  }}
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
              </div>
            </Modal.Footer>
          </div>
        </div>
      </div>
    </Modal>
  );
};
