import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import Swal from "sweetalert2";
import React from "react";

function CommitteesReviewReportDetailsEditPopup() {
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
    <div className="modal-dialog modal-dialog-centered mw-850px">
      <div className="modal-content">
        <div className="modal-header justify-content-end border-0 pb-0">
          <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
            <KTSVG path="/media/icons/duotune/arrows/arr061.svg" className="svg-icon-1" />
          </div>
        </div>

        <div className="card card-xl-stretch mb-xl-0">
          <div className="text-center">
            <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
              <span className="card-label fs-4 my-5"> {intl.formatMessage({ id: "RequestEditReport" })}</span>
              <span className="mt-1 fw-semibold fs-6 text-muted my-5">{intl.formatMessage({ id: "PleaseEnterTheFollowingData" })} </span>
            </h3>
          </div>
        </div>

        <div className="card-body py-3 px-3 mx-2 mx-md-8">
          <div className="tab-content">
            <div className="tab-pane fade active show" id="REGA_table_widget_5_tab_1">
              <form
                noValidate
                className="form outputForm"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="row gy-5 pb-4">
                  <div className="col-12">
                    <div>
                      <label htmlFor="requestToEditTheReport">{intl.formatMessage({ id: "RequestForEdit" })}</label>
                      <textarea name="requestToEditTheReport" id="requestToEditTheReport" placeholder={intl.formatMessage({ id: "RequestForEdit" })} className="form-control form-control-lg form-control-solid min-h-150px"></textarea>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center my-5">
                  <button type="reset" data-bs-dismiss="modal" aria-hidden="true" className="btn btn-secondary px-15 me-5">
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    onClick={(event) => {
                      event.preventDefault();
                      showSuccessAlert();
                    }}
                    className="btn btn-success px-15 ms-5"
                  >
                    {intl.formatMessage({ id: "Send" })}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommitteesReviewReportDetailsEditPopup;
