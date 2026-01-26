import { useEffect, useState } from "react";
import {
  getEmployee,
  getRols,
  getSLA,
  getSpecialized,
} from "../../../features/requestTemplate/requestTemplateSlice";
import { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import React from "react";
import AddExceptionUsersForEditPopup from "../popup/AddExceptionUsersForEditPopup";
import HierarchyPopup from "../../partials/HierarchyPopup";

export const RequestStep: React.FC<any> = ({
  data,
  index,
  setRoleRequestId,
  setSlaRequestId,
  setActionTacId,
  setActType,
  updateData,
  setName,
}) => {
  let navigate = useNavigate();
  const intl = useIntl();
  let [showHierarichalModal, setShowHierarichalModal] =
    useState<boolean>(false);

  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const [selectedSlaId, setSelectedSlaId] = useState<any>(data?.slaId);
  const [selectedRoleId, setSelectedRoleId] = useState<any>(data?.roleId);
  const [selectedDeterminException, setSelectedDeterminException] = useState(0);
  const [countTask, setCountTask] = useState<any>("");
  const [isCountTasks, setIsCountTasks] = useState(false);
  const [selectedExceptionActionTacker, setSelectedExceptionActionTacker] =
    useState([]);
  const [selectedIds, setSelectedIds] = useState<any>(data?.actionTakerId);
  const [actionType, setActionType] = useState<any>(data?.actionTackerType);
  const [dataState, setDataState] = useState<any>(data); // Define data state
  const [nameForEmployee, setNameForEmployee] = useState<string>("");
  const [isSlaVisbale, setIsSlaVisbale] = useState("0");

  useEffect(() => {
    let queryParams: {
      search?: string;
    } = {};
    if (nameForEmployee) {
      queryParams.search = nameForEmployee;
    }
    dispatch(getEmployee(queryParams) as any);
  }, [nameForEmployee]);

  const setData = (newData: any) => {
    setDataState(newData);
    updateData(newData, index);
  };

  let organization = useSelector((state: RootState) => {
    return state?.requestTemplate?.organization;
  });

  let employee = useSelector((state: RootState) => {
    return state?.requestTemplate?.employee;
  });

  let sla = useSelector((state: RootState) => {
    return state?.requestTemplate?.sla;
  });

  let rols = useSelector((state: RootState) => {
    return state?.requestTemplate?.rols;
  });

  let specialized = useSelector((state: RootState) => {
    return state?.requestTemplate?.specialized;
  });
  const dispatch = useDispatch();
  let exceptionUsers = useSelector((state: RootState) => {
    return state?.requestTemplate?.exceptionUsers;
  });

  useEffect(() => {
    dispatch(getSLA() as any);
    dispatch(getRols() as any);
    dispatch(getSpecialized() as any);
  }, []);

  useEffect(() => {
    if (data) {
      setSelectedSlaId(data?.slaId);
      setSelectedRoleId(data?.roleId);
      setSelectedExceptionActionTacker(data?.exceptionActionTackersDto);
    }
  }, [data, exceptionUsers]);
  useEffect(() => {
    setIsCountTasks(data?.assginRequestTemplateStepDto?.isCountTask);
    setSelectedDeterminException(data?.isExceptionActionTacker ? 0 : 1);
    setIsSlaVisbale(data?.isSlaVisbale == true ? "1" : "0");
    setCountTask(data?.assginRequestTemplateStepDto?.countTask);
  }, []);
  // const handleSlaChange = (event: any) => {
  //   const SLA = event.target.value;
  //   setSelectedSlaId(SLA);
  // };

  const handleSlaChange = (event: any) => {
    const selectedSlaId = event.target.value;
    const selectedSla = sla.find((s) => s.id === selectedSlaId);
    if (selectedSla) {
      setData({
        ...data,
        slaId: selectedSlaId,
        slaName: selectedSla.slaName,
        implementationDays: selectedSla?.implementPeriodAr?.includes("يوم")
          ? selectedSla.implementPeriodAr.split(" ")[1]
          : "0",
        implementationHours: selectedSla?.implementPeriodAr?.includes("ساعة")
          ? selectedSla.implementPeriodAr.split(" ")[3]
          : "0",
        implementationMinutes: selectedSla?.implementPeriodAr?.includes("دقيقة")
          ? selectedSla.implementPeriodAr.split(" ")[5]
          : "0",
      });
      setSelectedSlaId(selectedSlaId); // Set the selected SLA ID
    }
  };

  const handleRoleChange = (event: any) => {
    const Role = event.target.value;
    setSelectedRoleId(Role);
  };
  const [selectedNames, setSelectedNames] = useState<any>();
  useEffect(() => {
    if (data?.actionTackerName) setSelectedNames(data?.actionTackerName);
  }, [data?.actionTackerName]);

  useEffect(() => {
    if (data?.actionTackerType) setActionType(data?.actionTackerType);
  }, [data?.actionTackerType]);
  // let exceptionUsers=useSelector((state:RootState)=>{return state?.requestTemplate?.exceptionUsers})
  // const [checkedUserIds, setCheckedUserIds] = useState<string[]>([]);
  // const [exceptionActionTackers, setExceptionActionTackers] = useState({
  //   exceptionActionTackers: []
  // });

  useEffect(() => {
    setRoleRequestId(selectedRoleId);
    setSlaRequestId(selectedSlaId);
    setActionTacId(selectedIds);
    setActType(actionType);
    data.actionTakerId = selectedIds;
    data.roleId = selectedRoleId;
    data.actionTackerType = actionType;
    data.slaId = selectedSlaId;
    updateData(data, index);
  }, [selectedSlaId, selectedRoleId, selectedIds, actionType]);

  // useEffect(()=>{
  //    data.countTask=countTask
  // },[countTask])
  // useEffect(()=>{
  //   data.isExceptionActionTacker=selectedDeterminException;
  //   updateData(data, index)
  // },[selectedDeterminException])
  // useEffect(() => {
  //   if (data) {
  //     const updatedData = {
  //       ...data,
  //       exceptionActionTackers: selectedExceptionActionTacker?.map(user => user?.userId),
  //     };
  //       updateData(updatedData, index);
  //   }
  // }, [selectedExceptionActionTacker]);

  let [selectedExceptionIndex, setExceptionIndex] = useState<any>();
  let [showExceptionUsersPopup, setExceptionUsersPopup] = useState(false);
  // let [exceptionUsers,setExceptionUsers]=useState([])
  // useEffect(()=>{
  //   setExceptionUsers(data?.exceptionActionTacker)
  // },[data?.exceptionActionTacker])

  return (
    <>
      <div className="timeline-item mb-3 d-flex align-items-center ">
        <div className="timeline-badge w-50px">
          <span className="badge bg-success fs-2 p-3 d-flex align-items-center justify-content-center w-30px">
            {index + 1}
          </span>
        </div>
        <div className="timeline-content d-flex  align-items-center text-muted font-weight-normal ms-4">
          <div className="row pt-3 w-100 mb-4 d-flex align-items-center ">
            <div
              className={`${actionType !== 0 ? "col-md-3" : "col-md-4"} col-sm-12`}
              // className={`${actionType !== 0 ? "col-md-3" : "col-md-6"} col-sm-12`}
            >
              <div className="d-flex flex-column mb-2">
                <label className="fs-6 fw-bold mb-2 form-label required">
                  {intl.formatMessage({
                    id: "TheNameOfTheDepartmentOrEmployee",
                  })}
                </label>

                <div className="input-group">
                  <input
                    className="form-control"
                    name="name"
                    placeholder={intl.formatMessage({
                      id: "ChooseTheDepartmentOrTheEmployee",
                    })}
                    id="name"
                    value={selectedNames}
                  />
                  <div
                    className="input-group-prepend"
                    onClick={() => {
                      navigate("#");
                      setModalHShow(true);
                    }}
                  >
                    <span className="input-group-text">
                      <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${actionType !== 0 ? "col-md-3" : "col-md-4"} col-sm-12 d-flex flex-column mt-5`}
              // className={`${actionType !== 0 ? "col-md-3" : "col-md-6"} col-sm-12 d-flex flex-column mt-5`}
            >
              <div className="d-flex flex-column mb-2">
                <label
                  className="fs-6 fw-bold mb-2 form-label"
                  htmlFor="classNameification"
                >
                  SLA
                </label>

                <select
                  onChange={handleSlaChange}
                  value={selectedSlaId}
                  className="form-select form-select-solid"
                  name="SlaId"
                  id="SlaId"
                >
                  <option value="">
                    {intl.formatMessage({
                      id: "SLAName",
                    })}
                  </option>
                  {sla?.map((sla) => (
                    <option
                      value={sla?.id}
                      selected={sla.slaName == data?.slaName}
                    >
                      {sla?.slaName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="d-flex fw-bolder text-primary justify-content-center align-items-center h-100 w-100">
                {data?.implementationMinutes} يوم {data?.implementationHours}
                {""} ساعه {data?.implementationDays} دقيقه
              </div>
            </div>

            {actionType !== 0 && (
              <div
                className={`${actionType !== 0 ? "col-md-2" : "col-md-3"} col-sm-12`}
                // className={"col-md-2 col-sm-12"}
              >
                <div className="d-flex flex-column mb-2">
                  <label
                    className="fs-6 fw-bold mb-2 form-label"
                    htmlFor="classNameification"
                  >
                    {intl.formatMessage({
                      id: "RoleName",
                    })}
                  </label>

                  <select
                    onChange={handleRoleChange}
                    value={selectedRoleId}
                    className="form-select form-select-solid"
                    name="RoleName"
                    id="RoleName"
                  >
                    <option value="">
                      {intl.formatMessage({
                        id: "RoleName",
                      })}
                    </option>
                    {rols?.map((role: any) => (
                      <option
                        key={role?.id}
                        value={role?.id}
                        selected={role.nameAr == data?.roleName}
                      >
                        {role?.nameAr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <div
              // className={`${currentVal[index] !== "2" ? "col-md-3" : "col-md-4"} col-sm-12 d-flex flex-column mt-8`}
              className={`${actionType !== 0 ? "col-md-1" : "col-md-6"} col-sm-12 d-flex flex-column `}
            >
              <div className="d-flex flex-column">
                <label
                  className="fs-6 fw-bold mb-2 form-label"
                  htmlFor={"exception" + index}
                >
                  {intl.formatMessage({ id: "Exception" })}
                </label>

                <select
                  className="form-select form-select-solid"
                  name={"exception" + index}
                  id={"exception" + index}
                  value={selectedDeterminException}
                  onChange={(e) => {
                    setSelectedDeterminException(+e.target.value);
                    data.isExceptionActionTacker =
                      +e.target.value == 1 ? false : true;
                    updateData(data, index);
                  }}
                >
                  <option value={1}>{intl.formatMessage({ id: "No" })}</option>
                  <option value={0}>{intl.formatMessage({ id: "Yes" })}</option>
                </select>
              </div>
            </div>
            <div
              className={`${actionType !== 0 ? "col-md-3" : "col-md-6"} col-sm-12 d-flex flex-column `}
            >
              {selectedDeterminException == 0 ? (
                <>
                  <div
                    onClick={() => {
                      setExceptionIndex(index);
                      setExceptionUsersPopup(true);
                    }}
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: "10" }}
                  >
                    {intl.formatMessage({ id: "PleaseAddTheExceptions" })}
                  </div>
                  {selectedExceptionIndex == index ? (
                    <AddExceptionUsersForEditPopup
                      show={showExceptionUsersPopup}
                      setExceptionActionTacker={
                        setSelectedExceptionActionTacker
                      }
                      setExceptionUsers={setSelectedExceptionActionTacker}
                      handleClose={() => {
                        setExceptionUsersPopup(false);
                      }}
                      selectedExceptionActionTacker={
                        selectedExceptionActionTacker
                      }
                      index={index}
                      updateData={updateData}
                      data={data}
                      // setCheckedUserIds={setCheckedUserIds}
                      // checkedUserIds={checkedUserIds}
                      exceptedUsers={selectedExceptionActionTacker}
                      isExcepted={selectedDeterminException == 0 ? true : false}
                    />
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="mt-5 col-md-2 col-sm-12 d-flex align-items-center">
              <input
                type="checkbox"
                className="mx-2 form-check-input my-2 my-md-0"
                id={`CanAttribute+${index}`}
                checked={isCountTasks}
                onChange={(e) => {
                  setIsCountTasks(e.target.checked);
                  data.isCountTask = e.target.checked;
                  updateData(data, index);
                }}
              />
              <label htmlFor="CanAttribute" className="fs-6 fw-bold form-label">
                {intl.formatMessage({
                  id: "CanAssign",
                })}
              </label>
            </div>
            {isCountTasks && (
              <div className="col-md-2 col-sm-12 d-flex flex-column mb-2">
                <label
                  className="fs-6 fw-bold mb-2 form-label"
                  htmlFor="TasksNumber"
                >
                  {intl.formatMessage({
                    id: "NumberOfTasksAssigned",
                  })}
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa-solid fa-list-check special"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    name="target_details"
                    type="number"
                    min={0}
                    placeholder={intl.formatMessage({
                      id: "NumberOfTasksAssigned",
                    })}
                    value={countTask}
                    onChange={(e) => {
                      setCountTask(+e?.target?.value);
                      data.countTask = +e?.target?.value;
                      updateData(data, index);
                    }}
                    id="TasksNumber"
                  />
                </div>
              </div>
            )}
            <div className="d-flex flex-column">
              <label
                className="fs-6 fw-bold mb-2 form-label"
                htmlFor={"slaAvailable" + index}
              >
                {intl.formatMessage({ id: "SLAShow" })}
              </label>

              <select
                className="form-select form-select-solid"
                name={"slaAvailable" + index}
                id={"slaAvailable" + index}
                value={isSlaVisbale}
                onChange={(e) => {
                  setIsSlaVisbale(e.target.value);
                  data.isSlaVisbale = +e.target.value;
                  updateData(data, index);
                }}
              >
                <option value={"0"}>{intl.formatMessage({ id: "No" })}</option>
                <option value={"1"}>{intl.formatMessage({ id: "Yes" })}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="Rega_modal_add" aria-hidden="true">
        <HierarchyPopup
          cancelFunc={() => {
            setShowHierarichalModal(false);
          }}
          show={modalHShow}
          handleClose={() => setModalHShow(false)}
          organization={organization}
          setSelectedIds={setSelectedIds}
          setSelectedNames={setSelectedNames}
          employee={employee}
          specialized={specialized}
          setActionType={setActionType}
          actionTakerId={data?.actionTakerId}
          actionType={actionType}
          setNameForEmployee={setNameForEmployee}
          setName={setName}
        />
      </div>
    </>
  );
};
