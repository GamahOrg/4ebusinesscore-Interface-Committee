import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { AddPopup } from "../../partials/AddPopup";
import React from "react";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import { getMeetings } from "../../../features/meeting/meetingSlice";
import Accordion from "react-bootstrap/Accordion";
import { CommitteeRootUrl } from "@4eplatform/shared/apis/committee";
import moment from "moment";
import "moment-timezone";
import { useLocation } from "react-router-dom";

interface CommitteesReviewTabMeetingsProps {
  committeeId: string | any;
  tabState?: any;
  committeeDetails?: any;
}

const CommitteesReviewTabMeetings: React.FC<
  CommitteesReviewTabMeetingsProps
> = ({ committeeId, tabState, committeeDetails }) => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const [modalShow, setModalShow] = useState<boolean>(false);
  useEffect(() => {
    dispatch(getMeetings(committeeId) as any);
  }, [committeeId, dispatch]);
  let meetings = useAppSelector((state: RootState) => {
    return state?.meetings?.meetings;
  });
  const getIconSrc = (attachmentUrl: string) => {
    const fileName = attachmentUrl?.substring(
      attachmentUrl.lastIndexOf("/") + 1
    );

    if (
      fileName?.endsWith(".png") ||
      fileName?.endsWith(".jpg") ||
      fileName?.endsWith(".jpeg") ||
      fileName?.endsWith(".jfif") ||
      fileName?.endsWith(".webp")
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
    } else if (
      fileName?.endsWith(".mp4") ||
      fileName?.endsWith(".webm") ||
      fileName?.endsWith(".avi") ||
      fileName?.endsWith(".mkv") ||
      fileName?.endsWith(".flv") ||
      fileName?.endsWith(".ts")
    ) {
      return "/media/pmo/video.png";
    }
  };

  let location = useLocation();
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";
    
  return (
    <>
      <div className="card card-body">
        <div className="d-flex flex-column mb-5 pb-5">
          <div className="bg-gray-200 border-top-2 border-bottom-2 border-0 border-gray-300 border-dashed p-4">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column">
                <span>{intl.formatMessage({ id: "TheMeeting" })}</span>
                <span className="text-gray-500">
                  <span>{meetings?.length}</span>
                  <span className="mx-2">
                    {intl.formatMessage({ id: "Meeting" })}
                  </span>
                </span>
              </div>
              {localStorage.getItem(
                "isCommitteeMemberHasPersedirentOrSecretaryPermissions"
              ) === "true" ? (
                <>
                  <Link
                    to={`/committees-review/add-meeting/${committeeId}`}
                    state={{
                      serviceName: cardTitle,
                      tabState,
                      meetings: meetings[0]?.committeeDate,
                      committeeDetails,
                    }}
                    className="btn btn-primary"
                  >
                    {intl.formatMessage({ id: "AddNewMeeting" })}
                  </Link>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <Accordion defaultActiveKey="0">
          {meetings?.map((meeting, index) => {
            const dateTime = new Date(meeting?.meetingDate);
            const formattedDate = dateTime?.toLocaleDateString();
            const formattedTime = dateTime?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <Accordion.Item eventKey={(index + 1).toString()} key={index}>
                <Accordion.Header className="meeting-tab">
                  <div className="d-flex justify-content-between w-100" >
                    <div>
                      <span className="symbol symbol-circle symbol-40px text-light rounded-circle ">
                        <div className="symbol-label text-light-primary bg-primary">
                          {(index + 1).toString()}
                        </div>
                      </span>
                      <span className="mx-3">{meeting?.name}</span>
                    </div>
                    <div className="text-gray-600 fs-6 d-flex align-items-center">
                      <span>
                        <i className="far fa-calendar-alt fa-fw fs-5"></i>
                      </span>
                      <span className="mx-2">
                        {moment
                          .tz(meeting?.meetingDate, "UTC")
                          .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
                          .format("YYYY-MM-DD / hh:mm a")}
                      </span>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="timeline">
                    <div className="timeline-item">
                      <div
                        style={{ right: intl.locale === "ar" ? "12.5px" : "" }}
                        className="timeline-line w-40px"
                      ></div>
                      <div className="timeline-icon symbol symbol-circle symbol-40px me-4">
                        <div className="symbol-label bg-light-success text-success">
                          <i className="fa-solid fa-circle-info fs-4">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                          </i>
                        </div>
                      </div>
                      <div className="timeline-content mb-10 mt-n1">
                        <div className="pe-3 mb-5">
                          <Link
                            to={`/committee-review/meeting-details/${meeting?.id}`}
                            state={{
                              serviceName: cardTitle,
                            }}
                            className="fs-5 fw-semibold mb-2 text-success"
                          >
                            {intl.formatMessage({ id: "MeetingDetails" })}
                          </Link>
                          <div className="d-flex align-items-center mt-1 fs-6">
                            <div className="text-gray-500 me-2 fs-7">
                              {intl.formatMessage({
                                id: "PrivateDetailsAndData",
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div
                        style={{ right: intl.locale === "ar" ? "12.5px" : "" }}
                        className="timeline-line w-40px"
                      ></div>
                      <div className="timeline-icon symbol symbol-circle symbol-40px me-4">
                        <div className="symbol-label bg-light-primary">
                          <i className="fa-solid fa-paperclip text-primary fs-5">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                          </i>
                        </div>
                      </div>
                      <div className="timeline-content mb-10 mt-n1">
                        <div className="pe-3 mb-5">
                          <div className="fs-5 fw-semibold mb-2 text-primary">
                            {intl.formatMessage({
                              id: "DocumentsAndDocumentsAttachments",
                            })}
                          </div>
                          <div className="d-flex align-items-center mt-1 fs-6">
                            <div className="fs-7 w-100">
                              <div
                                style={{ overflow: "auto" }}
                                className="border border-gray-300 rounded-2 p-4 w-100"
                              >
                                <div className="d-flex">
                                  {meeting?.attachments?.length > 0 ? (
                                    meeting?.attachments?.map(
                                      (attachment, index) => {
                                        return (
                                          <div className="d-flex align-items-center mx-3 flex-shrink-0" key={index}>
                                            <a
                                              rel="noreferrer"
                                              className="d-flex align-items-center"
                                              href={`${CommitteeRootUrl}${attachment}`}
                                              download
                                              target="_blank"
                                            >
                                              <img
                                                src={getIconSrc(attachment)}
                                                className="w-30px h-30px"
                                                alt="pdf"
                                              />
                                              <span className="mx-2">
                                                {
                                                  attachment
                                                    ?.split("/")
                                                    ?.slice(-1)[0]
                                                }
                                              </span>
                                            </a>
                                          </div>
                                        );
                                      }
                                    )
                                  ) : (
                                    <>
                                      <p>
                                        {intl.formatMessage({
                                          id: "NoAttachments",
                                        })}
                                      </p>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div
                        style={{ right: intl.locale === "ar" ? "12.5px" : "" }}
                        className="timeline-line w-40px"
                      ></div>
                      <div className="timeline-icon symbol symbol-circle symbol-40px me-4">
                        <div className="symbol-label bg-light-success text-success">
                          <i className="fa-solid fa-user fs-4">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                          </i>
                        </div>
                      </div>
                      <div className="timeline-content mb-10 mt-n1">
                        <div className="pe-3 mb-5">
                          <div className="mb-2 text-gray-600 d-flex justify-content-between align-items-stretch align-items-md-center flex-column flex-md-row">
                            <div className="fs-5 fw-semibold mb-2 mb-md-0">
                              <span className="mx-2">{meeting?.fullName}</span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mt-1 fs-6">
                            <div className="fs-7 w-100">
                              <div className="border border-gray-300 rounded-2 p-4 w-100 d-flex justify-content-end flex-column flex-md-row">
                                {meeting?.rules}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
          <div>
            <div className="modal fade" id="sendmsg" aria-hidden="true">
              <AddPopup
                show={modalShow}
                handleClose={() => setModalShow(false)}
              />
            </div>
          </div>
        </Accordion>
      </div>
    </>
  );
};

export { CommitteesReviewTabMeetings };
