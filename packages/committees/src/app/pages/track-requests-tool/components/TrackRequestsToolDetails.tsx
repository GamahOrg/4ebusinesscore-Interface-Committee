import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { getRequestTemplateById } from "../../../features/requestTemplate/requestTemplateSlice";
import { RootState } from "../../../store/store";
import { fetchItemByRequestTemplateId } from "../../../features/itemSlice";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { ItemsByRequestTemplateId } from "../../../models/ItemsByRequestTemplateId";
import { TableRow } from "./TableRow";
import React from "react";

function TrackRequestsToolDetails() {
  const intl = useIntl();
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { id } = useParams();
  const dispatch = useDispatch();
  let requestTemplateById = useSelector((state: RootState) => {
    return state?.requestTemplate?.requestTemplateById;
  });
  const formattedId = id?.toString().replace(/^\//, "");
  useEffect(() => {
    if (formattedId) {
      dispatch(getRequestTemplateById(formattedId) as any);
    }
  }, [formattedId]);

  useEffect(() => {
    if (formattedId) {
      let params: any = {
        RequestTemplateId: formattedId,
        pageNumber,
        pageSize,
      };
      dispatch(fetchItemByRequestTemplateId(params) as any);
    }
  }, [formattedId, pageNumber, pageSize]);

  let itemsByRequestTemplateId = useSelector((state: RootState) => {
    return state?.item?.ItemsByRequestTemplateId?.result;
  });
  const TotalPages = useSelector((state: RootState) => {
    return state?.item?.ItemsByRequestTemplateId?.totalPages;
  });
  const TotalItems = useSelector((state: RootState) => {
    return state?.item?.ItemsByRequestTemplateId?.totalItems;
  });

  return (
    <Fragment>
      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start  mt-4"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div className="row g-5 g-xl-8">
            <div className="col-xl-12">
              <div className="card card-xl-stretch mb-xl-8 card-body p-5 ">
                <div className="card-header border-0 mb-5">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder text-dark">
                      {intl.formatMessage({ id: "RequestDetails" })}
                    </span>
                  </h3>
                </div>
                <hr />
                <br />
                <br />
                <div className="d-flex align-items-center justify-content-between pe-3 ps-5 flex-wrap flex-md-nowrap">
                  <div className="w-md-20 w-50 pe-5">
                    <p className="mb-4">
                      {intl.formatMessage({ id: "OrderName" })}
                    </p>
                    <p className="fw-bolder text-gray-800 fs-7">
                      {requestTemplateById?.name
                        ? requestTemplateById?.name
                        : intl.formatMessage({
                            id: "ThereIsNoNameForTheRequest",
                          })}
                    </p>
                  </div>
                  <div className="w-md-20 w-50 text-center">
                    <p className="mb-4">
                      {intl.formatMessage({ id: "TypeOfRequest" })}
                    </p>
                    <p className="fw-bolder text-gray-800 fs-7">
                      {requestTemplateById?.requestCategoryTypeName
                        ? requestTemplateById?.requestCategoryTypeName
                        : intl.formatMessage({ id: "ThereIsNoOrderType" })}
                    </p>
                  </div>
                  <div className="w-md-20 w-50 text-center">
                    <p className="mb-4">
                      {intl.formatMessage({ id: "DepartmentsNumber" })}
                    </p>
                    <p className="fw-bolder text-gray-800 fs-7">
                      {requestTemplateById?.pathCount
                        ? requestTemplateById?.pathCount
                        : 0}
                    </p>
                  </div>
                  <div className="w-md-20 w-50 text-center ps-4 ">
                    <p className="mb-4">
                      {intl.formatMessage({ id: "OrderClassification" })}
                    </p>
                    <p className="fw-bolder text-gray-800 fs-7">
                      {requestTemplateById?.categoryName
                        ? requestTemplateById?.categoryName
                        : intl.formatMessage({
                            id: "ThereIsNoClassificationForTheOrder",
                          })}
                    </p>
                  </div>
                  <div className="w-md-20 w-50 text-center ps-4 ">
                    <p className="mb-4">
                      {intl.formatMessage({ id: "NumberOfClause" })}
                    </p>
                    <p className="fw-bolder text-gray-800 fs-7">
                      {itemsByRequestTemplateId?.length
                        ? itemsByRequestTemplateId?.length
                        : 0}
                    </p>
                  </div>
                </div>
                {requestTemplateById?.requestTemplateStepDtos?.length < 1 ? (
                  <div className="my-5 text-center">
                    {intl.formatMessage({ id: "ThereAreNoDepartments" })}
                  </div>
                ) : (
                  requestTemplateById?.requestTemplateStepDtos?.map(
                    (stepDots, index) => (
                      <div
                        className="timeline timeline-1 pe-5 position-relative mt-4 pt-4"
                        key={index}
                      >
                        <div
                          className="timeline-sep bg-secondary h-100 border border-1 border-dashed"
                          style={{
                            position: "absolute",
                            top: "10px",
                            [getCurrentSystemLanguage() == "ar"
                              ? "right"
                              : "left"]: "30px",
                          }}
                        ></div>
                        <div className="timeline-item mb-8">
                          <div className="timeline-badge w-60px">
                            <span className="badge bg-success fs-2 p-3 d-flex align-items-center justify-content-center w-30px">
                              {stepDots?.stepNumber}
                            </span>{" "}
                          </div>
                          <div className="timeline-content d-flex justify-content-between align-items-center text-muted font-weight-normal ms-4">
                            <p className="fw-bolder fs-5 min-w-100px text-gray-800 ms-4">
                              {stepDots?.actionTackerName}{" "}
                            </p>
                            <p className="fw-bolder fs-5 min-w-100px text-gray-800 ms-4">
                              {intl.formatMessage({
                                id: "RoleName",
                              })}{" "}
                              /{" "}
                              {stepDots?.roleName
                                ? stepDots?.roleName
                                : intl.formatMessage({ id: "ThereIsNoRole" })}
                            </p>
                            <p
                              className="min-w-175px p-1 py-2"
                              style={{
                                backgroundColor: "#C9F7F5",
                                opacity: ".8",
                              }}
                            >
                              <span className="ms-3 text-black">
                                {" "}
                                {intl.formatMessage({
                                  id: "DurationInDays",
                                })}
                                :{" "}
                              </span>
                              <span className="text-primary">
                                {stepDots?.implementationDays}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )
                )}
                {itemsByRequestTemplateId?.length > 0 ? (
                  <>
                    <div className="table-responsive mt-4">
                      <table
                        className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-7"
                        id="REGA-WS-caseList"
                      >
                        <thead>
                          <tr className="fw-bolder text-muted">
                            <th className="min-w-100px text-center">
                              {intl.formatMessage({ id: "ClauseName" })}
                            </th>
                            <th className="min-w-100px text-center">
                              {intl.formatMessage({ id: "Category" })}
                            </th>
                            <th className="min-w-100px text-center">
                              {intl.formatMessage({ id: "Catalog" })}
                            </th>
                            <th className="min-w-100px text-center">
                              {intl.formatMessage({ id: "Class" })}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {itemsByRequestTemplateId?.map(
                            (item: ItemsByRequestTemplateId) => {
                              return (
                                <Fragment key={item?.itemId}>
                                  <TableRow item={item} />
                                </Fragment>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                    <SystemPagination
                      totalPages={TotalPages}
                      totalItems={TotalItems}
                      pageIndex={pageNumber}
                      pageSize={pageSize}
                      setPageIndex={setPageNumber}
                      setPageSize={setPageSize}
                    />
                  </>
                ) : (
                  <p className="fw-bolder fs-4 text-center">
                    {intl.formatMessage({
                      id: "ThereAreNoItems",
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TrackRequestsToolDetails;
