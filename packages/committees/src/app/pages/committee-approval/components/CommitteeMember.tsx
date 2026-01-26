import { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestTimeline } from "../../../features/Approvals/committeeApprovalRequestTimelineSlice";
import { RootState } from "../../../store/store";
import { useParams } from "react-router";
import { DynamicWorkflowAggRootUrl } from "@4eplatform/shared/apis/dynamic_workflow_agg";
import moment from "moment";
import React from "react";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
const CommitteeMember = ({ requestId, committee }: any) => {
  const intl = useIntl();
  let { id } = useParams();
  const dispatch = useDispatch();

  const requestTimeline = useSelector((state: RootState) => {
    return state?.committeeApprovalRequestTime?.data;
  });

  useEffect(() => {
    if (requestId !== "00000000-0000-0000-0000-000000000000") {
      dispatch(fetchRequestTimeline({ id: requestId }) as any);
    }
  }, [id, requestId, committee]);

  return (
    <>
      {requestTimeline?.requestTimeLine?.map((item: any, index: any) => {
        return (
          <Fragment key={Math.random()}>
            <div className="row">
              <div className="">
                <div className="timeline-label">
                  <div className="timeline-item">
                    <div className="timeline-label fw-bold text-gray-800 fs-6"></div>
                    <div className="timeline-badge px-4 my-8">
                      <img
                        alt={""}
                        src={
                          requestTimeline?.transactions[index]?.userImage
                            ? `${DynamicWorkflowAggRootUrl}${requestTimeline?.transactions[index]?.userImage}`
                            : "/media/avatars/user.jpg"
                        }
                        style={{ width: "64px", borderRadius: "50%" }}
                        onError={(e: any) =>
                          (e.target.src = toAbsoluteUrl(
                            `/media/avatars/user.jpg`,
                          ))
                        }
                      />
                    </div>
                    <div className="fw-mormal timeline-content text-muted ps-3 mx-5">
                      <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-4 col-12">
                          <div className="border border-gray-300 rounded min-w-125px py-3 px-4 me-6 mb-3 d-flex flex-column align-items-center justify-content-center">
                            <p className="text-dark fw-bolder">
                              {
                                <span className="name mb-2">
                                  {item?.actionTakerName}
                                  {item?.actionTakerType === 1 &&
                                    item?.actionTakerUserName &&
                                    " ( " +
                                      item?.actionTakerUserName?.split("@")[0] +
                                      " ) "}
                                </span>
                              }
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-4 col-12">
                          <div className="border border-gray-300 rounded min-w-125px py-3 px-4 me-6 mb-3 d-flex flex-column align-items-center justify-content-center">
                            <p className="text-primary fw-bolder">
                              {item?.receivedDate
                                ? moment(item?.receivedDate).format(
                                    "YYYY-MM-DD",
                                  )
                                : ""}
                            </p>
                            {item?.receivedDate ? (
                              <p className="text-muted mb-0">
                                {intl.formatMessage({ id: "ReceievingDate" })}
                              </p>
                            ) : (
                              <>
                                {intl.formatMessage({ id: "NotReceivedYet" })}
                              </>
                            )}
                          </div>
                        </div>

                        <div className="col-md-4 col-lg-4 col-sm-4 col-12">
                          <div className="border border-gray-300 rounded min-w-125px py-3 px-4 me-6 mb-3 d-flex flex-column align-items-center justify-content-center">
                            {" "}
                            {committee?.requestStatus === 0 && (
                              <>
                                <div className="badgex px-6 py-2 d-flex flex-column justify-content-center align-items-center  rounded badge-light-primary">
                                  {intl.formatMessage({ id: "UnderStudying" })}
                                  <p className="text-center mb-0 ">
                                    {committee?.createdOn
                                      ? moment(committee?.createdOn).format(
                                          "YYYY-MM-DD",
                                        )
                                      : ""}
                                  </p>
                                </div>
                              </>
                            )}
                            {committee?.requestStatus === 1 && (
                              <>
                                <div className="badgex px-6 py-2 d-flex flex-column justify-content-center align-items-center rounded badge-light-success w-100">
                                  {intl.formatMessage({ id: "Accepted" })}
                                  <p className="text-center mb-0 ">
                                    {committee?.createdOn
                                      ? moment(committee?.createdOn).format(
                                          "YYYY-MM-DD",
                                        )
                                      : ""}
                                  </p>
                                </div>
                              </>
                            )}
                            {committee?.requestStatus === 2 && (
                              <>
                                <div className="badgex px-6 py-2  d-flex flex-column justify-content-center align-items-center rounded badge-light-danger">
                                  {intl.formatMessage({ id: "Rejected" })}
                                  <p className="text-center mb-0 ">
                                    {committee?.createdOn
                                      ? moment(committee?.createdOn).format(
                                          "YYYY-MM-DD",
                                        )
                                      : ""}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="row mb-9">
                          <div className="col-md-4 col-lg-4 col-sm-4 col-12">
                            <div className="border border-gray-300 rounded min-w-125px py-3 px-4 me-6 mb-3 d-flex flex-column align-items-center justify-content-center">
                              <p className="mb-0 py-2 fw-bolder text-dark">
                                {" "}
                                <i className="fa fa-genderless text-warning fs-5"></i>{" "}
                                {/* ملاحظة: العمل على زيادة الوعى{" "} */}
                                {requestTimeline?.transactions[index]?.comment
                                  ? requestTimeline?.transactions[index]
                                      ?.comment
                                  : intl.formatMessage({ id: "NoComment" })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};
export { CommitteeMember };
