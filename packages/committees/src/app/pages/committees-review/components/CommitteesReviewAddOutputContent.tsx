import { ChangeEvent, FC, Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import CommitteesReviewMeetingAddMeetingToOutput from "../popup/committees-review-meeting-add-meeting-output-popup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { addOutputContentValidations } from "../../../validations/add-output-validations";
import { RootState } from "../../../store/store";
import React from "react";
import { addOutputByCommitteeId } from "../../../features/outputs/outputSlice";
import { getOutputTypes } from "../../../features/outputs/outputTypesSlice";
import { getCommittee } from "../../../features/committee/committeesSlice";
import { useLocation } from "react-router-dom";

const CommitteesReviewAddOutputContent: FC = () => {
  const intl = useIntl();

  let location = useLocation();
  const { tabState } = location.state || {};
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [meetingIds, setMeetingIds] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(addOutputContentValidations),
    mode: "all",
    reValidateMode: "onChange",
  });

  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getOutputTypes({}) as any);
  }, [dispatch]);
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

  const OutputTypes = useSelector((state: RootState) => {
    return state?.outputTypes?.outputTypes;
  });

  const Meetings = useSelector((state: RootState) => {
    return state?.meetings?.meetings;
  });
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      clearErrors("OutputAttachments");
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };

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

  const showFailureAlert = (id: string) => {
    Swal.fire({
      text: intl.formatMessage({ id: id }),
      icon: "error",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-danger",
      },
    });
  };

  const DisplayErrorMessage = (error: any, intl: any) => {
    return (
      <div
        className="invalid-feedback pt-1"
        style={{
          display: error ? "block" : "none",
        }}
      >
        <p className="mb-0">
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
    if (meetingIds.length > 0) {
      clearErrors("MeetingIds");
    }
  }, [meetingIds]);
  function validateTotalFileSize(fileList) {
    const MAX_TOTAL_SIZE_MB = 10;
    const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;
    const totalSize:any = Array.from(fileList)?.reduce((sum, file:any) => sum + file.size, 0);
    return totalSize <= MAX_TOTAL_SIZE_BYTES;
  }
  const onSubmit = async (data: any) => {
    if (!selectedFiles.length) {
      setError("OutputAttachments", {
        type: "custom",
        message: "ThisFelidIsRequired",
      });
      return;
    }
    if (!meetingIds.length) {
      setError("MeetingIds", {
        type: "custom",
        message: "ThisFelidIsRequired",
      });
      return;
    }

    let formdata = new FormData();

    formdata.append("Name", data.Name);
    formdata.append("Details", data.Details);
    formdata.append("CommitteeId", id as string);
    meetingIds.forEach((mId) => {
      formdata.append("MeetingIds", mId);
    });
    selectedFiles.forEach((file) => {
      formdata.append("OutputAttachments", file);
    });

    setLoading(true);
    if(validateTotalFileSize(selectedFiles)==false){
      showFailureAlertForAttachments()
      setLoading(false);
      return ;
    }
    await dispatch(addOutputByCommitteeId(formdata) as any).then((res: any) => {
      if (res.payload.statusEnum === 1) {
        showSuccessAlert();
        navigate(
          `/committees-review/comittees-tab-details/${id}?tabName=Outputs`,
          {
            state: {
              commiitteeInternalMembers: JSON.parse(
                localStorage.getItem("commiitteeInternalMembers") as any
              ),
              serviceName: cardTitle,
              tabState: tabState,
            },
          }
        );
      }else if (res.payload.message === "[\"The Name must be unique.\"]") {
        
        showFailureAlert("UserMustBeUniq")
      } else if (res.payload.message === "[\"All output attachments must be valid files.\"]") {
                showFailureAlert("ImageExtensionsAllowed")

      }
      else showFailureAlert(res.payload.message);
      setLoading(false);
    });
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
  return (
    <>
      <div className="card">
        <div className="card-body d-flex justify-content-start pb-2 mb-5">
          <div className="card-title d-flex flex-column align-items-start">
            <span className="fs-3 mb-2">
              {intl.formatMessage({
                id: "AddNewOutput",
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
          <form className="form outputForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="row gy-5">
              <div className="col-md-6">
                <div>
                  <label htmlFor="OutputName" className="mb-2 required">
                    {intl.formatMessage({ id: "OutputName" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="special fas fa-layer-group"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder={intl.formatMessage({
                        id: "OutputName",
                      })}
                      id="OutputName"
                      className="form-control"
                      {...register("Name")}
                    />
                    {DisplayErrorMessage(errors?.Name?.message, intl)}
                  </div>
                </div>
              </div>
            

              <div className="col-12">
                <div>
                  <label htmlFor="OutputDetails" className="mb-2 required">
                    {intl.formatMessage({ id: "OutputDetails" })}
                  </label>
                  <textarea
                    id="OutputDetails"
                    placeholder={intl.formatMessage({ id: "OutputDetails" })}
                    className="form-control form-control-lg form-control-solid min-h-150px"
                    {...register("Details")}
                  ></textarea>
                  {DisplayErrorMessage(errors?.Details?.message, intl)}
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-2 pt-2 pb-3">
                  <label className="form-label px-2  fs-6 text-gray-700 required">
                    {intl.formatMessage({ id: "Attachments" })}
                  </label>

                  <div className="w-100 d-flex bg-light-primary rounded border-primary border border-dashed mb-1 position-relative">
                    <label
                      htmlFor="outputAttachment"
                      className="form-label px-2  fontSz-6 dropzone-select  uploadFile-style inputAreaHeight"
                    >
                      <div className="row align-items-center">
                        <div className="d-flex gap-4 align-items-center">
                          <img
                            src={"/media/pmo/uploadFile.png"}
                            className="d-inline-block h-75"
                          />
                          <div>
                            <p className="text-primary fw-bolder my-2 p-0">
                              {intl.formatMessage({
                                id: "QuickFileUploader",
                              })}
                            </p>
                            <p className="p-0 my-1">
                              {intl.formatMessage({
                                id: "DragAndDropOrChooseFilesFromComputer",
                              })}
                            </p>
                          </div>
                        </div>
                        {selectedFiles && (
                          <>
                            <div>
                              <ul>
                                {selectedFiles?.map((file, index) => (
                                  <div className="d-flex my-2" key={index}>
                                    <img
                                      className="mx-2"
                                      style={{
                                        height: "35px",
                                        width: "35px",
                                        borderRadius: "50%",
                                        display: "inline-block",
                                      }}
                                      src={getIconSrc(file?.name, file)}
                                      alt={file?.name}
                                    />
                                    <li
                                      key={index}
                                      className="d-flex justify-content-between align-items-center my-2"
                                    >
                                      {file.name}
                                      <button
                                        onClick={() =>
                                          setSelectedFiles(() => {
                                            return selectedFiles.filter(
                                              (img) => img !== file
                                            );
                                          })
                                        }
                                        className="bg-transparent text-danger fw-bold border-0"
                                      >
                                        <i className="bi bi-trash fa-lg"></i>
                                      </button>
                                    </li>
                                  </div>
                                ))}
                              </ul>
                            </div>
                          </>
                        )}
                      </div>
                    </label>
                    <div
                      className="dropzone dropzone-queue mb-2"
                      id="kt_dropzonejs_example_3"
                    >
                      <div className="dropzone-panel mb-lg-0 mb-2">
                        <input
                          multiple
                          type="file"
                          id="outputAttachment"
                          className="dropzone-select w-100 uploadFile-style inputAreaHeight d-none"
                          {...register("OutputAttachments")}
                          onChange={(e) => handleFileChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  {DisplayErrorMessage(
                    errors?.OutputAttachments?.message,
                    intl
                  )}
                </div>
              </div>

              <div className="col-md-6 d-flex align-items-center">
                <div className="w-100">
                  <div className="col-lg-12">
                    <div
                      role="button"
                      className="py-5 border border-primary border-2 text-primary text-center d-flex align-items-center justify-content-center rounded-2"

                      onClick={() => setModalShow(true)}
                    >
                      <span>
                        <i className="far fa-plus-square mx-2 fs-2 fa-fw"></i>
                      </span>
                      <span>
                        {intl.formatMessage({ id: "AddMettingsToOutputs" })}
                      </span>
                    </div>
                    <div className="my-2">
                      {Meetings?.filter((meeting) => {
                        return meetingIds?.includes(meeting?.id);
                      })?.map((ele) => {
                        return (
                          <Fragment key={ele?.id}>
                            <p className="d-flex justify-content-center align-items-center">
                              {ele?.name}
                            </p>
                          </Fragment>
                        );
                      })}
                    </div>
                    {DisplayErrorMessage(errors?.MeetingIds?.message, intl)}
                  </div>
                </div>
              </div>
  <div className="row justify-content-center my-5 gx-3">
  <div className="col-12 col-sm-6 col-md-3 mb-3 mb-sm-0">
    <button
      onClick={() =>
        navigate(
          `/committees-review/comittees-tab-details/${id}?tabName=Outputs`,
          { state: { tabState: tabState, serviceName: cardTitle } }
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
      <button
        type="submit"
        className="btn btn-success w-100"
      >
        {intl.formatMessage({ id: "Add" })}
      </button>
    ) : (
      <Button
        variant="success"
        disabled
        className="w-100"
      >
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
        >
          <CommitteesReviewMeetingAddMeetingToOutput
            show={modalShow}
            handleClose={() => setModalShow(false)}
            meetingIds={meetingIds}
            setMeetingIds={setMeetingIds}
            id={id}
            register={register}
          />
        </div>
      </div>
    </>
  );
};

export { CommitteesReviewAddOutputContent };
