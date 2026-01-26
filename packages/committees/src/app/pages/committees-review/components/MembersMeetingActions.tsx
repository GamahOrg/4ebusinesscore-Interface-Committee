import React, { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Dropdown } from "react-bootstrap";
import { AcceptMemberPopup } from "../popup/accept-member-popup";
import RejectMemberPopup from "../popup/reject-member-popup";
import CommitteesReviewReportDetailsEditViewPostPopup from "../popup/committees-review-report-details-edit-viewPost-popup";
import { ReservationMemberPopup } from "../popup/reservation-member-popup";

type ActionProps = {
  id: string;
  proceedingId: string;
  proceedingAcceptance: number;
};

export const MembersMeetingActions: FC<ActionProps> = ({
  id,
  proceedingId,
  proceedingAcceptance,
}) => {
  const intl = useIntl();
  const [rejectShow, setRejectShow] = useState<boolean>(false);
  const [acceptShow, setAcceptShow] = useState<boolean>(false);
  const [editShow, setEditShow] = useState<boolean>(false);
  const [reservationShow, setReservationShow] = useState<boolean>(false);
  return (
    <>
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            <i className="bi bi-three-dots fs-4"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu className="menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-135px py-3">
            <Dropdown.Item
              className="px-3 text-danger"
              onClick={() => {
                setRejectShow(true);
              }}
            >
              <i className="fa-solid fa-xmark mx-3"></i>
              {intl.formatMessage({ id: "Reject" })}
            </Dropdown.Item>
            <Dropdown.Item
              className="px-3 text-success"
              onClick={() => {
                setAcceptShow(true);
              }}
            >
              <i className="fa-solid fa-check mx-3"></i>
              {intl.formatMessage({ id: "Accept" })}
            </Dropdown.Item>
            <Dropdown.Item
              className="px-3 text-primary"
              onClick={() => {
                setReservationShow(true);
              }}
            >
              <i className="bi bi-incognito mx-3"></i>
              {/* <i className="fa-solid fa-check mx-3"></i> */}
              {intl.formatMessage({ id: "Reservation" })}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="modal fade" aria-hidden="true">
        <AcceptMemberPopup
          handleClose={() => setAcceptShow(false)}
          show={acceptShow}
          id={id}
          proceedingId={proceedingId}
        />
      </div>
      <div className="modal fade" aria-hidden="true">
        <ReservationMemberPopup
          handleClose={() => setReservationShow(false)}
          show={reservationShow}
          id={id}
          proceedingId={proceedingId}
        />
      </div>
      <div className="modal fade" aria-hidden="true">
        <RejectMemberPopup
          handleClose={() => setRejectShow(false)}
          show={rejectShow}
          id={id}
          proceedingId={proceedingId}
        />
      </div>

      <div className="modal fade" aria-hidden="true">
        <CommitteesReviewReportDetailsEditViewPostPopup
          handleClose={() => setEditShow(false)}
          show={editShow}
          id={id}
          proceedingId={proceedingId}
        />
      </div>
    </>
  );
};
