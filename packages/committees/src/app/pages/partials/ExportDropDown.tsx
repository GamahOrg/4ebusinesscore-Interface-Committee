import { FC } from 'react'
import { useIntl } from "react-intl";

const ExportDropDown: FC = () => {
	const intl = useIntl()

	return <>
		<a onClick={(event) => { event.preventDefault() }} className="btn btn-primary w-bolder mx-1 text-center mw-100" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
			<span className="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
            <i className="bi bi-download fs-3 ms-2"></i>
			</span>
			{intl.formatMessage({ id: "Export" })}
		</a>

		<div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary w-200px fw-bold fs-7 py-4'
            data-kt-menu='true'
          >
            <div className='menu-item d-flex justify-content-between align-items-center px-2 mb-2'>
              <label htmlFor='myQ' className='text-gray-500 fw-normal'>{intl.formatMessage({ id: "ExportAsPDF" })}</label>
              <input type='checkbox' name='myQ' id='myQ' />
            </div>
            <div className='menu-item d-flex justify-content-between align-items-center px-2'>
              <label htmlFor='allQ' className='text-gray-500 fw-normal'>{intl.formatMessage({ id: "ExportAsExcel" })}</label>
              <input type='checkbox' name='allQ' id='allQ' />
            </div>
          </div>
	</>
}

export { ExportDropDown }
