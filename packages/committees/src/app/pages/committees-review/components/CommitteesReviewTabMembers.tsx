import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useIntl } from "react-intl";
import { getCommitteeMembers } from "../../../features/committee/committeesSlice";
import { useParams } from "react-router-dom";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";

import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import { CommitteeRootUrl } from "@4eplatform/shared/apis/committee";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";

const CommitteesReviewTabMembers: FC = () => {
  const intl = useIntl();
  let { id } = useParams();
  const dispatch = useAppDispatch();

  const committeeMembers = useAppSelector((state: RootState) => {
    return state?.committees?.committeeMembers;
  });
  const totalItems = useAppSelector((state: RootState) => {
    return state?.committees?.totalItemsForMembers;
  });
  const totalPages = useAppSelector((state: RootState) => {
    return state?.committees?.totalPagesForMembers;
  });
  let language: string = intl.locale;
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  let params={
    pageSize,
    pageNumber:pageIndex
  }
  useEffect(() => {
    dispatch(getCommitteeMembers({id,params}) as any);
  }, [id,pageSize,pageIndex]);
  return (
    <>
      <div className="card card-body">
        <div className="d-flex flex-column">
          <div className="bg-gray-200 border-top-2 border-bottom-2 border-0 border-gray-300 border-dashed p-4">
            <div className="d-flex flex-column">
              <span>{intl.formatMessage({ id: "CommitteMembers" })}</span>
              <span className="text-gray-600">
                <span>{committeeMembers?.length}</span>
                <span className="mx-2">
                  {intl.formatMessage({ id: "Members" })}
                </span>
              </span>
            </div>
          </div>
          <div className="mt-5 pt-3">
            <div className="d-flex flex-wrap row">
              {committeeMembers?.length > 0 ? (
                committeeMembers?.map((member: any , index: any) => (
                  <div className="col-md-3 mb-3" key={index}>
                    <div className="d-flex flex-column align-items-center mb-1">
                      <img
                        alt="Pic"
                        className="w-100px h-100px rounded-circle"
                        src={
                          member?.imgUrl
                            ? `${CommitteeRootUrl}${member?.imgUrl}`
                            : toAbsoluteUrl("/media/avatars/user.jpg")
                        }
                        onError={(e: any) =>
                          (e.target.src = toAbsoluteUrl("/media/avatars/user.jpg"))
                        }
                      />
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <span className="mb-1 text-center">{member?.name}</span>
                      <span className="mb-1 text-gray-600">
                        {member?.permissionNameAr || member?.permissionNameAr
                          ? language === "ar"
                            ? member?.permissionNameAr
                            : member?.permissionNameAr
                          : intl.formatMessage({ id: "NotFound" })}
                      </span>
                      <span>
                        {member?.jobNameAr || member?.jobNameEn
                          ? language === "ar"
                            ? member?.jobNameAr
                            : member?.jobNameEn
                          : intl.formatMessage({ id: "NotFound" })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className=" py-10 text-center">
                    <p> {intl.formatMessage({ id: "NotFoundMembersForThisCommittee" })}</p>
                  </div>
                </>
              )}
            </div>
            <SystemPagination
              totalPages={totalPages}
              totalItems={totalItems}
              pageIndex={pageIndex}
              pageSize={pageSize}
              setPageIndex={setPageIndex}
              setPageSize={setPageSize}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { CommitteesReviewTabMembers };
