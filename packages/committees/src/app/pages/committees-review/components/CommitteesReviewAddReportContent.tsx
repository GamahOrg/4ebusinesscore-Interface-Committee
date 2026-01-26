import { FC, Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { useState } from "react";
import { SavePopup } from "../../partials/SavePopup";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { Notification } from "@4eplatform/shared/services/notifications";
import { RootState, useAppSelector } from "../../../store/store";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getMeetingById,
  getMeetings,
} from "../../../features/meeting/meetingSlice";
import Swal from "sweetalert2";
import "moment-timezone";
import moment from "moment";
import {
  addProceeding,
  addProceedingIdMembers,
} from "../../../features/procceding/proceedingSlice";
import {
  getCommittee,
  getCommitteeMembers,
} from "../../../features/committee/committeesSlice";
import { getUsersWithOrgDetails } from "../../../features/committee/usersAggregatorSlice";
import { object, string, InferType, mixed } from "yup";
import { useLocation } from "react-router-dom";
import ControlledDateTimePicker from "./ControlledDateTimePicker";
import { error } from "console";
interface CommitteesReviewAddReportContentProps {
  committeeDetails?: any;
}

const CommitteesReviewAddReportContent: FC<
  CommitteesReviewAddReportContentProps
> = ({ committeeDetails }) => {
  let location = useLocation();
  const { tabState } = location.state || {};
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingForProceeding, setLoadingForProceeding] =
    useState<boolean>(false);
  const [modalVShow, setModalVShow] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const [proceedingId, setproceedingId] = useState<string>("");
  const [selectedFilesForAttachments, setSelectedFilesForAttachments] =
    useState<any>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAddMember, setIsSubmittingAddMember] = useState(true);
  const intl = useIntl();
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [message, setMessage] = useState("");
  useEffect(() => {
    dispatch(getCommittee(id as string) as any).then((res) => {
      setMessage(res?.payload?.message);
    });
  }, [id]);

  useEffect(() => {
    if (message == "This Committee isn't approved yet!") {
      navigate("/committees-review?pageNumber=1");
    }
  }, [message, id]);
  let [isNotAddedProceeding, setIsNotAddedProceeding] = useState(false);
  let [isNotAddedMember, setIsNotAddedMember] = useState(false);

  useEffect(() => {
    dispatch(getMeetings(id) as any);
  }, [dispatch]);

  const Meetings = useSelector((state: RootState) => {
    return state?.meetings?.meetings;
  });
  const [filterMeeting, setFilterMeeting] = useState<any>([]);
  useEffect(() => {
    setFilterMeeting(Meetings);
  }, [Meetings]);
  const AddProceedingSchema = object({
    Name: string().required("InputFieldIsRequried"),
    Notes: string().notRequired(),
    MeetingId: string().required("InputFieldIsRequried"),
    Date: string()
      .required("InputFieldIsRequried")
      .typeError("InputFieldIsRequried"),
    // //
    attachments: mixed()
      .notRequired()
      .test("fileSize", "theFileIsTooLarge", function (value) {
        if (value && value.length && value.length > 0) {
          return value[0].size <= 20000000;
        } else return true;
      }),
  });

  type AddProceedingProps = InferType<typeof AddProceedingSchema>;

  const meeting = useAppSelector((state: RootState) => {
    return state?.meetings?.meeting;
  });
  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFilesForAttachments([
      ...selectedFilesForAttachments,
      ...filesArray,
    ]);
    filesArray.forEach((file) => {});
  };
  const handleFileDelete = (indexToRemove) => {
    const updatedFiles = selectedFilesForAttachments.filter(
      (file, index) => index !== indexToRemove,
    );
    setSelectedFilesForAttachments(updatedFiles);
  };

  const getIconSrc = (fileName: string, file: any) => {
    if (
      fileName?.endsWith(".png") ||
      fileName?.endsWith(".jpg") ||
      fileName?.endsWith(".jpeg") ||
      fileName?.endsWith(".jfif") ||
      fileName?.endsWith(".webp")
    ) {
      return URL.createObjectURL(file);
    } else if (fileName?.endsWith(".pdf")) {
      return "/media/pmo/pdfIcon.png";
    } else if (fileName?.endsWith(".doc") || fileName?.endsWith(".docx")) {
      return "/media/pmo/wordIcon2.jpg";
    } else if (fileName?.endsWith(".xls") || fileName?.endsWith(".xlsx")) {
      return "/media/pmo/excelIcon2.jpg";
    } else if (fileName?.endsWith(".txt")) {
      return "/media/pmo/textIcon.png";
    } else if (
      fileName?.endsWith(".mp4") ||
      fileName?.endsWith(".webm") ||
      fileName?.endsWith(".avi") ||
      fileName?.endsWith(".mkv") ||
      fileName?.endsWith(".flv") ||
      fileName?.endsWith(".ts")
    ) {
      return "/media/pmo/video.png";
    }
  };

  const {
    register: registerForProceeding,
    handleSubmit: handleSubmitForProceeding,
    clearErrors,
    setError,
    watch: watchForProceeding,
    setValue: setValueForProceeding,
    formState: { errors: errorsForProceeding, isValid: isValidForProceeding },
  } = useForm<AddProceedingProps>({
    resolver: yupResolver(AddProceedingSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  let formValuesForProceeding = watchForProceeding();
  useEffect(() => {
    if (formValuesForProceeding?.MeetingId) {
      dispatch(
        getMeetingById(formValuesForProceeding?.MeetingId as string) as any,
      );
    }
  }, [formValuesForProceeding?.MeetingId]);
  const showSuccessAlert = () => {
    Swal.fire({
      text: intl.formatMessage({ id: "AddedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };
  const showSuccessProceedingMemberAlert = () => {
    Swal.fire({
      text: intl.formatMessage({ id: "AddedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    }).then((res) => {
      navigate(`/committees-review/comittees-tab-details/${id}`, {
        state: {
          tabState: tabState,
          commiitteeInternalMembers: JSON.parse(
            localStorage.getItem("commiitteeInternalMembers") as any,
          ),
        },
      });
    });
  };
  const showFailAlert = () => {
    Swal.fire({
      text: intl.formatMessage({ id: "mustAddAttachment" }),
      icon: "error",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };
  const showFailureAlertForAttachments = () => {
    Swal.fire({
      text: intl.formatMessage({ id: "TotalFilesSizeNotBeExcee10MB" }),
      icon: "error",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };
  function validateTotalFileSize(fileList) {
    const MAX_TOTAL_SIZE_MB = 10;
    const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;
    const totalSize: any = Array.from(fileList)?.reduce(
      (sum, file: any) => sum + file.size,
      0,
    );
    return totalSize <= MAX_TOTAL_SIZE_BYTES;
  }

  let dataAndTime = moment(selectedDate).format("YYYY-MM-DDTHH:mm");

  const AddSubmit = async (formvalues: AddProceedingProps) => {
    setIsSubmitting(true);

    let body = {
      Name: formvalues.Name,
      Notes: formvalues.Notes,
      Date: formvalues.Date,
      ProceedingAttachments: selectedFilesForAttachments,
      CommitteeId: id,
      MeetingIds: [formvalues?.MeetingId],
    };

    setLoadingForProceeding(true);
    if (validateTotalFileSize(selectedFilesForAttachments) == false) {
      showFailureAlertForAttachments();
      setIsNotAddedProceeding(true);
      setIsSubmitting(true);
      setIsSubmittingAddMember(false);
      setLoadingForProceeding(false);
      return;
    }
    dispatch(addProceeding(body) as any)
      .then((res: any) => {
        if (res?.payload?.statusEnum == 1) {
          setproceedingId(res.payload.result);
          showSuccessAlert();
          setIsNotAddedProceeding(true);
        }
        if (res?.payload?.message === "Request failed with status code 400") {
          showFailAlert();
        } else {
        }
      })
      .finally(() => {
        setIsSubmitting(true);
        setIsSubmittingAddMember(false);
        setLoadingForProceeding(false);
      });
  };

  let language: string = intl.locale;
  const DisplayErrorMessage = (error: any, intl: any) => {
    return (
      <div
        className="invalid-feedback"
        style={{
          display: error ? "block" : "none",
          width: "100%",
          textAlign: language == "ar" ? "right" : "left",
        }}
      >
        <p
          style={{
            width: "100%",
            textAlign: language == "ar" ? "right" : "left",
          }}
        >
          {error
            ? intl.formatMessage({
                id: error,
              })
            : ""}
        </p>
      </div>
    );
  };

  useEffect(() => {
    let params = { pageSize: "100000", pageNumber: "1" };
    dispatch(getCommitteeMembers({ id, params }) as any);
  }, [id]);
  const committeeMembers = useAppSelector((state: RootState) => {
    return state?.committees?.committeeMembers;
  });
  const [userIds, setUserIds] = useState<string[]>([]);
  const [internalMemberIds, setInternalMemberIds] = useState<string[]>([]);
  const [externalMemberIds, setExternalMemberIds] = useState<string[]>([]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    memberId: string,
    isAttend: boolean,
  ) => {
    setUserIds((prev) => {
      if (isAttend) {
        return [...prev, memberId];
      } else {
        return prev?.filter((id) => {
          return id != memberId;
        });
      }
    });
    let memberAttend = {
      proceedingId,
      memberId,
      isAttend,
    };
  };

  useEffect(() => {
    dispatch(getUsersWithOrgDetails({ pageNumber: 1, pageSize: 1000 }) as any);
  }, []);

  let users = useAppSelector((state) => {
    return state?.usersAgg?.users
      ?.map((user: any) => {
        return { ...user, id: user?.userId };
      })
      .map((user: any) => {
        return user.userId;
      });
  });

  useEffect(() => {
    userIds?.forEach((userId) => {
      if (users?.includes(userId)) {
        setInternalMemberIds((prev) => {
          return [...prev, userId];
        });
      } else {
        setExternalMemberIds((prev) => {
          return [...prev, userId];
        });
      }
    });
  }, [userIds]);

  const {
    register: registerForAttendence,
    handleSubmit: handleSubmitForAttendence,
    watch: watchForAttendence,
    formState: { errors: errorsForAttendence },
  } = useForm<any>({
    mode: "all",
    reValidateMode: "onChange",
  });
  useEffect(() => {
    setValueForProceeding(
      "Name",
      Meetings?.find((ele) => {
        return ele?.id == formValuesForProceeding?.MeetingId;
      })?.name as any,
    );
  }, [formValuesForProceeding?.MeetingId]);

  const AddMemberSubmit = async () => {
    let body = {
      proceedingId,
      membersDTO: {
        internalMemberIds: Array.from(
          new Set(
            internalMemberIds?.filter((ele) => {
              return userIds?.includes(ele);
            }),
          ),
        ),
        externalMemberIds: Array.from(
          new Set(
            externalMemberIds?.filter((ele) => {
              return userIds?.includes(ele);
            }),
          ),
        ),
      },
    };
    setLoading(true);
    dispatch(addProceedingIdMembers(body) as any).then((res: any) => {
      if (res?.payload?.statusEnum === 1) {
        showSuccessProceedingMemberAlert();
        userIds?.forEach((id) => {
          Notification.proceedingAttendance(
            id,
            users?.includes(id)
              ? `/committee/committees-review/report-details/${proceedingId}`
              : "",
            89,
            proceedingId,
            committeeMembers?.find((member: any) => {
              return member?.id == id;
            })?.email as string,
            true,
            120,
            formValuesForProceeding?.Date,
            Meetings?.find((meeting: any) => {
              return meeting?.id == formValuesForProceeding?.MeetingId;
            })?.name as string,
            formValuesForProceeding?.Name,
            "62a32adb-1f46-4cfe-84aa-806b5841432d",
            "",
          );
        });
      } else {
      }
      setLoading(false);
    });
  };

  const selectedMeeting = filterMeeting?.find(
    (meeting: any) => meeting?.id === watchForProceeding("MeetingId"),
  );

  const minDate = selectedMeeting
    ? moment(selectedMeeting.meetingDate).format("YYYY-MM-DDTHH:mm")
    : undefined;

  useEffect(() => {
    if (
      watchForProceeding("MeetingId") &&
      watchForProceeding("Name") &&
      watchForProceeding("Date")
    ) {
      setIsNotAddedProceeding(true);
    } else {
      setIsNotAddedProceeding(false);
    }
  }, [
    watchForProceeding("MeetingId"),
    watchForProceeding("Name"),
    watchForProceeding("Date"),
  ]);

  return (
    <>
      <div className="card">
        <div className="card-body d-flex justify-content-start pb-2 mb-5">
          <div className="card-title d-flex flex-column align-items-start">
            <span className="fs-3 mb-2">
              {intl.formatMessage({
                id: "AddNewReport",
              })}
            </span>
            <span className="text-gray-600 fs-4">
              {intl.formatMessage({
                id: "PleaseEnterTheData",
              })}
            </span>
          </div>
        </div>
        <div className="card-body">
          <Fragment>
            <form noValidate onSubmit={handleSubmitForProceeding(AddSubmit)}>
              <div className="row gy-5">
                <div className="col-md-4">
                  <div>
                    <label htmlFor="meetingName" className="mb-2 required">
                      {intl.formatMessage({ id: "MeetingName" })}
                    </label>
                    <select
                      className="form-select form-select-solid"
                      {...registerForProceeding("MeetingId")}
                      defaultValue={""}
                    >
                      <option value={""} disabled>
                        {intl.formatMessage({ id: "Choose" })}
                      </option>
                      {filterMeeting?.map((meeting: any) => (
                        <option value={meeting?.id} key={meeting?.id}>
                          {meeting?.name}
                        </option>
                      ))}
                    </select>
                    {DisplayErrorMessage(
                      errorsForProceeding?.MeetingId?.message,
                      intl,
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div>
                    <label htmlFor="reportName" className="mb-2 required">
                      {intl.formatMessage({ id: "CommitteesReportName" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fas fa-clipboard-list"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder={intl.formatMessage({
                          id: "CommitteesReportName",
                        })}
                        id="reportName"
                        className="form-control"
                        {...registerForProceeding("Name")}
                      />
                      {DisplayErrorMessage(
                        errorsForProceeding?.Name?.message,
                        intl,
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div>
                    <label htmlFor="reportDate" className="mb-2 required">
                      {intl.formatMessage({ id: "ReportDate" })}
                    </label>
                    <input
                      type="datetime-local"
                      placeholder={intl.formatMessage({ id: "ReportDate" })}
                      id="reportDate"
                      className="form-control form-control-lg form-control-solid"
                      {...registerForProceeding("Date")}
                      onClick={(e) => {
                        const target = e.currentTarget as HTMLInputElement;
                        if (target && typeof target.showPicker === "function") {
                          target.showPicker();
                        } else {
                          target.focus();
                          target.click();
                        }
                      }}
                      min={minDate}
                      max={
                        committeeDetails?.endDateCommittee
                          ? moment(committeeDetails?.endDateCommittee).format(
                              "YYYY-MM-DDTHH:mm",
                            )
                          : ""
                      }
                      step={60}
                      // defaultValue={minDate}
                      disabled={!minDate}
                    />
                    {/* <ControlledDateTimePicker
                      value={selectedDate}
                      onChange={setSelectedDate}
                      minDate={minDate}
                      minTime={combinedMinDateTime}
                      placeHolder="ReportDate"
                      dateFormat="yyyy-MM-dd HH:mm"

                    /> */}
                    {DisplayErrorMessage(
                      errorsForProceeding?.Date?.message,
                      intl,
                    )}
                    {/*                    
                    {selectedDate === null && !isSubmitting  &&  (
                    <div className="invalid-feedback" style={{ width: "100%", display: "block",  textAlign: language === "ar" ? "right" : "left" }}>
                      <p>{intl.formatMessage({ id: "InputFieldIsRequried" })}</p>
                    </div>
                  )} */}
                  </div>
                </div>

                <div className="col-12">
                  <span className="mb-2">
                    {intl.formatMessage({ id: "Attachments" })}
                  </span>
                  <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-5 h-80px">
                    <label
                      htmlFor="outputAttachment1"
                      className="form-label  dropzone-select  uploadFile-style inputAreaHeight"
                    >
                      <div role="button" className="d-flex align-items-center">
                        {selectedFilesForAttachments?.length > 0 ? (
                          <>
                            <div>
                              <ul className="d-flex align-items-center">
                                {selectedFilesForAttachments?.map(
                                  (file: any, index: any) => (
                                    <li
                                      key={index}
                                      className="d-flex align-items-center mx-2 position-relative"
                                    >
                                      <img
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                          borderRadius: "50%",
                                        }}
                                        src={getIconSrc(file?.name, file)}
                                        className={file?.name}
                                        alt=""
                                      />
                                      <div className="mx-1">{file.name}</div>
                                      <div
                                        style={{
                                          position: "absolute",
                                          top: "-10px",
                                          left: "-10px",
                                          height: "15px",
                                          width: "15px",
                                          borderRadius: "50%",
                                          backgroundColor: "red",
                                          display: "flex",
                                          color: "black",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                        onClick={() => handleFileDelete(index)}
                                      >
                                        x
                                      </div>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          </>
                        ) : (
                          <>
                            <img
                              style={{ width: "25px" }}
                              src="/media/pmo/uploadFile.png"
                              className="img-fluid"
                              alt=""
                            />
                            <div className="row py-auto">
                              <span className="text-primary fw-bolder">
                                {intl.formatMessage({
                                  id: "QuickFileUploader",
                                })}
                              </span>
                              <span>
                                {" "}
                                {intl.formatMessage({
                                  id: "DragAndDropOrChooseFilesFromComputer",
                                })}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </label>
                    <div
                      className="dropzone dropzone-queue "
                      id="kt_dropzonejs_example_3"
                    >
                      <div className="dropzone-panel">
                        <input
                          multiple
                          type="file"
                          id="outputAttachment1"
                          name="attachments1"
                          onChange={handleFileInputChange}
                          placeholder={intl.formatMessage({ id: "FileUpload" })}
                          className="dropzone-select  uploadFile-style inputAreaHeight d-none w-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div>
                    <label htmlFor="reportNotice" className="mb-2">
                      {intl.formatMessage({ id: "Notice" })}
                    </label>
                    <textarea
                      id="reportNotice"
                      placeholder={intl.formatMessage({ id: "Notice" })}
                      className="form-control form-control-lg form-control-solid min-h-100px mb-3"
                      {...registerForProceeding("Notes")}
                    ></textarea>
                    {DisplayErrorMessage(
                      errorsForProceeding?.Notes?.message,
                      intl,
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-center my-5">
                  {!loadingForProceeding ? (
                    <button
                      disabled={!isNotAddedProceeding}
                      type="submit"
                      className="btn btn-success px-15 ms-5"
                    >
                      {intl.formatMessage({ id: "Add" })}
                    </button>
                  ) : (
                    <Button variant="success" disabled className="px-15 w-50">
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="mx-2"
                      />
                      <span>{intl.formatMessage({ id: "Adding" })}</span>
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Fragment>
          <form
            noValidate
            onSubmit={handleSubmitForAttendence(AddMemberSubmit)}
          >
            <Fragment>
              <div className="col-12">
                <div>
                  <div className="py-5 taskLogs">
                    <div className="table-responsive">
                      <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                        <thead>
                          <tr className="fw-bolder text-muted">
                            <th className="min-w-50px text-center">
                              {intl.formatMessage({ id: "CommitteesID" })}
                            </th>
                            <th className="min-w-150px text-center">
                              {intl.formatMessage({ id: "MemberData" })}
                            </th>
                            <th className="min-w-150px text-center">
                              {intl.formatMessage({ id: "Job" })}
                            </th>
                            <th className="min-w-150px text-center">
                              {intl.formatMessage({ id: "Permission" })}
                            </th>
                            <th className="min-w-100px text-center">
                              {intl.formatMessage({ id: "Attendance" })}
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {meeting?.externalMeetingMembers
                            ?.concat(
                              meeting?.internalMeetingMembers?.map((item) => {
                                return {
                                  id: item?.userId,
                                  name: item?.fullName,
                                  phoneNumber: "",
                                  job:
                                    language == "ar"
                                      ? item?.jobNameAr
                                      : item?.jobNameEn,
                                  destinationName: "",
                                  email: item?.email,
                                  permissionNameAr: item?.permissionNameAr,
                                  permissionNameEn: item?.permissionNameEn,
                                };
                              }),
                            )
                            ?.map((member: any, index: any) => {
                              return (
                                <tr key={member?.id || index}>
                                  <td className="text-center">{index + 1}</td>
                                  <td className="text-center">
                                    {member?.name}
                                  </td>
                                  <td className="text-center">
                                    {member?.jobNameAr ||
                                    member?.jobNameEn ||
                                    member?.job
                                      ? language == "ar"
                                        ? member?.jobNameAr || member?.job
                                        : member?.jobNameEn || member?.job
                                      : intl.formatMessage({ id: "NotFound" })}
                                  </td>
                                  <td className="text-center">
                                    {language == "ar"
                                      ? member?.permissionNameAr
                                      : language == "en"
                                      ? member?.permissionNameEn
                                      : intl.formatMessage({
                                          id: "NotFound",
                                        })}
                                  </td>
                                  <td className="text-center">
                                    <div className="form-check form-check-custom form-check-solid d-flex justify-content-center">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`status-${member?.id}`}
                                        name="status"
                                        onChange={(e) => {
                                          handleCheckboxChange(
                                            e,
                                            member?.id,
                                            e?.target?.checked,
                                          );
                                          isNotAddedProceeding &&
                                            setIsNotAddedMember(true);
                                        }}
                                      />
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center my-5">
                  <button
                    onClick={() =>
                      navigate(
                        `/committees-review/comittees-tab-details/${id}`,
                        {
                          state: { tabState: tabState, serviceName: cardTitle },
                        },
                      )
                    }
                    type="reset"
                    className="btn btn-secondary px-15 mx-2"
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  {!loading ? (
                    <button
                      disabled={!isNotAddedMember}
                      type="submit"
                      className="btn btn-success px-15 mx-2"
                    >
                      {intl.formatMessage({ id: "Add" })}
                    </button>
                  ) : (
                    <Button
                      variant="success"
                      disabled
                      className="px-15 w-sm-25 w-100  mx-2"
                    >
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="mx-2"
                      />
                      <span>{intl.formatMessage({ id: "Adding" })}</span>
                    </Button>
                  )}
                </div>
              </div>
            </Fragment>
          </form>
        </div>
        <div
          className="modal fade"
          id="Rega_modal_confirmReportSave"
          aria-hidden="true"
        >
          <SavePopup
            show={modalVShow}
            handleClose={() => setModalVShow(false)}
          />
        </div>
      </div>
    </>
  );
};

export { CommitteesReviewAddReportContent };
