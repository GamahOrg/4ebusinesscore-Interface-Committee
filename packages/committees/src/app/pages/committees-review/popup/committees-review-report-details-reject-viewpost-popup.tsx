import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import React from "react";

type AddPopupProps = {
  show: boolean;
  handleClose: any;
};
function CommitteesReviewReportDetailsRejectViewPostPopup<AddPopupProps>({ show, handleClose }) {
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
          <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
            <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
              <span className="card-label fs-4 my-5"> {intl.formatMessage({ id: "SpecialApprovalsReports" })}</span>
              <span className="mt-1 fw-semibold fs-6 text-muted my-5">{intl.formatMessage({ id: "PleaseEnterTheFollowingData" })} </span>
            </h3>
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
            <Modal.Body className="pb-0 mx-2">
              <div className="row gy-5 pb-4">
                <div className="col-12">
                  <div>
                    <span className="text-danger">{intl.formatMessage({ id: "ReasonForRejection" })}</span>
                    <div
                      className="bg-gray-100 p-3 mt-2 rounded-2"
                    >
                      تعتبر مهنة الخدمة الاجتماعية بمعناها الحديث وليدة القرن العشرين، فهي تعد مهنة حديثة النشأة والتكوين ولكن الشذرات الأولى لظهورها تعود إلى بداية التاريخ البشري، فمنذ القدم والناس تسعى بشكل وظيفي متكامل إلى التعاون وتقديم الخدمات الاجتماعية لبعضها البعض، حيث كانت للدوافع الدينية والإنسانية دورا كبير في تقديم المساعدات للضعفاء
                      والعجزة والمحتاجين من أفراد المجتمع، ولقد كانت نشاطات الرعاية الاجتماعية التي مارستها الجماعات والمجتمعات الإنسانية منذ فجر التاريخ هي البذور الأولى التي نبتت عنها المهنة، حيث كان ظهورها كمهنة متخصصة نتيجة لتجارب عديدة وجهود متواصلة في مواجهة المشكلات الإنسانية، والتغيرات السريعة التي صاحبت الثورة الصناعية وتعقد الحياة والضغوط
                      المتزايدة
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex">
                  <div className="w-50px h-50px">
                    <img src={`/media/avatars/300-3.jpg`} className="w-100 rounded-3" alt="profile" />
                  </div>
                  <form
                    style={{
                      marginRight: intl?.locale == "ar" ? ".5rem" : "",
                      marginLeft: intl?.locale == "en" ? ".5rem" : "",
                    }}
                    className="position-relative w-100"
                  >
                    <textarea
                      style={{
                        paddingLeft: intl?.locale == "ar" ? "105px" : ".75rem",
                        paddingRight: intl?.locale == "ar" ? ".75rem" : "105px",
                      }}
                      className="form-control border-1 min-h-30px fs-6"
                      rows={2}
                      placeholder={intl.formatMessage({
                        id: "WriteAComment",
                      })}
                    ></textarea>
                    <div
                      className="position-absolute d-flex translate-middle-y"
                      style={{
                        left: intl?.locale == "ar" ? "10px" : "",
                        top: "50%",
                        right: intl?.locale == "en" ? "10px" : "",
                      }}
                    >
                      <label htmlFor="file-upload" className="d-flex justify-content-center align-items-center bg-secondary w-35px h-35px rounded-circle" role="button">
                        <i className="fa-solid fa-paperclip mx-1 fs-3 fa-fw text-gray-600"></i>
                      </label>
                      <input hidden type="file" id="file-upload" name="file-upload" />
                      <label className={`d-flex justify-content-center align-items-center bg-secondary w-35px h-35px rounded-circle mx-3`} role="button">
                        <i className={`fa-regular fa-paper-plane fs-3 fa-fw text-gray-600  ${intl?.locale == "ar" ? "fa-flip-horizontal" : ""}`}></i>
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center pb-3 pt-1 border-top-0">
              <div className="d-flex justify-content-center my-5">
                <button
                  type="reset"
                  onClick={() => {
                    handleClose();
                  }}
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
                  className="btn btn-primary px-15 ms-5"
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

export default CommitteesReviewReportDetailsRejectViewPostPopup;
