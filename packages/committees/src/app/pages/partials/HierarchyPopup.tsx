import React, { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useAppDispatch } from "../../store/store";
import {
  getEmployee,
  getOrganization,
} from "../../features/requestTemplate/requestTemplateSlice";
import ManagmentOption from "./ManagmentOption";
import SpecificedOptionForEdit from "./SpecificedOptionForEdit";
import EmployeeOption from "./EmployeeOption";

interface Iprop {
  cancelFunc: any;
  show?: any;
  handleClose?: any;
  organization: any;
  setSelectedIds?: any;
  setSelectedNames?: any;
  employee?: any;
  specialized?: any;
  setActionType?: any;
  setName?: any;
  setNameForEmployee?: any;
  actionTakerId?: string;
  actionType?: number;
}
const HierarchyPopup: React.FC<Iprop> = ({
  setActionType,
  specialized,
  show,
  handleClose,
  organization,
  setSelectedIds,
  setSelectedNames,
  employee,
  actionTakerId,
  actionType,
  setName,
  setNameForEmployee,
}) => {
  const intl = useIntl();

  // const [modalHShow, setModalHShow] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("1");

  useEffect(() => {
    if (actionType !== undefined) {
      if (actionType === 0) setSelectedValue("2");
      else setSelectedValue(actionType.toString());
    } else setSelectedValue("1");
  }, [show]);

  const handelSelectChange = (event: any) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
  };

  const getActiveElement = (selectedValue: any) => {
    switch (selectedValue) {
      // case "1":
      //   return <EntityOption />;
      case "1":
        return (
          <ManagmentOption
            organization={organization}
            setSelectedIds={setSelectedIds}
            setSelectedNames={setSelectedNames}
            setActionType={setActionType}
            actionTakerId={actionTakerId}
          />
        );
      // case "3":
      case "2":
        return (
          <EmployeeOption
            employee={employee}
            setSelectedIds={setSelectedIds}
            setSelectedNames={setSelectedNames}
            setActionType={setActionType}
            actionTakerId={actionTakerId}
          />
        );
      case "3":
        return (
          <SpecificedOptionForEdit
            specialized={specialized}
            setSelectedIds={setSelectedIds}
            setSelectedNames={setSelectedNames}
            setActionType={setActionType}
            actionTakerId={actionTakerId}
            searchTermForSpecified={searchTermForSpecified}
          />
        );
    }
  };

  let dispatch = useAppDispatch();
  const [searchTermForEmployee, setSearchTermForEmployee] =
    useState<string>("");
  const [searchTermForSpecified, setSearchTermForSpecified] =
    useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    if (searchTerm) {
      setName(searchTerm);
    } else {
      dispatch(getOrganization({ name: "" }) as any);
    }
  }, [searchTerm]);
  useEffect(() => {
    if (searchTermForEmployee) {
      setNameForEmployee(searchTermForEmployee);
    } else {
      dispatch(getEmployee({ search: "" }) as any);
    }
  }, [searchTermForEmployee]);
  return (
    <Fragment>
      <div className="modal-dialog">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
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
                    <h1 className="mb-3">
                      {intl.formatMessage({ id: "OrganizationalChart" })}
                    </h1>
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
                  <select
                    onChange={handelSelectChange}
                    value={selectedValue}
                    className="form-select form-select-lg mb-3 form-select-solid"
                    aria-label=".form-select-lg example"
                  >
                    {/* <option value="1">
                      {intl.formatMessage({ id: "Entity Type" })}
                    </option> */}
                    <option value="1">
                      {intl.formatMessage({ id: "RealEstateOperations" })}
                    </option>
                    {/* <option value="3">
                      {intl.formatMessage({ id: "Committee" })}
                    </option> */}
                    <option value="2">
                      {intl.formatMessage({ id: "Employee" })}
                    </option>
                    <option value="3">
                      {intl.formatMessage({ id: "specified" })}
                    </option>
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
                    <KTSVG
                      path="/media/icons/duotune/general/gen021.svg"
                      className="svg-icon-1 position-absolute text-muted mx-3"
                    />
                    {selectedValue == "1" ? (
                      <input
                        type="text"
                        name="search"
                        className="form-control form-control-solid ps-10 pr-2"
                        placeholder={intl.formatMessage({ id: "Search" })}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    ) : selectedValue == "2" ? (
                      <input
                        type="text"
                        name="searchTermForEmployee"
                        className="form-control form-control-solid ps-10 pr-2"
                        placeholder={intl.formatMessage({ id: "Search" })}
                        value={searchTermForEmployee}
                        onChange={(e) =>
                          setSearchTermForEmployee(e.target.value)
                        }
                      />
                    ) : (
                      <input
                        type="text"
                        name="searchTermForSpecified"
                        className="form-control form-control-solid ps-10 pr-2"
                        placeholder={intl.formatMessage({ id: "Search" })}
                        value={searchTermForSpecified}
                        onChange={(e) =>
                          setSearchTermForSpecified(e.target.value)
                        }
                      />
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
                    showSuccessAlert(true, "AddedSuccessfully", intl);
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
      </div>

      {/* <div className="modal fade" aria-hidden="true">
        <EmployeeHierarchyPopup
          show={modalHShow}
          handleClose={() => setModalHShow(false)}
        />
      </div> */}
    </Fragment>
  );
};

export default HierarchyPopup;
