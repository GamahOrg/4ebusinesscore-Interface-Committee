import { useIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import { useAppDispatch } from "../../../store/store";
import {
  getProceedingById,
  putProceedingMemberAcceptance,
} from "../../../features/procceding/proceedingSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type AddPopupProps = {
  show: boolean;
  handleClose: any;
  id: string;
  proceedingId?: string;
};
function RejectMemberPopup<AddPopupProps>({
  show,
  handleClose,
  id,
  proceedingId,
}) {
  const intl = useIntl();

  let dispatch = useAppDispatch();
  let [message, setMessage] = useState("");
  let handleRejectMeetingMember = (id) => {
    let data = {
      proceedingId,
      proceedingAcceptance: 2,
      acceptanceMessage: message,
      memberId: id,
    };
    dispatch(putProceedingMemberAcceptance(data) as any).then((res) => {
      if (res?.payload?.statusEnum == 1) {
        showSuccessAlert(true, "RejectedSuccessfully", intl, () => {
          dispatch(getProceedingById(proceedingId) as any);
        });

        setMessage("");
      } else {
        showSuccessAlert(false, res?.payload?.message, intl);
      }
    });
  };
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
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
              <span className="card-label fs-4 my-5">
                {" "}
                {intl.formatMessage({ id: "SpecialApprovalsReports" })}
              </span>
              <span className="mt-1 fw-semibold fs-6 text-muted my-5">
                {intl.formatMessage({ id: "PleaseEnterTheFollowingData" })}{" "}
              </span>
            </h3>
          </div>
        </Modal.Header>
      </div>

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
            <Modal.Body className="pb-0 mx-2">
              <div className="row gy-5 pb-4">
                <div className="col-12">
                  <div>
                  </div>
                  <div>
                    <label
                      htmlFor="ReasonForRejection"
                      className="px-2 mb-3 text-danger"
                    >
                      {intl.formatMessage({ id: "ReasonForRejection" })}
                    </label>
                    <textarea
                      onChange={(e) => {
                        setMessage(e?.target?.value);
                      }}
                      placeholder={intl.formatMessage({
                        id: "ReasonForRejection",
                      })}
                      value={message}
                      className="form-control form-control-solid mb-3 mb-lg-0 min-h-100px"
                      id="ReasonForRejection"
                    ></textarea>
                  </div>
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
                    handleRejectMeetingMember(id);
                    handleClose();
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

export default RejectMemberPopup;
