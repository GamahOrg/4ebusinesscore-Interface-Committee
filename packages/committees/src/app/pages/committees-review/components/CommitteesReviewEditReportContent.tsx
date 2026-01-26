import { FC, Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { RootState, useAppSelector } from "../../../store/store";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getMeetings } from "../../../features/meeting/meetingSlice";
import "moment-timezone";
import moment from "moment";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";

import {
  editProceeding,
  getProceedingById,
  getProceedings,
} from "../../../features/procceding/proceedingSlice";
import {
  getCommittee,
  getCommitteeMembers,
} from "../../../features/committee/committeesSlice";
import { object, string, InferType, mixed } from "yup";
import { useLocation } from "react-router-dom";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { CommitteeRootUrl } from "@4eplatform/shared/apis/committee";

const CommitteesReviewEditReportContent: FC = () => {
  let location = useLocation();
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";

  const [selectedFilesForAttachments, setSelectedFilesForAttachments] =
    useState<any>([]);
  const intl = useIntl();
  let { id, reportId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  let [firstMount, setFirstMount] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getCommittee(id as string) as any).then((res) => {
      setMessage(res?.payload?.message);
    });
  }, [id]);
  useEffect(() => {
    if (id) {
      dispatch(getProceedings(id) as any);
    }
  }, [id]);
  useEffect(() => {
    if (reportId) {
      dispatch(getProceedingById(reportId) as any);
    }
  }, [reportId]);
  let proceedingDetails = useSelector((state: RootState) => {
    return state?.proceedings?.proceeding;
  });
  let proceedings = useAppSelector((state) => {
    return state?.proceedings?.proceedings;
  });
  function validateTotalFileSize(fileList) {
    const MAX_TOTAL_SIZE_MB = 10;
    const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;
    const totalSize: any = Array.from(fileList)?.reduce(
      (sum, file: any) => sum + file.size,
      0,
    );
    return totalSize <= MAX_TOTAL_SIZE_BYTES;
  }

  useEffect(() => {
    if (proceedingDetails?.id) {
      setValueForProceeding("Name", proceedingDetails?.name);
      setValueForProceeding("Notes", proceedingDetails?.notes);
      let proceedingDate = moment
        .tz(proceedingDetails?.date, "UTC")
        .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
        .format()
        ?.split(":00")[0];
      setValueForProceeding("Date", proceedingDate as any);
      setSelectedFilesForAttachments(
        proceedingDetails?.attachments?.map((attachment) => {
          return {
            name: attachment?.split("/")?.slice(-1)[0],
            path: attachment,
          };
        }),
      );
    }
  }, [proceedingDetails?.id, proceedingDetails]);
  useEffect(() => {
    if (Array.isArray(proceedings)) {
      let proceedingMeetingsDetails = proceedings
        ?.find((item) => {
          return item?.id == reportId;
        })
        ?.meetings?.slice(-1)[0]?.id;
      setValueForProceeding("MeetingId", proceedingMeetingsDetails as string);
    }
  }, [proceedingDetails, proceedings]);
  useEffect(() => {
    if (message == "This Committee isn't approved yet!") {
      navigate("/committees-review?pageNumber=1");
    }
  }, [message, id]);

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
      .typeError("InputFieldIsRequried")
      .test({
        name: "Date",
        message: "ProccedingDateMustBeAfterMeetingsDate",
        test: function (value: any) {
          let date = new Date(
            Meetings?.find((meeting) => {
              return meeting?.id == this.parent?.MeetingId;
            })?.meetingDate as any,
          );
          const proceedingDate = new Date(value);
          const differenceInMillis = proceedingDate.getTime() - date.getTime();
          const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
          return differenceInDays > 0;
        },
      })
      .test({
        name: "Date",
        message: "ProccedingDateMustBeInTheSameYearOfLatestSelectedMeeting",
        test: function (value: any) {
          let dateYear = new Date(
            Meetings?.find((meeting) => {
              return meeting?.id == this.parent?.MeetingId;
            })?.meetingDate as any,
          ).getFullYear();
          const proceedingDateYear = new Date(value).getFullYear();
          const differenceInYears = dateYear - proceedingDateYear;
          return differenceInYears == 0;
        },
      })
      .test({
        name: "Date",
        message: "ReportDateMustBeEqualToOrAfterMeetingDate",
        test: function (value: any) {
          const date = moment.tz(
            Meetings?.find((meeting) => {
              return meeting?.id == this.parent?.MeetingId;
            })?.meetingDate,
            Intl.DateTimeFormat().resolvedOptions().timeZone,
          );
          const reportDate = moment.tz(
            value,
            Intl.DateTimeFormat().resolvedOptions().timeZone,
          );
          const differenceInMillis = reportDate.diff(date);
          return differenceInMillis >= 10800000;
        },
      }),
    attachments: mixed()
      .notRequired()
      .test("fileSize", "theFileIsTooLarge", function (value) {
        if (value && value.length && value.length > 0) {
          return value[0].size <= 20000000;
        } else return true;
      }),
  });

  type AddProceedingProps = InferType<typeof AddProceedingSchema>;

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

  const {
    register: registerForProceeding,
    handleSubmit: handleSubmitForProceeding,
    watch: watchForProceeding,
    setValue: setValueForProceeding,
    formState: { errors: errorsForProceeding },
  } = useForm<AddProceedingProps>({
    resolver: yupResolver(AddProceedingSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  let formValuesForProceeding = watchForProceeding();

  const AddSubmit = async (formvalues: AddProceedingProps) => {
    let body = {
      Name: formvalues.Name,
      Notes: formvalues.Notes,
      Date: moment
        .tz(formvalues.Date, Intl.DateTimeFormat().resolvedOptions().timeZone)
        .format(),
      ProceedingAttachments: selectedFilesForAttachments?.filter((file) => {
        return file?.size > 0;
      }),
      OldProceedingAttachments: selectedFilesForAttachments?.filter((file) => {
        return file?.path;
      }),
      CommitteeId: id,
      MeetingIds: [formvalues?.MeetingId],
      ProceedingId: reportId,
    };
    setLoading(true);
    if (
      validateTotalFileSize(
        selectedFilesForAttachments?.filter((file) => {
          return file?.size > 0;
        }),
      ) == false
    ) {
      showSuccessAlert(false, "TotalFilesSizeNotBeExcee10MB", intl, () => {});
      setLoading(false);
      return;
    }
    dispatch(editProceeding(body) as any).then((res: any) => {
      if (res?.payload?.statusEnum == 1) {
        setLoading(false);
        showSuccessAlert(true, "SavedSuccessfully", intl, () => {
          navigate(`/committees-review/comittees-tab-details/${id}`, {
            state: { cardName: cardTitle, serviceName: cardTitle },
          });
        });
      } else if (res?.payload?.message) {
        showSuccessAlert(false, "AnErrorOccured", intl, () => {});
      }
      setLoading(false);
    });
  };

  let language: string = intl.locale;
  useEffect(() => {
    let params = { pageSize: "100000", pageNumber: "1" };
    dispatch(getCommitteeMembers({ id, params }) as any);
  }, [id]);

  useEffect(() => {
    if (!firstMount) {
      setValueForProceeding(
        "Name",
        Meetings?.find((ele) => {
          return ele?.id == formValuesForProceeding?.MeetingId;
        })?.name as any,
      );
    } else {
      setValueForProceeding("Notes", proceedingDetails?.notes);
    }
  }, [formValuesForProceeding?.MeetingId, proceedingDetails?.notes]);
  return (
    <>
      <div className="card">
        <div className="card-body d-flex justify-content-start pb-2 mb-5">
          <div className="card-title d-flex flex-column align-items-start">
            <span className="fs-3 mb-2">
              {intl.formatMessage({
                id: "EditReportt",
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
                      {...registerForProceeding("MeetingId", {
                        onChange: (e) => {
                          setFirstMount(false);
                        },
                      })}
                      defaultValue={""}
                    >
                      <option value={""} disabled>
                        {intl.formatMessage({ id: "Choose" })}
                      </option>
                      {filterMeeting?.map((meeting) => (
                        <option value={meeting?.id} key={meeting?.id}>
                          {meeting?.name}
                        </option>
                      ))}
                    </select>
                    {DisplayErrorMessage(
                      errorsForProceeding?.MeetingId?.message,
                      intl,
                      language,
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
                        language,
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
                    />
                    {DisplayErrorMessage(
                      errorsForProceeding?.Date?.message,
                      intl,
                      language,
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <span className="mb-2">
                    {intl.formatMessage({ id: "Attachments" })}
                  </span>
                  <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-5 h-fit">
                    <label
                      htmlFor="outputAttachment1"
                      className="form-label  dropzone-select  uploadFile-style inputAreaHeight"
                    >
                      <div role="button" className="d-flex align-items-center">
                        {selectedFilesForAttachments?.length > 0 ? (
                          <>
                            <div>
                              <ul className="d-flex align-items-center flex-wrap">
                                {selectedFilesForAttachments?.map(
                                  (file, index) => (
                                    <li
                                      key={index}
                                      className="d-flex align-items-center mb-4 mx-3 position-relative"
                                    >
                                      <img
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                          borderRadius: "50%",
                                        }}
                                        src={getIconSrc(
                                          file?.name,
                                          file,
                                          CommitteeRootUrl,
                                        )}
                                        onError={(e: any) =>
                                          (e.target.src = getIconSrcError(
                                            file?.name,
                                          ))
                                        }
                                      />
                                      <div className="mx-1">{file?.name}</div>
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
                      language,
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-center my-5">
                  <button
                    onClick={() =>
                      navigate(
                        `/committees-review/comittees-tab-details/${id}`,
                        {
                          state: {
                            cardName: cardTitle,
                            serviceName: cardTitle,
                          },
                        },
                      )
                    }
                    type="reset"
                    className="btn btn-secondary w-sm-25 w-100"
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  {!loading ? (
                    <button
                      type="submit"
                      className="btn btn-success w-sm-25 w-100 mx-4"
                    >
                      {intl.formatMessage({ id: "Add" })}
                    </button>
                  ) : (
                    <Button
                      variant="success"
                      disabled
                      className="px-15 w-sm-25 w-100"
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
            </form>
          </Fragment>
        </div>
      </div>
    </>
  );
};

export { CommitteesReviewEditReportContent };
