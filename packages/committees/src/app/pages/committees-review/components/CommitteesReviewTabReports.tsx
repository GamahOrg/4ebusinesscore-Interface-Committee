import { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getProceedings } from "../../../features/procceding/proceedingSlice";
import {
  MeetingModel,
  ProceedingModel,
} from "../../../models/proceeding-model";
import moment from "moment";
import { useLocation } from "react-router-dom";
import CommitteeReportActions from "./CommitteeReportActions";

interface CommitteesReviewTabReportsProps {
  tabState?: any;
  committeeDetails?: any;
}

const CommitteesReviewTabReports: React.FC<CommitteesReviewTabReportsProps> = ({ tabState, committeeDetails }) => {
  const intl = useIntl();
  let { id } = useParams();
  let dispatch = useAppDispatch();

  let proceedings = useAppSelector((state) => {
    return state?.proceedings?.proceedings;
  });
  useEffect(() => {
    dispatch(getProceedings(id) as any);
  }, [id]);

  let location = useLocation();
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";
  return (
    <>
      <div className="card card-body">
        <div className="d-flex flex-column">
          <div className="bg-gray-200 border-top-2 border-bottom-2 border-0 border-gray-300 border-dashed p-4">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column">
                <span>{intl.formatMessage({ id: "CommitteesReports" })}</span>
                <span className="text-gray-600">
                  <span>{proceedings?.length}</span>
                  <span className="mx-2">
                    {intl.formatMessage({ id: "CommitteesReport" })}
                  </span>
                </span>
              </div>
              {localStorage.getItem(
                "isCommitteeMemberHasPersedirentOrSecretaryPermissions"
              ) == "true" ? (
                <>
                  <Link
                    to={`/committees-review/add-report/${id}`}
                    state={{
                      serviceName: cardTitle,
                      tabState,
                      committeeDetails,
                    }}
                    className="btn btn-primary"
                  >
                    {intl.formatMessage({ id: "AddReport" })}
                  </Link>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div style={{ overflow: "auto" }} className="mt-5 pt-3">
            <span className="text-primary mb-2">
              {intl.formatMessage({ id: "ReportsList" })}
            </span>
            <table
              className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-7"
              id="REGA-WS-caseList"
            >
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-150px text-center">
                    {intl.formatMessage({ id: "CommitteesReportName" })}
                  </th>
                  <th className="min-w-150px text-center">
                    {intl.formatMessage({ id: "MeetingName" })}
                  </th>
                  <th className="min-w-150px text-center">
                    {intl.formatMessage({ id: "ReportDate" })}
                  </th>
                  <th className="min-w-150px text-center">
                    {intl.formatMessage({ id: "Attachments" })}
                  </th>
                  <th className="min-w-100px text-center">
                    {intl.formatMessage({ id: "Procedures" })}
                  </th>
                </tr>
              </thead>
              <tbody>
                {proceedings?.map((proceeding: ProceedingModel) => {
                  return (
                    <Fragment key={proceeding?.id}>
                      <tr style={{ verticalAlign: "middle" }}>
                        <td style={{ verticalAlign: "middle" }} className="text-center">
                          <Link
                            state={{
                              date: proceeding?.date,
                              serviceName: cardTitle,
                            }}
                            to={`/committees-review/report-details/${proceeding?.id}`}
                          >
                            {proceeding?.name}
                          </Link>
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          <div className="d-flex flex-column align-items-center">
                            <div>
                              {proceeding?.meetings
                                ?.map(
                                  (meeting: MeetingModel, index: number) => {
                                    return meeting?.name;
                                  }
                                )
                                ?.join("-")}
                            </div>
                          </div>
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          <p className="text-center">
                            {moment(proceeding?.date).format("YYYY-MM-DD")}
                          </p>
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          <p className="text-center">
                            {proceeding?.attachments?.length} {}
                            {intl.formatMessage({
                              id:
                                proceeding?.attachments?.length > 9 ||
                                proceeding?.attachments?.length <= 2
                                  ? "Attachmentt"
                                  : "Attachmentts",
                            })}
                          </p>
                        </td>
                        <td
                          style={{ verticalAlign: "middle" }}
                          className="text-center"
                        >
                          <CommitteeReportActions proceeding={proceeding}/>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export { CommitteesReviewTabReports };
