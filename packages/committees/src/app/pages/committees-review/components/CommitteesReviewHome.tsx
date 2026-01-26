import React, { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { CommitteesReviewHomeCard } from "./CommitteesReviewHomeCard";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getCommittees } from "../../../features/committee/committeesSlice";
import { getUsersWithOrgDetails } from "../../../features/committee/usersAggregatorSlice";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { getPermissions } from "../../../features/committee/permissionsSlice";
import { Spinner } from 'react-bootstrap';

const CommitteesReviewHome = ({ committeeStatus, delegationStatus }: any) => {
  const intl = useIntl();
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

      useEffect(() => {
      dispatch(getPermissions({}))
    } , [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(
        getCommittees({
          pageNumber: pageIndex,
          pageSize: pageSize,
          filterByStatues: committeeStatus,
          delegationStatus: delegationStatus,
        }) as any
      );
      setLoading(false);
    };
    fetchData();
    getUsersWithOrgDetails({
      pageNumber: 1,
      PageSize: 1000,
    });
  }, [delegationStatus, dispatch, committeeStatus, pageIndex, pageSize]);

  const Committees = useSelector((state: RootState) => {
    return state?.committees?.committees;
  });
  const TotalPages = useSelector((state: RootState) => {
    return state?.committees?.pagination?.totalPages;
  });
  const TotalItems = useSelector((state: RootState) => {
    return state?.committees?.pagination?.totalItems;
  });

  const warningCard = {
    committee: "CommitteeUnderStudy",
    bgCard: "warning",
  };
  const successCard = {
    committee: "RealEstateAppraisalCommittee",
    bgCard: "success",
  };
  return (
    <>
      <div className="row">
        {!isLoading ? (
          Committees?.length ? (
            <>
              {Committees?.map((committee: any) => (
                <Fragment key={committee?.id}>
                  {committee?.requestStatus === 0 ? (
                    <CommitteesReviewHomeCard
                      cardStatus={warningCard}
                      committee={committee}
                    />
                  ) : committee?.requestStatus === 1 ? (
                    <CommitteesReviewHomeCard
                      cardStatus={successCard}
                      committee={committee}
                    />
                  ) : (
                    ""
                  )}
                </Fragment>
              ))}
              <SystemPagination
                totalPages={TotalPages}
                totalItems={TotalItems}
                pageIndex={pageIndex}
                pageSize={pageSize}
                setPageIndex={setPageIndex}
                setPageSize={setPageSize}
              />
            </>
          ) : (
            <div className=" py-10 text-center">
              <p> {intl.formatMessage({ id: "NotYetCommittees" })}</p>
            </div>
          )
        ) : (
         <div className="d-flex gap-4 justify-content-center align-items-center py-4"
          style={{ color: "white" }}
         >
            {intl.formatMessage({ id: "LoadingData" })}
            <Spinner animation="border" variant="primary" />
          </div>
        )}
      </div>
    </>
  );
};

export { CommitteesReviewHome };
