import React, { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useSearchParams } from "react-router-dom";
import { Actions } from "./Actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  fetchAllRequestTemplateBycategoryId,
  getRequestCategory,
} from "../../../features/requestTemplate/requestTemplateSlice";
import { requestCategoryModel } from "../../../models/requestCategory";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function TrackRequestsTool() {
  const intl = useIntl();
  const [projectCategoryId, setProjectCategoryId] = useState<any>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  let requestCategory = useSelector((state: RootState) => {
    return state?.requestTemplate?.dataCategory;
  });
  useEffect(() => {
    dispatch(getRequestCategory() as any);
  }, []);

  useEffect(() => {
    const category = requestCategory?.find(
      (category: requestCategoryModel) =>
        category.name === "ادارة اللجان" ||
        category.name === "ادارة اللجان" ||
        category.name === "اداره اللجان" ||
        category.name === "إدارة اللجان",
    );

    if (category) {
      setProjectCategoryId(category.id);
    }
  }, [requestCategory]);
  let [searchParams] = useSearchParams();

  let allRequestTamplateByCategoryId = useSelector((state: RootState) => {
    return state?.requestTemplate?.allRequestTamplateByCategoryId;
  });
  let allRequestTamplateByCategoryIdStatus = useSelector((state: RootState) => {
    return state?.requestTemplate?.status;
  });

  let totalItems = useSelector((state: RootState) => {
    return state?.requestTemplate?.taotalItems;
  });
  let totalPages = useSelector((state: RootState) => {
    return state?.requestTemplate?.totalpages;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    let myparams: any = {
      pageSize: pageSize,
      pageNumber: pageIndex,
    };
    if (projectCategoryId) {
      dispatch(
        fetchAllRequestTemplateBycategoryId({
          id: projectCategoryId as string,
          myparams,
        }) as any,
      );
    }
  }, [
    searchParams.get("pageSize"),
    searchParams.get("pageNumber"),
    projectCategoryId,
  ]);

  let location = useLocation();
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";
  return (
    <Fragment>
      {allRequestTamplateByCategoryIdStatus === "succeeded" ? (
        <div
          id="kt_content_container"
          className="d-flex flex-column-fluid align-items-start  mt-4"
        >
          <div className="content flex-row-fluid" id="kt_content">
            <div className="row g-5 g-xl-8">
              <div className="col-xl-12">
                <div className="card card-xl-stretch mb-xl-8 card-body  ">
                  <div className="card-header border-0 pt-3 pb-2 mb-2">
                    <h3 className="card-title align-items-start flex-column">
                      <span className="card-label fw-bolder text-dark fs-4 mb-1">
                        {intl.formatMessage({ id: "TrackRequests" })}
                      </span>
                      <span className="mt-1 fw-semibold fs-6 text-muted">
                        {intl.formatMessage({ id: "TrackRequestsTable" })}
                      </span>
                    </h3>
                  </div>

                  <div className="py-5 taskLogs">
                    <div className="table-responsive">
                      <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                        <thead>
                          <tr className="fw-bolder text-muted">
                            <th className="min-w-250px text-center">
                              {intl.formatMessage({ id: "OrderName" })}
                            </th>
                            <th className="min-w-250px text-center">
                              {intl.formatMessage({
                                id: "OrderClassification",
                              })}
                            </th>
                            <th className="min-w-250px text-center">
                              {intl.formatMessage({ id: "TypeOfRequest" })}
                            </th>
                            <th className="min-w-250px text-center">
                              {intl.formatMessage({
                                id: "TheNumberOfDepartmentsOfTheRequestTrack",
                              })}{" "}
                            </th>
                            <th className="min-w-250px text-center">
                              {intl.formatMessage({ id: "Options" })}
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {allRequestTamplateByCategoryId?.map(
                            (requestTamplate: any) => {
                              return (
                                <Fragment key={requestTamplate?.id}>
                                  <tr>
                                    <td className="text-center">
                                      <Link
                                        to={{
                                          pathname: `/committee-track-requests-tools/${requestTamplate?.id}/details`,
                                        }}
                                        state={{ serviceName: cardTitle }}
                                      >
                                        {requestTamplate?.name}
                                      </Link>
                                    </td>
                                    <td className="text-center">
                                      {requestTamplate?.requestCategoryName}
                                    </td>
                                    <td className="text-center">
                                      {requestTamplate?.requestCategoryTypeName}
                                    </td>
                                    <td className="text-center">
                                      {requestTamplate?.pathCount}
                                    </td>
                                    <td className="text-center">
                                      <Actions id={requestTamplate?.id} />
                                    </td>
                                  </tr>
                                </Fragment>
                              );
                            },
                          )}
                        </tbody>
                      </table>
                      <SystemPagination
                        totalPages={totalPages}
                        totalItems={totalItems}
                        pageSize={pageSize}
                        pageIndex={pageIndex}
                        setPageIndex={setPageIndex}
                        setPageSize={setPageSize}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="d-flex gap-4 justify-content-center align-items-center py-4"
          style={{ color: "white" }}
        >
          {intl.formatMessage({ id: "LoadingData" })}
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </Fragment>
  );
}

export default TrackRequestsTool;
