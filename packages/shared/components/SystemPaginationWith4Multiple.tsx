import { FC } from "react";
import { useIntl } from "react-intl";

interface Iprop {
  pageIndex?: number;
  pageSize?: number;
  exceptionPageSize?: number;
  setPageIndex?: (index: number) => void;
  setPageSize?: (size: number) => void;
  totalPages?: number;
  totalItems?: number;
}

export const SystemPaginationWith4Multiple: FC<Iprop> = ({
  totalPages = 1,
  totalItems = 1,
  pageIndex = 1,
  pageSize = 8,
  exceptionPageSize,
  setPageIndex = (index: number) => {},
  setPageSize = (size: number) => {},
}) => {
  const intl = useIntl();

  const updatePageNumber = (newPage: number) => {
    setPageIndex(newPage);
  };

  const updatePageSize = (value: string) => {
    setPageIndex(1);
    setPageSize(Number(value));
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (pageIndex <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (pageIndex > totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = pageIndex - 1; i <= pageIndex + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="d-flex flex-stack flex-wrap pt-5">
      <div className="d-flex flex-stack flex-wrap">
        <label className="text-dark">{intl.formatMessage({ id: "TheNumberOfRows" })}</label>
        <select
          onChange={(e) => {
            updatePageSize(e.target.value);
          }}
          value={exceptionPageSize || pageSize || ""}
          name="t"
          className="form-select form-select-sm form-select-solid w-75px ms-3"
        >
          <option value="4">4</option>
          <option value="8">8</option>
          {exceptionPageSize && <option value="16">16</option>}
          <option value="24">24</option>
          <option value="32">32</option>
          <option value="64">64</option>
          <option value="128">128</option>
          <option value="256">256</option>
        </select>
      </div>
      <ul className="pagination pagination-outline">
        <li
          className={`page-item previous m-1 border-0 outline-0 ${
            pageIndex === 1 ? "disabled" : ""
          }`}
          onClick={() => {
            if (pageIndex !== 1) {
              updatePageNumber(pageIndex - 1);
            }
          }}
        >
          <div className="page-link cursor-pointer">
            <i className="previous"></i>
          </div>
        </li>
        {renderPageNumbers().map((page, index) => (
          <li
            key={index}
            className={`page-item ${typeof page === 'string' ? '' : 'cursor-pointer'} m-1 ${
              pageIndex === page ? "active text-hover-white" : ""
            } ${typeof page === 'string' ? 'disabled' : ''}`}
            onClick={() => {
              if (typeof page === 'number') {
                updatePageNumber(page);
              }
            }}
          >
            <div className="page-link">{page}</div>
          </li>
        ))}
        <li
          className={`page-item next m-1 border-0 outline-0 ${
            pageIndex === totalPages ? "disabled" : ""
          }`}
          onClick={() => {
            if (pageIndex < totalPages) {
              updatePageNumber(pageIndex + 1);
            }
          }}
        >
          <div className="page-link cursor-pointer">
            <i className="next"></i>
          </div>
        </li>
      </ul>
    </div>
  );
};
