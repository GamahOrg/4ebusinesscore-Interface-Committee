import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { TableRow } from "./TableRow";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { fetchCommitteesApprovals } from "../../../features/Approvals/committeeApprovalSlice";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { Spinner } from "react-bootstrap";

const CommitteeApprovals = () => {
  const intl = useIntl();
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const Committees = useSelector((state: RootState) => {
    return state?.committeeApproval?.committees;
  });
  const TotalPages = useSelector((state: RootState) => {
    return state?.committeeApproval?.pagination?.totalPages;
  });
  const TotalItems = useSelector((state: RootState) => {
    return state?.committeeApproval?.pagination?.totalItems;
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(
        fetchCommitteesApprovals({
          pageSize: pageSize,
          pageNumber: pageIndex,
        }) as any,
      );
      setLoading(false);
    };
    fetchData();
  }, [dispatch, pageIndex, pageSize]);

  return (
    <div className="card card-xl-stretch mb-xl-0">
      {!isLoading ? (
        Committees?.length ? (
          <>
            <div className="card-header px-3 pt-3 pb-2 mb-3">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fs-2 my-5 ">
                  {intl.formatMessage({ id: "CommitteeApprovalList" })}
                </span>
              </h3>
            </div>
            <div className="card-body py-3 px-3 mx-8">
              <div className="tab-content">
                <div
                  className="tab-pane fade active show"
                  id="REGA_table_widget_5_tab_1"
                >
                  <div className="table-responsive mt-4">
                    <table
                      className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-7"
                      id="REGA-WS-caseList"
                    >
                      <thead>
                        <tr className="fw-bolder text-muted">
                          <th className="min-w-50px text-center">
                            {intl.formatMessage({ id: "CommitteeName" })}
                          </th>
                          <th className="min-w-150px text-center">
                            {intl.formatMessage({ id: "TheStatus" })}
                          </th>
                          <th className="min-w-150px text-center">
                            {intl.formatMessage({ id: "CommitteeSecretary" })}
                          </th>
                          <th className="min-w-150px text-center">
                            {intl.formatMessage({ id: "CommitteeType" })}
                          </th>
                          <th className="min-w-150px text-center">
                            {intl.formatMessage({
                              id: "DateOfDecisionOfCommitteeEstablishment",
                            })}
                          </th>
                          <th className="min-w-100px text-center">
                            {intl.formatMessage({ id: "CommitteMembers" })}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Committees?.map((committee: any) => {
                          return (
                            <Fragment key={committee?.id}>
                              <TableRow committee={committee} />
                            </Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <SystemPagination
                    totalPages={TotalPages}
                    totalItems={TotalItems}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    setPageIndex={setPageIndex}
                    setPageSize={setPageSize}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className=" py-10 text-center">
            <p> {intl.formatMessage({ id: "NotYetCommitteesApprovals" })}</p>
          </div>
        )
      ) : (
        <div className="d-flex gap-4 justify-content-center align-items-center py-4">
          {intl.formatMessage({ id: "LoadingData" })}
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </div>
  );
};

export { CommitteeApprovals };
