import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  GetRequestTypesByCategoryId,
  getOrganization,
  getRequestCategory,
  getRequestTemplateById,
  putRequestTemplate,
} from "../../../features/requestTemplate/requestTemplateSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  editRequstTemplateSchema,
  editRequstTemplateSchemaProps,
} from "../../../validations/EditRequstTemplate";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { requestTemplateStepDtosModel } from "../../../models/requestTemplateByIdModel";
import { requestCategoryModel } from "../../../models/requestCategory";
import { requestTypesByCategoryIdModel } from "../../../models/requestTypesByCategoryId";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { RequestStep } from "./RequestStep";
import { EditPopup } from "../popup/EditPopup";

interface IProps {
  id: any;
  setLastAddedId?: any;
}

const EditNewRequestTemplate: React.FC<IProps> = ({ id, setLastAddedId }) => {
  const intl = useIntl();
  let navigate = useNavigate();
  const [modalEShow, setModalEShow] = useState<boolean>(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState<any>("");
  const [actionTacId, setActionTacId] = useState<any>("");
  const [slaRequestId, setSlaRequestId] = useState<any>("");
  const [roleRequestId, setRoleRequestId] = useState<any>("");
  const [selectedRequestTypeByCategoryId, setSelectedRequestTypeByCategoryId] =
    useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [actType, setActType] = useState<any>();
  const [projectCategoryId, setProjectCategoryId] = useState<string>("");

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getOrganization({}) as any);
    dispatch(getRequestCategory() as any);
  }, []);

  let requestTemplateById = useSelector((state: RootState) => {
    return state?.requestTemplate?.requestTemplateById;
  });

  let requestCategory = useSelector((state: RootState) => {
    return state?.requestTemplate?.dataCategory;
  });

  useEffect(() => {
    const category: any = requestCategory?.find(
      (category: requestCategoryModel) =>
        category.name === "اداره اللجان" ||
        category.name === "ادارة اللجان" ||
        category.name === "ادارة اللجان" ||
        category.name === "إدارة اللجان"
    );

    if (category) {
      setProjectCategoryId(category.id);
      if (projectCategoryId)
        dispatch(GetRequestTypesByCategoryId(projectCategoryId) as any);
    }
  }, [requestCategory, projectCategoryId]);

  let requestTypesByCategoryId = useSelector((state: RootState) => {
    return state?.requestTemplate?.requestTypesByCategoryId;
  });

  useEffect(() => {
    if (selectedCategoryId)
      dispatch(GetRequestTypesByCategoryId(selectedCategoryId) as any);
  }, [selectedRequestTypeByCategoryId, projectCategoryId, selectedCategoryId]);

  const [templateSteps, setTemplateSteps] = useState<any>();

  // useEffect(()=>{
  //   setTemplateSteps( requestTemplateById?.requestTemplateStepDtos
  //     ? JSON.parse(JSON.stringify(requestTemplateById?.requestTemplateStepDtos))
  //     : ([] as requestTemplateStepDtosModel[]))
  // },[requestTemplateById])

  const [managementCount, setManagementCount] = useState<number>(1);

  useEffect(() => {
    setSelectedCategoryId(requestTemplateById?.categoryId);
    setSelectedRequestTypeByCategoryId(
      requestTemplateById?.requestCategoryTypeId
    );
    setTemplateSteps(
      requestTemplateById?.requestTemplateStepDtos?.map((item) => {
        return {
          ...item,
          isCountTask: item?.assginRequestTemplateStepDto?.isCountTask,
          countTask: item?.assginRequestTemplateStepDto?.countTask,
        };
      })
    );
    setManagementCount(requestTemplateById?.pathCount || 1);
  }, [requestTemplateById]);
  const [name, setName] = useState<string>("");
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

  const handleCategoryChange = (event: any) => {
    const categoryId = event.target.value;
    setSelectedCategoryId(categoryId);
    dispatch(GetRequestTypesByCategoryId(categoryId) as any);
  };

  const handleRequestCategoryChange = (event: any) => {
    const requestCategoryTypeId = event.target.value;
    setSelectedRequestTypeByCategoryId(requestCategoryTypeId);
  };

  useEffect(() => {
    if (selectedRequestTypeByCategoryId) {
      dispatch(GetRequestTypesByCategoryId(selectedCategoryId) as any);
    }
  }, [selectedRequestTypeByCategoryId]);

  // const [requestTemplateStepDtos, setRequestTemplateStepDtos] = useState<any>(
  //   requestTemplateById?.requestTemplateStepDtos || []
  // );

  const formattedId = id?.toString().replace(/^\//, "");
  useEffect(() => {
    if (formattedId) {
      dispatch(getRequestTemplateById(formattedId) as any);
    }
  }, [formattedId]);

  // const handleRequestTemplateStepsChange = (e: any, index: number) => {
  //   requestTemplateStepDtos[index][e.target.name] = e.target.value;
  //   setRequestTemplateStepDtos(requestTemplateStepDtos);
  // };

  const { register, handleSubmit, setValue } =
    useForm<editRequstTemplateSchemaProps>({
      resolver: yupResolver(editRequstTemplateSchema),
      mode: "all",
      reValidateMode: "onChange",
    });
  useEffect(() => {
    if (requestTemplateById) {
      setValue("name", requestTemplateById?.name);
      setValue("categoryName", requestTemplateById?.categoryName);
      setValue("pathCount", requestTemplateById?.pathCount);
    }
  }, [requestTemplateById]);
  const putRequestTemplateHandle = async (
    formValues: editRequstTemplateSchemaProps
  ) => {
    try {
      var templateStepsRequest: any = [];
      for (let templateStep of templateSteps) {
        templateStepsRequest.push({
          actionTacker: {
            actionTakerId: templateStep.actionTakerId,
            type: templateStep.actionTackerType,
            roleId: templateStep.roleId || null,
          },
          assginRequestTemplateStepDto: {
            isCountTask:
              templateStep?.isCountTask && templateStep?.countTask > 0
                ? true
                : false,
            countTask: templateStep?.isCountTask
              ? templateStep?.countTask
              : null,
          },
          slaId: templateStep.slaId || null,
          isSlaVisbale: templateStep?.isSlaVisbale == 1 ? true : false,
          exceptionActionTacker:
            templateStep?.isExceptionActionTacker == true
              ? templateStep?.exceptionActionTackers
              : [],
          determinException:
            templateStep?.isExceptionActionTacker == true ? 0 : 1,
        });
      }
      let actionTakerIds = templateStepsRequest?.map((user) => {
        return user?.actionTacker?.actionTakerId;
      });
      let hasEmptyId = actionTakerIds?.includes("");

      if (hasEmptyId) {
        showSuccessAlert(false, "YouMustEnterOrgNameOrEmployee", intl);
        return;
      }
      let data = {
        id,
        body: {
          updateRequestTempalteDto: {
            name: formValues.name,
            actionOptions: 1,
            requestCategoryId: projectCategoryId,
            parentRequestTemplateId: null,
            requestCategoryTypeId: selectedRequestTypeByCategoryId || null,
            requestTemplateSteps: templateStepsRequest,
          },
        },
      };
      dispatch(putRequestTemplate(data as any) as any).then((res: any) => {
        setLastAddedId(res?.payload?.result);
        return setMessage(res?.payload?.message);
      });
    } catch (error: any) {}
  };
  useEffect(() => {
    if (message == "Request Template Updated Successfully") {
      Promise.resolve(showSuccessAlert(true, "EditedSuccessfully", intl)).then(
        () => {
          // window.location.reload()
          dispatch(getRequestTemplateById(formattedId) as any);
        }
      );
      navigate("/committee-track-requests-tools");
    } else if (message == "must enter ExceptionActionTacker") {
      showSuccessAlert(false, "YouMustEnterExceptedUsers", intl);
    }
    return () => {
      setMessage("");
    };
  }, [message]);

  const updateRequestTemplateSteps = (managementCount: any) => {
    if (managementCount == requestTemplateById?.pathCount) {
      return;
    }
    let steps = JSON.parse(JSON.stringify(templateSteps));
    if (managementCount < requestTemplateById?.pathCount) {
      steps = [] as unknown as requestTemplateStepDtosModel[];
    }
    for (let i = steps.length; i < managementCount; i++) {
      steps.push({
        stepNumber: i + 1,
        slaId: "",
        exceptionActionTackers: [],
        isExceptionActionTacker: false,
        countTask: null,
        isCountTask: false,
        isSlaVisbale: 0,
        implementationDays: 0,
        implementationHours: 0,
        implementationMinutes: 0,
        actionTakerId: "",
        actionTackerType: 1,
        roleId: "",
        actionTackerName: "",
        roleName: "",
        type: 0,
      } as requestTemplateStepDtosModel);
    }
    setTemplateSteps(steps);
  };

  // const updateData = (data: any, index: any) => {
  //   setTemplateSteps(
  //     templateSteps.map((item: any, i: any) => {
  //       if (i == index) {
  //         return { ...item, ...data };
  //       }
  //       return item;
  //     })
  //   );
  // };

  const updateData = useCallback(
    (data: any, index: any) => {
      setTemplateSteps((prevTemplateSteps: any) =>
        prevTemplateSteps.map((item: any, i: any) =>
          i === index ? { ...item, ...data } : item
        )
      );
    },
    [setTemplateSteps]
  );
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
                      {intl.formatMessage({ id: "EditTrackRequest" })}{" "}
                    </span>
                    <span className="text-muted mt-1 fw-bold fs-7">
                      {intl.formatMessage({
                        id: "PleaseEnterTheFollowingDataToAddNewApplicationPath",
                      })}{" "}
                    </span>
                  </h3>
                </div>
                <hr />
                <form
                  className="p-5"
                  onSubmit={handleSubmit(putRequestTemplateHandle)}
                  noValidate
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
                      <div className="d-flex flex-column mb-8 ">
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
                            name="target_details"
                            type="number"
                            min={1}
                            placeholder="5"
                            id="number"
                            value={managementCount}
                            onChange={(e) => {
                              setManagementCount(Number(e.target.value));
                              updateRequestTemplateSteps(
                                Number(e.target.value)
                              );
                            }}
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
                          onChange={handleCategoryChange}
                          value={selectedCategoryId}
                          className="form-select form-select-solid"
                          name="categoryName"
                          id="categoryName"
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
                                  <option
                                    key={category.id}
                                    value={category.id}
                                    // selected={
                                    //   category.name ===
                                    //   requestTemplateById?.categoryName
                                    // }
                                  >
                                    {category.name}
                                  </option>
                                );
                              }
                              return null;
                            }
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                      <div className="d-flex flex-column mb-8">
                        <label
                          className="fs-6 fw-bold mb-2"
                          htmlFor="selectedRequestTypeByCategoryId"
                        >
                          {intl.formatMessage({ id: "OrderType" })}{" "}
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-vector-square special"></i>
                            </span>
                          </div>
                          <select
                            onChange={handleRequestCategoryChange}
                            value={selectedRequestTypeByCategoryId}
                            className="form-select form-select-solid"
                            name="requestCategoryTypeName"
                            id="selectedRequestTypeByCategoryId"
                          >
                            <option value="">
                              {intl.formatMessage({ id: "OrderType" })}
                            </option>
                            {requestTypesByCategoryId?.map(
                              (
                                requestTypesByCategoryId: requestTypesByCategoryIdModel
                              ) => (
                                <option
                                  key={requestTypesByCategoryId.id}
                                  value={requestTypesByCategoryId.id}
                                  selected={
                                    requestTypesByCategoryId.name ===
                                    requestTemplateById?.requestCategoryTypeName
                                  }
                                >
                                  {requestTypesByCategoryId.name}
                                </option>
                              )
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
                            name="target_details"
                            type="number"
                            min={1}
                            placeholder="5"
                            id="number"
                            value={managementCount}
                            onChange={(e) => {
                              setManagementCount(Number(e.target.value));
                              updateRequestTemplateSteps(
                                Number(e.target.value)
                              );
                            }}
                          />
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="timeline mb-4 timeline-1 pe-5 position-relative mt-4 pt-4">
                    <div
                      className="timeline-sep bg-secondary h-100 border border-1 border-dashed"
                      style={{
                        position: "absolute",
                        top: "10px",
                        [getCurrentSystemLanguage() == "ar"
                          ? "right"
                          : "left"]: `30px`,
                      }}
                    ></div>
                    {/* 
                      data => 3
                      pathCount => 3
                      pathCount(user) => 2
                      - check userInput < pathCount {
                        requestTemplateStepDtos = [] // reset.
                      } 
                       requestTemplateStepDtos() (push)
                    
                  */}
                    {templateSteps?.map((data: any, index: number) => (
                      <RequestStep
                        key={data?.id}
                        data={JSON.parse(JSON.stringify(data))}
                        index={index}
                        setRoleRequestId={setRoleRequestId}
                        setSlaRequestId={setSlaRequestId}
                        setActionTacId={setActionTacId}
                        setActType={setActType}
                        updateData={updateData}
                        setName={setName}
                      />
                    ))}
                  </div>
                  <div className="col-12 col-lg-7 mx-auto mb-10">
                    <div className=" card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                      <div className="d-flex gap-1 justify-content-center align-items-center w-50">
                        <Link
                          to="/committee-track-requests-tools"
                          className="w-100 btn btn-secondary mx-1 text-center"
                        >
                          {intl.formatMessage({ id: "Cancel" })}
                        </Link>
                        <button
                          type="submit"
                          className="btn btn-primary mx-1 text-center w-100"
                        >
                          {intl.formatMessage({ id: "Save" })}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="Rega_modal_edit" aria-hidden="true">
        <EditPopup handleCloseEdit={setModalEShow} showEdit={modalEShow} />
      </div>
    </Fragment>
  );
};

export default EditNewRequestTemplate;
