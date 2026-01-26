import React, { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestTimeline } from "../../../features/Approvals/committeeApprovalRequestTimelineSlice";
import { RootState } from "../../../store/store";
import { useParams } from "react-router";
import { DynamicWorkflowAggRootUrl } from "@4eplatform/shared/apis/dynamic_workflow_agg";
import moment from "moment";
const CommitteesReviewCommitteeMember = ({ requestId, committee }: any) => {
const intl = useIntl();
let { id } = useParams();
let dispatch = useDispatch();
const requestTimeline = useSelector((state: RootState) => {
  return state?.committeeApprovalRequestTime?.data;
});

useEffect(() => {
  if (requestId != "00000000-0000-0000-0000-000000000000") {
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
                      src={
                        requestTimeline?.transactions[index]?.userImage
                          ? `${DynamicWorkflowAggRootUrl}${requestTimeline?.transactions[index]?.userImage}`
                          : "/media/avatars/300-3.jpg"
                      }
                      style={{ width: "64px", borderRadius: "50%" }}
                    />
                  </div>
                  <div className="fw-mormal timeline-content text-muted ps-3 mx-5">
                    <div className="row">
                      <div className="col-md-4 col-lg-4 col-sm-4 col-12">
                        <div className="border border-gray-300 rounded min-w-125px py-3 px-4 me-6 mb-3 d-flex flex-column align-items-center justify-content-center">
                          <p className="text-dark fw-bolder">
                            {
                              <p className="name mb-2">
                                {item?.actionTakerName}
                                {item?.actionTakerType === 1 &&
                                  item?.actionTakerUserName &&
                                  " ( " +
                                    item?.actionTakerUserName?.split("@")[0] +
                                    " ) "}
                              </p>
                            }
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4 col-lg-4 col-sm-4 col-12">
                        <div className="border border-gray-300 rounded min-w-125px py-3 px-4 me-6 mb-3 d-flex flex-column align-items-center justify-content-center">
                          <p className="text-primary fw-bolder">
                            {item?.receivedDate
                              ? moment(item?.receivedDate).format(
                                  "YYYY-MM-DD"
                                )
                              : ""}
                          </p>
                          {item?.receivedDate ? (
                            <p className="text-muted mb-0">
                              {intl.formatMessage({ id: "ReceievingDate" })}
                            </p>
                          ) : (
                            <> {intl.formatMessage({ id: "NotReceivedYet" })}</>
                          )}
                        </div>
                      </div>
                      {item?.actionDate ? (
                        <>
                          <div className="col-md-4 col-lg-4 col-sm-4 col-12 mb-5">
                            <div className="border border-gray-300 rounded min-w-125px py-3 px-4 me-6 mb-3 d-flex flex-column align-items-center justify-content-center">
                              <p className={`text-${item?.action==1?"success":item?.action==2?"danger":"warning"} fw-bolder `}>
                                {" "}
                                {item?.actionDate
                                  ? moment(item?.actionDate).format(
                                      "YYYY-MM-DD"
                                    )
                                  : ""}
                              </p>
                              <p className="text-muted mb-0">
                                {" "}
                                {item?.action === 1 &&
                                  intl.formatMessage({
                                    id: "ConfirmationDate",
                                  })}
                                {item?.action === 2 &&
                                  intl.formatMessage({ id: "RejectDate" })}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      <div className="row mb-9">
                        <div className="col-md-4 col-lg-4 col-sm-4 col-12">
                          <div className="border border-gray-300 rounded min-w-125px py-3 px-4 me-6 mb-3 d-flex flex-column align-items-center justify-content-center">
                            <p className="mb-0 py-2 fw-bolder text-dark">
                              {" "}
                              <i className="fa fa-genderless text-warning fs-5"></i>{" "}                                {/* ملاحظة: العمل على زيادة الوعى{" "} */}
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
    <br/>
    <br/>
  </>
);
};
export { CommitteesReviewCommitteeMember };
