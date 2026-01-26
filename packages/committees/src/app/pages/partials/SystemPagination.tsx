import React, { FC } from "react";
import { useIntl } from "react-intl";

interface SystemPaginationProps {
  totalPages?: number;
  onPageChange?: (newPage: number) => void;
  onPageSizeChange?: (newPageSize: number) => void;
  pageSizeOptions?: number[];
  pageSize?: number;
  currentPage?: number;
}

export const SystemPagination: FC<SystemPaginationProps> = ({
  totalPages = 1,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  pageSize,
  currentPage,
}) => {
  const intl = useIntl();
  const updatePageNumber = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const updatePageSize = (value: string) => {
    const newSize = parseInt(value);
    if (onPageSizeChange) {
      onPageSizeChange(newSize);
    }
  };

  return (
    <div className="d-flex flex-stack flex-wrap pt-5">
      <div className="d-flex flex-stack flex-wrap">
        <label>{intl.formatMessage({ id: "TheNumberOfRows" })}</label>
        <select
          onChange={(e) => {
            updatePageSize(e.target.value);
            // Update pageSize in parent component
            onPageSizeChange && onPageSizeChange(parseInt(e.target.value));
          }}
          value={pageSize}
          name="t"
          aria-label=""
          className="form-select form-select-sm form-select-solid w-75px ms-3"
        >
          {pageSizeOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <ul className="pagination pagination-outline">
        <li
          className={`page-item previous m-1 border-0 outline-0 ${
            currentPage === 1 ? "disabled" : ""
          }`}
          onClick={() => currentPage && updatePageNumber(currentPage - 1)}
        >
          <div className="page-link cursor-pointer">
            <i className="previous"></i>
          </div>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => (
          <li
            key={index}
            className={`page-item cursor-pointer m-1 ${
              currentPage === index + 1 ? "active text-hover-white" : ""
            }`}
            onClick={() => updatePageNumber(index + 1)}
          >
            <div className="page-link">{index + 1}</div>
          </li>
        ))}
        <li
          className={`page-item next m-1 border-0 outline-0 ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() => currentPage && updatePageNumber(currentPage + 1)}
        >
          <div className="page-link cursor-pointer">
            <i className="next"></i>
          </div>
        </li>
      </ul>
    </div>
  );
};
