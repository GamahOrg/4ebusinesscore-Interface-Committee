import { FC } from 'react'
import { useIntl } from "react-intl";

const SystemFilter1: FC = () => {
	const intl = useIntl()

	return <>
		<a onClick={(event) => { event.preventDefault() }} className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-primary fw-bolder" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
			<span className="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="currentColor" />
				</svg>
			</span>
			{intl.formatMessage({ id: "Filtering" })}
		</a>

		<div className="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-kt-menu="true" id="kt_menu_62775e8642438">
			<div className="px-7 py-5">
				<div className="fs-5 text-dark fw-bolder"> {intl.formatMessage({ id: "Filtering" })} </div>
			</div>
			<div className="separator border-gray-200"></div>
			<div className="px-7 py-5">
				<div className="mb-10">
					<label className="form-label fw-bold">{intl.formatMessage({ id: "Status" })}</label>
					<div>
						<select className="form-select form-select-solid" data-kt-select2="true" data-placeholder='{intl.formatMessage({ id: "Choose" })}' data-dropdown-parent="#kt_menu_62775e8642438" data-allow-clear="true">
							<option></option>
							<option value="1">{intl.formatMessage({ id: "ApprovalDone" })}</option>
							<option value="2">{intl.formatMessage({ id: "InWaiting" })}</option>
							<option value="2">{intl.formatMessage({ id: "UnderProcedure" })}</option>
							<option value="2">{intl.formatMessage({ id: "Rejected" })}</option>
						</select>
					</div>
				</div>
				<div className="mb-10">
					<label className="form-label fw-bold">{intl.formatMessage({ id: "Display" })} :</label>
					<div className="mb-10">
						<label className="form-check form-check-sm form-check-custom form-check-solid">
							<input className="form-check-input" type="checkbox" value="1" />
							<span className="form-check-label">{intl.formatMessage({ id: "OwnerOfTheProcedure" })}</span>
						</label>
						<br />
						<label className="form-check form-check-sm form-check-custom form-check-solid">
							<input className="form-check-input" type="checkbox" value="2" />
							<span className="form-check-label">{intl.formatMessage({ id: "Users1" })} </span>
						</label>
					</div>
				</div>
				<div className="mb-10">
					<label className="form-label fw-bold">{intl.formatMessage({ id: "Notifications" })} :</label>
					<div className="form-check form-switch form-switch-sm form-check-custom form-check-solid">
						<input className="form-check-input" type="checkbox" value="" name="notifications" />
						<label className="form-check-label">{intl.formatMessage({ id: "Enable" })}</label>
					</div>
				</div>
				<div className="d-flex justify-content-end">
					<button type="reset" className="btn btn-sm btn-light btn-active-light-primary me-2" data-kt-menu-dismiss="true">{intl.formatMessage({ id: "Cancel" })}</button>
					<button type="submit" className="btn btn-sm btn-primary" data-kt-menu-dismiss="true">{intl.formatMessage({ id: "Agree" })}</button>
				</div>
			</div>
		</div>
	</>
}

export { SystemFilter1 }
