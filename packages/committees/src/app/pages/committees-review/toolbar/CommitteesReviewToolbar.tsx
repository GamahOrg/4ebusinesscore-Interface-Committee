import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import { Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";

const CommitteesReviewToolbar= ({setCommitteeStatus}:any) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const Committees = useSelector((state: RootState) => {
    return state?.committees?.committees;
  });
  const TotalPages = useSelector((state: RootState) => {
    return state?.committees?.pagination?.totalPages;
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };
  const handleFilterChange = (newFilter: number) => {
    setCommitteeStatus(newFilter)
  };
  return (
    <>
      <div className="toolbar py-5 py-lg-15" id="kt_toolbar">
        <div
          id="kt_toolbar_container"
          className="container-xxl d-flex flex-stack flex-wrap p-0"
        >
          <div className="page-title d-flex flex-column me-3">
            <h1 className="d-flex text-white fw-bolder my-1 fs-3">
              {intl.formatMessage({ id: "CommitteesReview" })}
            </h1>
            <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
              <li className="breadcrumb-item text-white opacity-75">
                <Link
                  to="/home-workspace"
                  className="text-white text-hover-primary"
                >
                  {intl.formatMessage({ id: "Home" })}
                </Link>
              </li>
              <li className="breadcrumb-item">
                <span className="bullet bg-white opacity-75 w-5px h-2px"></span>
              </li>
              <li className="breadcrumb-item text-white opacity-75">
                <Link
                  to="/systems-services-settings/dynamic-workspace"
                  className="text-white text-hover-primary"
                >
                  {intl.formatMessage({ id: "Workspace" })}
                </Link>
              </li>
              <li className="breadcrumb-item">
                <span className="bullet bg-white opacity-75 w-5px h-2px"></span>
              </li>
              <li className="breadcrumb-item text-white opacity-75">
                <span className="text-white">
                  {intl.formatMessage({ id: "CommitteesReview" })}
                </span>
              </li>
            </ul>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="custom" id="dropdown-basic"
              className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-primary fw-bolder"
            >
              <span
              >
                <span className="svg-icon svg-icon-5 svg-icon-gray-500 me-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                {intl.formatMessage({ id: "Filtering" })}
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div className="p-5 d-flex flex-column">
                <span className="d-flex justify-content-between mb-4">
                  <label htmlFor="allCommittees" className="form-check-label">
                    {intl.formatMessage({ id: "AllCommittees" })}
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="committee"
                    id="allCommittees"
                    onChange={() => handleFilterChange(5)}
                    defaultChecked
                  />
                </span>
                <span className="d-flex justify-content-between mb-4 text-nowrap gap-5">
                  <label
                    htmlFor="approvedCommittees"
                    className="form-check-label"
                  >
                    {intl.formatMessage({ id: "ApprovedCommittees" })}
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="committee"
                    id="approvedCommittees"
                    onChange={() => handleFilterChange(1)}
                  />
                </span>
                <span className="d-flex justify-content-between mb-2 text-nowrap gap-5">
                  <label
                    htmlFor="committeeUnderStudy"
                    className="form-check-label"
                  >
                    {intl.formatMessage({ id: "CommitteeUnderStudy" })}
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="committee"
                    id="committeeUnderStudy"
                    onChange={() => handleFilterChange(0)}
                  />
                </span>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export { CommitteesReviewToolbar };
