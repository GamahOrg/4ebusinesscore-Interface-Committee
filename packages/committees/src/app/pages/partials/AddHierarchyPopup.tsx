import React, { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { EmployeeHierarchyPopup } from "./EmployeeHierarchyPopup";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AddManagmentOption from "../track-requests-tool/components/AddManagmentOption";
import AddEmployeeOption from "../track-requests-tool/components/AddEmployeeOption";
import SpecifiedOption from "../track-requests-tool/components/SpecifiedOption";
import { getEmployee, getOrganization } from "../../features/requestTemplate/requestTemplateSlice";
import { useAppDispatch } from "../../store/store";

interface Iprop {
  cancelFunc: any;
  show?: any;
  handleClose?: any;
  organization: any;
  setSelectedIds?: any;
  setSelectedNames?: any;
  employee?: any;
  arrayIndex: any;
  setDestination?: any;
  specialized: any;
}
const AddHierarchyPopup: React.FC<Iprop> = ({ setDestination, arrayIndex, cancelFunc, show, handleClose, organization, setSelectedIds, setSelectedNames, employee, specialized }) => {
  const intl = useIntl();
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  let dispatch = useAppDispatch();
  const [selectedValue, setSelectedValue] = useState<string>("1");
  const [searchTermForOrg, setSearchTermForOrg] = useState<string>("");
  const [searchTermForEmployee, setSearchTermForEmployee] = useState<string>("");
  const [searchTermForSpecified, setSearchTermForSpecified] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedValue("1");
  }, [show]);

  const handelSelectChange = (event: any) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
  };

  useEffect(() => {
    dispatch(getOrganization({ name: searchTermForOrg }) as any);
  }, [searchTermForOrg]);
  useEffect(() => {
    dispatch(getEmployee({ search: searchTermForEmployee }) as any);
  }, [searchTermForEmployee]);
  const getActiveElement = (selectedValue: any) => {
    switch (selectedValue) {
      // case "1":
      //   return <EntityOption />;
      case "1":
        return <AddManagmentOption arrayIndex={arrayIndex} setDestination={setDestination} organization={organization} setSelectedIds={setSelectedIds} setSelectedNames={setSelectedNames} />;
      // case "3":
      //   return <CommitteOption />;
      case "2":
        return <AddEmployeeOption employee={employee} arrayIndex={arrayIndex} setDestination={setDestination} setSelectedIds={setSelectedIds} setSelectedNames={setSelectedNames} />;
      case "3":
        return <SpecifiedOption specialized={specialized} setSelectedIds={setSelectedIds} setSelectedNames={setSelectedNames} arrayIndex={arrayIndex} setDestination={setDestination} searchTermForSpecified={searchTermForSpecified} />;
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      text: intl.formatMessage({ id: "AddedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: { confirmButton: "btn btn-primary" },
    });
  };

  return (
    <Fragment>
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
        <div className="card">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "center",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
          >
            <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 mt-10">
              <Modal.Title>
                <div className="mb-9 text-center">
                  <h1 className="mb-3">{intl.formatMessage({ id: "OrganizationalChart" })}</h1>
                  <h6 className="mb-2 text-muted">
                    {intl.formatMessage({
                      id: "YouCanSeeTheDepartmentsAndDivisionsOfTheAuthority",
                    })}
                  </h6>
                </div>
              </Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="row ">
              <div className="col-12 col-sm-6">
                <select onChange={handelSelectChange} defaultValue="1" className="form-select form-select-lg mb-3 form-select-solid" aria-label=".form-select-lg example">
                  {/* <option value="1">
                      {intl.formatMessage({ id: "Entity Type" })}
                    </option> */}
                  <option value="1">{intl.formatMessage({ id: "RealEstateOperations" })}</option>
                  {/* <option value="3">
                      {intl.formatMessage({ id: "Committee" })}
                    </option> */}
                  <option value="2">{intl.formatMessage({ id: "Employee" })}</option>
                  <option value="3">{intl.formatMessage({ id: "specified" })}</option>
                </select>
              </div>
              {/* <div className="col-12 col-sm-6">
                  <div className="d-flex align-items-center position-relative my-1">
                    <KTSVG
                      path="/media/icons/duotune/general/gen021.svg"
                      className="svg-icon-1 position-absolute text-muted mx-3"
                    />
                    <input
                      type="text"
                      data-kt-user-table-filter="search"
                      className="form-control form-control-solid px-11"
                      placeholder={intl.formatMessage({
                        id: "Search",
                      })}
                    />
                  </div>
                </div> */}
              <div className="col-12 col-sm-6">
                <div className="d-flex align-items-center position-relative my-1 px-5">
                  <KTSVG path="/media/icons/duotune/general/gen021.svg" className="svg-icon-1 position-absolute text-muted mx-3" />
                  {selectedValue == "1" ? (
                    <input type="text" name="search" className="form-control form-control-solid ps-10 pr-2" placeholder={intl.formatMessage({ id: "Search" })} value={searchTermForOrg} onChange={(e) => setSearchTermForOrg(e.target.value)} />
                  ) : selectedValue == "2" ? (
                    <input type="text" name="searchTermForEmployee" className="form-control form-control-solid ps-10 pr-2" placeholder={intl.formatMessage({ id: "Search" })} value={searchTermForEmployee} onChange={(e) => setSearchTermForEmployee(e.target.value)} />
                  ) : (
                    <input type="text" name="searchTermForSpecified" className="form-control form-control-solid ps-10 pr-2" placeholder={intl.formatMessage({ id: "Search" })} value={searchTermForSpecified} onChange={(e) => setSearchTermForSpecified(e.target.value)} />
                  )}
                </div>
              </div>
              <div className="col-12">{getActiveElement(selectedValue)}</div>
            </div>
            <div className="d-flex justify-content-center ">
              <button
                className="btn btn-secondary px-15 mx-3"
                onClick={() => {
                  handleClose();
                }}
              >
                {intl.formatMessage({ id: "Cancel" })}
              </button>
              <button
                onClick={() => {
                  showSuccessAlert();
                  handleClose();
                }}
                className="btn btn-success px-15 "
              >
                {intl.formatMessage({ id: "Add" })}
              </button>
            </div>
          </Modal.Body>
        </div>
      </Modal>

      <div className="modal fade" aria-hidden="true">
        <EmployeeHierarchyPopup show={modalHShow} handleClose={() => setModalHShow(false)} />
      </div>
    </Fragment>
  );
};

export default AddHierarchyPopup;
