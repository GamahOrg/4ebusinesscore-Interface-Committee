import { FC, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "../../partials/DeletePopup";
import CommitteesReviewMeetingAddMeetingToOutput from "../popup/committees-review-meeting-add-meeting-output-popup";
import { CommitteReviewMembersTable } from "./CommitteReviewMembersTable";
import React from "react";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import { useParams } from "react-router-dom";
import { getMeetingById } from "../../../features/meeting/meetingSlice";
import { CommitteeRootUrl } from "@4eplatform/shared/apis/committee";
import moment from "moment";
import "moment-timezone";
import { getUserById } from "../../../features/committee/usersAggregatorSlice";
const CommitteesReviewMeetingOutputDetailsContent: FC = () => {
  const intl = useIntl();
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const { id } = useParams();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const getIconSrc = (attachmentUrl: string) => {
    const fileName = attachmentUrl?.substring(
      attachmentUrl.lastIndexOf("/") + 1
    );

    if (
      fileName?.endsWith(".png") ||
      fileName?.endsWith(".jpg") ||
      fileName?.endsWith(".jpeg")
    ) {
      return `${CommitteeRootUrl}${attachmentUrl}`;
    } else if (fileName?.endsWith(".pdf")) {
      return "/media/pmo/pdfIcon.png";
    } else if (fileName?.endsWith(".doc") || fileName?.endsWith(".docx")) {
      return "/media/pmo/wordIcon2.jpg";
    } else if (fileName?.endsWith(".xls") || fileName?.endsWith(".xlsx")) {
      return "/media/pmo/excelIcon2.jpg";
    } else if (fileName?.endsWith(".txt")) {
      return "/media/pmo/textIcon.png";
    }
  };
  let dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getMeetingById(id as string) as any);
    }
  }, [id]);
  const meeting = useAppSelector((state: RootState) => {
    return state?.meetings?.meeting;
  });
  useEffect(() => {
    dispatch(getUserById(meeting?.createdBy as string) as any);
  }, [meeting]);
  const meetingCreation = useAppSelector((state: RootState) => {
    return state?.usersAgg?.user;
  });
  return (
    <>
      <div className="card">
        <div className="card-body d-flex justify-content-between align-items-center pb-0">
          <div className="card-title d-flex flex-column align-items-start">
            <span className="fs-3 mb-2">
              {intl.formatMessage({ id: "ViewMeetingDetails" })}
            </span>
          </div>
        </div>
        <div className="card-body">
          <div>
            <div className="row gy-5">
              <div className="col-md-4">
                <div className="d-flex flex-column">
                  <span className="">
                    {intl.formatMessage({ id: "MeetingName" })}
                  </span>
                  <span className="text-gray-600">{meeting?.name}</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex flex-column">
                  <span className="">
                    {intl.formatMessage({ id: "DateAndTimeOfTheMeeting" })}
                  </span>
                  <div className="d-flex text-gray-600">
                    {moment(meeting?.meetingDate).format("YYYY-MM-DD") +
                      " " +
                      intl.formatMessage({ id: "IN" }) +
                      " " +
                      moment
                        .tz(meeting?.meetingDate, "UTC")
                        .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
                        .format("LT")}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex flex-column">
                  <span>
                    <span>
                      {" "}
                      <span>
                        <i className="fas fa-map-marker-alt fa-fw fa-lg text-primary"></i>
                      </span>
                      {intl.formatMessage({ id: "MeetingLocation" })}
                    </span>
                  </span>
                  <span className="text-gray-600">{meeting?.location}</span>
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="reportNotice" className="mb-2 text-primary">
                  {" "}
                  {intl.formatMessage({ id: "MeetingItems" })}
                </label>
                <div className="border border-1 py-4 rounded-2">
                  <ul className="mb-0">
                    <li className="mb-2">{meeting?.rules}</li>
                  </ul>
                </div>
              </div>

              <div>{intl.formatMessage({ id: "Attachments" })}</div>
              <div className="col-12 mt-1">
                <div className="d-flex align-items-center flex-wrap">
                  {meeting?.attachments.map((attachment,index:number) => {
                    return (
                      <a
                      key={index}
                        className="d-flex align-items-center mx-2 mb-3"
                        href={`${CommitteeRootUrl}${attachment}`}
                        download
                        target="_blank"
                      >
                        <span>
                          <img
                            src={`${getIconSrc(attachment)}`}
                            width={"40px"}
                            height={"40px"}
                          />
                        </span>
                        <p className="mx-3">
                          {attachment?.split("/")?.slice(-1)[0]}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="col-12">
                <div>
                  <CommitteReviewMembersTable
                    members={meeting?.externalMeetingMembers?.concat(
                      meeting?.internalMeetingMembers?.map((member) => ({
                        id: member?.userId,
                        name: member?.fullName,
                        phoneNumber: "",
                        job:
                          intl.locale == "ar"
                            ? member?.jobNameAr
                            : member?.jobNameEn,
                        destinationName: "",
                        email: member?.email,
                        permissionNameAr: member?.permissionNameAr,
                        permissionNameEn: member?.permissionNameEn,
                      }))
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" aria-hidden="true">
          <DeletePopup
            handleCloseDelete={handleCloseDelete}
            showDelete={showDelete}
          />
        </div>
      </div>
      <div
        className="modal fade"
        id="Rega_modal_AddSessionToOutput"
        aria-hidden="true"
      >
        <CommitteesReviewMeetingAddMeetingToOutput
          show={modalShow}
          handleClose={() => setModalShow(false)}
        />
      </div>
    </>
  );
};

export { CommitteesReviewMeetingOutputDetailsContent };
