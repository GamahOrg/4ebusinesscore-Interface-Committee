import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import { DeletePopup } from "../../partials/DeletePopup";
import { useState } from "react";
import React from "react";
import { CommitteeRootUrl } from "@4eplatform/shared/apis/committee";

type PopupProps = {
  show: boolean;
  handleClose: any;
  attachments: any;
  id: string;
};
function CommitteesReviewOutputEditAttachmentsPopup<PopupProps>({ show, handleClose, attachments, id }) {
  const intl = useIntl();

  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [filteredAttach, setFilteredAttach] = useState(attachments);
  const [selectedFile, setSelectedFile] = useState<string>("");

  const showSuccessAlert = () => {
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: "SavedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };

  const handleDelete = (file: string) => {
    setFilteredAttach(filteredAttach.filter((attach) => attach != file));
  };
  return (
    <>

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
            <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
              <Modal.Title id="contained-modal-title-vcenter">
                <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
                  <span className="card-label fs-4 my-5">{intl.formatMessage({ id: "EditOutputAttachments" })}</span>
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>
        </div>

        <div className="tab-content">
          <div className="tab-pane fade active show" id="REGA_table_widget_5_tab_1">
            <form
              className="form outputForm"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Modal.Body className="pb-0 mx-4">
                <div className="row gy-5 pb-5">
                  <div className="col-12">
                    <div>
                      <label htmlFor="requestToEditTheReport">{intl.formatMessage({ id: "EditTheOutput" })}</label>
                      <textarea
                        name="requestToEditTheReport"
                        id="requestToEditTheReport"
                        placeholder={intl.formatMessage({
                          id: "EditTheOutput",
                        })}
                        className="form-control form-control-lg form-control-solid min-h-100px"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-12">
                    <span className="mb-1">{intl.formatMessage({ id: "Attachments" })}</span>
                    <div className="border-dashed border-primary border-2 rounded-2">
                      <label className="bg-light-primary w-100 p-5" htmlFor="reportFiles">
                        <div className="d-flex align-items-center">
                          <span>
                            <img src={`/media/pmo/uploadFile.png`} width={"30px"} height={"40px"} />
                          </span>
                          <div className="d-flex flex-column mx-4">
                            <span className="text-primary">{intl.formatMessage({ id: "QuickFileUploader" })}</span>
                            <span className="text-dark">
                              {intl.formatMessage({
                                id: "DragAndDropOrChooseFilesFromComputer",
                              })}
                            </span>
                          </div>
                        </div>
                      </label>
                      <input type="file" hidden id="reportFiles" className="form-control form-control-lg form-control-solid" />
                    </div>
                  </div>

                  <div>
                    {intl.formatMessage({
                      id: "DocumentsAndDocumentsAttachments",
                    })}
                  </div>
                  <div className="d-flex flex-wrap">
                    {filteredAttach?.map((file: any) => (
                      <div className="d-flex align-items-center mx-3 flex-shrink-0" key={Math?.random()}>
                        <img
                          src={
                            file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".jpeg") || file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".jpg") || file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".png")
                              ? `${CommitteeRootUrl}${file}`
                              : file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".pdf")
                                ? "/media/pmo/pdfIcon.png"
                                : file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".doc") || file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".docx")
                                  ? "/media/pmo/docIcon.png"
                                  : file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".xlsx") || file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".xls")
                                    ? "/media/pmo/excelIcon.png"
                                    : "/media/pmo/pdfIcon.png"
                          }
                          width={"40px"}
                          height={"40px"}
                        />

                        <div className="d-flex flex-column mx-3 position-relative my-2 my-md-0">
                          <span>{file?.substring(file?.lastIndexOf("/") + 1)}</span>
                          <span className="d-flex">
                            <span className="text-primary mx-2 fs-7">احمد محمود</span>
                          </span>
                          <div
                            role="button"
                            onClick={() => {
                              setSelectedFile(file);
                              setModalDShow(true);
                            }}
                            className="position-absolute cursor-pointer bg-danger rounded-circle text-white"
                            style={{
                              top: "0",
                              right: intl?.locale == "ar" ? "100%" : "",
                              left: intl?.locale == "en" ? "100%    " : "",
                            }}
                          >
                            <i className="fas fa-xmark fa-fw"></i>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="justify-content-center pb-5 pt-3 border-top-0">
                <div className="d-flex justify-content-center my-5">
                  <button
                    type="reset"
                    onClick={handleClose}
                    className="btn btn-secondary px-15 me-5"
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <button
                    type="submit"
                    onClick={() => {
                      handleClose();
                      showSuccessAlert();
                    }}
                    className="btn btn-success px-15 ms-5"
                  >
                    {intl.formatMessage({ id: "Save" })}
                  </button>
                </div>
              </Modal.Footer>
            </form>
          </div>
        </div>
        <div
          className="modal fade"
          aria-hidden="true"
        >
          <DeletePopup showDelete={modalDShow} handleCloseDelete={() => setModalDShow(false)} data={selectedFile} handleDelete={handleDelete} />
        </div>
      </Modal>
    </>
  );
}

export default CommitteesReviewOutputEditAttachmentsPopup;
