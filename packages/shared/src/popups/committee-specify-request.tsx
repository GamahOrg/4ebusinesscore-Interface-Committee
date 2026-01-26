import React, { useState } from "react";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";

type PopupProps = {
  show: boolean;
  handleClose: any;
};
const SpecifyRequest: React.FC<PopupProps> = ({ show, handleClose }) => {
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
  const [selectedOption, setSelectedOption] = useState(1);

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <div className="card">
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale === "ar" ? "flex-start" : "center",
            flexDirection: intl.locale === "en" ? "column-reverse" : "row",
          }}
          className="pb-0 border-bottom-0"
        >
          <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
            <Modal.Title id="contained-modal-title-vcenter">
              <h3 className="card-title flex-column align-items-center">
                <span className="card-label fw-bolder fs-3 mb-2 ">
                  {intl.formatMessage({ id: "RequestPath" })}
                </span>
                <span className="mt-1 fw-semibold fs-5 text-muted">
                  {intl.formatMessage({ id: "PleaseEnterTheData" })}
                </span>
              </h3>
            </Modal.Title>
          </div>
        </Modal.Header>
        <div className="card-body py-3 px-3 mx-2 mx-md-8">
          <div className="tab-content">
            <div
              className="tab-pane fade active show"
              id="REGA_table_widget_5_tab_1"
            >
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
                      <div className="mx-auto mt-1">
                        <label className="mb-3" htmlFor="typeOfRequest">
                          {intl.formatMessage({ id: "TypeOfRequest" })}
                        </label>
                        <select
                          className="form-select form-select-lg mb-3"
                          aria-label=".form-select-lg example"
                          id="typeOfRequest"
                          onChange={(event: any) =>
                            setSelectedOption(event.target.value)
                          }
                        >
                          <option value="1">لجنة عادية</option>
                          <option value="2">لجنة خاصة</option>
                          <option value="3">لجنة متميزة</option>
                        </select>{" "}
                      </div>
                    </div>
                    {selectedOption === 1 ? (
                      <>
                        <div className="p-2 my-1">
                          <div className="timeline-item">
                            <div className="timeline-badge d-flex justify-content-start align-items-center px-4 my-4">
                              <div className="bg-primary w-45px h-45px rounded-circle d-flex justify-content-center align-items-center text-light fs-3">
                                1
                              </div>
                              <div className="mx-2">ادارة 1</div>
                            </div>
                            <div className="timeline-badge d-flex justify-content-start align-items-center px-4 my-4">
                              <div className="bg-warning w-45px h-45px rounded-circle d-flex justify-content-center align-items-center text-light fs-3">
                                2
                              </div>
                              <div className="mx-2">إدارة 2</div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : selectedOption === 2 ? (
                      <>
                        <div className="p-2 my-1">
                          <div className="timeline-item">
                            <div className="timeline-badge d-flex justify-content-start align-items-center px-4 my-4">
                              <div className="bg-primary w-45px h-45px rounded-circle d-flex justify-content-center align-items-center text-light fs-3">
                                1
                              </div>
                              <div className="mx-2">ادارة 1</div>
                            </div>
                            <div className="timeline-badge d-flex justify-content-start align-items-center px-4 my-4">
                              <div className="bg-warning w-45px h-45px rounded-circle d-flex justify-content-center align-items-center text-light fs-3">
                                2
                              </div>
                              <div className="mx-2">إدارة 2</div>
                            </div>
                            <div className="timeline-badge d-flex justify-content-start align-items-center px-4 my-4">
                              <div className="bg-danger w-45px h-45px rounded-circle d-flex justify-content-center align-items-center text-light fs-3">
                                3
                              </div>
                              <div className="mx-2">ادارة 3</div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-2 my-1">
                          <div className="timeline-item">
                            <div className="timeline-badge d-flex justify-content-start align-items-center px-4 my-4">
                              <div className="bg-primary w-45px h-45px rounded-circle d-flex justify-content-center align-items-center text-light fs-3">
                                1
                              </div>
                              <div className="mx-2">ادارة 1</div>
                            </div>
                            <div className="timeline-badge d-flex justify-content-start align-items-center px-4 my-4">
                              <div className="bg-warning w-45px h-45px rounded-circle d-flex justify-content-center align-items-center text-light fs-3">
                                2
                              </div>
                              <div className="mx-2">إدارة 2</div>
                            </div>
                            <div className="timeline-badge d-flex justify-content-start align-items-center px-4 my-4">
                              <div className="bg-danger w-45px h-45px rounded-circle d-flex justify-content-center align-items-center text-light fs-3">
                                3
                              </div>
                              <div className="mx-2">ادارة 3</div>
                            </div>
                            <div className="timeline-badge d-flex justify-content-start align-items-center px-4 my-4">
                              <div className="bg-success w-45px h-45px rounded-circle d-flex justify-content-center align-items-center text-light fs-3">
                                4
                              </div>
                              <div className="mx-2">إدارة 4</div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
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
                      {intl.formatMessage({ id: "Accept" })}
                    </button>
                  </div>
                </Modal.Footer>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SpecifyRequest;
