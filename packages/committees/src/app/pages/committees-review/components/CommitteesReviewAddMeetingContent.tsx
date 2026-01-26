import { FC, useEffect } from "react";
import { useIntl } from "react-intl";
import { useState } from "react";
import { AddPopup } from "../../partials/AddPopup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, InferType, number, mixed, boolean } from "yup";
import moment from "moment-timezone";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import { addMeeting } from "../../../features/meeting/meetingSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { CommitteeReviewMembersTableForMeetings } from "./CommitteeReviewMembersTableForMeetings";
import CommitteesReviewMeetingAddExternalForMeeting from "../popup/CommitteesReviewMeetingAddExternalForMeetingPopup";
import { Button, Spinner } from "react-bootstrap";
import {
  getCommittee,
  getCommitteeTimeTable,
} from "../../../features/committee/committeesSlice";
import { getUsersWithOrgDetails } from "../../../features/committee/usersAggregatorSlice";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";

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
const CommitteesReviewAddMeetingContent: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [showButton, setShowButton] = useState<boolean>(false);
  const handleRadioExpertChange = (e: any) => {
    const valueInput = e.target.value;
    setShowButton(valueInput === "true");
  };
  const [modalAShow, setModalAShow] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const [selectedFilesForAttachments, setSelectedFilesForAttachments] =
    useState<any>([]);
  const handleFileInputChange = (event: any) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFilesForAttachments([
      ...selectedFilesForAttachments,
      ...filesArray,
    ]);
    filesArray.forEach(() => {});
  };
  const handleFileDelete = (indexToRemove: any) => {
    const updatedFiles = selectedFilesForAttachments.filter(
      (file: any, index: number) => index !== indexToRemove,
    );
    setSelectedFilesForAttachments(updatedFiles);
  };

  let committeeEndDate: any = useAppSelector((state) => {
    return state?.committees?.committee?.endDateCommittee;
  });
  const AddMeetingSchema = object({
    Name: string().required("InputFieldIsRequried"),
    Rules: string().required("InputFieldIsRequried"),
    Location: string().required("InputFieldIsRequried"),
    EnableVice: boolean(),
    Vice: string().when("EnableVice", {
      is: true,
      then: string().required("InputFieldIsRequried"),
    }),
    MeetingDate: string(),
    MeetingStatus: number().notRequired(),
    HasExpertAssist: string().notRequired(),
    CommitteeId: string().notRequired(),
    MeetingAttachments: mixed().notRequired(),
  });

  type AddMeetingProps = InferType<typeof AddMeetingSchema>;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let [message, setMessage] = useState("");
  useEffect(() => {
    dispatch(getCommittee(id as string) as any).then((res: any) => {
      setMessage(res?.payload?.message);
    });
  }, [id]);
  useEffect(() => {
    if (message == "This Committee isn't approved yet!") {
      navigate("/committees-review?pageNumber=1");
    }
  }, [message, id]);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<AddMeetingProps>({
    resolver: yupResolver(AddMeetingSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  let formValues = watch();
  const intl = useIntl();

  let [hasExpertAssist, setHasExpertAssist] = useState<boolean>(false);
  let [meetingStatus, setMeetingStatus] = useState<number>(1);
  let [externalMembers, setExternalMembers] = useState<any>([]);
  useEffect(() => {
    dispatch(
      getUsersWithOrgDetails({
        pageNumber: "1",
        pageSize: "100000",
      }) as any,
    );
  }, []);
  let users = useAppSelector((state) => {
    return state?.usersAgg?.users;
  });

  let [selectedUser, setSelectedUser] = useState<any>({});
  let [enableVice, setEnableVice] = useState(false);
  useEffect(() => {
    if (selectedUser?.value) {
      setValue("Vice", selectedUser?.value);
      trigger("Vice");
    }
  }, [selectedUser]);
  useEffect(() => {
    setValue("EnableVice", enableVice);
  }, [enableVice]);
  let membersEmails = externalMembers?.map((member: any) => {
    return member?.email;
  });
  let checkAllMembersHasPermission =
    externalMembers
      ?.map((member: any) => {
        return member?.permissionId;
      })
      ?.includes(undefined) ||
    externalMembers
      ?.map((member: any) => {
        return member?.permissionId;
      })
      ?.includes("-1");
  function validateTotalFileSize(fileList: any) {
    const MAX_TOTAL_SIZE_MB = 10;
    const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;
    const totalSize: any = Array.from(fileList)?.reduce(
      (sum, file: any) => sum + file.size,
      0,
    );
    return totalSize <= MAX_TOTAL_SIZE_BYTES;
  }

  const AddMeeting = () => {
    let meeting =
      enableVice == true
        ? {
            Name: formValues?.Name,
            Rules: formValues?.Rules,
            Location: formValues?.Location,
            MeetingStatus: meetingStatus,
            HasExpertAssist: hasExpertAssist,
            MeetingDate: moment(selectedDate).toISOString(),
            CommitteeId: id,
            IsVice: enableVice,
            ViceId: formValues?.Vice,
            MeetingAttachments: selectedFilesForAttachments,
            ExternalMembers: externalMembers?.map((member: any) => {
              return {
                name: member?.name,
                job: member?.job,
                destinationName: member?.destinationName,
                email: member?.email,
                permissionId: member?.permissionId,
                phoneNumber: "",
              };
            }),
          }
        : {
            Name: formValues?.Name,
            Rules: formValues?.Rules,
            Location: formValues?.Location,
            MeetingStatus: meetingStatus,
            HasExpertAssist: hasExpertAssist,
            MeetingDate: moment(formValues?.MeetingDate).toISOString(),
            CommitteeId: id,
            IsVice: enableVice,
            MeetingAttachments: selectedFilesForAttachments,
            ExternalMembers: externalMembers?.map((member: any) => {
              return {
                name: member?.name,
                job: member?.job,
                destinationName: member?.destinationName,
                email: member?.email,
                permissionId: member?.permissionId,
                phoneNumber: "",
              };
            }),
          };
    setLoading(true);
    if (validateTotalFileSize(selectedFilesForAttachments) == false) {
      showSuccessAlert(false, "TotalFilesSizeNotBeExcee10MB", intl, () => {});
      setLoading(false);
      return;
    }
    if (hasExpertAssist && externalMembers?.length == 0) {
      showSuccessAlert(
        false,
        "YouMustSelectAtLeastOneSpecialist",
        intl,
        () => {},
      );
      setLoading(false);
      return;
    }
    if (membersEmails?.length != new Set(membersEmails).size) {
      showSuccessAlert(false, "There'sADuplicateInEmails", intl, () => {});
      setLoading(false);
    } else if (checkAllMembersHasPermission) {
      showSuccessAlert(
        false,
        "AllMembersOfCommitteeMustHavePermission",
        intl,
        () => {},
      );
      setLoading(false);
    } else {
      dispatch(addMeeting(meeting) as any).then((res: any) => {
        if (res?.payload?.statusEnum == 1) {
          showSuccessAlert(true, "AddedSuccessfully", intl, () => {
            navigate(
              `/committees-review/comittees-tab-details/${id}?tabName=CommitteeMeeting`,
              {
                state: {
                  serviceName: cardTitle,
                  commiitteeInternalMembers: JSON.parse(
                    localStorage.getItem("commiitteeInternalMembers") as any,
                  ),
                },
              },
            );
          });
        } else if (
          res?.payload?.message == "Vice Can't be member in Committee"
        ) {
          showSuccessAlert(false, "ViceCan'tBeMemberInCommittee", intl);
        } else {
          showSuccessAlert(false, res?.payload?.message, intl);
        }
        setLoading(false);
      });
    }
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

  let location = useLocation();
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";
  const tabState = location?.state?.tabState;
  useEffect(() => {
    dispatch(getCommitteeTimeTable(id));
  }, [id]);
  const comitteeTimetable = useAppSelector((state: RootState) => {
    return state?.committees?.CommitteeTimeTable;
  });

  const lastItem = comitteeTimetable?.[comitteeTimetable.length - 1];

  const minDate =
    (lastItem?.date
      ? moment(lastItem?.date).format("YYYY-MM-DDTHH:mm")
      : undefined) || "";

  return (
    <>
      <div className="card">
        <div className="card-body d-flex justify-content-start pb-2 mb-5">
          <div className="card-title d-flex flex-column align-items-start">
            <span className="fs-3 mb-2">
              {intl.formatMessage({
                id: "AddNewMeeting",
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
          <form onSubmit={handleSubmit(AddMeeting)}>
            <div className="row gy-5">
              <div className="col-md-4">
                <div>
                  <label htmlFor="MeetingName" className="mb-2 required">
                    {intl.formatMessage({ id: "MeetingName" })}
                  </label>
                  <input
                    type="text"
                    placeholder={intl.formatMessage({ id: "MeetingName" })}
                    id="MeetingName"
                    className="form-control form-control-lg form-control-solid"
                    {...register("Name")}
                  />
                  {DisplayErrorMessage(errors?.Name?.message, intl)}
                </div>
              </div>
              <div className="col-md-4">
                <div>
                  <label htmlFor="DateOfTheMeeting" className="mb-2 required">
                    {intl.formatMessage({ id: "MeetingStartDate" })}
                  </label>
                  <input
                    type="datetime-local"
                    placeholder={intl.formatMessage({ id: "DateOfTheMeeting" })}
                    id="DateOfTheMeeting"
                    className="form-control form-control-lg form-control-solid"
                    min={minDate}
                    max={committeeEndDate}
                    {...register("MeetingDate")}
                    onClick={(e) => {
                      const target = e.currentTarget as HTMLInputElement;
                      if (target && typeof target.showPicker === "function") {
                        target.showPicker();
                      } else {
                        target.focus();
                        target.click();
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <div className="w-100">
                  <label htmlFor="meetingPlace" className="mb-2 required">
                    {intl.formatMessage({ id: "Place" })}
                  </label>
                  <div className="d-flex form-control form-control-solid w-100">
                    <div>
                      <input
                        type="radio"
                        name="meetingPlace"
                        className="form-check-input"
                        onClick={() => setMeetingStatus(0)}
                      />
                      <span className="mx-2">
                        {intl.formatMessage({ id: "Remotely" })}
                      </span>
                    </div>
                    <div>
                      <input
                        defaultChecked
                        type="radio"
                        name="meetingPlace"
                        className="form-check-input"
                        onClick={() => setMeetingStatus(1)}
                      />
                      <span className="mx-2">
                        {intl.formatMessage({ id: "InPerson" })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <div className="w-100">
                  <label htmlFor="SeekHelp" className="mb-2 required">
                    {intl.formatMessage({
                      id: "RelyingOnExpertsAndSpecialists",
                    })}
                  </label>
                  <div className="d-flex form-control form-control-solid w-100">
                    <div>
                      <input
                        type="radio"
                        name="SeekHelp"
                        className="form-check-input"
                        value="true"
                        onClick={() => setHasExpertAssist(true)}
                        onChange={handleRadioExpertChange}
                      />
                      <span className="mx-2">
                        {intl.formatMessage({ id: "Yes" })}
                      </span>
                    </div>
                    <div>
                      <input
                        defaultChecked
                        type="radio"
                        name="SeekHelp"
                        className="form-check-input"
                        value="false"
                        onClick={() => setHasExpertAssist(false)}
                        onChange={handleRadioExpertChange}
                      />
                      <span className="mx-2">
                        {intl.formatMessage({ id: "No" })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label htmlFor="MeetingLocation" className="mb-2 required">
                    {intl.formatMessage({ id: "MeetingLocation" })}
                  </label>
                  <div className="position-relative">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          style={{
                            padding: intl.locale == "ar" ? "1.4rem" : "",
                          }}
                        >
                          <i className="fas fa-map-marker-alt fa-fw fa-lg text-gray-600 special"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder={intl.formatMessage({
                          id: "MeetingLocation",
                        })}
                        id="MeetingLocation"
                        className="form-control"
                        {...register("Location")}
                      />
                      {DisplayErrorMessage(errors?.Location?.message, intl)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <span className="mb-5">
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
                                (file: any, index: number) => (
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
                                      // src={URL.createObjectURL(file)}
                                      src={getIconSrc(file?.name, file)}
                                      className={file?.name}
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
                            src={toAbsoluteUrl("/media/uploadFile.png")}
                            className="img-fluid mx-2"
                            alt="uploadFile"
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
                        accept="image/*"
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
                  <label htmlFor="MeetingItems" className="mb-2 required">
                    {intl.formatMessage({ id: "MeetingItems" })}
                  </label>
                  <textarea
                    id="MeetingItems"
                    placeholder={intl.formatMessage({ id: "MeetingItems" })}
                    className="form-control form-control-lg form-control-solid min-h-150px"
                    {...register("Rules")}
                  ></textarea>
                  {DisplayErrorMessage(errors?.Rules?.message, intl)}
                </div>
              </div>
              <>
                {showButton && (
                  <>
                    <div className="col-12 mb-2 pt-2 pb-3">
                      <div
                        role="button"
                        style={{ borderRadius: "10px" }}
                        className="p-3 border border-primary border-2 text-primary text-center"
                        onClick={() => setModalShow(true)}
                      >
                        <i className="fa-solid fa-user-plus mx-2 fs-3 fa-fw"></i>
                        {intl.formatMessage({
                          id: "AddSpecialistsToTheMeeting",
                        })}
                      </div>
                    </div>
                    <div className="col-12 mb-2 pt-2 pb-3">
                      <CommitteeReviewMembersTableForMeetings
                        setExternalMembers={setExternalMembers}
                        externalMembers={externalMembers}
                      />
                    </div>
                  </>
                )}
              </>
              <div className="row justify-content-center my-5 gx-3">
                <div className="col-12 col-sm-6 col-md-3 mb-3 mb-sm-0">
                  <button
                    onClick={() =>
                      navigate(
                        `/committees-review/comittees-tab-details/${id}`,
                        {
                          state: {
                            serviceName: cardTitle,
                            tabState,
                          },
                        },
                      )
                    }
                    type="reset"
                    className="btn btn-secondary w-100"
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                </div>

                <div className="col-12 col-sm-6 col-md-3">
                  {!loading ? (
                    <button type="submit" className="btn btn-success w-100">
                      {intl.formatMessage({ id: "Add" })}
                    </button>
                  ) : (
                    <Button variant="success" disabled className="w-100">
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        className="me-2"
                      />
                      <span>{intl.formatMessage({ id: "Adding" })}</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div
          className="modal fade"
          id="Rega_modal_confirmAdd"
          aria-hidden="true"
        >
          <AddPopup
            show={modalAShow}
            handleClose={() => setModalAShow(false)}
          />
        </div>
        <div
          className="modal fade"
          id="AddExternalMemberMeeting"
          aria-hidden="true"
        >
          <CommitteesReviewMeetingAddExternalForMeeting
            show={modalShow}
            handleClose={() => setModalShow(false)}
            setExternalMembers={setExternalMembers}
          />
        </div>
      </div>
    </>
  );
};

export { CommitteesReviewAddMeetingContent };
