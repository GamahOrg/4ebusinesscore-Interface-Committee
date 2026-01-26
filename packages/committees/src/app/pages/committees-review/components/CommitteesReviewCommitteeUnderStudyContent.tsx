import { useIntl } from "react-intl";
import { AcceptPopup } from "../../partials/AcceptPopup";
import CommitteesReviewCommitteeDetailsRejectPopup from "../popup/committees-review-committee-details-reject-popup";
import CommitteesReviewCommitteeDetailsEditPopup from "../popup/committees-review-committee-details-edit-popup";
import { Link } from "react-router-dom";
import { CommitteesReviewCommitteeMember } from "./CommitteesReviewCommitteeMember";
import { Fragment, useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import {
  getCommittee,
  getNotApprovedCommitteeById,
} from "../../../features/committee/committeesSlice";
import moment from "moment";
import { CommitteeRootUrl } from "@4eplatform/shared/apis/committee";
import { useLocation } from "react-router-dom";

const CommitteesReviewCommitteeUnderStudyContent = () => {
  const intl = useIntl();
  const { committeeId } = useParams();

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalEShow, setModalEShow] = useState<boolean>(false);
  const [modalRShow, setModalRShow] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getNotApprovedCommitteeById(committeeId as string) as any);
  }, [committeeId]);
  const notApprovedCommitteeDetails = useAppSelector((state: RootState) => {
    return state?.committees?.notApprovedCommitteeById;
  });
  const getIconSrc = (attachmentUrl: string) => {
    const fileName = attachmentUrl?.substring(
      attachmentUrl.lastIndexOf("/") + 1
    );

    if (
      fileName?.endsWith(".png") ||
      fileName?.endsWith(".jpg") ||
      fileName?.endsWith(".jpeg") || 
      fileName?.endsWith(".jfif") ||
      fileName?.endsWith(".webp")
    ) {
      return `${CommitteeRootUrl}${attachmentUrl}`;
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
    } else if (
      fileName?.endsWith(".ppt") ||
      fileName?.endsWith(".pptx") ||
      fileName?.endsWith(".pptm") ||
      fileName?.endsWith(".pps") ||
      fileName?.endsWith(".ppsx") ||
      fileName?.endsWith(".ppsm")
    ) {
      return "/media/pmo/powerPointIcon.png";
    }
  };

  let location = useLocation();
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";
  return (
    <>
      <div className="card card-xl-stretch mb-xl-0">
        <div className="card-body py-3 px-3 mx-8">
          <div className="tab-content">
            <div
              className="tab-pane fade active show"
              id="REGA_table_widget_5_tab_1"
            >
              <div className="row p-4">
                <div className="col-lg-12 mb-2 pt-2 pb-3 filed_background">
                  <div className="d-flex justify-content-between">
                    <div className="col-lg-5 pt-3 pb-3">
                      <div>
                        <h5 className="mb-4 text-primary">
                          {intl.formatMessage({ id: "CommitteeType" })} :
                          <span className="mx-3" style={{ color: "#a1a5b7" }}>
                            {notApprovedCommitteeDetails?.requestStatus == 0
                              ? intl.formatMessage({ id: "Pendingg" })
                              : notApprovedCommitteeDetails?.requestStatus == 1
                                ? intl.formatMessage({ id: "Approvedd" })
                                : intl.formatMessage({ id: "Rejectedd" })}
                          </span>
                        </h5>
                        <h5 className="mb-4 text-primary">
                          {intl.formatMessage({ id: "CommitteeDate" })} :
                          <span className="mx-3" style={{ color: "#a1a5b7" }}>
                            {moment(
                              notApprovedCommitteeDetails?.committeeDate
                            ).format("YYYY-MM-DD")}
                          </span>
                        </h5>
                        <h5 className="mb-4 text-primary">
                          {intl.formatMessage({
                            id: "CommitteeDuration",
                          })}
                          :
                          <span className="mx-3" style={{ color: "#a1a5b7" }}>
                            {notApprovedCommitteeDetails?.committeeTime == 0
                              ? intl.formatMessage({ id: "Always" })
                              : notApprovedCommitteeDetails?.committeeTime == 1
                                ? intl.formatMessage({ id: "Temporary" })
                                : intl.formatMessage({
                                    id: "RelatedToProject",
                                  })}
                          </span>
                        </h5>
                        {notApprovedCommitteeDetails?.committeeTime==1?<>
                            <h5 className="mb-4 text-primary">
                            {" "}
                            {intl.formatMessage({ id: "DateOfDecisionOfCommitteeFinishing" })} :{" "}
                            <span className="mx-3" style={{ color: "#a1a5b7" }}>
                              {moment(notApprovedCommitteeDetails?.endDateCommittee).format(
                                "YYYY-MM-DD"
                              )}
                            </span>
                          </h5>
                          </>:<></>}
                        <h5 className="mb-4 text-primary">
                          {intl.formatMessage({ id: "CommitteeName" })} :
                          <span className="mx-3" style={{ color: "#a1a5b7" }}>
                            {notApprovedCommitteeDetails?.name}
                          </span>
                        </h5>
                        <h5 className="mb-4 text-primary">
                          {intl.formatMessage({
                            id: "TheLegalBasisForFormingACommittee",
                          })}
                          :
                          <span className="mx-3" style={{ color: "#a1a5b7" }}>
                            {notApprovedCommitteeDetails?.hasLegalDocument
                              ? intl.formatMessage({
                                  id: "Found",
                                })
                              : intl.formatMessage({
                                  id: "NotFound",
                                })}
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="col-lg-0 pt-2 pb-3">
                      <Link
                        to={`/committees-review/edit-committee/${committeeId}`}
                        state={{
                          serviceName: cardTitle,
                        }}
                      >
                        <div className="btn btn-primary mx-1 text-center w-100">
                          {intl.formatMessage({ id: "Edit" })}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* <CommitteesReviewCommitteeMember  /> */}
              {notApprovedCommitteeDetails?.requestInstanceId &&
              notApprovedCommitteeDetails?.requestInstanceId !=
                "00000000-0000-0000-0000-000000000000" ? (
                <CommitteesReviewCommitteeMember
                  committee={notApprovedCommitteeDetails}
                  requestId={notApprovedCommitteeDetails?.requestInstanceId}
                />
              ) : (
                <>
                  <p>
                    {intl.formatMessage({ id: "NotFoundRequestInstanceYet" })}
                  </p>
                </>
              )}

              <div className="row mt-5">
                <div className="col-md-4 col-12 mb-2 pt-2 pb-3">
                  <label htmlFor="notes" className="form-label px-2  fontSz-6">
                    {intl.formatMessage({
                      id: "TheLegalBasisForFormingACommittee",
                    })}
                  </label>
                  <div className="d-flex p-3 filed_background">
                    <div className="form-check form-check-success form-check-sm form-check-custom mx-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="cost"
                        id="exampleRadios1"
                        value="option1"
                        checked={notApprovedCommitteeDetails?.hasLegalDocument}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        {intl.formatMessage({ id: "Found" })}
                      </label>
                    </div>
                    <div className="form-check form-check-success form-check-sm form-check-custom">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="cost"
                        id="exampleRadios1"
                        value="option1"
                        checked={!notApprovedCommitteeDetails?.hasLegalDocument}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        {intl.formatMessage({ id: "NotFound" })}
                      </label>
                    </div>
                  </div>
                </div>
                {notApprovedCommitteeDetails?.attachments?.length>0?<>
                  <div className="col-md-8 col-12 mb-2 pt-2 pb-3">
                  <label className="form-label px-2  fontSz-6">
                    {intl.formatMessage({ id: "ATTACHMENTS" })}
                  </label>
                  <div className="d-flex  align-items-center flex-wrap">
                    {notApprovedCommitteeDetails?.attachments?.map(
                      (attachment: any , index:number) => {
                        return (
                          <Fragment key={index}>
                            <div className="mx-2 my-3">
                              <div className="">
                                <div className="d-flex align-items-center">
                                  <span>
                                    <img
                                      src={getIconSrc(attachment)}
                                      width={"40px"}
                                      height={"40px"}
                                      alt=""
                                    />
                                  </span>
                                  <a
                                    href={`${CommitteeRootUrl}${attachment}`}
                                    download
                                    target="_blank"
                                  >
                                    <div className="d-flex flex-column mx-3 position-relative my-2 my-md-0">
                                      <span>
                                        {attachment?.split("/")?.slice(-1)[0]}
                                      </span>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </Fragment>
                        );
                      }
                    )}
                  </div>
                </div>
                </>:<></>}
                {notApprovedCommitteeDetails?.workRules?.length>0?<>
                  <div className="col-md-12 col-12 mb-2 pt-2 pb-3">
                  <label className="form-label px-2  fontSz-6">
                    {intl.formatMessage({ id: "CommitteeWorkRules" })}
                  </label>
                  <div className="d-flex  align-items-center flex-wrap">
                    {notApprovedCommitteeDetails?.workRules?.map(
                      (rule: any , index:any) => {
                        return (
                          <Fragment key={index}>
                            <div className="my-2 mx-5">
                              <div className="">
                                <div className="d-flex align-items-center">
                                  <span>
                                    <img
                                      src={getIconSrc(rule)}
                                      width={"40px"}
                                      height={"40px"}
                                    />
                                  </span>
                                  <a
                                    href={`${CommitteeRootUrl}${rule}`}
                                    download
                                    target="_blank"
                                  >
                                    <div className="d-flex flex-column mx-3 position-relative my-2 my-md-0">
                                      <span>
                                        {rule?.split("/")?.slice(-1)[0]}
                                      </span>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </Fragment>
                        );
                      }
                    )}
                  </div>
                </div>
                </>:<></>}
              
                
              </div>
              {notApprovedCommitteeDetails?.hasLegalDocument ? (
                <>
                  <div className="col-lg-12 mb-2 pt-2 pb-3">
                    <label htmlFor="notes" className="form-label px-2 fontSz-6">
                      {intl.formatMessage({ id: "LegalBond" })}
                    </label>
                    <textarea
                      rows={5}
                      value={notApprovedCommitteeDetails?.legalDocument}
                      readOnly
                      id="notes"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                    ></textarea>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="rega_modal_committeeDetailsAcceptUser"
        aria-hidden="true"
      >
        <AcceptPopup show={modalShow} handleClose={() => setModalShow(false)} />
      </div>
      <div
        className="modal fade"
        id="rega_modal_committeeDetailsRejectUser"
        aria-hidden="true"
      >
        <CommitteesReviewCommitteeDetailsRejectPopup
          show={modalRShow}
          handleClose={() => setModalRShow(false)}
        />
      </div>
      <div
        className="modal fade"
        id="rega_modal_committeeDetailsSendEditUser"
        aria-hidden="true"
      >
        <CommitteesReviewCommitteeDetailsEditPopup
          show={modalEShow}
          handleClose={() => setModalEShow(false)}
        />
      </div>
    </>
  );
};

export default CommitteesReviewCommitteeUnderStudyContent;
