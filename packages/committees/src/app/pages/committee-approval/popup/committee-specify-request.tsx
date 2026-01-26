import React, { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommitteeApprovals,
  getAllRequestTemplate,
  getRequestCategory,
  getRequestTemplateById,
  getRequestTemplatesByTypeId,
  getRequestTypesByCategoryId,
  putAssignWorkflowToCommittee,
} from "../../../features/Approvals/committeeApprovalSlice";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { RootState } from "../../../store/store";
import { requestTemplatesByTypeIdModel } from "../../../models/requestTemplatesByTypeId";
import { Notification } from "@4eplatform/shared/services/notifications";
import { fetchRequestTimeline } from "../../../features/Approvals/committeeApprovalRequestTimelineSlice";
type PopupProps = {
  show: boolean;
  handleClose: any;
  setLastAddedId?: any;
  committeeId?: any;
  committeeName?: any;
  committee?: any;
};
const SpecifyRequest: React.FC<PopupProps> = ({
  show,
  handleClose,
  setLastAddedId,
  committeeId,
  committeeName,
  committee,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState<any>("");
  const [selectedRequestTypeByCategoryId, setSelectedRequestTypeByCategoryId] =
    useState<any>("");
  const [
    selectedRequestTemplatesByTypeId,
    setSelectedRequestTemplatesByTypeId,
  ] = useState<any>("");

  const handleRequestTemplateByTypeIdChange = (event: any) => {
    const requestTemplatesByTypeId = event.target.value;
    setSelectedRequestTemplatesByTypeId(requestTemplatesByTypeId);
    dispatch(getRequestTemplateById(requestTemplatesByTypeId) as any);
  };

  let requestTemplatesBytypeId = useSelector((state: RootState) => {
    return state?.committeeApproval?.requestTemplatesBytypeId;
  });

  let requestCategory = useSelector((state: RootState) => {
    return state?.committeeApproval?.dataCategory?.filter((ele: any) => {
      return (
        ele?.name === "إدارة اللجان" ||
        ele?.name === "ادارة اللجان" ||
        ele?.name === "اداره اللجان" ||
        ele?.name === "إدارة اللجان"
      );
    });
  });

  let requestTypesByCategoryId = useSelector((state: RootState) => {
    return state?.committeeApproval?.requestTypesByCategoryId?.filter(
      (ele: any) => {
        return (
          ele?.name === "اعتماد لجنه" ||
          ele?.name === "إعتماد لجنه" ||
          ele?.name === "اعتماد لجنة" ||
          ele?.name === "إعتماد لجنة" ||
          ele?.name === "اعتماد لجنة "
        );
      },
    );
  });

  useEffect(() => {
    const foundId = requestCategory?.find((ele: any) => {
      return (
        ele?.name === "إدارة اللجان" ||
        ele?.name === "ادارة اللجان" ||
        ele?.name === "اداره اللجان" ||
        ele?.name === "إدارة اللجان"
      );
    })?.id;

    if (foundId && foundId !== selectedCategoryId) {
      setSelectedCategoryId(foundId);
    }
  }, [requestCategory]);

  useEffect(() => {
    if (selectedCategoryId) {
      dispatch(getRequestTypesByCategoryId(selectedCategoryId) as any);
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    if (!requestTypesByCategoryId?.length) return;

    const foundId =
      requestTypesByCategoryId.find((ele: any) =>
        [
          "اعتماد لجنه",
          "إعتماد لجنه",
          "اعتماد لجنة",
          "إعتماد لجنة",
          "اعتماد لجنة ",
        ].includes(ele?.name),
      )?.id ?? null;

    if (foundId && foundId !== selectedRequestTypeByCategoryId) {
      setSelectedRequestTypeByCategoryId(foundId);
    }
  }, [requestTypesByCategoryId, selectedRequestTypeByCategoryId]);

  useEffect(() => {
    if (selectedRequestTypeByCategoryId) {
      // dispatch(getRequestTemplateById(selectedRequestTypeByCategoryId) as any)
      dispatch(
        getRequestTemplatesByTypeId(selectedRequestTypeByCategoryId) as any,
      );
    }
  }, [selectedRequestTypeByCategoryId]);

  useEffect(() => {
    dispatch(getRequestCategory() as any);
  }, [dispatch]);

  useEffect(() => {
    let params: any = {
      pageSize: searchParams.get("pageSize") || "400",
      pageNumber: searchParams.get("pageNumber") || "1",
    };
    dispatch(getAllRequestTemplate(params) as any);
  }, [searchParams.get("pageSize"), searchParams.get("pageNumber")]);

  useEffect(() => {
    if (selectedRequestTemplatesByTypeId) {
      setLastAddedId(selectedRequestTemplatesByTypeId);
    }
  }, [selectedRequestTemplatesByTypeId]);

  let requestTemplateById: any = useSelector((state: RootState) => {
    return state?.committeeApproval?.requestTemplateById;
  });

  const showSuccessAlert = () => {
    Swal.fire({
      text: intl.formatMessage({ id: "AddedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: { confirmButton: "btn btn-primary" },
    }).then(() => {
      dispatch(fetchCommitteeApprovals(committeeId) as any);
    });
  };

  const [inputValues, setInputValues] = useState({
    OrderName: "",
    categoryName: "",
    pathCount: "",
    actionTackerName: "",
    slaName: "",
    rolName: "",
    requestCategoryTypeName: "",
  });

  useEffect(() => {
    if (selectedRequestTemplatesByTypeId) {
      setInputValues({
        OrderName: "",
        categoryName: "",
        pathCount: "",
        actionTackerName: "",
        slaName: "",
        rolName: "",
        requestCategoryTypeName: "",
      });
    }
  }, [selectedRequestTemplatesByTypeId]);

  const clearInputValues = () => {
    setInputValues({
      OrderName: "",
      categoryName: "",
      pathCount: "",
      actionTackerName: "",
      slaName: "",
      rolName: "",
      requestCategoryTypeName: "",
    });
  };

  const addAssignWorkflowToCommittee = async () => {
    let body = {
      committeeId,
      requestInstanceId: selectedRequestTemplatesByTypeId,
      committeeName,
    };

    await dispatch(putAssignWorkflowToCommittee(body) as any).then(
      (res: any) => {
        if (res?.payload?.statusEnum == 3) {
          showSuccessAlert();
          dispatch(fetchCommitteeApprovals(committeeId as string) as any).then(
            (res: any) => {
              dispatch(
                fetchRequestTimeline({
                  id: res?.payload?.result?.requestInstanceId,
                }) as any,
              ).then((res2: any) => {
                let firstUserIdInPath =
                  res2?.payload?.result?.requestTimeLine?.filter(
                    (item: any) => {
                      return !item?.exceptionActionTackersDto
                        ?.map((user: any) => {
                          return user?.userId?.toLowerCase();
                        })
                        ?.includes(item?.actionTakerUserId?.toLowerCase());
                    },
                  )[0]?.actionTakerUserId;

                let firstUserEmailInPath =
                  res2?.payload?.result?.requestTimeLine?.filter(
                    (item: any) => {
                      return !item?.exceptionActionTackersDto
                        ?.map((user: any) => {
                          return user?.userId?.toLowerCase();
                        })
                        ?.includes(item?.actionTakerUserId?.toLowerCase());
                    },
                  )[0]?.actionTakerEmail;

                Notification.addingRequestForCommittees(
                  firstUserIdInPath,
                  `/user-profile/requests/${res?.payload?.result?.requestInstanceId}/details-for-incoming`,
                  89,
                  res?.payload?.result?.requestInstanceId,
                  firstUserEmailInPath,
                  true,
                  122,
                  committee?.committeeDate,
                  committeeName,
                  "",
                  "",
                  "",
                  "",
                  res?.payload?.result?.committeeNumber,
                );
              });
            },
          );
        } else {
        }
      },
    );
  };
  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        centered
        style={{ zIndex: 9999 }}
      >
        <div className="card">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "center",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
            className="pb-0 border-bottom-0"
          >
            <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
              <Modal.Title id="contained-modal-title-vcenter">
                <h3 className="card-title flex-column align-items-center">
                  <span className="card-label fw-bolder fs-3 mb-2 ">
                    {intl.formatMessage({ id: "RequestPath" })}
                  </span>
                  <span className="mt-1 fw-semibold fs-5 text-muted">
                    {intl.formatMessage({ id: "PleaseEnterTheData" })}
                  </span>
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>
          <div className="card-body py-3 px-3 mx-2 mx-md-8">
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="REGA_table_widget_5_tab_1"
              >
                <form
                  className="p-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="row d-flex justify-content-around">
                    <div className="col-md-4 col-sm-10">
                      <div className="d-flex flex-column mb-8">
                        <label
                          className="fs-6 fw-bold mb-2"
                          htmlFor="classNameification"
                        >
                          {intl.formatMessage({ id: "OrderClassification" })}{" "}
                        </label>
                        <input
                          id="classNameification"
                          type="text"
                          className="form-control"
                          value={
                            requestCategory?.find((item) => {
                              return item?.id == selectedCategoryId;
                            })?.name
                          }
                          readOnly
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-10">
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
                          <input
                            id="type"
                            type="text"
                            className="form-control"
                            value={
                              requestTypesByCategoryId?.find((item) => {
                                return (
                                  item?.id == selectedRequestTypeByCategoryId
                                );
                              })?.name
                            }
                            readOnly
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-10">
                      <div className="d-flex flex-column mb-8">
                        <label
                          className="fs-6 fw-bold mb-2"
                          htmlFor="classNameification"
                        >
                          {intl.formatMessage({
                            id: "ExistingRequest",
                          })}{" "}
                        </label>
                        <select
                          onChange={handleRequestTemplateByTypeIdChange}
                          value={selectedRequestTemplatesByTypeId}
                          className="form-select form-select-solid"
                          name="ExistingRequest"
                          id="ExistingRequest"
                        >
                          <option value="">
                            {intl.formatMessage({
                              id: "ExistingRequest",
                            })}
                          </option>
                          {requestTemplatesBytypeId?.map(
                            (
                              requestTemplatesBytypeId: requestTemplatesByTypeIdModel,
                            ) => (
                              <option
                                key={requestTemplatesBytypeId.id}
                                value={requestTemplatesBytypeId.id}
                              >
                                {requestTemplatesBytypeId.name}
                              </option>
                            ),
                          )}
                        </select>
                      </div>
                    </div>
                    {selectedRequestTemplatesByTypeId ? (
                      <>
                        <div className="col-md-4 col-sm-10">
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
                                readOnly
                                className="form-control"
                                name="OrderName"
                                placeholder={intl.formatMessage({
                                  id: "OrderName",
                                })}
                                id="name"
                                value={requestTemplateById?.name}
                                onChange={(e) =>
                                  setInputValues((prevValues) => ({
                                    ...prevValues,
                                    OrderName: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-column mb-8 ">
                            <label
                              className="fs-6 fw-bold mb-2"
                              htmlFor="pathCount"
                            >
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
                                readOnly
                                className="form-control"
                                name="pathCount"
                                placeholder={intl.formatMessage({
                                  id: "DepartmentsNumber",
                                })}
                                id="name"
                                value={requestTemplateById?.pathCount || ""}
                                onChange={(e) =>
                                  setInputValues((prevValues) => ({
                                    ...prevValues,
                                    pathCount: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-10">
                          <div className="d-flex flex-column mb-8">
                            <label
                              className="fs-6 fw-bold mb-2"
                              htmlFor="categoryName"
                            >
                              {intl.formatMessage({
                                id: "OrderClassification",
                              })}{" "}
                            </label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="fas fa-vector-square special"></i>
                                </span>
                              </div>
                              <input
                                readOnly
                                className="form-control"
                                name="categoryName"
                                placeholder={intl.formatMessage({
                                  id: "OrderName",
                                })}
                                id="categoryName"
                                value={requestTemplateById?.categoryName || ""}
                                onChange={(e) =>
                                  setInputValues((prevValues) => ({
                                    ...prevValues,
                                    categoryName: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-10">
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
                              <input
                                readOnly
                                className="form-control"
                                name="categoryName"
                                placeholder={intl.formatMessage({
                                  id: "OrderName",
                                })}
                                id="categoryName"
                                value={
                                  requestTemplateById?.requestCategoryTypeName ||
                                  ""
                                }
                                onChange={(e) =>
                                  setInputValues((prevValues) => ({
                                    ...prevValues,
                                    requestCategoryTypeName: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                  {selectedRequestTemplatesByTypeId &&
                    requestTemplateById?.requestTemplateStepDtos?.map(
                      (stepDots: any) => {
                        return (
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
                            <div className="timeline-item mb-3 d-flex align-items-center ">
                              <div className="timeline-badge w-50px">
                                <span className="badge bg-success fs-2 p-3 d-flex align-items-center justify-content-center w-30px">
                                  {stepDots?.stepNumber}
                                </span>{" "}
                              </div>
                              <div className="timeline-content d-flex align-items-center text-muted font-weight-normal ms-4">
                                <div className="row pt-3 w-100 mb-4 d-flex align-items-center justify-content-between">
                                  <div className="col-md-3 col-sm-10">
                                    <div className="d-flex flex-column">
                                      <label className="fs-6 fw-bold mb-2 form-label">
                                        {intl.formatMessage({
                                          id: "TheNameOfTheDepartmentOrEmployee",
                                        })}
                                      </label>
                                      <div className="input-group">
                                        <input
                                          readOnly
                                          className="form-control"
                                          name="actionTackerName"
                                          placeholder={intl.formatMessage({
                                            id: "TheNameOfTheDepartmentOrEmployee",
                                          })}
                                          id="classNameification"
                                          value={
                                            stepDots?.actionTackerName
                                              ? stepDots?.actionTackerName
                                              : "لا يوجد اسم ادارة او موظف"
                                          }
                                          onChange={(e) =>
                                            setInputValues((prevValues) => ({
                                              ...prevValues,
                                              actionTackerName: e.target.value,
                                            }))
                                          }
                                        />
                                        <div className="input-group-prepend">
                                          <span className="input-group-text h-100">
                                            <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3 col-sm-10">
                                    <div className="d-flex flex-column mb-2">
                                      <label
                                        className="fs-6 fw-bold mb-2 form-label"
                                        htmlFor="classNameification"
                                      >
                                        SLA
                                      </label>
                                      <div className="input-group">
                                        <input
                                          readOnly
                                          className="form-control"
                                          name="slaName"
                                          placeholder={intl.formatMessage({
                                            id: "TheNameOfTheDepartmentOrEmployee",
                                          })}
                                          id="classNameification"
                                          value={
                                            stepDots?.slaName ||
                                            "لا يوجد اتفاقية"
                                          }
                                          onChange={(e) =>
                                            setInputValues((prevValues) => ({
                                              ...prevValues,
                                              slaName: e.target.value,
                                            }))
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3 col-sm-10">
                                    <div className="d-flex fw-bolder text-primary justify-content-center align-items-center h-100 w-100">
                                      {stepDots?.implementationDays} يوم{" "}
                                      {stepDots?.implementationHours} ساعة{" "}
                                      {stepDots?.implementationMinutes} دقيقة
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      },
                    )}

                  <div className="d-flex justify-content-center gap-1">
                    <button
                      className="btn btn-secondary px-20"
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </button>
                    <button
                      onClick={() => {
                        handleClose();
                        clearInputValues();
                        addAssignWorkflowToCommittee();
                      }}
                      className="btn btn-success px-20"
                      disabled={!selectedRequestTemplatesByTypeId}
                    >
                      {intl.formatMessage({ id: "Add" })}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default SpecifyRequest;
