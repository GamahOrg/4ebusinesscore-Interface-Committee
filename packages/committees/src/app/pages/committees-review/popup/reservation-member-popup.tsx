import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Modal, Row } from "react-bootstrap";
import React from "react";
import { useAppDispatch } from "../../../store/store";
import {
  getProceedingById,
  putProceedingMemberAcceptance,
} from "../../../features/procceding/proceedingSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type PopupProps = {
  show: boolean;
  handleClose: any;
  id?: number | string;
  proceedingId?: string;
};
export const ReservationMemberPopup: FC<PopupProps> = ({
  show,
  handleClose,
  id,
  proceedingId,
}) => {
  const intl = useIntl();
  let dispatch = useAppDispatch();
  let [message, setMessage] = useState("");

  let handleAcceptMeetingMember = (id) => {
    let data = {
      proceedingId,
      proceedingAcceptance: 3,
      acceptanceMessage: message,
      memberId: id,
    };
    dispatch(putProceedingMemberAcceptance(data) as any).then((res) => {
      if (res?.payload?.statusEnum == 1) {
        showSuccessAlert(true, "ReservedSuccessfully", intl, () => {
          dispatch(getProceedingById(proceedingId) as any);
        });
        setMessage("");
      } else if (res?.payload?.message) {
        showSuccessAlert(false, res?.payload?.message, intl);
      }
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
          className="pb-0 border-bottom-0"
        >
          <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
            <Row className="justify-content-center mt-5 mb-10">
              <Modal.Title id="contained-modal-title-vcenter">
                <div className="text-center">
                  <h3>
                    {intl.formatMessage({ id: "ReservationConfirmation" })}
                  </h3>
                </div>
              </Modal.Title>
            </Row>
          </div>
        </Modal.Header>

        <Modal.Body className="pb-0 mx-2">
          <div className="row gy-5 pb-4">
            <div className="col-12">
              <div></div>
              <div>
                <label
                  htmlFor="ReasonForReservation"
                  className="px-2 mb-3 text-primary"
                >
                  {intl.formatMessage({ id: "ReasonForReservation" })}
                </label>
                <textarea
                  onChange={(e) => {
                    setMessage(e?.target?.value);
                  }}
                  placeholder={intl.formatMessage({
                    id: "ReasonForReservation",
                  })}
                  value={message}
                  className="form-control form-control-solid mb-3 mb-lg-0 min-h-100px"
                  id="ReasonForReservation"
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>

        <div className="row">
          <div className="col-12 col-lg-7 mx-auto mb-12 mt-5">
            <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
              <Modal.Footer className="w-100 justify-content-center pb-0 pt-2 border-top-0">
                <div className="d-flex justify-content-center align-items-center w-100">
                  <button
                    type="reset"
                    className="btn btn-secondary me-3 w-100"
                    onClick={handleClose}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>

                  <button
                    type="submit"
                    onClick={() => {
                      handleAcceptMeetingMember(id);
                      handleClose();
                    }}
                    className="  btn btn-success me-5 w-100 "
                  >
                    <span className="indicator-label">
                      {intl.formatMessage({ id: "Acceptance" })}
                    </span>
                    <span className="indicator-progress">
                      {intl.formatMessage({ id: "Acceptance" })}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{" "}
                    </span>
                  </button>
                </div>
              </Modal.Footer>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
