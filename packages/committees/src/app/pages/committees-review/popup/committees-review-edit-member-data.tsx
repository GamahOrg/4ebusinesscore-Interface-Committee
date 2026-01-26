import React, { useState } from "react";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import CheckBoxDropDown from "../../partials/CheckBoxDropDown";

type PopupProps = {
  show: boolean;
  handleClose: any;
};
const CommitteesReviewEditMemberData: React.FC<PopupProps> = ({ show, handleClose }) => {
  const intl = useIntl();
  const [validity, setValidity] = useState([]);
  const showSuccessAlert = () => {
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: "ModifiedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };

  const optionsThree = [
    {
      id: 1,
      name: "رئيس اللجنة",
    },
    {
      id: 2,
      name: "امين اللجنة",
    },
    {
      id: 3,
      name: "عضو اللجنة",
    },
  ];

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
      >
        <div className="card">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "center",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
            className="pb-0 border-bottom-0"
          >
            <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
              <Modal.Title id="contained-modal-title-vcenter">
                <h3 className="card-title flex-column align-items-center">
                  <span className="card-label fw-bolder fs-3 mb-2 ">{intl.formatMessage({ id: "Edit" })}</span>
                  <span className="mt-1 fw-semibold fs-5 text-muted">{intl.formatMessage({ id: "PleaseEnterTheData" })} :</span>
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>
          <form>
            <Modal.Body className="pb-0 mx-4">
              <div className="row">
                <div className="col-lg-6 mb-2 pt-2 pb-3">
                  <label className="fs-6 fw-bold mb-2 form-label" htmlFor="outputName">
                    {intl.formatMessage({ id: "Name" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="special bi bi-person-circle"></i>
                      </span>
                    </div>
                    <input id="outputName" type="text" className="form-control" placeholder={intl.formatMessage({ id: "Name" })} />
                  </div>
                </div>
                <div className="col-lg-6 mb-2 pt-2 pb-3">
                  <label htmlFor="outputName" className="form-label px-2 fontSz-6">
                    {intl.formatMessage({ id: "Permission" })}
                  </label>
                  <CheckBoxDropDown selectedOptions={validity} setSelectedOptions={setValidity} options={optionsThree} />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center pb-5 pt-3 border-top-0">
              <div className="col-12 col-lg-7 mx-auto mb-10">
                <div className=" card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center w-50">
                    <div
                      className="btn btn-secondary mx-1 text-center w-100"
                      onClick={handleClose}
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </div>
                    <div
                      className="btn btn-primary mx-1 text-center w-100"
                      onClick={() => {
                        handleClose();
                        showSuccessAlert();
                      }}
                    >
                      {intl.formatMessage({ id: "Save" })}
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CommitteesReviewEditMemberData;
