import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { CommitteeRootUrl } from "@4eplatform/shared/apis/committee";
import React from "react";
import moment from "moment-timezone";
import { getOutputsByCommitteeId } from "../../../features/outputs/outputSlice";
import { Accordion } from "react-bootstrap";
import { useLocation } from "react-router-dom";

interface CommitteesReviewTabReportsProps {
  tabState?: any;
}
const CommitteesReviewTabOutputs: React.FC<CommitteesReviewTabReportsProps> = ({
  tabState,
}) => {
  const intl = useIntl();

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  const Outputs = useSelector((state: RootState) => {
    return state?.committeeOutputs?.outputs;
  });
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        try {
          await dispatch(getOutputsByCommitteeId(id) as any);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id, dispatch]);

  const EN_LANG = "en";
  let selectedLang = localStorage.getItem("i18nConfig");
  try {
    if (selectedLang) {
      selectedLang = JSON.parse(selectedLang).selectedLang;
    } else {
    }
  } catch (err) {}

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
                {Outputs?.length ? (
                  <>
                    <span>{intl.formatMessage({ id: "ViewAllOutputs" })}</span>
                    <span className="text-gray-500">
                      <span>{Outputs?.length}</span>
                      <span className="mx-2">
                        {intl.formatMessage({ id: "Outputs" })}
                      </span>
                    </span>
                  </>
                ) : (
                  <span>{intl.formatMessage({ id: "NotYetOutputs" })}</span>
                )}
              </div>
              {localStorage.getItem(
                "isCommitteeMemberHasPersedirentOrSecretaryPermissions",
              ) == "true" ? (
                <>
                  <Link
                    to={`/committees-review/add-output/${id}`}
                    state={{
                      serviceName: cardTitle,
                      tabState,
                    }}
                    className="btn btn-primary"
                  >
                    {intl.formatMessage({ id: "AddOutput" })}
                  </Link>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        {Outputs?.map((output: any, index) => {
          return (
            <Accordion defaultActiveKey={`${index + 1}`} key={index}>
              <Accordion.Item
                eventKey={output.id}
                className={`standards-accordion-button ${
                  index != 0 ? "mt-5" : "mb-3"
                }`}
                key={index}
              >
                <Accordion.Header
                  className={`border-${
                    selectedLang == EN_LANG ? "start" : "end"
                  } d-flex
                    fs-4 fw-bold collapsed committees-accordion`}
                >
                  <div
                    className="accordion-button fs-4 fw-bold collapsed bg-light-success custom-button"
                    // type="button"
                  >
                    <div className="d-flex justify-content-between w-100">
                      <div className="d-flex align-items-center">
                        <span className="symbol symbol-circle symbol-40px">
                          <span className="svg-icon svg-icon-white svg-icon-2hx ms-n1 flex-grow-1 text-success">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                opacity="0.3"
                                d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </span>
                        </span>
                        <div className="mx-3 d-flex flex-column">
                          <span
                            style={{ textAlign: "right" }}
                            className="mb-4 fs-5"
                          >
                            {output?.name}
                          </span>
                          <span className="text-gray-500 fs-7">
                            {output?.fullName}
                          </span>
                        </div>
                      </div>
                      <div className="text-success fs-6 d-flex align-items-center">
                        <span>
                          <i className="far fa-calendar-alt fa-fw fs-5"></i>
                        </span>
                        <span className="mx-2 text-gray-500">
                          {moment(output?.createdOn).format("YYYY-MM-DD")}
                        </span>
                        <span className="mx-2">
                          <i className="bi bi-stopwatch fs-5"></i>
                        </span>
                        <span className="text-gray-500">
                          {moment
                            .tz(output?.createdOn, "UTC")
                            .tz(
                              Intl.DateTimeFormat().resolvedOptions().timeZone,
                            )
                            .format("LT")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    <div className="timeline">
                      <div className="timeline-item">
                        <div
                          style={{ right: intl.locale == "ar" ? "12.5px" : "" }}
                          className="timeline-line w-40px"
                        ></div>
                        <div className="timeline-icon symbol symbol-circle symbol-40px me-4">
                          <div className="symbol-label bg-light-success text-success">
                            <i className="fas fa-envelope">
                              <span className="path1"></span>
                              <span className="path2"></span>
                              <span className="path3"></span>
                            </i>
                          </div>
                        </div>
                        <div className="timeline-content mb-10 mt-n1">
                          <div className="pe-3 mb-5">
                            <div className="fs-5 fw-semibold mb-2 text-success">
                              {intl.formatMessage({ id: "OutputDetails" })}
                            </div>
                            <div className="d-flex align-items-center mt-1 fs-6">
                              <div className="text-gray-500 me-2 fs-7">
                                {output?.details}
                              </div>
                            </div>
                          </div>
                          <div className="border border-gray-300 rounded-2 p-4 mt-4 w-100">
                            <div className="d-flex justify-content-between px-5 flex-column flex-md-row">
                              <div className="d-flex flex-column align-items-center mb-2 mb-md-0">
                                <span className="text-gray-500">
                                  {intl.formatMessage({ id: "OutputNumber" })}
                                </span>
                                <span className="fs-7">
                                  {output?.outputNumber}
                                </span>
                              </div>
                              {/* <div className="d-flex flex-column align-items-center">
                                <span className="text-gray-500">
                                  {moment
                                    .tz(output?.createdOn, "UTC")
                                    .tz(
                                      Intl.DateTimeFormat().resolvedOptions()
                                        .timeZone
                                    )
                                    .format("LT")}{" "}
                                </span>
                                <span className="fs-7">
                                  {moment(output?.createdOn).format(
                                    "YYYY-MM-DD"
                                  )}
                                </span>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="timeline-item">
                        <div
                          style={{ right: intl.locale == "ar" ? "12.5px" : "" }}
                          className="timeline-line w-40px"
                        ></div>
                        <div className="timeline-icon symbol symbol-circle symbol-40px me-4">
                          <div className="symbol-label bg-light-primary">
                            <i className="fas fa-envelope text-primary">
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
                                <div className="text-primary d-flex align-items-center justify-content-end my-1 p-1"></div>
                                <div
                                  style={{ overflow: "auto" }}
                                  className="border border-gray-300 rounded-2 p-4 w-100"
                                >
                                  <div className="d-flex flex-wrap">
                                    {output?.attachments?.map(
                                      (file: any, index: number) => (
                                        <div
                                          className="d-flex my-2 align-items-center mx-3 flex-shrink-0"
                                          key={index}
                                        >
                                          <a
                                            href={`${CommitteeRootUrl}${file}`}
                                            target="_blank"
                                            download
                                            className="d-flex align-items-center"
                                          >
                                            <img
                                              src={
                                                file
                                                  ?.substring(
                                                    file?.lastIndexOf("/") + 1,
                                                  )
                                                  ?.endsWith(".jpeg") ||
                                                file
                                                  ?.substring(
                                                    file?.lastIndexOf("/") + 1,
                                                  )
                                                  ?.endsWith(".jpg") ||
                                                file
                                                  ?.substring(
                                                    file?.lastIndexOf("/") + 1,
                                                  )
                                                  ?.endsWith(".png")
                                                  ? `${CommitteeRootUrl}${file}`
                                                  : file
                                                      ?.substring(
                                                        file?.lastIndexOf("/") +
                                                          1,
                                                      )
                                                      ?.endsWith(".pdf")
                                                  ? "/media/pmo/pdfIcon.png"
                                                  : file
                                                      ?.substring(
                                                        file?.lastIndexOf("/") +
                                                          1,
                                                      )
                                                      ?.endsWith(".doc") ||
                                                    file
                                                      ?.substring(
                                                        file?.lastIndexOf("/") +
                                                          1,
                                                      )
                                                      ?.endsWith(".docx")
                                                  ? "/media/pmo/docIcon.png"
                                                  : file
                                                      ?.substring(
                                                        file?.lastIndexOf("/") +
                                                          1,
                                                      )
                                                      ?.endsWith(".xlsx") ||
                                                    file
                                                      ?.substring(
                                                        file?.lastIndexOf("/") +
                                                          1,
                                                      )
                                                      ?.endsWith(".xls")
                                                  ? "/media/pmo/excelIcon.png"
                                                  : "/media/pmo/pdfIcon.png"
                                              }
                                              className="w-30px h-30px"
                                              alt="pdf"
                                            />
                                            <div className="d-flex flex-column mx-2">
                                              <span>
                                                {file?.substring(
                                                  file?.lastIndexOf("/") + 1,
                                                )}
                                              </span>
                                            </div>
                                          </a>
                                        </div>
                                      ),
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
                          style={{ right: intl.locale == "ar" ? "12.5px" : "" }}
                          className="timeline-line w-40px"
                        ></div>
                        <div className="timeline-icon symbol symbol-circle symbol-40px me-4">
                          <div className="symbol-label bg-light-warning">
                            <i className="fas fa-envelope text-warning">
                              <span className="path1"></span>
                              <span className="path2"></span>
                              <span className="path3"></span>
                            </i>
                          </div>
                        </div>
                        <div className="timeline-content mb-10 mt-n1">
                          <div className="pe-3 mb-5">
                            <div className="fs-5 fw-semibold mb-2 text-warning">
                              {intl.formatMessage({
                                id: "AssociatedMeetings",
                              })}
                            </div>
                            <div className="py-5 taskLogs">
                              <div className="table-responsive">
                                <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                  <thead>
                                    <tr className="fw-bolder text-muted">
                                      <th className="min-w-50px text-center">
                                        {intl.formatMessage({
                                          id: "CommitteesID",
                                        })}
                                      </th>
                                      <th className="min-w-150px text-center">
                                        {intl.formatMessage({
                                          id: "MeetingName",
                                        })}
                                      </th>
                                      <th className="min-w-150px text-center">
                                        {intl.formatMessage({
                                          id: "DateAndTime",
                                        })}
                                      </th>
                                      <th className="min-w-150px text-center">
                                        {intl.formatMessage({ id: "Place" })}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {output?.meetings?.map(
                                      (meet: any, index: number) => (
                                        <tr key={index}>
                                          <td className="text-center">
                                            {index + 1}
                                          </td>
                                          <td className="text-center">
                                            {meet?.name}
                                          </td>
                                          <td className="text-center">
                                            {moment(meet?.meetingDate).format(
                                              "YYYY-MM-DD",
                                            )}{" "}
                                            -
                                            {moment
                                              .tz(meet?.meetingDate, "UTC")
                                              .tz(
                                                Intl.DateTimeFormat().resolvedOptions()
                                                  .timeZone,
                                              )
                                              .format("LT")}
                                          </td>
                                          <td className="text-center">
                                            {meet?.location}
                                          </td>
                                        </tr>
                                      ),
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div className="timeline-item">
                        <div
                          style={{ right: intl.locale == "ar" ? "12.5px" : "" }}
                          className="timeline-line w-40px"
                        ></div>
                        <div className="timeline-icon symbol symbol-circle symbol-40px me-4">
                          <div className="symbol-label bg-light-success text-success">
                            <i className="fas fa-envelope">
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
                                <span className="mx-2">{output?.fullName}</span>
                              </div>
                              <div className="text-end text-md-start">
                                <span>
                                  <span className="mx-1">
                                    {moment
                                      .tz(output?.createdOn, "UTC")
                                      .tz(
                                        Intl.DateTimeFormat().resolvedOptions()
                                          .timeZone
                                      )
                                      .format("LT")}{" "}
                                  </span>
                                </span>
                                <span>
                                  <i className="far fa-clock fa-fw"></i>
                                </span>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mt-1 fs-6">
                              <div className="fs-7 w-100">
                                <div className="border border-gray-300 rounded-2 p-4 w-100 d-flex justify-content-end">
                                  <button
                                    onClick={() => window.print()}
                                    className="btn btn-primary w-150px d-flex align-items-center mx-1 justify-content-center"
                                  >
                                    <span>
                                      <i className="fas fa-print fa-fw fs-5 mx-1"></i>
                                    </span>
                                    <span>
                                      {intl.formatMessage({ id: "Print" })}
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          );
        })}
      </div>
    </>
  );
};

export { CommitteesReviewTabOutputs };
