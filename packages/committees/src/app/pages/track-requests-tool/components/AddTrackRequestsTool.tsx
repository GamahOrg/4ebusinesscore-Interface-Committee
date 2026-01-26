import React, { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addRequestTemplate,
  getEmployee,
  getOrganization,
  getRequestCategory,
  GetRequestTypesByCategoryId,
  getRols,
  getSLA,
  getSpecialized,
} from "../../../features/requestTemplate/requestTemplateSlice";
import {
  requestTemplateSchema,
  requestTemplateSchemaProps,
} from "../../../validations/RequestTemplate";
import AddHierarchyPopup from "./AddHierarchyPopup";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { AddPopup } from "./AddPopup";
import { PostRequestPathStep } from "../../../models/AddNewRequestTrackModel";
import { requestCategoryModel } from "../../../models/requestCategory";
import { DestinationTypeEnums } from "../../../enums/enums-track-requests";
import AddExceptionUsersPopup from "../popup/AddExceptionUsersPopup";
import { RootState } from "../../../store/store";

interface IProps {
  setLastAddedId?: any;
  setSelectedRequestTemplate?: any;
}

const AddTrackRequestsTool: React.FC<IProps> = ({
  setLastAddedId,
  setSelectedRequestTemplate,
}) => {
  const [btnChecked, setBtnChecked] = useState<boolean>(false);
  const [currentCheckedIndex, setCurrentCheckedIndex] = useState<number>(0);
  const [projectCategoryId, setProjectCategoryId] = useState<any>("");
  const [name, setName] = useState<string>("");
  const [nameForEmployee, setNameForEmployee] = useState<string>("");
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<any>("");
  const [selectedRequestTypeByCategoryId, setSelectedRequestTypeByCategoryId] =
    useState<any>("");
  const [selectedSlaId, setSelectedSlaId] = useState<any>("");
  const [selectedRoleId, setSelectedRoleId] = useState<any>("");

  const [currentVal, setCurrentVal] = useState<string[]>([]);

  const intl = useIntl();
  const navigate = useNavigate();
  let [showHierarichalModal, setShowHierarichalModal] =
    useState<boolean>(false);

  const [numDivs, setNumDivs] = useState(1);

  const handleInputChange = (e: any) => {
    const value = parseInt(e.target.value);
    setNumDivs(value || 1);
  };

  let requestCategory = useSelector((state: RootState) => {
    return state?.requestTemplate?.dataCategory;
  });

  useEffect(() => {
    const category = requestCategory?.find(
      (category: requestCategoryModel) =>
        category.name === "اداره اللجان" ||
        category.name === "ادارة اللجان" ||
        category.name === "ادارة اللجان" ||
        category.name === "إدارة اللجان",
    );

    if (category) {
      setProjectCategoryId(category.id);
      dispatch(GetRequestTypesByCategoryId(projectCategoryId) as any);
    }
  }, [requestCategory]);

  let organization = useSelector((state: RootState) => {
    return state?.requestTemplate?.organization;
  });

  let location = useLocation();

  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";

  let sla = useSelector((state: RootState) => {
    return state?.requestTemplate?.sla;
  });

  let rols = useSelector((state: RootState) => {
    return state?.requestTemplate?.rols;
  });

  let employee = useSelector((state: RootState) => {
    return state?.requestTemplate?.employee;
  });

  let specialized = useSelector((state: RootState) => {
    return state?.requestTemplate?.specialized;
  });

  useEffect(() => {
    let queryParams: {
      CategoriesId?: { [key: string]: string };
      name?: string;
    } = {};
    if (name) {
      queryParams.name = name;
    }
    dispatch(getOrganization(queryParams) as any);
  }, [name]);
  useEffect(() => {
    let queryParams: {
      search?: string;
    } = {};
    if (nameForEmployee) {
      queryParams.search = nameForEmployee;
    }
    dispatch(getEmployee(queryParams) as any);
  }, [nameForEmployee]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRequestCategory() as any);
    // dispatch(getOrganization({}) as any);
    dispatch(getSLA() as any);
    dispatch(getRols() as any);
    // dispatch(getEmployee() as any);
    dispatch(getSpecialized() as any);
  }, []);

  let ParentRequestTemplate = useSelector((state: RootState) => {
    return state?.requestTemplate?.parentRequestTemplate;
  });

  let requestTypesByCategoryId = useSelector((state: RootState) => {
    return state?.requestTemplate?.requestTypesByCategoryId;
  });

  const handleCategoryChange = (event: any) => {
    const categoryId = event.target.value;
    setSelectedCategoryId(categoryId);
    if (categoryId) {
      dispatch(GetRequestTypesByCategoryId(categoryId) as any);
    }
  };

  const handleRequestTypeByCategoryChange = (event: any) => {
    const RequestCategory = event.target.value;
    setSelectedRequestTypeByCategoryId(RequestCategory);
  };

  const handleSlaChange = (event: any) => {
    const SLA = event.target.value;
    setSelectedSlaId(SLA);
  };

  const handleRoleChange = (event: any) => {
    const Role = event.target.value;
    setSelectedRoleId(Role);
  };

  const [selectedIds, setSelectedIds] = useState<any>("");
  const [selectedNames, setSelectedNames] = useState<any>("");
  const [message, setMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: {},
  } = useForm<requestTemplateSchemaProps>({
    resolver: yupResolver(requestTemplateSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  const stepsNum = watch("numOfSteps");

  const addRequestTemplateHandle = async (
    formValues: requestTemplateSchemaProps,
  ) => {
    try {
      var requestTemplateSteps: any = [];
      for (let index = 0; index < steps.length; index++) {
        var model = {
          actionTacker: {
            actionTakerId: steps[index].destinationId,
            type: steps[index].destinationType,
            roleId: steps[index].roleId || null,
          },
          slaId: steps[index].slaId || null,
          isSlaVisbale: +steps[index]?.isSlaVisbale == 1 ? true : false,
          assginRequestTemplateStepDto: {
            isCountTask: steps[index]?.isCountTask ? true : false,
            countTask: steps[index]?.isCountTask
              ? steps[index]?.countTask
              : null,
            // actionAssgin: 1
          },
          exceptionActionTacker:
            steps[index]?.determinException == 0
              ? steps[index]?.exceptionActionTacker
              : [],
          determinException:
            steps[index]?.determinException == null
              ? 1
              : steps[index]?.determinException,
        };
        // 0 exception
        // 1 no exception
        requestTemplateSteps.push(model);
      }
      let actionTakerIds = requestTemplateSteps?.map((user: any) => {
        return user?.actionTacker?.actionTakerId;
      });
      let hasEmptyId = actionTakerIds?.includes("");
      if (hasEmptyId) {
        showSuccessAlert(false, "YouMustEnterOrgNameOrEmployee", intl);
        return;
      }
      let body = {
        name: formValues.name,
        actionOptions: 1,
        requestCategoryId: projectCategoryId,
        parentRequestTemplateId: null,
        requestCategoryTypeId: selectedRequestTypeByCategoryId || null,
        requestTemplateSteps: requestTemplateSteps,
      };
      dispatch(addRequestTemplate(body as any) as any).then((res: any) => {
        setLastAddedId(res?.payload?.result);
        if (
          res?.payload?.message ===
            "Request Template Has Been Added Successfully" ||
          res?.payload?.statusEnum === 1 ||
          res?.payload?.result
        ) {
          setSelectedRequestTemplate(body);
        }
        return setMessage(res?.payload?.message);
      });
    } catch (error: any) {}
  };

  useEffect(() => {
    if (message == "Request Template Has Been Added Successfully") {
      showSuccessAlert(true, "AddedSuccessfully", intl);
      navigate("/committee-track-requests-tools", {
        state: { serviceName: cardTitle },
      });
    } else if (message == "must enter ExceptionActionTacker") {
      showSuccessAlert(false, "YouMustEnterExceptedUsers", intl);
    } else if (message == "Must Enter Count Task") {
      showSuccessAlert(false, "YouMustEnterCountTask", intl);
    }
    return () => {
      setMessage("");
    };
  }, [message]);

  const [numOfSteps, setNumOfSteps] = useState<any>(1);

  const [steps, setSteps] = useState<PostRequestPathStep[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [currentIndex, setIndex] = useState<number>(1);

  useEffect(() => {
    if (numOfSteps > steps?.length) {
      var diff = numOfSteps - steps?.length;
      var newStepsArray: PostRequestPathStep[] = [...steps]; // Create a new array with the values of steps
      var destinationsArray = [...destinations]; // Create a new array with the values of destinations

      for (let index = 1; index <= diff; index++) {
        var newStep = new PostRequestPathStep(
          steps.length + index,
          false,
          DestinationTypeEnums.Committee,
          "",
          "",
          "",
          "",
        );
        newStepsArray.push(newStep);
        destinationsArray.push({});
      }
      setSteps(newStepsArray);
      setDestinations(destinationsArray);
    } else if (numOfSteps < steps?.length) {
      var diff = steps?.length - numOfSteps;
      var newStepsArray = [...steps]; // Create a new array with the values of steps
      var destinationsArray = [...destinations]; // Create a new array with the values of destinations

      for (let index = 1; index <= diff; index++) {
        newStepsArray.pop();
        destinationsArray.pop();
      }
      setSteps(newStepsArray);
      setDestinations(destinationsArray);
    }
  }, [numOfSteps]);

  useEffect(() => {
    setNumOfSteps(stepsNum);
  }, [stepsNum]);

  const setSlaId = (value: any, index: any) => {
    var stepOrder: PostRequestPathStep = steps[index];
    stepOrder.slaId = value;
    steps[index] = stepOrder;
    setSteps([...steps]);
  };

  const setSlaShow = (value: any, index: any) => {
    var stepOrder: PostRequestPathStep = steps[index];
    stepOrder.isSlaVisbale = value;
    steps[index] = stepOrder;
    setSteps([...steps]);
  };
  const setRoleId = (value: any, index: any) => {
    var stepOrder = steps[index];
    stepOrder.roleId = value;
    steps[index] = stepOrder;
    setSteps([...steps]);
  };
  const setDeterminException = (value: any, index: any) => {
    var stepOrder = steps[index];
    stepOrder.determinException = +value;
    steps[index] = stepOrder;
    setSteps([...steps]);
  };
  const setIsCountTask = (value: any, index: any) => {
    var stepOrder = steps[index];
    stepOrder.isCountTask = value;
    steps[index] = stepOrder;
    setSteps([...steps]);
  };
  const setCountTask = (value: any, index: any) => {
    var stepOrder = steps[index];
    stepOrder.countTask = +value;
    steps[index] = stepOrder;
    setSteps([...steps]);
  };
  // const setActionAssgin = (value: any, index: any) => {
  //   var stepOrder = steps[index];
  //   stepOrder.actionAssgin = value;
  //   steps[index] = stepOrder;
  //   setSteps([...steps]);
  // };
  const setExceptionActionTacker = (value: any, index: any) => {
    var stepOrder = steps[index];
    stepOrder.exceptionActionTacker = value;
    steps[index] = stepOrder;
    setSteps([...steps]);
  };
  let [determineException, setDetermineException] = useState({});

  let [countTasks, setCountTasks] = useState({});
  let [isCountTasks, setIsCountTasks] = useState({});
  // let [actionAssgins,setActionAssgins]=useState(0)
  const [hierarchy, setHierarchy] = useState<boolean>(false);
  let [selectedExceptionIndex, setExceptionIndex] = useState<any>();
  let [showExceptionUsersPopup, setExceptionUsersPopup] = useState(false);
  let [exceptionUsers, setExceptionUsers] = useState([]);
  let [isSlaVisbale, setIsSlaVisbale] = useState({});

  const setDestination = async (
    item: any,
    destinationType: any,
    arrayIndex: any,
  ) => {
    destinations[arrayIndex] = item;
    setDestinations([...destinations]);
    var stepOrder = steps[arrayIndex];
    stepOrder.destinationId = item?.id || item?.userId;
    stepOrder.destinationType = destinationType;
    steps[arrayIndex] = stepOrder;
    setSteps([...steps]);
  };
  return (
    <Fragment>
      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start  mt-4"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div className="row g-5 g-xl-8">
            <div className="col-xl-12">
              <div className="card card-xl-stretch mb-xl-8 card-body p-2 ">
                <div className="card-header border-0 pt-5 mb-5">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder text-dark mb-3">
                      {intl.formatMessage({ id: "AddNewOrderPath" })}{" "}
                    </span>
                    <span className="text-muted mt-1 fw-bolder fs-7">
                      {intl.formatMessage({
                        id: "PleaseEnterTheFollowingDataToAddNewApplicationPath",
                      })}{" "}
                    </span>
                  </h3>
                </div>
                <hr />
                <form
                  noValidate
                  className="p-5"
                  onSubmit={handleSubmit(addRequestTemplateHandle)}
                >
                  <div className="row d-flex justify-content-around">
                    <div className="col-md-4 col-sm-12">
                      <div className="d-flex flex-column mb-8">
                        <label
                          className="fs-6 fw-bold mb-2 form-label"
                          htmlFor="name"
                        >
                          {intl.formatMessage({ id: "OrderName" })}{" "}
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-cube special"></i>
                            </span>
                          </div>
                          <input
                            {...register("name")}
                            className="form-control"
                            name="name"
                            placeholder={intl.formatMessage({
                              id: "OrderName",
                            })}
                            id="name"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column mb-8">
                        <label className="fs-6 fw-bold mb-2" htmlFor="number">
                          {intl.formatMessage({
                            id: "DepartmentsNumber",
                          })}{" "}
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="bi bi-layers-fill special"></i>
                            </span>
                          </div>
                          <input
                            className="form-control"
                            placeholder="ادخل عدد الادارات"
                            id="number"
                            {...register("numOfSteps")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                      <div className="d-flex flex-column mb-8">
                        <label
                          className="fs-6 fw-bold mb-2"
                          htmlFor="classNameification"
                        >
                          {intl.formatMessage({
                            id: "OrderClassification",
                          })}{" "}
                        </label>
                        <select
                          // onChange={handleCategoryChange}
                          value={projectCategoryId}
                          className="form-select form-select-solid"
                          name="target_details"
                          id="classNameification"
                          disabled
                        >
                          {/* <option value="">
                            {intl.formatMessage({
                              id: "OrderClassification",
                            })}
                          </option> */}
                          {requestCategory?.map(
                            (category: requestCategoryModel) => {
                              if (
                                category.name === "اداره اللجان" ||
                                category.name === "ادارة اللجان" ||
                                category.name === "إدارة اللجان"
                              ) {
                                return (
                                  <option key={category.id} value={category.id}>
                                    {category.name}
                                  </option>
                                );
                              }
                              return null;
                            },
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                      <div className="d-flex flex-column mb-8">
                        <label className="fs-6 fw-bold mb-2" htmlFor="type">
                          {intl.formatMessage({ id: "OrderType" })}{" "}
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-vector-square special"></i>
                            </span>
                          </div>
                          <select
                            onChange={handleRequestTypeByCategoryChange}
                            value={selectedRequestTypeByCategoryId}
                            className="form-select form-select-solid"
                            name="OrderType"
                            id="OrderType"
                          >
                            <option value="">
                              {intl.formatMessage({ id: "OrderType" })}
                            </option>
                            {requestTypesByCategoryId?.map(
                              (requestTypesByCategoryId) => (
                                <option
                                  key={requestTypesByCategoryId?.id}
                                  value={requestTypesByCategoryId?.id}
                                >
                                  {requestTypesByCategoryId?.name}
                                </option>
                              ),
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-4 col-sm-12">
                      {/* <div className="d-flex flex-column mb-8 ">
                      <label className="fs-6 fw-bold mb-2" htmlFor="number">
                        {intl.formatMessage({ id: "DepartmentsNumber" })}{" "}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="bi bi-layers-fill special"></i>
                          </span>
                        </div>
                        <input
                          className="form-control"
                          placeholder="ادخل عدد الادارات"
                          id="number"
                          {...register("numOfSteps")}
                        />
                      </div>
                    </div> */}
                    </div>
                  </div>
                  {Array.from({ length: numOfSteps }, (_, index) => (
                    <div className="timeline mb-4 timeline-1 pe-5 position-relative mt-4 pt-4">
                      <div
                        key={index + 1}
                        className="timeline-item mb-3 d-flex align-items-center"
                      >
                        <div className="timeline-badge w-50px">
                          <span className="badge bg-success fs-2 p-3 d-flex align-items-center justify-content-center w-30px">
                            {index + 1}
                          </span>{" "}
                        </div>
                        <div className="timeline-content d-flex align-items-center text-muted font-weight-normal mx-2">
                          <div className="row pt-3 w-100 mb-4 d-flex align-items-center justify-content-center ">
                            <div
                              className={`${
                                currentVal[index] !== "2"
                                  ? "col-md-3"
                                  : "col-md-4"
                              } col-sm-12`}
                              // className={`${currentVal[index] !== "2" ? "col-md-3" : "col-md-6"} col-sm-12`}
                            >
                              <div className="d-flex flex-column">
                                <label
                                  className="fs-6 fw-bold mb-2 form-label required"
                                  htmlFor={"classNameification" + index}
                                >
                                  {intl.formatMessage({
                                    id: "TheNameOfTheDepartmentOrEmployee",
                                  })}{" "}
                                </label>
                                <div className="d-flex">
                                  <input
                                    readOnly
                                    className="form-control form-control-lg form-control-solid"
                                    name={"classNameification" + index}
                                    placeholder={intl.formatMessage({
                                      id: "ChooseTheDepartmentOrTheEmployee",
                                    })}
                                    id={"classNameification" + index}
                                    value={
                                      destinations?.length > 0 &&
                                      destinations[index] != null &&
                                      destinations[index]?.name != undefined
                                        ? destinations[index]?.name
                                        : destinations?.length > 0 &&
                                          destinations[index] != null &&
                                          destinations[index]?.nameAr !=
                                            undefined
                                        ? destinations[index]?.nameAr
                                        : destinations?.length > 0 &&
                                          destinations[index] != null &&
                                          destinations[index]?.userNmae !=
                                            undefined
                                        ? destinations[index]?.userNmae
                                        : intl.formatMessage({
                                            id: "ChooseTheDepartmentOrTheEmployee",
                                          })
                                    }
                                  />
                                  <div
                                    className="input-group-prepend h-100"
                                    onClick={() => {
                                      setIndex(index);
                                      setHierarchy(true);
                                      setModalHShow(true);
                                    }}
                                  >
                                    <span className="input-group-text">
                                      <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {hierarchy && currentIndex == index ? (
                                <AddHierarchyPopup
                                  cancelFunc={() => {
                                    setShowHierarichalModal(false);
                                  }}
                                  show={modalHShow}
                                  handleClose={() => setModalHShow(false)}
                                  organization={organization}
                                  setSelectedIds={setSelectedIds}
                                  setSelectedNames={setSelectedNames}
                                  employee={employee}
                                  arrayIndex={currentIndex}
                                  setDestination={setDestination}
                                  specialized={specialized}
                                  currentVal={currentVal}
                                  setCurrentVal={setCurrentVal}
                                  setName={setName}
                                  setNameForEmployee={setNameForEmployee}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                            <div
                              className={`${
                                currentVal[index] !== "2"
                                  ? "col-md-3"
                                  : "col-md-4"
                              } col-sm-12 d-flex flex-column mt-8`}
                              // className={`${currentVal[index] !== "2" ? "col-md-3" : "col-md-6"} col-sm-12 d-flex flex-column mt-8`}
                            >
                              <div className="d-flex flex-column">
                                <label
                                  className="fs-6 fw-bold mb-2 form-label"
                                  htmlFor={"slaId" + index}
                                >
                                  SLA
                                </label>

                                <select
                                  className="form-select form-select-solid"
                                  name={"SlaName" + index}
                                  id={"slaId" + index}
                                  onChange={(e) => {
                                    setSlaId(e.target.value, index);
                                  }}
                                  defaultValue={0}
                                >
                                  <option disabled value={0}>
                                    {intl.formatMessage({
                                      id: "SLAName",
                                    })}
                                  </option>
                                  {sla?.map((sla: any, index: number) => {
                                    return (
                                      <option value={sla?.id} key={index}>
                                        {sla?.slaName}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>

                              <div className="d-flex fw-bolder text-primary justify-content-center align-items-center mt-5 pt-4 h-100 w-100">
                                {sla?.find(
                                  (x) => x.id == steps[index]?.slaId,
                                ) != null
                                  ? getCurrentSystemLanguage() == "ar" &&
                                    sla?.length > 0
                                    ? sla?.find(
                                        (x) => x.id == steps[index].slaId,
                                      )?.implementDays
                                    : sla?.find(
                                        (x) => x.id == steps[index]?.slaId,
                                      )?.implementDays
                                  : ""}
                              </div>
                            </div>

                            {currentVal[index] !== "2" ? (
                              <div
                                className={`${
                                  currentVal[index] !== "2"
                                    ? "col-md-2"
                                    : "col-md-3"
                                } col-sm-12`}
                                // className="col-md-2 col-sm-12"
                              >
                                <div className="d-flex flex-column">
                                  <label
                                    className="fs-6 fw-bold mb-2 form-label"
                                    htmlFor={"RoleName" + index}
                                  >
                                    {intl.formatMessage({
                                      id: "Role",
                                    })}
                                  </label>

                                  <select
                                    className="form-select form-select-solid"
                                    name={"RoleId" + index}
                                    id={"RoleId" + index}
                                    onChange={(e) => {
                                      setRoleId(e.target.value, index);
                                    }}
                                    defaultValue={0}
                                  >
                                    <option disabled value={0}>
                                      {intl.formatMessage({
                                        id: "RoleName",
                                      })}
                                    </option>
                                    {rols?.map((role: any, index: number) => {
                                      return (
                                        <option value={role?.id} key={index}>
                                          {role?.nameAr}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            <div
                              // className={`${currentVal[index] !== "2" ? "col-md-3" : "col-md-4"} col-sm-12 d-flex flex-column mt-8`}
                              className={`${
                                currentVal[index] !== "2"
                                  ? "col-md-2"
                                  : "col-md-3"
                              } col-sm-12 d-flex flex-column `}
                            >
                              <div className="d-flex flex-column">
                                <label
                                  className="fs-6 fw-bold mb-2 form-label"
                                  htmlFor={"exception" + index}
                                >
                                  {intl.formatMessage({
                                    id: "Exception",
                                  })}
                                </label>

                                <select
                                  className="form-select form-select-solid"
                                  name={"exception" + index}
                                  id={"exception" + index}
                                  onChange={(e) => {
                                    setDeterminException(e.target.value, index);
                                    setDetermineException((prev) => {
                                      let newValue = {
                                        ...prev,
                                        [index]: +e.target.value,
                                      };
                                      return newValue;
                                    });
                                  }}
                                >
                                  <option value={1} selected>
                                    {intl.formatMessage({ id: "No" })}
                                  </option>
                                  <option value={0}>
                                    {intl.formatMessage({ id: "Yes" })}
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div
                              className={`${
                                currentVal[index] !== "2"
                                  ? "col-md-2"
                                  : "col-md-3"
                              } col-sm-12 d-flex flex-column `}
                            >
                              {determineException[index] == 0 ? (
                                <>
                                  <div
                                    onClick={() => {
                                      setExceptionIndex(index);
                                      setExceptionUsersPopup(true);
                                    }}
                                    className="btn btn-primary btn-sm"
                                    style={{ fontSize: "10" }}
                                  >
                                    {intl.formatMessage({
                                      id: "PleaseAddTheExceptions",
                                    })}
                                  </div>
                                  {selectedExceptionIndex == index ? (
                                    <AddExceptionUsersPopup
                                      show={showExceptionUsersPopup}
                                      setExceptionActionTacker={
                                        setExceptionActionTacker
                                      }
                                      setExceptionUsers={setExceptionUsers}
                                      handleClose={() => {
                                        setExceptionUsersPopup(false);
                                      }}
                                      index={index}
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
                                id={"CanAttribute" + index}
                                // checked={
                                //  steps[index]
                                // }
                                // onChange={(e) => {
                                //   setIsCountTasks(e.target.checked)
                                //   setCountTask(e.target.checked,index)
                                // }}
                                checked={isCountTasks[index]}
                                onChange={(e) => {
                                  setIsCountTask(e.target.checked, index);
                                  setIsCountTasks((prev) => {
                                    let newValue = {
                                      ...prev,
                                      [index]: e.target.checked,
                                    };
                                    return newValue;
                                  });
                                }}
                              />
                              <label
                                htmlFor={"CanAttribute" + index}
                                className="fs-6 fw-bold form-label"
                              >
                                {intl.formatMessage({
                                  id: "CanAssign",
                                })}
                              </label>
                            </div>
                            {isCountTasks[index] && (
                              <div className="col-md-2 col-sm-12 d-flex flex-column mb-2">
                                <label
                                  className="fs-6 fw-bold mb-2 form-label"
                                  htmlFor={"TasksNumber" + index}
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
                                    name={"TasksNumber" + index}
                                    type="number"
                                    min={0}
                                    placeholder={intl.formatMessage({
                                      id: "NumberOfTasksAssigned",
                                    })}
                                    value={countTasks[index]}
                                    id={"TasksNumber" + index}
                                    onChange={(e) => {
                                      setCountTask(e.target.value, index);
                                      // setCountTasks(e?.target?.value)
                                      setCountTasks((prev) => {
                                        let newValue = {
                                          ...prev,
                                          [index]: e?.target?.value,
                                        };
                                        return newValue;
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                            <div
                              // className={`${currentVal[index] !== "2" ? "col-md-3" : "col-md-4"} col-sm-12 d-flex flex-column mt-8`}
                              className={`${
                                currentVal[index] !== "2"
                                  ? "col-md-2"
                                  : "col-md-6"
                              } col-sm-12 d-flex flex-column `}
                            >
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
                                  defaultValue={0}
                                  // value={isSlaVisbale[index]}
                                  onChange={(e) => {
                                    setSlaShow(e.target.value, index);
                                    setIsSlaVisbale((prev) => {
                                      let newValue = {
                                        ...prev,
                                        [index]: e.target.value,
                                      };
                                      return newValue;
                                    });
                                  }}
                                >
                                  <option value={0} selected>
                                    {intl.formatMessage({ id: "No" })}
                                  </option>
                                  <option value={1}>
                                    {intl.formatMessage({ id: "Yes" })}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="d-flex justify-content-center ">
                    <Link to="/committee-track-requests-tools">
                      <button className="btn btn-secondary px-15 mx-3">
                        {intl.formatMessage({ id: "Cancel" })}
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-success px-15 "
                      disabled={stepsNum == 0 || !stepsNum}
                    >
                      {intl.formatMessage({ id: "Add" })}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="Rega_modal_add" aria-hidden="true">
        <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
      </div>
    </Fragment>
  );
};

export default AddTrackRequestsTool;
