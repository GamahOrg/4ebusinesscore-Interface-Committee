import { FC } from 'react';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

interface Iprop {
  totalPages?:number;
  page?: any;
  totalItems?:number;
}

let SystemPaginationv2: FC<Iprop> = ({ totalPages = 1, page = 1 ,totalItems=1}) => {
  const intl = useIntl();
  const [searchParams, setSearchParams] = useSearchParams();

  const updatePageNumber = (newPage: string) => {
	if(searchParams) {
  
	  // Get current page number
	  let currentPage = searchParams.get('pageNumber');

 

	  if(!currentPage) {
		currentPage = '1'; 
	  }
  
	  // Update page number based on new value
	  if(newPage === 'next') {
		currentPage = (Number(currentPage) + 1).toString();
	  } else if(newPage === 'previous') {
		currentPage = (Number(currentPage) - 1).toString(); 
	  } else {
		currentPage = newPage;
	  }
  
	  // Set page number in URL
	  searchParams.set('pageNumber', currentPage);
	  setSearchParams(searchParams);
	}
  }

  const updatePageSize = (value: string) => {
    if (searchParams) {

      if (totalItems > page) {
        searchParams.set('pageNumber', "1")}

      searchParams.set('pageSize', value.toString());
      setSearchParams(searchParams);
    }
  };

  const pageSizeValue = searchParams?.get('pageSize');
  const pageSize = pageSizeValue ? +pageSizeValue : undefined;

  return (
    <div className="d-flex flex-stack flex-wrap pt-5">
      <div className="d-flex flex-stack flex-wrap">
        <label>{intl.formatMessage({ id: 'TheNumberOfRows' })}</label>
        <select
          onChange={(e) => {
            updatePageSize(e.target.value);
          }}
          value={pageSize || ''}
          name="t"
          aria-=""
          className="form-select form-select-sm form-select-solid w-75px ms-3"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <ul className="pagination pagination-outline">
        <li
          className={`page-item previous m-1 border-0 outline-0 ${page === 1 ? 'disabled' : ''}`}
          onClick={() => {
            if (page && page > 1) {
				updatePageNumber('previous');
            }
          }}
        >
          <div className="page-link cursor-pointer">
            <i className="previous"></i>
          </div>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => (
          <li
            key={index}
            className={`page-item cursor-pointer m-1 ${
              page === index + 1 && searchParams?.get('pageNumber') === `${index + 1}`
                ? 'active text-hover-white'
                : ''
            }`}
            onClick={() => {
              updatePageNumber((index + 1).toString());
            }}
          >
            <div className="page-link">{index + 1}</div>
          </li>
        ))}
        <li
          className={`page-item next m-1 border-0 outline-0 ${page === totalPages ? 'disabled' : ''}`}
          onClick={() => {
            if (page && page < totalPages) {
				updatePageNumber('next'); 
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
export default SystemPaginationv2